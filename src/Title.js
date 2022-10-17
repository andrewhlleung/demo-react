import React, { PureComponent } from 'react'

export default class Title extends PureComponent {
  render() {

    return (
      <div>
        <h1 style={{textAlign:'center',borderBottom:'5px solid red'}} >{this.props.mainTitle}</h1>
      </div>
    )
  }
}
