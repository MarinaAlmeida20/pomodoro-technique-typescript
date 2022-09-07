export function secondsToTime(seconds: number): string {
  const zeroLeft = (n: number) => Math.floor(n).toString().padStart(2, '0');

  const minutes = zeroLeft((seconds / 60) % 60);
  const sec = zeroLeft((seconds % 60) % 60);

  return `${minutes}:${sec}`;
}
