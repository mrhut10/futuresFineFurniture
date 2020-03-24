type nodetype = object;
interface getParentNodesConfigType {
  fnGetParentNode: (node: nodetype) => nodetype | undefined,
  fnGetIdFromNode: (node: nodetype|undefined) => string | number | undefined
}
interface getAllChildNodesConfigType extends getParentNodesConfigType {
  fnGetDisabledFromNode?: (node: nodetype) => boolean,
}


const priceFormat = new Intl.NumberFormat('en-AU', {
  style: 'currency',
  currency: 'AUD',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
  useGrouping: true,
});

const [head, tail] = [
  <T>(a:T[]):T|undefined => a.find(() => true),
  <T>(a:T[]):T|undefined => a.reverse().find(() => true),
];

const intToPriceFormat = (input:number):String => priceFormat.format(input / 100);



const changeObjectProb = <T, K extends keyof T>(obj:T, propName:K, newValue:any):T => {
  obj[propName] = newValue;
  return obj;
};

const arrayMinMax = <T>(values:T[]):[T|undefined,T|undefined] => {
  let min:T|undefined;
  let max:T|undefined;
  values.forEach((value:T, index:number)=>{
    min = min && min > value ? value : min;
    max = max && max < value ? value : max;
  })
  return [min, max];
}

function getAllParentNodes(
  {fnGetParentNode, fnGetIdFromNode }:getParentNodesConfigType,
  Nodes:nodetype[],
  target:nodetype
):nodetype[] {
  const config:getParentNodesConfigType = { fnGetParentNode, fnGetIdFromNode };
  const GetParentId = fnGetIdFromNode(fnGetParentNode(target));
  const parent = GetParentId
    ? Nodes.find(x => fnGetIdFromNode(x) === GetParentId)
    : undefined;
  return parent ? [parent, ...getAllParentNodes(config, Nodes, parent)] : [];
}



function getAllChildNodes(
  { fnGetParentNode, fnGetIdFromNode, fnGetDisabledFromNode }:getAllChildNodesConfigType,
  Nodes:nodetype[],
  target:nodetype,
): nodetype[] {
  const nodeEnabled = (next:nodetype):boolean =>
    !fnGetDisabledFromNode || fnGetDisabledFromNode(next) !== true; //  || fnGetDisabledFromNode(next) !== true;
  let childNodes: nodetype[] = [];
  for (const node of Nodes){
    const node_parents = getAllParentNodes({fnGetParentNode, fnGetIdFromNode}, Nodes, node);
    let node_parents_reversed_filteredEnabled:nodetype[] = [];
    for (
      let i=node_parents.length;
      i > 0 && (node_parents_reversed_filteredEnabled.length + i === node_parents.length);
      i--
    ){
      const current = node_parents[i - 1];
      if (nodeEnabled(current))
        node_parents_reversed_filteredEnabled.push(current);
    }
    if (node_parents_reversed_filteredEnabled.find(parent => fnGetIdFromNode(parent) === fnGetIdFromNode(target))){
      childNodes.push(node);
    }
  }
  return childNodes;
}


export = {
  head,
  tail,
  intToPriceFormat,
  priceFormat,
  changeObjectProb,
  arrayMinMax,
  getAllParentNodes,
  getAllChildNodes
};