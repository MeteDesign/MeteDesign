import React, {
	PropTypes
}
from 'react';
import {
	render
}
from 'react-dom';

import Card from '../src/components/card';
import '../src/components/card/style/index.scss';

// class SMMap extends React.Component {
//   render() {
//     let myIcon = L.icon({
//       iconUrl: './images/marker-icon.png',
//       iconSize: [24, 32],
//       iconAnchor: [12, 12],
//       // shadowUrl: './images/marker-shadow.png',
//       // shadowSize: [24, 32],
//       // shadowAnchor: [12, 12]
//     });
//     return <Map center={[30.67,104.06]} zoom={1} style={{height:"800px"}}>
//             <SMTileLayer url={'http://support.supermap.com.cn:8090/iserver/services/map-china400/rest/maps/China'}/> 
//             <Marker position={[30.67,104.06]} icon={myIcon}>
//               <Popup>
//                 <span>You are here</span>
//               </Popup>
//             </Marker>
//            </Map>
//   }
// }

render((<Card title={'haha'}>haha</Card>), document.getElementById('root'));