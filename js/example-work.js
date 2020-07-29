import React from 'react'

class ExampleWork extends React.Component {
  render () {
    return (
      <section className='section section--alignCentered section--description'>

        {this.props.work.map((example, index) => {
          return (
            <ExampleWorkBubble example={example} key={index} />
          )
        })}

      </section>
    )
  }
}

class ExampleWorkBubble extends React.Component {
  render () {
    const example = this.props.example

    return (
      <div className='section__exampleWrapper'>
        <div className='section__example'>
          <img
            alt={example.image.desc}
            className='section__exampleImage'
            src={example.image.src}
          />

          {example.image.comment}

          <dl className='color--cloud'>
            <dt className='section__exampleTitle section__text--centered'>
              {example.title}
            </dt>
            <dd />
          </dl>
        </div>
      </div>
    )
  }
}
export default ExampleWork
export { ExampleWorkBubble }
