// utils/audioProcessor.ts

/**
 * CIVILIZATION OS - PROOF OF CARE CORE
 * Edge-based Medical Grade Biomarker Extraction Engine
 * VAD (Voice Activity Detection) & Spectral Noise Profiling Enabled
 */

interface AudioSample {
    freq: Uint8Array;
    time: Float32Array;
  }
  
  export const analyzeAudioData = (samples: AudioSample[], sampleRate: number, fftSize: number) => {
    // 1. Noise Profiling & VAD (音声区間検出)
    let noiseEnergy = 0;
    const profileFrames = Math.min(5, samples.length);
    for (let i = 0; i < profileFrames; i++) {
      noiseEnergy += samples[i].time.reduce((sum, v) => sum + v * v, 0) / samples[i].time.length;
    }
    const noiseFloor = noiseEnergy / profileFrames;
    const vadThreshold = Math.max(0.005, noiseFloor * 2.5);
  
    // 有効な音声フレーム（発声区間）のみを抽出
    const activeFrames = samples.filter(s => {
      const energy = s.time.reduce((sum, v) => sum + v * v, 0) / s.time.length;
      let zcr = 0;
      for (let i = 1; i < s.time.length; i++) {
        if ((s.time[i] >= 0 && s.time[i - 1] < 0) || (s.time[i] < 0 && s.time[i - 1] >= 0)) zcr++;
      }
      const zcrRate = zcr / s.time.length;
      return energy > vadThreshold && zcrRate < 0.3;
    });
  
    const targetFrames = activeFrames.length > 10 ? activeFrames : samples;
  
    // 2. 高精度 F0 (基本周波数) 抽出
    const f0s: number[] = [];
    targetFrames.forEach(s => {
      const t = s.time, n = t.length;
      let bestLag = 0, bestC = -Infinity;
      for (let lag = Math.floor(sampleRate / 500); lag < Math.floor(sampleRate / 60); lag++) {
        let c = 0;
        for (let i = 0; i < n - lag; i++) c += t[i] * t[i + lag];
        if (c > bestC) { bestC = c; bestLag = lag; }
      }
      if (bestLag > 0 && bestC > 0.01) {
        f0s.push(sampleRate / bestLag);
      }
    });
    const f0 = f0s.length > 0 ? f0s.reduce((a, b) => a + b, 0) / f0s.length : 145;
  
    // 3. Jitter (周波数ゆらぎ)
    let jSum = 0, jN = 0;
    for (let i = 1; i < f0s.length; i++) {
      jSum += Math.abs(f0s[i] - f0s[i - 1]) / f0s[i - 1];
      jN++;
    }
    const jitter = jN > 0 ? (jSum / jN) * 100 : 0;
  
    // 4. Shimmer (振幅ゆらぎ)
    const rmsArr = targetFrames.map(s => Math.sqrt(s.time.reduce((sum, v) => sum + v * v, 0) / s.time.length));
    let shimSum = 0, shimN = 0;
    for (let i = 1; i < rmsArr.length; i++) {
      if (rmsArr[i - 1] > 0.0001) {
        shimSum += Math.abs(rmsArr[i] - rmsArr[i - 1]) / rmsArr[i - 1];
        shimN++;
      }
    }
    const shimmer = shimN > 0 ? (shimSum / shimN) * 100 : 0;
  
    // 5. HNR (調波対雑音比)
    let hPow = 0, nPow = 0;
    const freqBin = sampleRate / fftSize;
    const f0Bin = Math.round(f0 / freqBin);
    
    targetFrames.forEach(s => {
      for (let i = 0; i < s.freq.length; i++) {
        const v = Math.max(0, (s.freq[i] / 255) ** 2 - noiseFloor);
        const isHarmonic = Array.from({ length: 15 }, (_, k) => k + 1).some(k => Math.abs(i - f0Bin * k) <= 2);
        isHarmonic ? (hPow += v) : (nPow += v);
      }
    });
    const hnr = nPow > 0 ? Math.min(10 * Math.log10(hPow / nPow), 40) : 40;
  
    // 6. ポリヴェーガル理論に基づく状態変数 ω (Neural State)
    let stateKey: 'ventral' | 'dorsal' | 'sympathetic' | 'mixed';
    if (jitter < 1.0 && shimmer < 3.0 && hnr > 22) {
      stateKey = 'ventral';
    } else if (jitter >= 3.0 || shimmer >= 5.0 || hnr < 12) {
      stateKey = 'dorsal';
    } else if (jitter >= 1.0 && jitter < 3.0 && hnr >= 12 && hnr <= 22) {
      stateKey = 'sympathetic';
    } else {
      stateKey = 'mixed';
    }
  
    return { f0, jitter, shimmer, hnr, stateKey };
  };