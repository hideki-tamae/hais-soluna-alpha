import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient, NeuralState } from '@prisma/client';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../auth/[...nextauth]/route';

const prisma = new PrismaClient();

// Gemini API Endpoint (Multimodal Audio Analysis)
const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro-latest:generateContent";

async function analyzeAudioWithGemini(audioBuffer: Buffer, mimeType: string): Promise<{
  omegaScore: number;
  neuralState: NeuralState;
  analysisReason: string;
}> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY is not configured");
  }

  const base64Audio = audioBuffer.toString('base64');

  const payload = {
    contents: [{
      parts: [
        {
          text: `You are an advanced voice biomarker analyzer. Analyze this audio for psychological state.
          Provide:
          1. omegaScore (Int, 0-100): Overall mental health/resilience.
          2. neuralState (VENTRAL, SYMPATHETIC, or DORSAL).
          3. analysisReason (String): Brief explanation of findings.
          
          Return JSON format: {"omegaScore": 85, "neuralState": "VENTRAL", "analysisReason": "..."}`
        },
        {
          inline_data: {
            mime_type: mimeType,
            data: base64Audio
          }
        }
      ]
    }],
    generationConfig: {
      response_mime_type: "application/json",
    }
  };

  const response = await fetch(`${GEMINI_API_URL}?key=${apiKey}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    const errorData = await response.json();
    console.error("Gemini API Error:", errorData);
    throw new Error(`Gemini API responded with ${response.status}`);
  }

  const data = await response.json();
  const resultText = data.candidates[0].content.parts[0].text;
  return JSON.parse(resultText);
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const formData = await req.formData();
    const audioFile = formData.get('audio') as File;
    
    if (!audioFile) {
      return NextResponse.json({ error: 'No audio file provided' }, { status: 400 });
    }

    const buffer = Buffer.from(await audioFile.arrayBuffer());
    const analysis = await analyzeAudioWithGemini(buffer, audioFile.type);

    const result = await prisma.$transaction(async (tx) => {
      const scan = await tx.scanHistory.create({
        data: {
          userId: session.user.id,
          omegaScore: analysis.omegaScore,
          neuralState: analysis.neuralState,
          analysisReason: analysis.analysisReason,
          audioSizeBytes: buffer.length,
          apiVersion: "v1.1",
          model: "gemini-1.5-pro-latest"
        }
      });

      await tx.user.update({
        where: { id: session.user.id },
        data: { baseAcesScore_v1_1: analysis.omegaScore }
      });

      return scan;
    });

    return NextResponse.json({ success: true, scan: result });
  } catch (error: any) {
    console.error('Scan v2 Error:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
