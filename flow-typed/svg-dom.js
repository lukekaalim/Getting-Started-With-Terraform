// @flow strict

/*::
declare class SVGElement extends Element {

}

declare class SVGGraphicsElement extends SVGElement {
  
}

declare class SVGGeometryElement extends SVGGraphicsElement {
  
}


declare class SVGAnimatedLength {
  +baseVal: SVGLength,
  +animVal: SVGLength,
}

declare class SVGLength {
  +unitType: SVGLengthUnit;

  value: number;
  valueInSpecifiedUnits: number;
  valueAsString: string;

  newValueSpecifiedUnits(unitType: SVGLengthUnit, valueInSpecifiedUnits: number): void;

  static SVG_LENGTHTYPE_UNKNOWN: SVG_LENGTHTYPE_UNKNOWN;
  static SVG_LENGTHTYPE_PERCENTAGE: SVG_LENGTHTYPE_PERCENTAGE;
  static SVG_LENGTHTYPE_EMS: SVG_LENGTHTYPE_EMS;
  static SVG_LENGTHTYPE_EXS: SVG_LENGTHTYPE_EXS;
  static SVG_LENGTHTYPE_NUMBER: SVG_LENGTHTYPE_NUMBER;
  static SVG_LENGTHTYPE_PX: SVG_LENGTHTYPE_PX;
  static SVG_LENGTHTYPE_CM: SVG_LENGTHTYPE_CM;
  static SVG_LENGTHTYPE_MM: SVG_LENGTHTYPE_MM;
  static SVG_LENGTHTYPE_IN: SVG_LENGTHTYPE_IN;
  static SVG_LENGTHTYPE_PT: SVG_LENGTHTYPE_PT;
  static SVG_LENGTHTYPE_PC: SVG_LENGTHTYPE_PC;
}

declare class SVGRect {
  x: number,
  y: number,
  width: number,
  height: number,  
}

declare class SVGAnimatedRect {
  +baseVal: ?SVGRect,
  +animVal: ?SVGRect,
}

type SVG_LENGTHTYPE_UNKNOWN = 0;
type SVG_LENGTHTYPE_NUMBER = 1;
type SVG_LENGTHTYPE_PERCENTAGE = 2;
type SVG_LENGTHTYPE_EMS = 3;
type SVG_LENGTHTYPE_EXS = 4;
type SVG_LENGTHTYPE_PX = 5;
type SVG_LENGTHTYPE_CM = 6;
type SVG_LENGTHTYPE_MM = 7;
type SVG_LENGTHTYPE_IN = 8;
type SVG_LENGTHTYPE_PT = 9;
type SVG_LENGTHTYPE_PC = 10;

declare type SVGLengthUnit =
  | SVG_LENGTHTYPE_UNKNOWN
  | SVG_LENGTHTYPE_NUMBER
  | SVG_LENGTHTYPE_PERCENTAGE
  | SVG_LENGTHTYPE_EMS
  | SVG_LENGTHTYPE_EXS
  | SVG_LENGTHTYPE_PX
  | SVG_LENGTHTYPE_CM
  | SVG_LENGTHTYPE_MM
  | SVG_LENGTHTYPE_IN
  | SVG_LENGTHTYPE_PT
  | SVG_LENGTHTYPE_PC


declare class SVGSVGElement extends SVGElement {
  createSVGLength(): SVGLength,
  +x: SVGAnimatedLength,
  +y: SVGAnimatedLength,
  +width: SVGAnimatedLength,
  +height: SVGAnimatedLength,
  +viewBox: SVGAnimatedRect,
}

declare class SVGRectElement extends SVGGeometryElement {
  +x: SVGAnimatedLength,
  +y: SVGAnimatedLength,
  +width: SVGAnimatedLength,
  +height: SVGAnimatedLength,
}
*/