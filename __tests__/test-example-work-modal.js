import React from 'react'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import ExampleWorkModal  from '../js/example-work-modal'

Enzyme.configure({ adapter: new Adapter() })

const myExample = {
  title: 'Work Example1',
  href: 'https://example.com',
  desc: 'big time stuff!',
  image: {
    desc: 'example screenshot of a project involving code',
    src: 'images/example1.png',
    comment: ''
  }
}

describe('ExampleWorkModal component', () => {
  const component = shallow(<ExampleWorkModal example={myExample} open={false}/>)
  const openComponent = shallow(<ExampleWorkModal example={myExample} open={true}/>)
  const anchors = component.find('a')

  it('Should contain single "a" element', () => {
    expect(anchors.length).toEqual(1)
  })

  it('Should link to our project', () => {
    expect(anchors.prop('href')).toEqual(myExample.href)
  })

  it('Should have modal class set correctly', () => {
    expect(component.find('.background--skyBlue').hasClass('modal--closed')).toBe(true)
    expect(openComponent.find('.background--skyBlue').hasClass('modal--open')).toBe(true)
  })
})

// describe('ExampleWorkBuble component', () => {
//   const component = shallow(<ExampleWorkBubble example={myWork[1]}/>)
//   const images = component.find('img')
//
//   it('Should contain single "img" element', () => {
//     expect(images.length).toEqual(1)
//   })
//
//   it('Should have "img" src set correctly', () => {
//     expect(images.prop('src')).toEqual(myWork[1].image.src)
//   })
// })
