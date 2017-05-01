import React from 'react'
import { render } from 'react-dom'

import Button from './button'
import Icon from './icon'
import { ModalFrame, Dialog } from './modal/'
import Input from './input'
import FormDemo from './form/__test/form_demo'
import Checkbox from './checkBox'
// import shallowEqual from './util/shallowequal'

class App extends React.Component {
  constructor (props) {
    super(props)
    // let o1 = {a: '1', b: '2'}
    // let o2 = {a: '1', b: '2'}
    // console.log('对象浅对比')
    // console.log(shallowEqual(o1, o2))
    // console.log('对象深对比')
    // console.log(o1 === o2)
    this.state = {
      showModal: false,
      showConfirm: false
    }
  }
  onChange (e) {
    console.log(`checked = ${e.target.checked}`)
  }
  render () {
    return (
      <div>
        <h1>Mete Design 单元测试页</h1>
        <hr />
        <h2>BUTTON</h2>
        <Button type='link' size='large' onClick={() => { window.alert('btn') }}>
          LINK
              </Button>
        <Button type='primary' size='large' onClick={() => { window.alert('btn') }}>
          PRIMARY
              </Button>
        <Button size='large' onClick={() => { window.alert('btn') }}>
          DEFAULT
              </Button>
        <Button size='large' onClick={() => { window.alert('btn') }} loading>
          LOADING
              </Button>
        <h2>ICON</h2>
        <Icon type='stepbackward' />
        <Icon type='loading' spin />
        <h2>MODAL</h2>
        <Button type='primary' onClick={() => { this.setState({ showModal: true }) }}>
          普通modal
        </Button>
        <ModalFrame title='this is md-modal' visible={this.state.showModal} closable onCancel={() => { this.setState({ showModal: false }) }}>
          <p>this is p tag</p>
        </ModalFrame>
        <Button onClick={() => { Dialog({ type: 'confirm', title: 'confirm', content: 'this is confirm content' }) }}>
          Confirm
          </Button>
        <Button onClick={() => { Dialog({ type: 'info', title: 'info', content: 'this is info content' }) }}>
          Info
          </Button>
        <Button onClick={() => { Dialog({ type: 'success', title: 'Success', content: 'this is Success content' }) }}>
          Success
          </Button>
        <Button onClick={() => { Dialog({ type: 'warning', title: 'warning', content: 'this is warning content' }) }}>
          Warning
          </Button>
        <Button onClick={() => { Dialog({ type: 'error', title: 'error', content: 'this is error content' }) }}>
          Error
          </Button>
        <Button onClick={() => {
          Dialog({
            onOk: () => {
              return new Promise((resolve, reject) => {
                setTimeout(Math.random() > 0.5 ? resolve : reject, 1000)
              }).catch(() => console.log('Oops errors!'))
            },
            type: 'error',
            title: 'error',
            content: 'this is error content'
          })
        }}>
          异步
          </Button>
        <h2>Input</h2>
        <div style={{ width: '300px' }}>
          <Input placeholder='请输入用户名' prefixIcon={<Icon type='user' />} prefixLabel={'用户名'} />
          <Input placeholder='请输入用户名' prefixIcon={<Icon type='user' />} suffixIcon={<Icon type='closecircleo' />} prefixLabel={'用户名'} suffixLabel={'*'} />
          <Input placeholder='请输入用户名' prefixIcon={<Icon type='user' />} suffixIcon={<Icon type='closecircleo' />} suffixLabel={'*'} />
          <Input placeholder='请输入用户名' prefixIcon={<Icon type='user' />} suffixIcon={<Icon type='closecircle' />} />
          <Input placeholder='请输入用户名' />
        </div>
        <h2>Form</h2>
        <FormDemo />
        <h2>Checkbox</h2>
        <Checkbox onChange={this.onChange.bind(this)}>Checkbox</Checkbox>
        <Checkbox defaultChecked={false} disabled>未选中不可用</Checkbox>
        <br />
        <Checkbox defaultChecked disabled>选中不可用</Checkbox>
      </div>
    )
  }
}

render(<App />, document.getElementById('root'))
