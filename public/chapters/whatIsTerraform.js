// @flow strict
import { h } from 'https://unpkg.com/@lukekaalim/act?module';
/*:: import type { Slide } from '../slideshow.js'; */
import { ContentSlide } from '../slideshow.js';

const WhatIsTerraform = ({ style }) => {
  return h(ContentSlide, { style }, [
    h('h2', { style: { margin: 0 }}, 'What Is Terraform?'),
    h('p', {},
      `Terraform is an Open Source command line program that deploys configurations 
      of cloud resources. These configurations are based off local ".tf" files.`),
    h('ul', {}, [
      h('li', {}, 'Create, Modify, and Destroy Cloud Infrastructure'),
      h('li', {}, 'Using Declarative files as source of truth'),
      h('li', {}, 'Project containing ".tf" files and a "terraform" executable'),
    ])
  ]);
};
const WhatIsCloud = ({ style }) => {
  return h(ContentSlide, { style }, [
    h('h2', { style: { margin: 0 }}, 'What Is "Cloud Infrastructure/Resources"?'),
    h('svg', { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 100 100" }, [
      h('rect', { x: '0px', y: '0px', width: '100px', height: '100px' }),
      h('text', {}, 'Hello!')
    ]),
  ]);
};

const whatIsTerraformSlide/*: Slide*/ = {
  title: '',
  component: WhatIsTerraform,
};
const whatIsCloudSlide/*: Slide*/ = {
  title: '',
  component: WhatIsCloud,
};

export const slides = [
  whatIsTerraformSlide,
  whatIsCloudSlide,
];