import React from 'react'
import { render } from 'react-dom'
import Button from './components/button'
import MapContaniner from './components/map'

class App extends React.Component {
  constructor (props) {
    super(props)
  }

  render () {
    return (
      <div>
        <h1>Mete Design 单元测试页</h1>
        <hr />
        <h2>Leaflet React Demo Block</h2>
        <MapContaniner />
      </div>
    )
  }
}

render(<App />, document.getElementById('root'))
