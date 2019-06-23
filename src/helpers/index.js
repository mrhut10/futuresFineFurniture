const priceFormat = new Intl.NumberFormat('en-AU', {
  style: 'currency',
  currency: 'AUD',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
  useGrouping: true,
});

const [head, tail] = [
  a => a.find(() => true),
  a => a.reverse().find(() => true),
];
exports.head = head;
exports.tail = tail;

const intToPriceFormat = input => priceFormat.format(input / 100);

exports.intToPriceFormat = intToPriceFormat;
exports.priceFormat = priceFormat;
