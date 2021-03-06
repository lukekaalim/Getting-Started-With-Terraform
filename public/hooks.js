// @flow strict
import { h, useState, useEffect } from 'https://unpkg.com/@lukekaalim/act?module';

export const useKeydown = (onKeyPress/*: KeyboardEvent => mixed*/, deps/*: ?mixed[]*/) => {
  useEffect(() => {
    document.addEventListener('keydown', onKeyPress);
    return () => document.removeEventListener('keydown', onKeyPress)
  }, deps);
};

export const CODE_LEFT = 'ArrowLeft';
export const CODE_RIGHT = 'ArrowRight';
export const CODE_A = 'KeyA';
export const CODE_D = "KeyD";
export const CODE_UP = 'ArrowUp';
export const CODE_DOWN = 'ArrowDown';
export const CODE_W = 'KeyW';
export const CODE_S = "KeyS";

const minmax = (min, max, v) => Math.min(max, Math.max(v, min));

export const useSlideIndex = (
  maxIndex/*: number*/,
  initialValue/*: number*/
)/*: [number, (number | (number => number)) => void]*/ => {
  const initialIndex = localStorage.getItem('slide') === null ? initialValue : parseInt(localStorage.getItem('slide'));
  const [slideIndex, setSlideIndex] = useState/*:: <number>*/(minmax(0, maxIndex, initialIndex));

  const setRangedSlideIndex = (newValue) => {
    if (typeof newValue === 'function')
      setSlideIndex(i => {
        const newIndex = minmax(0, maxIndex, newValue(i))
        localStorage.setItem('slide', newIndex.toString());
        return newIndex;
      });
    else {
      const newIndex = minmax(0, maxIndex, newValue)
      localStorage.setItem('slide', newIndex.toString());
      setSlideIndex(newIndex);
    }
  };

  useKeydown(event => {
    if (document.activeElement === document.body)
      switch (event.code) {
        case CODE_LEFT:
        case CODE_A:
          return setRangedSlideIndex(i => i - 1)
        case CODE_RIGHT:
        case CODE_D:
          return setRangedSlideIndex(i => i + 1)
      }
  }, []);

  return [slideIndex, setRangedSlideIndex];
};

export const useSlideState = (
  maxIndex/*: number*/,
)/*: number*/ => {
  const [slideState, setSlideState] = useState/*:: <number>*/(0);
  useKeydown(event => {
    if (document.activeElement === document.body)
      switch (event.code) {
        case CODE_UP:
        case CODE_W:
          return setSlideState(i => minmax(0, maxIndex, i - 1))
        case CODE_DOWN:
        case CODE_S:
          return setSlideState(i => minmax(0, maxIndex, i + 1))
      }
  }, []);

  return slideState;
};