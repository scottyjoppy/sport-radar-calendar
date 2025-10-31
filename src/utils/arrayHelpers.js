export const offsetArray = (array) => {
  let newArray = [...array];
  newArray.push(newArray.shift());
  return newArray;
};
