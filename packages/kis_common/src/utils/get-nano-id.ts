export const getNanoId = async (length: number = 21): Promise<string> => {
  const { nanoid } = await require('nanoid');
  return nanoid(length);
};
