import React from 'react'
import classNames from 'classnames'
import './style'
const Icon = (props) => {
  const {type, spin, className = '', ...others} = props
  const classString = classNames({
    'md-icon': true,
    [`md-icon-${type}`]: type, // 字体图标类型
    'md-icon-spin': !!spin || type === 'loading' // 是否旋转，当type为loading时，默认旋转
  }, className)
  return (<i {...others} className={classString} />)
}

export default Icon
