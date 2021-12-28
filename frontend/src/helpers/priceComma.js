export const priceComma = (number) => {
  var nf = new Intl.NumberFormat();
  return nf.format(number)
}