import React from 'react'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import ExampleWork, { ExampleWorkBubble } from '../js/example-work'


Enzyme.configure({ adapter: new Adapter() })

const myWork = [
  {
    title: 'Work Example1',
    image: {
      desc: 'example screenshot of a project involving code',
      src: 'images/example1.png',
      comment: ''
    }
  },
  {
    title: 'Work Example2',
    image: {
      desc: 'example screenshot of a project involving chemistry',
      src: 'images/example2.png',
      comment: `“Chemistry” by Surian Soosay is licensed under CC BY 2.0
           https://www.flickr.com/photos/ssoosay/4097410999`
    }
  }
]

describe('ExampleWork component', () => {
  const component = shallow(<ExampleWork work={myWork}/>)

  it('Should be a "span" element', () => {
    expect(component.type()).toEqual('span')
  })

  it('Should contain as many children as work examples', () => {
    expect(component.find('ExampleWorkBubble').length).toEqual(myWork.length)
  })

  it('Should allow the modal to open and close', () => {
    component.instance().openModal()
    expect(component.instance().state.modalOpen).toBe(true)
    component.instance().closeModal()
    expect(component.instance().state.modalOpen).toBe(false)
  })
})

describe('ExampleWorkBubble component', () => {
  const mockOpenModalFn = jest.fn()
  const component = shallow(<ExampleWorkBubble example={myWork[1]}
    openModal={mockOpenModalFn}/>)
  const images = component.find('img')

  it('Should contain single "img" element', () => {
    expect(images.length).toEqual(1)
  })

  it('Should have "img" src set correctly', () => {
    component.find(".section__exampleWrapper").simulate('click')
    expect(mockOpenModalFn).toHaveBeenCalled()
  })

  it('Should call the openModal handler when clicked', () => {
    expect(images.prop('src')).toEqual(myWork[1].image.src)
  })
})
