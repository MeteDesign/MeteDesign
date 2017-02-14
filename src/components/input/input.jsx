import React from 'react'
import _ from 'lodash'
import classNames from 'classnames'
// import Icon from '../icon'

import './style/index.scss'

export default class Input extends React.Component {
//   constructor (props) {
//     super(props)
//   }
  renderLabel (children) {
    const props = this.props
    if (!props.prefixLabel && !props.suffixLabel) return children
    const prefixLabel = props.prefixLabel ? (
      <span className={`${props.prefixCls}-prefixLabel`}>
        {props.prefixLabel}
      </span>
        ) : null
    const suffixLabel = props.suffixLabel ? (
      <span className={`${props.prefixCls}-suffixLabel`}>
        {props.suffixLabel}
      </span>
        ) : null
    return (
      <span className={`${props.prefixCls}-labelGroup`}>
        {prefixLabel}
        {children}
        {suffixLabel}
      </span>
    )
  }
  renderIcon (iptEle) {
    const props = this.props
    if (!props.prefixIcon && !props.suffixIcon) return iptEle
    const prefixIcon = props.prefixIcon ? (
      <span className={`${props.prefixCls}-prefixIcon`}>
        {props.prefixIcon}
      </span>
        ) : null
    const suffixIcon = props.suffixIcon ? (
      <span className={`${props.prefixCls}-suffixIcon`}>
        {props.suffixIcon}
      </span>
        ) : null
    return (
      <span className={`${props.prefixCls}-iconGroup`}>
        {prefixIcon}
        {iptEle}
        {suffixIcon}
      </span>
    )
  }
  renderInput () {
    const props = this.props
    // const props = Object.assign({}, this.props)
    console.log(typeof props)
    const otherProps = _.omit(props, [
      'prefixCls',
      'prefixIcon',
      'prefixLabel',
      'suffixIcon',
      'suffixLabel'
    ])
    //  You can get more about Controlled and Uncontrolled Component.
    //  Click here https://goshakkk.name/controlled-vs-uncontrolled-inputs-react/
    //  以防出现使用原生value属性导致react无法重新渲染Inpue组件，从而
    //  使得Inpue组件不可键入值，特此强制
    //  不允许使用原生value属性，当含有原生value属性则强制替换为defaultValue
    if ('value' in otherProps) {
      let _value = otherProps.value
      delete otherProps.value
      otherProps.defaultValue = _value
    }
    let hasIcon = props.prefixIcon || props.suffixIcon
    const className = classNames(props.prefixCls,
      {
        [`${props.prefixCls}-hasIcon`]: hasIcon,
        [`${props.prefixCls}-hasPreLabel`]: props.prefixLabel,
        [`${props.prefixCls}-hasSufLabel`]: props.suffixLabel
      }, props.className)
    const Input = (
      <input
        {...otherProps}
        className={className}
                />
        )
    return this.renderIcon(Input)
  }
  render () {
    return this.renderLabel(this.renderInput())
  }
}
Input.defaultProps = {
  prefixCls: 'md-input'
}
