export const getInitialArr = <T>(
  length: number,
  fill?: number | string | Boolean,
): T[] => new Array(length).fill(fill);
