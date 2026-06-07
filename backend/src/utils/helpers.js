export const pick = (
  obj,
  keys
) => {
  return keys.reduce(
    (
      result,
      key
    ) => {
      if (
        obj &&
        Object.prototype.hasOwnProperty.call(
          obj,
          key
        )
      ) {
        result[key] =
          obj[key];
      }

      return result;
    },
    {}
  );
};