// @flow strict
/*:: import type { Props, ElementNode, Component } from 'https://unpkg.com/@lukekaalim/act?module'; */
import { h, useEffect, useState } from 'https://unpkg.com/@lukekaalim/act?module';


export class Vector2 {
  /*:: x: number */
  /*:: y: number */
  
  constructor(x/*: number*/, y/*: number*/) {
    this.x = x;
    this.y = y;
  }

  distanceFrom(target/*: Vector2*/)/*: number*/ {
    const a = this.x - target.x;
    const b = this.y - target.y;
    return Math.sqrt((a ^ 2) + (b ^ 2));
  }

  getLength()/*: number*/ {
    return Math.abs(this.distanceFrom(Vector2Zero));
  }

  add(target/*: Vector2*/)/*: Vector2*/ {
    return new Vector2(this.x + target.x, this.y + target.y);
  }

  negate()/*: Vector2*/ {
    return new Vector2(-this.x, -this.y);
  }

  multiply(scalar/*: number*/)/*: Vector2*/ {
    return new Vector2(scalar * this.x, scalar * this.y);
  }

  getUnit()/*: Vector2*/ {
    const length = this.getLength();
    return this.multiply(1/length);
  }

  equal(other/*: Vector2*/)/*: boolean*/ {
    return this.x === other.x && this.y === other.y;
  }

  static lerp(start/*: Vector2*/, end/*:Vector2*/, t/*: number*/)/*: Vector2*/ {
    const x = (1 - t) * start.x + t * end.x;
    const y = (1 - t) * start.y + t * end.y;
    return new Vector2(x, y);
  } 
}
export const Vector2Zero/*: Vector2*/ = new Vector2(0, 0);

export const useAnimationFrame = (
  onAnimationFrame/*: ?(DOMHighResTimeStamp => mixed)*/,
  deps/*:: :?(mixed[])*/ = []
) => {
  useEffect(() => {
    if (!onAnimationFrame)
      return;
    const animationFrameCallback = (timestamp) => {
      frameId = requestAnimationFrame(animationFrameCallback);
      onAnimationFrame(timestamp);
    }
    let frameId = requestAnimationFrame(animationFrameCallback);
    return () => {
      cancelAnimationFrame(frameId);
    };
  }, deps);
};

export const useDOMRef = (
  elementType/*: string*/,
  props/*: Props*/ = {},
  children/*: ElementNode*/ = []
)/*: [?HTMLElement, ElementNode]*/ => {
  const [node, setDomNode] = useState/*:: <?HTMLElement>*/(null);

  return [node, h(elementType, { ...props, ref: setDomNode }, children)];
};

const setSVGPosition = (svg/*: SVGSVGElement*/, position/*: Vector2*/, size/*: Vector2*/) => {
  if (!svg.viewBox.baseVal)
    return;
  
  svg.viewBox.baseVal.x = position.x;
  svg.viewBox.baseVal.y = position.y;
  svg.viewBox.baseVal.width = size.x;
  svg.viewBox.baseVal.height = size.y;
}

export const ScrolledSVG/*: Component<{
  ...Props,
  targetPosition: Vector2,
  targetSize: Vector2,
  transitionDurationMs: number
}>*/ = ({
  children,
  targetPosition,
  targetSize,
  transitionDurationMs = 1000,
  ...props
}) => {
  const [startPosition, setStartPosition] = useState(targetPosition);
  const [startSize, setStartSize] = useState(targetSize);
  const [startTime, setStartTime] = useState(null);
  const [svgNode, svgElement] = useDOMRef('svg', { ...props, xmlns: "http://www.w3.org/2000/svg", version: "1.1", }, children);
  const lerpToTarget = (nowTime) => {
    if (!(svgNode instanceof SVGSVGElement))
      return;
    if (!startTime)
      return setSVGPosition(svgNode, targetPosition, targetSize);
    const t = Math.max(0, Math.min(1, (nowTime - startTime) / transitionDurationMs));
    const currentPosition = Vector2.lerp(startPosition, targetPosition, t);
    const currentSize = Vector2.lerp(startSize, targetSize, t);
    
    setSVGPosition(svgNode, currentPosition, currentSize);
  };
  useEffect(() => {
    if (svgNode)
      svgNode.setAttribute('viewBox', [targetPosition.x, targetPosition.y, targetSize.x, targetSize.y].join(' '));
  }, [svgNode]);
  useEffect(() => {
    if (svgNode instanceof SVGSVGElement && svgNode.viewBox.baseVal) {
      const { x, y, width, height } =  svgNode.viewBox.baseVal;
      setStartTime(performance.now());
      setStartPosition(new Vector2(x, y));
      setStartSize(new Vector2(width, height));
    }
  }, [svgNode, targetPosition.x, targetPosition.y, targetSize.x, targetSize.y]);
  
  useAnimationFrame((svgNode && startTime) ? lerpToTarget : null, [svgNode, startPosition, startTime]);

  return svgElement;
};

const createAnimatedComponent = () => () => {

};

/*
h(ScrolledSVG, {
  targetPosition: targets[currentIndex].multiply(0.5).negate(),
  targetSize: targets[currentIndex],
  transitionDurationMs: 500,
  width: '500px',
  height: '500px',
}, [
  h('rect', { x: '-5px', y: '-5px', width: '10px', height: '10px' })
]);
*/