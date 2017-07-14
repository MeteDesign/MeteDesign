import React from 'react'
import '../../styles/color.css'
import './index.css'
import { Link } from 'react-router'
import anime from 'animejs'
export default class Home extends React.Component {
  scrollTo (tar) {
    var tar_dom = document.getElementById(tar)
    var _offsetParet = tar_dom.offsetParent
    var top = tar_dom.offsetTop
    while (_offsetParet) {
      top += _offsetParet.offsetTop
      _offsetParet = _offsetParet.offsetParent
    }
    var myAnimation = anime({
      targets: 'body',
      scrollTop: {
        value: top,
        easing: 'easeOutElastic'
      },
      duration: 800

    })
  }
  componentDidMount () {
    var myAnimation = anime({
      targets: '.banner-text-container',

      opacity: {
        value: 1,
        duration: 1500,
        easing: 'linear'
      },
      left: {
        value: '13%',
        duration: 1000,
        easing: 'easeInOutQuart'
      }
    })
    console.log(anime.easings)
  }
  render () {
    return (
      <div className='container' id='page-main'>
        <div className='banner-c page'>
          <div className='banner-text-container'>
            <div>
              <span className='mete'>METE </span>
              <span className='design'> DESIGN</span>
            </div>
            <p className='banner-introduce'>One Front End FrameWork </p>
            <div>
              <button className='banner-btn' onClick={this.scrollTo.bind(this, 'page-intro')}>Introduce</button>
              <button className='banner-btn' onClick={this.scrollTo.bind(this, 'page-start')}>Get Started</button>
            </div>
          </div>
        </div>

        <div className='introduce-c page' id='page-intro'>
          <h2>METE DESIGN is made with...</h2>
          <ul >
            <li>
              <a href='http://facebook.github.io/react' target='_blank' >
                <img src={require('../../assets/images/reactjs.png')} alt='ReactJS' title='ReactJS' />
                <h5 >ReactJS</h5>
                <p>A JavaScript library for building user interfaces</p>
              </a>
            </li>
            <li >
              <a href='http://www.w3.org/html/' target='_blank' >
                <img src={require('../../assets/images/html5.png')} alt='HTML' title='HTML' />
                <h5 >HTML5</h5>
                <p >The markup language of the internet</p>
              </a>
            </li>
            <li >
              <a href='http://www.w3.org/Style/CSS/Overview.en.html' target='_blank' >
                <img src={require('../../assets/images/css3.png')} alt='CSS3' title='CSS3' />
                <h5>CSS3</h5>
                <p >The presentation language of the internet</p>
              </a>
            </li>
            <li >
              <a href='https://nodejs.org' target='_blank' >
                <img src={require('../../assets/images/nodejs.png')} alt='nodejs' title='nodejs' />
                <h5>NodeJs</h5>
                <p >Node.js® is a JavaScript runtime built on Chrome's V8 JavaScript engine.</p>
              </a>
            </li>
            <li >
              <a href='https://www.npmjs.com/' target='_blank' >
                <img src={require('../../assets/images/npm.jpg')} alt='npm' title='npm' />
                <h5>NPM</h5>
                <p >npm is the package manager for JavaScript</p>
              </a>
            </li>
            <li >
              <a href='https://github.com/webpack/webpack' target='_blank' >
                <img src={require('../../assets/images/webpack.svg')} alt='webpack' title='webpack' />
                <h5>WebPack</h5>
                <p >webpack is a module bundler.</p>
              </a>
            </li>
          </ul>
          <div className='introduce-text-c' >
            <span>在诸多项目的开发中，其中往往存在很多类似的页面和组件，大面积出现代码的冗余、代码书写不规范、代码质量很值得商榷等等一系列的问题。基于此，METE DESIGN便由此而来。</span>
            <span>METE DESIGN是一个高内聚，松耦合，数据驱动，紧扣业务逻辑，交互性强的前端框架。在给用户带来全新的UI体验的同时还提供了非常震撼的UE。</span>
          </div>

        </div>
        <div className='splitLine' />
        <div className='introduce-c page' id='page-start'>
          <h2>Getting Started</h2>
          <pre><code>
                        $ git clone https://github.com/ghost60/XMMSSP.git<br />
                        $ npm install<br />
                        $ npm start<br />
          </code>
          </pre>
        </div>
        <div className='test'>ssss</div>
      </div>
    )
  }
}
