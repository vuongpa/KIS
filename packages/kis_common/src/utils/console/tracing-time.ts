export const trackingTime = async (
  message: string,
  executeFunction: () => Promise<void>
) => {
  console.log(message);
  console.time(message);
  await executeFunction();
  console.timeEnd(message);
};
