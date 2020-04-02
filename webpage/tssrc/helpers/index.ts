const priceFormat = new Intl.NumberFormat('en-AU', {
  style: 'currency',
  currency: 'AUD',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
  useGrouping: true,
});

const [head, tail] = [
  <T>(a: T[]):T | undefined => a.find(() => true),
  <T>(a: T[]):T | undefined => a.reverse().find(() => true),
];


const intToPriceFormat = (input: number): string => priceFormat.format(input / 100);


const changeObjectProb: object = (obj: object, propName: string | number, newValue: any) => {
  return {...obj, ...{propName: newValue}};
};

const arrayMinMax = (values: number[]): [number | null, number | null] => {
  let smallest : number | null = null;
  let biggest: number | null = null;
  for (const item of values){
    smallest = smallest != null && smallest < item ? smallest : item;
    biggest = biggest != null && biggest > item ? biggest : item;
  }
  return [smallest, biggest]
}

type NodeType = object;
type NodeIDType = string | number;

interface GetAllAncestorsConfig {
  fnGetParentNode: (target: NodeType) => NodeType,
  fnGetIdFromNode: (target: NodeType) => NodeIDType |  undefined | null
}

function getAllAncestors(
  { fnGetParentNode, fnGetIdFromNode }: GetAllAncestorsConfig,
  Nodes: NodeType[],
  target: NodeType
) : NodeType[] {
  const config : GetAllAncestorsConfig = { fnGetParentNode, fnGetIdFromNode };
  const parent = GetParentId
  const GetParentId: NodeIDType | null | undefined = fnGetIdFromNode(fnGetParentNode(target));
    ? Nodes.find(x => fnGetIdFromNode(x) === GetParentId)
    : undefined;
  return parent ? [parent, ...getAllAncestors(config, Nodes, parent)] : [];
}

function getAllChildNodes(
  { fnGetParentNode, fnGetIdFromNode, fnGetDisabledFromNode },
  Nodes,
  target
) {
  const nodeEnabled = next =>
    !fnGetDisabledFromNode || fnGetDisabledFromNode(next) !== true; //  || fnGetDisabledFromNode(next) !== true;
  return Nodes.filter(node =>
    getAllAncestors({ fnGetParentNode, fnGetIdFromNode }, Nodes, node)
      // starting from each root node, don't include if node disabled or if previous parent was skipped
      .reduceRight((acc, next, i, fullarray) => {
        if (acc.length + i + 1 === fullarray.length && nodeEnabled(next))
          acc.push(next);
        return acc;
      }, [])
      // will provide truthy value to outside filter if target node is found list of parents of node
      .find(parent => fnGetIdFromNode(parent) === fnGetIdFromNode(target))
  );
}

export {
  head,
  tail,
  intToPriceFormat,
  priceFormat,
  changeObjectProb,
  arrayMinMax,
  getAllAncestors,
  getAllChildNodes
};
