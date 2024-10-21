function toFixedNumber(num: number, digits = 1, base = 10) {
  const pow = Math.pow(base, digits);
  return Math.round(num * pow) / pow;
}

export default toFixedNumber;
