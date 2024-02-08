import React, { Component } from 'react'
import spinner from './Ripple-1s-200px.gif'
export default class Spinner extends Component {
  render() {
    return (
      <div className='text-center'>
        <img src={spinner} alt="" />
      </div>
    )
  }
}
