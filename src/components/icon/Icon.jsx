import React from 'react'
import { Component, PropTypes } from '../../../libs'
import '../theme/icon.css'

export default class Icon extends Component {
  render () {
    return <i style={this.style()} className={this.className(`el-icon-${this.props.name}`)} />
  }
}

Icon.propTypes = {
  name: PropTypes.string
}
