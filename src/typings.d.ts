declare module 'ml5' {
  interface HandPoseOptions {
    maxContinuousChecks?: number;
    detectionConfidence?: number;
    scoreThreshold?: number;
  }

  interface HandPose {
    detectStart(video: HTMLVideoElement, callback: (results: any[]) => void): void;
    detectStop(): void;
  }

  function handPose(options?: HandPoseOptions, callback?: () => void): HandPose;
}