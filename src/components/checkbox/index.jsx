import RcCheckbox from 'rc-checkbox'
import React from 'react'
import CheckboxGroup from './group'
import classNames from 'classnames'
import PureRenderMixin from '../util/pureRenderMixin'
import './style'

export default class Checkbox extends React.Component {
  static Group = CheckboxGroup;
  static defaultProps = {
    prefixCls: 'md-checkbox',
    indeterminate: false,
  };
  shouldComponentUpdate(...args) {
    return PureRenderMixin.shouldComponentUpdate.apply(this, args);
  }
  render() {
    const {
      prefixCls, style, children, className, indeterminate,
      onMouseEnter, onMouseLeave, ...restProps,
     } = this.props;
    const classString = classNames(className, {
      [`${prefixCls}-wrapper`]: true,
    });
    const checkboxClass = classNames({
      [`${prefixCls}-indeterminate`]: indeterminate,
    });
    return (
      <label
        className={classString}
        style={style}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        <RcCheckbox
          {...restProps}
          prefixCls={prefixCls}
          className={checkboxClass}
          children={null}
        />
        {children !== undefined ? <span>{children}</span> : null}
      </label>
    );
  }
}
