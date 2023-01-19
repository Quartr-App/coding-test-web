/**
 * Check if the color is dark or not
 * @param bgColor {string} Color code
 * @returns {boolean} True if the color is a dark color
 */
export const isColorDark = (bgColor: string) => {
  let color: string = bgColor.charAt(0) === "#" ? bgColor.substring(1, 7) : bgColor;
  let r: number = parseInt(color.substring(0, 2), 16); // hexToR
  let g: number = parseInt(color.substring(2, 4), 16); // hexToG
  let b: number = parseInt(color.substring(4, 6), 16); // hexToB
  let uicolors: number[] = [r / 255, g / 255, b / 255];
  let c: number[] = uicolors.map((col) => {
    if (col <= 0.03928) {
      return col / 12.92;
    }
    return Math.pow((col + 0.055) / 1.055, 2.4);
  });
  let L: number = 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2];
  return L > 0.179 ? false : true;
};
