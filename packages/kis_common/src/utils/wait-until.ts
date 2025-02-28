export function waitUntil(checkFunc: () => boolean, ms = 100) {
  return new Promise(
    (resolve: (value: unknown) => void, _reject: (reason?: any) => void) => {
      const intervalHandle = setInterval(() => {
        if (!checkFunc()) return;
        clearInterval(intervalHandle);
        resolve(undefined);
      }, ms);
    }
  );
}
