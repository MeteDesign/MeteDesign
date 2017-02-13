import React from 'react'
import Button from '../button'

export default class ModalButton extends React.Component {
  constructor (props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
    this.state = {
      loading: false
    }
  }
  handleClick () {
    let func = this.props.click
    let close = this.props.closeModal
    if (func) {
      let _return = func()
      if (_return && _return.then) {
        // Promise->loading
        this.setState({loading: true})
        _return.then(() => {
          close()
        })
      } else {
        close()
      }
    } else {
      close()
    }
  }
  render () {
    return (
      <Button type={this.props.type} size={this.props.size} onClick={this.handleClick} loading={this.state.loading}>
        {this.props.text || '确定'}
      </Button>
    )
  }
}
