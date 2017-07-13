import React from 'react'
// import { render } from 'react-dom'
import {Map, Marker, Popup, TileLayer, Polyline, Circle, Tooltip} from 'react-leaflet'
import { Notification } from 'element-react'
import 'element-theme-default'
import './style/index.scss'
// import 'leaflet/dist/leaflet.css'

const position = [45.51, -122.68]

class MapContaniner extends React.Component {
  constructor (props) {
    super(props)
  }
  render () {
    return (<Map
      className={'md-map-container'}
      center={position} zoom={5}>
      <TileLayer
        url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    />
      <Polyline
        attribution='@Mete Design Group'
        color='red'
        positions={[
        [45.51, -122.68],
        [40.77, -122.43],
        [36.04, -118.2]]} >
        <Tooltip ><span>这是一tooltip</span></Tooltip>
      </Polyline>
      <Polyline
        color='green'
        positions={[
        [34.04, -118.2],
        [38.77, -121.43],
        [39.04, -119.2]]} />
      <Marker
        onClick={() => {
          Notification({
            title: '自定义ICON',
            message: '你点击了它',
            type: 'warning'
          })
        }}
        position={[40.77, -122.43]}
        title='这是一个title'
        icon={L.divIcon({html: '<div class="my-marker-icon">可点击</div>'})}
      />
      <Marker position={position} radius={800}>
        <Popup>
          <span>这是一个popup</span>
        </Popup>
        <Tooltip ><span>这是一tooltip</span></Tooltip>

      </Marker>
    </Map>)
  }
}

export default MapContaniner
