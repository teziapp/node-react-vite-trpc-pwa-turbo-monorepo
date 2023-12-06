/**
 * Exclude keys from object
 * @param obj
 * @param keys
 * @returns
 */
const exclude = <Type, Key extends keyof Type>(obj: Type, keys: Key[]): Omit<Type, Key> => {
  const newObj = { ...obj }
  for (const key of keys) {
    delete newObj[key];
  }
  return newObj;
};

export default exclude;