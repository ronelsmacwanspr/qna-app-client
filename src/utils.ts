export const removeExtraSpaces = (str: string): string => {
  if (!str) {
    return "";
  }
  let arr = str.split(" ").filter((item) => item != "");
  let res = "";

  arr.forEach((item, index) => {
    res += item;
    if (index != arr.length - 1) {
      res += " ";
    }
  });

  return res;
};
