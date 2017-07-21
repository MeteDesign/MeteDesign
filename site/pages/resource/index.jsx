import React from 'react'
import './index.scss'
// DATE_START=2017-07-17&DATE_END=2017-07-23&STAT_ID=0'
import md_ajax from 'md_midware/md-service/md-ajax'
export default class Resource extends React.Component {
  componentDidMount () {
    md_ajax.get('http://192.168.19.38:6080/more', {params: {
      DATE_START: '2017-07-17',
      DATE_END: '2017-07-23',
      STAT_ID: 0
    }})
    .then((data) => {
      debugger
    })
    .catch((e) => {
      debugger
    })
  }
  render () {
    return (<div className='page-top' style={{minHeight: '100vh'}} >
      资源文件快马加鞭中...</div>)
  }
}
