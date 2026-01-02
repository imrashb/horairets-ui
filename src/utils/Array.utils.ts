export const areArraysSame = <T>(a?: T[], b?: T[]): boolean => {
  if (!a && !b) return true;
  if (!a || !b) return false;
  return a.length === b.length && a.every((v) => b.includes(v));
};
