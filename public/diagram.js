// @flow strict
/*:: import type { Component, Context, ElementNode} from 'https://unpkg.com/@lukekaalim/act?module'; */
import { h, useEffect, useState } from 'https://unpkg.com/@lukekaalim/act?module';

/*::
export type Vector2 = {| x: number, y: number |};
*/
/*::
export type Box = {|
  position: Vector2,
  size: Vector2
|};
*/

/*::
export type UseDrag = (ref: ?HTMLElement) => [Vector2, (Vector2 | (Vector2 => Vector2)) => void];
*/

const useDrag/*: UseDrag*/ = (ref) => {
  const [drag, setDrag] = useState/*:: <Vector2>*/({ x: 0, y: 0 });

  useEffect(() => {
    if (!ref)
      return;
    const onMouseDown = (e/*: PointerEvent*/) => {
      ref.addEventListener('pointermove', onPointerMove);
      if (e.currentTarget instanceof Element)
        e.currentTarget.setPointerCapture(e.pointerId)
    };
    const onMouseUp = (e/*: PointerEvent*/) => {
      ref.removeEventListener('pointermove', onPointerMove)
      if (e.currentTarget instanceof Element)
        e.currentTarget.releasePointerCapture(e.pointerId)
    };
    const onPointerMove = (e/*: MouseEvent*/) => {
      e.preventDefault();
      const updateDrag = p => ({ x: p.x + e.movementX, y: p.y + e.movementY });
      setDrag(updateDrag)
    };
    ref.addEventListener('pointerdown', onMouseDown);
    ref.addEventListener('pointerup', onMouseUp);
    return () => {
      ref.removeEventListener('pointerdown', onMouseDown);
      ref.removeEventListener('pointerup', onMouseUp);
      ref.removeEventListener('pointermove', onPointerMove);
    };
  }, [ref])
  
  return [drag, setDrag];
};

export const DiagramRoot/*: Component<{| size: Vector2 |}>*/ = ({ size, children }) => {
  const [svg, setSVG] = useState/*:: <?HTMLElement>*/(null);

  const [position] = useDrag(svg);
  const svgProps = {
    width: size.x,
    height: size.y,
    ref: setSVG,
    viewBox: [-position.x, -position.y, size.x, size.y].join(' '),
    style: { userSelect: 'none', flexGrow: 1 }
  };
  
  return h('svg', svgProps, children);
};

/*::
export type DiagramVertexProps = {|
  position: Vector2,
  label: string,
  charSize?: Vector2,
  fontFamily?: string,
  textColor?: string,
  backgroundColor?: string,
  borderColor?: string
|};
*/

export const DiagramVertex/*: Component<DiagramVertexProps>*/ = ({
  position,
  label,
  textColor = 'black',
  backgroundColor = 'white',
  borderColor = 'black',
  charSize = { x: 16, y: 26 },
  fontFamily = 'monospace'
}) => {
  const charWidth = charSize.x;
  const charHeight = charSize.y;

  const rectHeight = charHeight + 20;
  const rectWidth = (label.length * charWidth) + 20;

  const rectProps = {
    width: rectWidth + 'px',
    height: rectHeight + 'px',
    x: position.x - (rectWidth/2) + 'px',
    y: position.y - (rectHeight/2) + 'px',
    rx: 8,
    stroke: borderColor,
    fill: backgroundColor,
    'stroke-width': '2px'
  };
  const textProps = {
    'font-size': `${charHeight}px`,
    x: `${position.x - (rectWidth/2) + 10}px`,
    y: `${position.y + (charHeight/4)}px`,
    textLength: `${rectWidth - 20}px`,
    fill: textColor,
    'font-family': fontFamily,
    lengthAdjust: "spacingAndGlyphs"
  };
  return [
    h('rect', rectProps),
    h('text', textProps, label),
    // h('svg:circle', { cx: position.x, cy: position.y, fill: 'red', r: 5 }), // just for marking the origin
  ];
};

/*::
export type DiagramEdgeProps = {|
  start: Vector2,
  end: Vector2
|};
*/

const createPoint = (vector) => [vector.x, vector.y].join(',');

export const DiagramEdge/*: Component<DiagramEdgeProps>*/ = ({ start, end }) => {
  const polyLineProps = {
    stroke: 'black',
    'stroke-width': '2px',
    points: [createPoint(start), createPoint(end)].join(' '),
  };
  return [
    h('polyline', polyLineProps)
  ]
};


const sum = (a, b) => a + b;

const getTreeWeight = tree =>
  tree.leaves.length ? tree.leaves.map(getTreeWeight).reduce(sum) : 1;

/*::
export type TreeNode = {|
  content: string | { text: string, color: string },
  leaves: TreeNode[],
|};

export type TreeDiagramProps = {|
  position: Vector2,
  tree: TreeNode,
  offset?: Vector2,
|}
*/

export const TreeDiagram/*: Component<TreeDiagramProps>*/ = ({ tree, position, offset = { x: 100, y: 100 } }) => {
  const totalLeaves = getTreeWeight(tree)
  const totalWidth = totalLeaves * offset.x;
  
  return [
    tree.leaves.map((leaf, index) => {
      const left = tree.leaves.slice(0, index);
      const width = getTreeWeight(leaf) * offset.x;
      const leafPosition = {
        y: position.y - offset.y,
        x: position.x - (totalWidth / 2) + (width / 2) + (left.map(getTreeWeight).reduce(sum, 0) * offset.x)
      };
      return [
        h(DiagramEdge, { start: position, end: leafPosition }),
        h(TreeDiagram, { tree: leaf, position: leafPosition, offset }),
      ];
    }),
    typeof tree.content === 'string' ?
      h(DiagramVertex, { position, label: tree.content }) :
      h(DiagramVertex, { position, label: tree.content.text, backgroundColor: tree.content.color })
  ];
};

/*::
export type CircleDiagramProps = {|
  
|};
*/

export const CircleDiagram/*: Component<CircleDiagramProps>*/ = () => {

};