"use strict";
export function numberToAbbreviatedString(number) {
    let result = "";
    let num = number;
    let unit = "";
    let numStr = num.toString();
    if (numStr.length > 3) {
      num = num / 1000;
      unit = "K";
    }
    if (numStr.length > 6) {
      num = num / 1000;
      unit = "M";
    }
    if (numStr.length > 9) {
      num = num / 1000;
      unit = "B";
    }
    result =
      numStr.length <= 3 && unit === ""
        ? num.toFixed(0) + unit
        : num.toFixed(1) + unit;
    return result;
  }