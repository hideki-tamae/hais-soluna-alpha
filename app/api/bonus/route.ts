import { NextRequest } from 'next/server';
import { verifyToken } from '@/lib/hmac';
import fs from 'fs';
import path from 'path';

export const runtime = 'nodejs';

export async function GET(req: NextRequest){
  if(process.env.CLAIM_OPEN !== '1'){
    return new Response('Claim closed', { status: 403 });
  }
  const { searchParams } = new URL(req.url);
  const token = searchParams.get('k') || '';
  const secret = process.env.SIGNING_SECRET || '';
  const ok = await verifyToken(token, secret);
  if(!ok) return new Response('Invalid token', { status: 401 });

  const bonusDir = path.join(process.cwd(), 'public', 'bonus');
  let filename = 'soluna_placeholder.txt';
  const pdf = path.join(bonusDir, 'soluna_bonus.pdf');
  if(fs.existsSync(pdf)) filename = 'soluna_bonus.pdf';
  const filePath = path.join(bonusDir, filename);
  if(!fs.existsSync(filePath)) return new Response('File missing', { status: 404 });

  const stat = fs.statSync(filePath);
  const stream = fs.createReadStream(filePath);
  const headers = new Headers({
    'content-length': stat.size.toString(),
    'content-disposition': `attachment; filename="${filename}"`,
    'content-type': filename.endsWith('.pdf') ? 'application/pdf' : 'text/plain; charset=utf-8'
  });
  return new Response(stream as any, { headers });
}
