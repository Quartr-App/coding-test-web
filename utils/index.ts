export const truncateString = (str: string, maxLength: number): string => {
  if (str && str.length > maxLength) {
    let trimmedString: string = str.substr(0, maxLength);
    // re-trim if we are in the middle of a word
    trimmedString = trimmedString.substr(0, Math.min(trimmedString.length, trimmedString.lastIndexOf(' ')));
    return `${trimmedString} ...`;
  }
  return str;
};
