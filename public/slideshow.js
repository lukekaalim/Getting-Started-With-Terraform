// @flow strict
/*:: import type { Component } from '@lukekaalim/act'; */
import { h, useState, useEffect } from 'https://unpkg.com/@lukekaalim/act?module';

/*::
export type Slide = {
  title: string,
  component: Component<{| active: boolean, style: { +[string]: string } |}>,
};

export type SlideshowProps = {|
  slides: Slide[],
  currentIndex: number,
|};
*/

const getSlideStyle = (currentIndex, slideIndex) => {
  const slideOffset = slideIndex - currentIndex;
  return {
    position: 'absolute',
    height: '80vh',
    width: '80vw',
    margin: '10vh 10vw 20vh 10vw',
    padding: '25px',
    border: '8px dashed #5c4ee5',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'transform 0.5s, opacity 0.5s',
    transform: `translate3d(${(slideOffset * 85)}vw, 0px, 0px)`,
    boxSizing: 'border-box'
  };
}

const articleStyle = {
  height: '100%',
  width: '100%',
  overflow: 'hidden',
  position: 'relative',
};

export const SlideShow/*: Component<SlideshowProps>*/ = ({ slides, currentIndex }) => {
  return h('article', { style: articleStyle }, [
    ...slides.map((slide, slideIndex) =>
      h(slide.component, { active: currentIndex === slideIndex, style: getSlideStyle(currentIndex, slideIndex) }))
  ])
};

export const ContentSlide/*: Component<{ style: { +[string]: string } }>*/ = ({ style, children }) => {
  const sectionStyle = {
    ...style,
    justifyContent: 'start',
    alignItems: 'start',
    borderColor: 'black',
    borderStyle: 'solid',
    backgroundColor: 'white',
    padding: '75px',
    boxShadow: 'rgba(0, 0, 0, 0.22) 0px 0px 25px'
  };
  return h('section', { style: sectionStyle }, children)
};