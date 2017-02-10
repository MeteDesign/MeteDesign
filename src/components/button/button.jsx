import React from 'react'
import classNames from 'classnames'
// import { findDOMNode } from 'react-dom'
import Icon from '../icon'
import './style/'

const rxTwoCNChar = /^[\u4e00-\u9fa5]{2}$/
const isTwoCNChar = rxTwoCNChar.test.bind(rxTwoCNChar)

function isString (str) {
  return typeof str === 'string'
}
// Insert one space between two chinese characters automatically.
// 在两个中文字符中自动插入一个空格
function insertSpace (child) {
  if (isString(child.type) && isTwoCNChar(child.props.children)) {
    return React.cloneElement(child, {},
      child.props.children.split('').join(' '))
  }
  if (isString(child)) {
    if (isTwoCNChar(child)) {
      child = child.split('').join(' ')
    }
    return <span>{child}</span>
  }
  return child
}

export default class Button extends React.Component {
  constructor () {
    super()
    this.handleClick = this.handleClick.bind(this)
  }
  handleClick (e) {
    const onClick = this.props.onClick
    if (onClick) {
      onClick(e)
    }
  }

  render () {
    const {type, size = '', shape, className, htmlType, children, icon, loading, prefixCls, ...others} = this.props

    // 按钮大小
    const sizeCls = ({
      large: 'lg',
      small: 'sm'
    })[size] || ''
    // 样式类
    const classes = classNames(prefixCls, {
      [`${prefixCls}-${type}`]: type,
      [`${prefixCls}-${shape}`]: shape,
      [`${prefixCls}-${sizeCls}`]: sizeCls,
      [`${prefixCls}-icon-only`]: !children && icon,
      [`${prefixCls}-loading`]: loading
    }, className)
    // 是否启用加载动画
    let isLoading = loading ? 'loading' : null
    // 按钮内容（包括文本等）
    const kids = React.Children.map(children, insertSpace)
    return (
      <button
        {...others}
        type={htmlType || 'button'}
        className={classes}
        onClick={this.handleClick}
        >
        {
          isLoading ? <Icon type={isLoading} /> : null
        }
        {kids}
      </button>
    )
  }
}
Button.defaultProps = {
  prefixCls: 'md-btn'
}
Button.propsTypes = {
  htmlType: React.PropTypes.oneOf(['submit', 'button', 'reset'])
}
