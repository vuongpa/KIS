export function throttle<Args extends unknown[]>(
  fn: (...args: Args) => void,
  coolDown: number
) {
  let lastArgs: Args | undefined;

  const run = () => {
    if (lastArgs) {
      fn(...lastArgs);
      lastArgs = undefined;
    }
  };

  const throttled = (...args: Args) => {
    const isOnCoolDown = !!lastArgs;

    lastArgs = args;

    if (isOnCoolDown) {
      return;
    }

    setTimeout(run, coolDown);
  };

  return throttled;
}
