import MapGL, { Marker, NavigationControl, FullscreenControl } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css'

import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import ParkBlurb from './ParkBlurb';
function MapComp(){


    const user = useSelector(state => state.user)
    const parks = useSelector(state => state.park.entity)
    const [ viewport, setViewport] = useState({
        latitude: 40.77686530072597,
        longitude: -73.85443092329274,
        zoom: 10
    })
    const [ selectedMarker, setSelectedMarker ] = useState(null)

    function handleViewportChange(v){
            setViewport(v)
    }

    const selectedPark = parks.find( p => p.id === selectedMarker)
    const renderMarkers = parks.map( p => {
        return (<Marker 
                    key={p.id} 
                    longitude={p.long} 
                    latitude={p.lat}
                    onClick={()=> {
                        setSelectedMarker(p.id)
                    }}
                >
                    
                    <button className={selectedPark === p ? "selected" : 'marker'}>🌳</button>
        </Marker>)
    })
    const renderHome =  user.entity?.home ? <Marker className='marker' latitude={user.entity.home[1]} longitude={user.entity.home[0]}>🏠</Marker> : null
    const renderUser = user.location ? <Marker className='marker' latitude={user.location[1]} longitude={user.location[0]}>❌</Marker> : null

    return (
       
           <div id='map_container'>
            <div id='map'>
                 <MapGL                   
                    {...viewport}
                    // mapboxAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
                    mapboxAccessToken='pk.eyJ1IjoibHZhczI0OCIsImEiOiJjbGc1ZGNsNmQwMmVhM2xwb3Y4bTl3eTF6In0.gUK1qM941_27NOUGgiP9jg'
                    style={{ 
                        width: '90vw', 
                        height: '50vh', 
                        borderRadius: '15px', 
                        border: '2px solid black'
                    }}
                    onMove={handleViewportChange}      
                    mapStyle='mapbox://styles/mapbox/streets-v12'
                >
                    <FullscreenControl />
                    <NavigationControl />
                    {renderHome}                   
                    {renderUser}
                    {renderMarkers}
                </MapGL>
 
               
            </div>
                {/* { user.location ? null : <Button>Geolocate</Button> } */}
                { selectedMarker ? <ParkBlurb park={selectedPark} /> : <p>Select a park for details</p> }
           </div>
    )
    
}

export default MapComp