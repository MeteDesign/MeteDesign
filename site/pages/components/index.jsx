import React from 'react'
import ScrollToTop from 'react-scroll-up'
import classnames from 'classnames'

import { i18n } from '../../../src/components'

import en from '../../../src/components/locale/lang/en'
import zh from '../../../src/components/locale/lang/zh-CN'

import locales from '../../locales'
import pages from './pages'
import './index.scss'

export default class Components extends React.Component {
  constructor (props) {
    super(props)

    this.state = {}
  }
  componentWillMount () {
    window.addEventListener('hashchange', () => {
      window.scrollTo(0, 0)

      this.setPage()
    }, false)
  }
  componentDidMount () {
    this.setPage(() => {
      if (!this.state.locale) {
        this.setLocale(window.localStorage.getItem('ELEMENT_LANGUAGE') || 'zh-CN')
      }
    })
  }

  componentDidUpdate (props, state) {
    if (state.locale !== this.state.locale) {
      switch (this.state.locale) {
        case 'en-US':
          i18n.use(en); break
        default:
          i18n.use(zh); break
      }
    }
  }

  getLocale (key) {
    const map = locales[this.state.locale] || {}
    return key.split('.').reduce((a, b) => {
      const parent = map[a]

      if (b) {
        return (parent || {})[b]
      }

      return parent
    })
  }

  setLocale (locale) {
    window.location.hash = `components/${locale}/${this.state.page}`
  }

  getPage () {
    //          #/components/zh-CN/quick-start     /(?:\/(.+))?\/(.+)\/(.+)/
    // const routes = window.location.hash.match(/(?:\/(.+))?\/(.+)/)
    const routes = window.location.hash.match(/(?:\/(.+))?\/(.+)\/(.+)/)

    if (routes) {
      if (locales.hasOwnProperty(routes[2])) {
        this.setState({ locale: routes[2] }, () => {
          window.localStorage.setItem('ELEMENT_LANGUAGE', this.state.locale)
        })
      }

      return routes[3]
    }

    return 'quick-start'
  }

  setPage (fn) {
    this.setState({ page: this.getPage() }, fn)
  }

  getComponent (page) {
    this.components = this.components || Object.assign(Object.values(pages.components).reduce((a, b) => {
      return Object.assign(a, b)
    }, {}), pages.documents)

    const result = this.components[page]

    if (result) {
      return React.createElement(result.default, {
        locale: {
          show: this.getLocale('markdown.show'),
          hide: this.getLocale('markdown.hide')
        }
      })
    }
  }

  render () {
    return (
      <div className='app page-top'>
        {/* <header className='header'>
          <div className='container'>
            <h1>
               <img src={require('/assets/images/logo.svg')} />
            </h1>
            <ul className='nav'>
              <li className='nav-item'>
                <a href={`http://element.eleme.io/#/${this.state.locale}/guide/design`} target='_blank' rel='noopener noreferrer'>{this.getLocale('misc.guide')}</a>
              </li>
              <li className='nav-item'>
                <a className='active'>{this.getLocale('misc.component')}</a>
              </li>
              <li className='nav-item'>
                <a href={`http://element.eleme.io/#/${this.state.locale}/resource`} target='_blank' rel='noopener noreferrer'>{this.getLocale('misc.resource')}</a>
              </li>
              <li className='nav-item'>
                <span className={classnames('nav-lang', { active: this.state.locale === 'zh-CN'})} onClick={this.setLocale.bind(this, 'zh-CN')}>中文</span>
                <span> / </span>
                <span className={classnames('nav-lang', { active: this.state.locale === 'en-US'})} onClick={this.setLocale.bind(this, 'en-US')}>En</span>
              </li>
            </ul>
          </div>
        </header> */}
        <div className='main container'>
          <nav className='side-nav'>
            <ul>
              <li className='nav-item'>
                <a>{this.getLocale('misc.development')}</a>
                <ul className='pure-menu-list sub-nav'>
                  {
                    Object.keys(pages.documents).map(page => {
                      return (
                        <li className='nav-item' key={page}>
                          <a href={`#/components/${this.state.locale}/${page}`} className={page === this.state.page ? 'active' : ''}>{this.getLocale(`page.${page}`)}</a>
                        </li>
                      )
                    })
                  }
                </ul>
              </li>
              <li className='nav-item'>
                <a>{this.getLocale('misc.components')}</a>
                {
                  Object.keys(pages.components).map(group => {
                    return (
                      <div className='nav-group' key={group}>
                        <div className='nav-group__title'>{group}</div>
                        <ul className='pure-menu-list'>
                          {
                            Object.keys(pages.components[group]).map(page => {
                              return (
                                <li key={page} className='nav-item'>
                                  <a href={`#/components/${this.state.locale}/${page}`} className={page === this.state.page ? 'active' : ''}>{this.getLocale(`page.${page}`)}</a>
                                </li>
                              )
                            })
                          }
                        </ul>
                      </div>
                    )
                  })
                }
              </li>
            </ul>
          </nav>
          <div className='content'>
            { this.getComponent(this.state.page) }
            <ScrollToTop showUnder={210}>
              <div className='page-component-up'>
                <i className='el-icon-caret-top' />
              </div>
            </ScrollToTop>
          </div>
        </div>
      </div>
    )
  }
}
