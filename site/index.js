import React from 'react'
import { render } from 'react-dom'
import Promise from 'es6-promise'
Promise.polyfill()
// import Button from '../src/components/button'
// import MapContaniner from '../src/components/map'
import {
  HashRouter as Router,
  Route,
  Link,
  NavLink
} from 'react-router-dom'

import Home from 'bundle-loader?lazy&name=Home!./pages/index'
import Components from 'bundle-loader?lazy&name=Components!./pages/components'
// import Components from './pages/components'
import Standard from 'bundle-loader?lazy&name=Standard!./pages/standard'
import Resource from 'bundle-loader?lazy&name=Resource!./pages/resource'
import Bundle from '../src/components/lazyload'
import Loading from '../src/components/loading'

import './styles/color.css'
import './styles/index.css'
import './styles/prism.css'

const loadComponent = (Component) => () => (
  <Bundle load={Component}>
    {
            (Component) => Component ? <Component /> : <Loading><div style={{height: '100vh'}} /></Loading>
        }
  </Bundle>
)
class App extends React.Component {
  constructor (props) {
    super(props)
  }

  render () {
    return (
      <Router>
        <div className='container' id='page-main'>
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
                <NavLink exact to='/' activeClassName='header-active'>首页</NavLink>
              </li>
              <li className='header-li' >
                <NavLink to='/standard' activeClassName='header-active'>规范</NavLink>
              </li>
              <li className='header-li'>
                <NavLink to='/components' activeClassName='header-active'>组件</NavLink>
              </li >
              <li className='header-li'>
                <NavLink to='/resource' activeClassName='header-active'>资源</NavLink>
              </li>
            </ul >
          </div >
          <Route exact path='/' component={loadComponent(Home)} />
          <Route path='/components' component={loadComponent(Components)} />
          <Route path='/standard' component={loadComponent(Standard)} />
          <Route path='/resource' component={loadComponent(Resource)} />
          <div className='foot'>
            <div className='foot--nav'>
              <div className='foot--help foot--logo'>
                <img src={require('assets/images/logo.png')} alt='' />
                <span>METE DESIGN</span>
              </div>
              <div className='foot--help'>
                <h2>热门框架</h2>
                <ul>
                  <li><a href=''>Angular</a></li>
                  <li><a href=''>React</a></li>
                  <li><a href=''>Vue</a></li>
                </ul>
              </div>
              <div className='foot--help'>
                <h2>推荐网站</h2>
                <ul>
                  <li><a href=''>GitHub</a></li>
                  <li><a href=''>Stackoverflow</a></li>
                  <li><a href=''>简书</a></li>
                  <li><a href=''>掘金</a></li>
                </ul>
              </div>
              <div className='foot--help'>
                <h2>网站记录</h2>
                <ul>
                  <li><a href=''>版本更新</a></li>
                  <li><a href=''>报告问题</a></li>
                  <li><a href=''>网站反馈</a></li>
                </ul>
              </div>
              <span className='foot--split' />
            </div>
            <div className='foot--rights'>
              <h2>© 2016 SuperMap Meteorology Department All Rights Reserved</h2>
              <span>技术支持：北京超图软件股份有限公司气象事业部成都分部</span>
            </div>

          </div>
        </div>
      </Router>
    )
  }
}

render(<App />, document.getElementById('root'))
