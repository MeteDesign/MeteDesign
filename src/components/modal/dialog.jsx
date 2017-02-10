import React from 'react'
import ReactDOM from 'react-dom'
import ModalFrame from './modalFrame'
import Icon from '../icon'
import ModalButton from './modalButton'
import './style'
const Dialog = (...props) => {
  // 对话框类型
  props = Object.assign({}, ...props)
  const prefixCls = 'md-modal'
  let type = props.type
  let div = document.createElement('div')
  document.body.appendChild(div)
  let iconType
  switch (type) {
    case 'confirm':
      iconType = 'question'
      break
    case 'warning':
      iconType = 'exclamation'
      break
    case 'success':
      iconType = 'check'
      break
    case 'error':
      iconType = 'close'
      break
    default:
      iconType = 'info'

  }
  //   组件销毁方法
  let close = () => {
    const unmountResult = ReactDOM.unmountComponentAtNode(div)
    if (unmountResult && div.parentNode) {
      div.parentNode.removeChild(div)
    }
  }
  let body = (
    <div className={`${prefixCls}-dialog-body`}>
      <Icon type={iconType} className={`${prefixCls}-icon ${prefixCls}-icon-${type}`} />
      <span className={`${prefixCls}-title ${prefixCls}-dialog-title`}>{props.title}</span>
      <div className={`${prefixCls}-dialog-content`}>{props.content}</div>
    </div>
  )
  let footer
  if (type === 'confirm') {
    footer = (
      <div className={`${prefixCls}-dialog-footer`}>
        <ModalButton type='default' click={props.onCancel} text='取消' closeModal={close} />
        <ModalButton type='primary' click={props.onOk} text='确定' closeModal={close} />
      </div>
    )
  } else {
    footer = (
      <div className={`${prefixCls}-dialog-footer`}>
        <ModalButton type='primary' click={props.onOk} text='确定' closeModal={close} />
      </div>
    )
  }
  //  将组件渲染到body中
  ReactDOM.render(
    <ModalFrame visiable style={{ width: props.width || '400px' }}>
      {body}
      {footer}
    </ModalFrame>,
    div)
}
export default Dialog
