import React from 'react'
import { render } from 'react-dom'
// import Button from '../src/components/button'
// import MapContaniner from '../src/components/map'
import {
  BrowserRouter as Router,
  Route,
  Link,
  NavLink
} from 'react-router-dom'

import Home from './pages/index'
import Components from './pages/components'
import Standard from './pages/standard'

import './styles/color.css'
import './styles/index.css'

class App extends React.Component {
  constructor (props) {
    super(props)
  }

  render () {
    return (
      <Router>
        <div>
          <div className='banner bgBlue500'>
            <h1 className='header-left'>
              <Link className='header--img' to=''>
                <span style={{fontWeight: 'normal'}}>METE DESIGN</span>
              </Link>
            </h1>
            <button className='heder--menu' >
              <i className='fa fa-bars' aria-hidden='true' />
            </button>
            <ul className='header-right' id='menu'>
              <li className='header-li' >
                <NavLink to='/' activeClassName='header-active'>首页</NavLink>
              </li>
              <li className='header-li' >
                <NavLink to='/standard' activeClassName='header-active'>规范</NavLink>
              </li>
              <li className='header-li'>
                <NavLink to='/components' activeClassName='header-active'>组件</NavLink>
              </li >
              <li className='header-li'>
                <a >
                  <span>资源</span>
                </a>
              </li >
              <li className='header-li'>
                <a >
                  <span>NativeScript</span>
                </a>
              </li>

            </ul >
          </div >

          <Route exact path='/' component={Home} />
          <Route path='/components' component={Components} />
          <Route path='/standard' component={Standard} />
        </div>
      </Router>
    )
  }
}

render(<App />, document.getElementById('root'))
