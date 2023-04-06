import ReactMapGL, { Marker, GeolocateControl } from 'react-map-gl'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import 'mapbox-gl/dist/mapbox-gl.css';

function Map(){

    const parks = useSelector(state => state.park.entity)
    const [ userLocation, setUserLocation ] = useState(null)
    const [ viewport, setViewport] = useState({
        latitude: 40.7128,
        longitude: -74.0060,
        width: '100px',
        height: '100px',
        zoom: 12
    })

    const renderMarkers = parks.map( p => {
        return (<Marker key={p.id} longitude={p.long} latitude={p.lat}>
            <button>🐕</button>
        </Marker>)
    })
    


    return (
       
           <div id='map_container'>
                <ReactMapGL

                        mapboxAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
                        initialViewState={viewport}
                        onViewportChange={ v => setViewport(v)}
                        mapStyle='mapbox://styles/lvas248/clfbjoqrj000t01lbh820pode'    
                    >
                        <GeolocateControl
                            positionOptions={{enableHighAccuracy: true}}
                            trackUserLocation={true}
                            fitBoundsOptions={{ zoom: 12 }}
                            onGeolocate={userLocation => setUserLocation(userLocation)}
                        />
                        {renderMarkers}
                </ReactMapGL>

           </div>
    )
    
}

export default Map