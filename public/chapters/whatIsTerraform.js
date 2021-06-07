// @flow strict
import { h } from 'https://unpkg.com/@lukekaalim/act?module';
import { ScrolledSVG, Vector2 } from '../animation.js';
import { TreeDiagram } from '../diagram.js';
import { useSlideState } from '../hooks.js';
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
  const state = useSlideState(3);
  const andManyOthers = state > 2 ? [{ content: 'Any many others', leaves: [] }, { content: 'Any many others', leaves: [] }] : []
  const tree = {
    content: { color: '#b3c6ff', text: 'Application Source Code'},
    leaves: state > 0 ? [
      {
        content: { color: 'Orange', text: 'EC2 Server' },
        leaves: state > 1 ? [
          { content: { color: 'Red', text: 'RDS Database' }, leaves: andManyOthers },
          { content: { color: 'Green', text: 'Route53 CNAME' }, leaves: andManyOthers },
          { content: { color: 'Yellow', text: 'Elasticache Cluster' }, leaves: andManyOthers },
        ] : []
      },
    ] : [],
  };
  const targetSize = new Vector2((state + 1) * 256, (state + 1) * 256);
  const targetPosition = targetSize.multiply(0.5).negate();
  return h(ContentSlide, { style }, [
    h('h2', { style: { margin: 0 }}, 'What Are Cloud Resources?'),
    h(ScrolledSVG, { xmlns: "http://www.w3.org/2000/svg", targetPosition, targetSize, transitionDurationMs: 100, width: '100%' }, [
      h(TreeDiagram, { tree, position: { x: 0, y: 0 }, offset: { x: 350, y: 100 } })
    ]),
  ]);
};

const comparisonTableStyle = {
  borderCollapse: 'collapse',
  border: '2px solid black',
  overflow: 'scroll'
}

export const slides/*: SlideComponent[]*/ = [
  WhatIsTerraform,
  WhatIsItReally,
  WhatIsATerraformFile,
  WhatIsCloud,
  ({ style }) => h(ContentSlide, { style }, [
    h('p', {}, 'Often much more complicated and interconnected.'),
  ]),
  ({ style }) => {
    const state = useSlideState(4);
    return h(ContentSlide, { style }, [
      h('h2', {}, 'Traditional approaches:'),
      h('ol', {}, [
        state > 0 && h('li', {}, 'Assemble resources using GUI and Console'),
        state > 1 && h('li', {}, 'Automatically create resources using "Ad-hoc" scripts'),
        state > 2 && h('li', {}, 'Abstract over ad-hoc scripts to create local tooling'),
      ]),
    ])
  },
  ({ style }) => {
    return h(ContentSlide, { style }, [
      h('h2', {}, 'Declarative Approach'),
      h('p', {}, `Use a third-party tool to orchestrate our
      infrastructure from a fixed set of configuration that understands
      the current infrastructure's state.`),
    ])
  },
  ({ style }) => {
    return h(ContentSlide, { style }, [
      h('h2', {}, 'React-Like'),
      h('p', {}, `Define a function that, based on specified inputs,
      returns a description of how the output "should be", and then a
      "renderer"/"orchestrator" figures out what needs updating
      and what needs creating or deleting.`),
    ])
  },
  ({ style }) => {
    const state = useSlideState(7);
    return h(ContentSlide, { style }, [
      h('h2', {}, 'Infrastructure Tooling'),
      h('ul', {}, [
        state > 0 && h('li', {}, 'Terraform'),
        state > 1 && h('li', {}, 'Cloudformation'),
        state > 1 && h('li', {}, 'CDK'),
        state > 2 && h('li', {}, 'Serverless'),
        state > 3 && h('li', {}, 'Chef'),
        state > 4 && h('li', {}, 'Ansible'),
        state > 5 && h('li', {}, 'Elastic Beanstalk?'),
      ]),
    ])
  },
  ({ style }) => {
    const state = useSlideState(3);
    return h(ContentSlide, { style }, [
      h('h2', {}, 'Disqualifiers'),
      h('ul', { style: { overflow: 'scroll' }}, [
        state > 0 && h('li', {}, ['CDK',
          h('p', {}, `The "CDK" set of tooling are just libraries to
          automatically generate cloudformation templates.`)]),
        state > 1 && h('li', {}, ['Serverless',
          h('p', {}, `The "Serverless" tool is a convenient
          abstraction over cloudformation templates (for deploying to AWS).`)]),
        state > 2 && h('li', {}, ['Elastic Beanstalk',
          h('p', {}, `Elastic Beanstalk is a automated tool that internally generates
          a cloudformation stack to manage it deployment.`)]),
      ]),
    ])
  },
  ({ style }) => {
    const state = useSlideState(6);
    return h(ContentSlide, { style }, [
      h('style', {}, `
  table, td, th {
    border-collapse: collapse;
    border: 2px solid black;
    padding: 15px;
  }
      `),
      h('h2', {}, 'Infrastructure Tooling'),
      h('div', { style: { position: 'relative', overflow: 'scroll', width: '100%' }}, [
        h('table', { style: comparisonTableStyle }, [
          h('thead', {}, [
            h('tr', {}, [
              h('th', {}, ''),
              h('th', {}, 'Terraform'),
              h('th', {}, 'Cloudformation'),
            ]),
          ]),
          h('tbody', {}, [
            state > 0 && h('tr', {}, [
              h('td', {}, 'Configuration Language'),
              h('td', {}, 'HCL/JSON'),
              h('td', {}, 'YAML/JSON'),
            ]),
            state > 1 && h('tr', {}, [
              h('td', {}, 'Application Type'),
              h('td', {}, 'Open Source Golang CLI'),
              h('td', {}, 'AWS Proprietary API'),
            ]),
            state > 2 && h('tr', {}, [
              h('td', {}, 'Runtime'),
              h('td', {}, 'Local/Cloud(custom)/Cloud(enterprise)'),
              h('td', {}, 'Cloud(paid)'),
            ]),
            state > 3 && h('tr', {}, [
              h('td', {}, 'Resources'),
              h('td', {}, 'Official providers from "big cloud", ecosystem for providers.'),
              h('td', {}, 'AWS only'),
            ]),
            state > 4 && h('tr', {}, [
              h('td', {}, 'Escape Hatch'),
              h('td', {}, 'Arbitrary programs'),
              h('td', {}, 'None'),
            ]),
          ])
        ]),
      ]),
    ])
  },
];