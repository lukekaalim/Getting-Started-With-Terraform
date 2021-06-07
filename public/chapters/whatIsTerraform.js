// @flow strict
import { h } from 'https://unpkg.com/@lukekaalim/act?module';
/*:: import type { SlideComponent } from '../slideshow.js'; */
import { ContentSlide } from '../slideshow.js';

const WhatIsTerraform = ({ style }) => {
  return h(ContentSlide, { style }, [
    h('h2', { style: { margin: 0 }}, 'What Is Terraform?'),
    h('p', {},
      `Terraform is an Open Source command line program that deploys configurations 
      of cloud resources. These configurations are based off ".tf" files ina  directory.`),
    h('ul', {}, [
      h('li', {}, 'Create, Modify, and Destroy Cloud Infrastructure'),
      h('li', {}, 'Using Declarative files as source of truth'),
      h('li', {}, 'Project containing ".tf" files and a "terraform" executable'),
    ])
  ]);
};
const codeStyle = {
  backgroundColor: 'black',
  color: 'white',
  fontFamily: 'monospace',
  padding: '24px',
  width: '100%',
  boxSizing: 'border-box',
  overflow: 'scroll',
  fontSize: '24px'
};
const WhatIsItReally = ({ style }) => {
  return h(ContentSlide, { style }, [
    h('h2', { style: { margin: 0 }}, 'What Is Terraform (Practically)?'),
    h('pre', { style: codeStyle }, `~/my-project$ ls\n\n\tmain.tf variables.tf output.tf`),
    h('pre', { style: codeStyle }, `~/my-project$ terraform apply`),
  ]);
};
const WhatIsATerraformFile = ({ style }) => {
  return h(ContentSlide, { style }, [
    h('h2', { style: { margin: 0 }}, 'What is a Configuration?'),
    h('pre', { style: codeStyle }, `
resource "aws_elastic_beanstalk_application" "api" {
  name        = "sesame-api"
  description = "The API behind Astral Atlas's single sign on"

  appversion_lifecycle {
    service_role          = data.aws_iam_role.beanstalk_service.arn
    max_count             = 128
    delete_source_from_s3 = true
  }
}
    `),
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

export const slides/*: SlideComponent[]*/ = [
  WhatIsTerraform,
  WhatIsItReally,
  WhatIsATerraformFile,
  WhatIsCloud,
];