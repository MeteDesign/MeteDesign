import React from 'react'
import classNames from 'classnames'
import Button from '../button'
import ModalButton from './modalButton'
import Icon from '../icon'
import './style'
const prefixCls = 'md-modal'
const ModalFrame = (props) => {
  const modalCls = classNames(`${prefixCls}`, { 'md-modal-hidden': !props.visible }, props.className)
  //  ModalFrame Closer Button Fun
  //  @props.onClose <function> 模态框右上角关闭按钮处理函数
  const cancel = (e) => {
    if (props.onCancel) props.onCancel(e)
  }
  const ok = (e) => {
    if (props.onOk) props.onOk(e)
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
  } else {
    footer = (
      <div className={`${prefixCls}-dialog-footer`}>
        <ModalButton type='default' click={cancel} text='取消' closeModal={cancel} />
        <ModalButton type='primary' click={ok} text='确定' closeModal={cancel} />
      </div>
    )
  }
  //  ModalFrame Closer Button
  //  @close <function> 模态框右上角关闭按钮
  let closer
  if (props.closable) {
    closer = (
      <Button
        onClick={cancel}
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
