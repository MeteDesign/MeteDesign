import React from 'react'
import classNames from 'classnames'
import Button from '../button'
import Icon from '../icon'
import './style'
const prefixCls = 'md-modal'
const ModalFrame = (props, className) => {
  const modalCls = classNames(`${prefixCls}`, { 'md-modal-hidden': !props.visiable })
  //  ModalFrame Closer Button Fun
  //  @props.onClose <function> 模态框右上角关闭按钮处理函数
  const close = (e) => {
    if (props.onClose) props.onClose(e)
  }
  //  ModalFrame Header Area
  //  @props.title <string> 标题
  let header
  if (props.title) {
    header = (
      <div className={`${prefixCls}-header`} >
        <div className={`${prefixCls}-title`} >
          {props.title}
        </div>
      </div>
    )
  }
  //  ModalFrame Footer Area
  //  @props.footer <react element> 模态框页脚，确认/取消按钮放在此处
  let footer
  if (props.footer) {
    footer = (
      <div className={`${prefixCls}-footer`} >
        {props.footer}
      </div>
    )
  }
  //  ModalFrame Closer Button
  //  @close <function> 模态框右上角关闭按钮
  let closer
  if (props.closable) {
    closer = (
      <Button
        onClick={close}
        size='small'
        type='link'
        className={`${prefixCls}-closer`}
      >
        <Icon type='close' />
      </Button>)
  }
  return (
    <div className={modalCls} >
      <div className={`${prefixCls}-mask`} />
      <div className={`${prefixCls}-frame`} style={props.style}>
        <div className={`${prefixCls}-content`}>
          {closer}
          {header}
          <div className={`${prefixCls}-body`}>
            {props.children}
          </div>

          {footer}
        </div>
      </div>
    </div>
  )
}

export default ModalFrame
