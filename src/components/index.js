import React from 'react'
import { render } from 'react-dom'

import Button from './button'
import Icon from './icon'
import {ModalFrame, Dialog} from './modal/'

class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      showModal: false,
      showConfirm: false
    }
  }
  render () {
    return (
      <div>
        Mete Design
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
        <Button onClick={() => { Dialog({type: 'confirm', title: 'confirm', content: 'this is confirm content'}) }}>
          Confirm
          </Button>
        <Button onClick={() => { Dialog({type: 'info', title: 'info', content: 'this is info content'}) }}>
          Info
          </Button>
        <Button onClick={() => { Dialog({type: 'success', title: 'Success', content: 'this is Success content'}) }}>
          Success
          </Button>
        <Button onClick={() => { Dialog({type: 'warning', title: 'warning', content: 'this is warning content'}) }}>
          Warning
          </Button>
        <Button onClick={() => { Dialog({type: 'error', title: 'error', content: 'this is error content'}) }}>
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
            content: 'this is error content'})
        }}>
          异步
          </Button>
      </div>)
  }
}

render(<App />, document.getElementById('root'))
