const formatter = new Intl.NumberFormat("fr-FR", {
  minimumFractionDigits: 0,
  maximumFractionDigits: 2,
});
export const formatNumber = (number: number) => formatter.format(number);
