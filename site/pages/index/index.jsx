import React from 'react'
import '../../styles/color.css'
// import { Link } from 'react-router'
import anime from 'animejs'
import './index.css'

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
      <div >
        <div className='banner-c page page-top'>
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

        <div className='introduce-c  page-top' id='page-intro'>
          <h2>Introduce</h2>
          <div className='introduce-text-c' >
            <span className='intro-text'>METE DESIGN是一套包含前端、服务端两大模块的产品，致力于帮助开发团队构建一套统一、方便、快捷的开发模式。</span>
            <div className='card'>
              <div className='card-content'>
                <img src={require('../../assets/images/standard.png')} alt='规范' />
                <h3>规范</h3>
                <a href='#/standard' target='_blank' className='btn-a'>查看详情</a>
                <p>了解产品开发规范，帮助团队构建统一开发模式、便于项目维护更新</p>
              </div>
            </div>
            <div className='card'>
              <div className='card-content'>
                <img src={require('../../assets/images/components.png')} alt='规范' />
                <h3>组件</h3>
                <p>包含前端基础组件以及GIS组件，使用组件快速体验交互细节，帮助工程师快速开发。</p>
                <a href='#/components' target='_blank' className='btn-a'>查看详情</a>
              </div>
            </div>
            <div className='card'>
              <div className='card-content'>
                <img src={require('../../assets/images/resource.png')} alt='规范' />
                <h3>资源</h3>
                <p>提供开发学习资源与分享，构建开放美好生态。</p>
                <a href='#/resource' target='_blank' className='btn-a'>查看详情</a>
              </div>
            </div>
            <div className='card'>
              <div className='card-content'>
                <img src={require('../../assets/images/middleware.jpg')} alt='规范' />
                <h3>中间件</h3>
                <p>基于Nodejs层面中间件，提供统一接口服务。</p>
                <a href='#/middleware' target='_blank' className='btn-a'>查看详情</a>
              </div>
            </div>
            <div className='card'>
              <div className='card-content'>
                <img src={require('../../assets/images/toollib.png')} alt='规范' />
                <h3>工具库</h3>
                <p>自建开发工具库，简化开发，提高开发体验。</p>
                <a href='#/toollib' target='_blank' className='btn-a'>查看详情</a>
              </div>
            </div>
          </div>
          <h2>METE DESIGN is made with...</h2>
          <ul >
            <li>
              <a href='http://facebook.github.io/react' target='_blank' >
                <img src={require('../../assets/images/reactjs.png')} alt='ReactJS' title='ReactJS' />
                <h3 >ReactJS</h3>
                <p>A JavaScript library for building user interfaces</p>
              </a>
            </li>
            <li >
              <a href='http://www.w3.org/html/' target='_blank' >
                <img src={require('../../assets/images/html5.png')} alt='HTML' title='HTML' />
                <h3 >HTML5</h3>
                <p >The markup language of the internet</p>
              </a>
            </li>
            <li >
              <a href='http://www.w3.org/Style/CSS/Overview.en.html' target='_blank' >
                <img src={require('../../assets/images/css3.png')} alt='CSS3' title='CSS3' />
                <h3>CSS3</h3>
                <p >The presentation language of the internet</p>
              </a>
            </li>
            <li >
              <a href='https://nodejs.org' target='_blank' >
                <img src={require('../../assets/images/nodejs.png')} alt='nodejs' title='nodejs' />
                <h3>NodeJs</h3>
                <p >Node.js® is a JavaScript runtime built on Chrome's V8 JavaScript engine.</p>
              </a>
            </li>
            <li >
              <a href='https://www.npmjs.com/' target='_blank' >
                <img src={require('../../assets/images/npm.jpg')} alt='npm' title='npm' />
                <h3>NPM</h3>
                <p >npm is the package manager for JavaScript</p>
              </a>
            </li>
            <li >
              <a href='https://github.com/webpack/webpack' target='_blank' >
                <img src={require('../../assets/images/webpack.svg')} alt='webpack' title='webpack' />
                <h3>WebPack</h3>
                <p >webpack is a module bundler.</p>
              </a>
            </li>
          </ul>
        </div>
        <div className='splitLine' />
        <div className='introduce-c page-top' id='page-start'>
          <h2>Getting Started</h2>
          <pre className='language-shell'>
            <code className=' language-shell'>
            $ git clone https://github.com/MeteDesign/MeteDesign.git</code><br />
            <code className=' language-shell'>
            $ npm install

            </code><br />
            <code className=' language-shell'>
            $ npm run generdll
             </code><br />
            <code className=' language-shell'>
            $ npm run build
             </code><br />
            <code className=' language-shell'>
            $ npm run dev

          </code>
          </pre>
          <a href='#/standard' className='start-learning'>开始学习</a>
        </div>
      </div>
    )
  }
}
