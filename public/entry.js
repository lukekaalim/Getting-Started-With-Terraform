// @flow strict
import { render } from 'https://unpkg.com/@lukekaalim/act-web?module';
import { h } from 'https://unpkg.com/@lukekaalim/act?module';
import { useSlideIndex } from './hooks.js';
import { SlideShow } from './slideshow.js';
import { slides as whatIsTerraformSlides } from './chapters/whatIsTerraform.js';
import { ScrolledSVG, Vector2 } from './animation.js';

const TitleSlide = ({ active, style }) => {
  return [
    h('section', { style }, [
      h('h1', { style: { color: 'black', textAlign: 'center', margin: 0 } }, 'Getting Started With Terraform'),
      h('p', { style: { margin: 0 } }, 'by Luke Kaalim'),
      h('img', { src: './terraform-vertical-color.png', height: '300', width: '300' }),
      h('a', { href: 'https://github.com/lukekaalim/Getting-Started-With-Terraform' },
        `https://github.com/lukekaalim/Getting-Started-With-Terraform`),
    ]),
  ];
};
const ContentsCheckpointSlide = ({ style }) => {
  return [
    h('section', { style: { ...style, justifyContent: 'start' } }, [
      h('h2', {}, 'Getting Started With Terraform'),
      h('ol', {}, [
        h('li', { style: { margin: '12px', fontWeight: 600 } }, 'What IS Terraform?'),
        h('li', { style: { margin: '12px' } }, 'How does the 9Now Web team use Terraform?'),
        h('li', { style: { margin: '12px' } }, 'How can I use Terraform?'),
        h('li', { style: { margin: '12px' } }, 'Mindfulness with Terraform?'),
      ]),
    ])
  ]
};

const slides = [
  TitleSlide,
  ContentsCheckpointSlide,
  ...whatIsTerraformSlides,
];

const appStyle = `
@import url('https://fonts.googleapis.com/css2?family=Crimson+Text:wght@400;700&family=Open+Sans:wght@300;400;700&display=swap');

body {
  padding: 0;
  margin: 0;
  font-family: 'Open Sans', 'Crimson Text', sans-serif;
  position: absolute;
  width: 100%;
  height: 100%;

  font-size: 38px;
}

h1 {
  font-size: 1.8em;
}
`;

const getMainStyle = (currentIndex) => {
  return {
    position: 'absolute',
    width: '100%',
    height: '100%',
    transition: 'background-position 0.5s',
    backgroundPosition: `${-currentIndex * 100}px, 0`,
    backgroundSize: `70%`,
    backgroundImage: 'url(./pattern-paper-texture.jpg)',
  };
};

const Background = () => {

};

const App = () => {
  const [currentIndex] = useSlideIndex(slides.length - 1, 0);

  return [
    h('style', {}, appStyle),
    h('main', { style: getMainStyle(currentIndex) }, h(SlideShow, { slides, currentIndex }))
  ];
};

const { body } = document;
if (body)
  render(h(App), body);