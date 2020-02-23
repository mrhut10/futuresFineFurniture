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

exports.changeObjectProb = (obj, propName, newValue) => {
  obj[propName] = newValue;
  return obj;
};

exports.arrayMinMax = values =>
  values.reduce(
    (acc, next) =>
      acc
        ? [acc[0] < next ? acc[0] : next, acc[0] > next ? acc[0] : next]
        : [next, next],
    undefined
  );

function getAllParentNodes(
  { fnGetParentNode, fnGetIdFromNode },
  Nodes,
  target
) {
  const config = { fnGetParentNode, fnGetIdFromNode };
  const GetParentId = fnGetIdFromNode(fnGetParentNode(target));
  const parent = GetParentId
    ? Nodes.find(x => fnGetIdFromNode(x) === GetParentId)
    : undefined;
  return parent ? [parent, ...getAllParentNodes(config, Nodes, parent)] : [];
}

function getAllChildNodes(
  { fnGetParentNode, fnGetIdFromNode, fnGetDisabledFromNode },
  Nodes,
  target
) {
  const nodeEnabled = next =>
    !fnGetDisabledFromNode || fnGetDisabledFromNode(next) !== true; //  || fnGetDisabledFromNode(next) !== true;
  return Nodes.filter(node =>
    getAllParentNodes({ fnGetParentNode, fnGetIdFromNode }, Nodes, node)
      // starting from each root node, don't include if node disabled or if previous parent was skipped
      .reduceRight((acc, next, i) => {
        if (acc.length === i && nodeEnabled(next)) acc.push(next);
        return acc;
      }, [])
      // will provide truthy value to outside filter if target node is found list of parents of node
      .find(parent => fnGetIdFromNode(parent) === fnGetIdFromNode(target))
  );
}

exports.getAllParentNodes = getAllParentNodes;
exports.getAllChildNodes = getAllChildNodes;
