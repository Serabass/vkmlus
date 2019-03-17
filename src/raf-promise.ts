export function raf(): Promise<number> {
  return new Promise<number>(resolve => {
    window.requestAnimationFrame((time) => {
      resolve(time);
    });
  });
}
