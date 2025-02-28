export const waitForTime = (ms: number): Promise<void> => {
  return new Promise((r) => setTimeout(r, ms));
};
