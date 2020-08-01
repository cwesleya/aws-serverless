import React from 'react'
import ReactDOM from 'react-dom'
import ExampleWork from './example-work'

const myWork = [
  {
    title: 'Work Example1',
    href: 'https://example.com',
    desc: 'big time stuff!',
    image: {
      desc: 'example screenshot of a project involving code',
      src: 'images/example1.png',
      comment: ''
    }
  },
  {
    title: 'Work Example2',
    href: 'https://dailywire.com',
    desc: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    image: {
      desc: 'example screenshot of a project involving chemistry',
      src: 'images/example2.png',
      comment: `“Chemistry” by Surian Soosay is licensed under CC BY 2.0
           https://www.flickr.com/photos/ssoosay/4097410999`
    }
  },
  {
    title: 'Work Example3',
    href: 'https://wesleychambers.com',
    desc: 'great site, Ed!',
    image: {
      desc: 'example screenshot of a project involving cats',
      src: 'images/example3.png',
      comment: 'undefined'
    }
  }
]

ReactDOM.render(<ExampleWork work={myWork} />, document.getElementById('example-work'))
