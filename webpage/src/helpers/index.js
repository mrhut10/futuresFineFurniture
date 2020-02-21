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
  const GetParentId = fnGetIdFromNode(fnGetParentNode(target));
  const parent = GetParentId
    ? Nodes.find(x => fnGetIdFromNode(x) === GetParentId)
    : undefined;
  return parent
    ? [
        parent,
        ...getAllParentNodes(
          { fnGetParentNode, fnGetIdFromNode },
          Nodes,
          parent
        ),
      ]
    : [];
}

function getAllChildNodes(
  { fnGetParentNode, fnGetIdFromNode, fnGetDisabledFromNode },
  Nodes,
  target
) {
  // const getDisableFieldValue = (node, ...paths) => paths ? 
  // if disabledField is set will stop recursion, this will prevent getting products from a disabled parent category
  return Nodes.filter(node =>
    // get all nodes parents
    getAllParentNodes({ fnGetParentNode, fnGetIdFromNode }, Nodes, node)
      // dont include a disabled child or any of its child or its childrens children, etc
      .reduce((acc, next, i) => {
        // skip pushing next if skiped a previous next
        if (acc.length === i) {
          // if no disabledField or if next isn't disabled then push next into acc
          if (!fnGetDisabledFromNode || fnGetDisabledFromNode(next) !== true)
            acc.push(next);
        }
        return acc;
      }, [])
      // try find a parent that is our target
      .find(parent => fnGetIdFromNode(parent) === fnGetIdFromNode(target))
  );
}

exports.getAllParentNodes = getAllParentNodes;
exports.getAllChildNodes = getAllChildNodes;
