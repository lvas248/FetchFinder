import MapGL, { Marker, NavigationControl, FullscreenControl, GeolocateControl } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css'

import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import ParkBlurb from './ParkBlurb';

function MapComp(){

    const userLocation = useSelector(state => state.user.entity.home)
    const parks = useSelector(state => state.park.entity)
    const [ viewport, setViewport] = useState({
        latitude: 40.77686530072597,
        longitude: -73.85443092329274,
        zoom: 10
    })
    const [ selectedPark, setSelectedPark ] = useState(null)

    // console.log(process.env.REACT_APP_MAPBOX_ACCESS_TOKEN)
    
    function handleViewportChange(v){
            setViewport(v)
    }
    const renderMarkers = parks.map( p => {
        return (<Marker 
                    key={p.id} 
                    longitude={p.long} 
                    latitude={p.lat}
                    onClick={()=> {
                        setSelectedPark(p)
                        
                    }}
                >
                    
                    <button className={selectedPark === p ? "selected" : 'marker'}>🌳</button>
        </Marker>)
    })
    const renderUser =  userLocation ? <Marker className='marker' latitude={userLocation[1]} longitude={userLocation[0]}>🏠</Marker> : null
  
    return (
       
           <div id='map_container'>
            <div id='map'>
                 <MapGL                   
                    {...viewport}
                    mapboxAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}

                    style={{ 
                        width: '90vw', 
                        height: '50vh', 
                        borderRadius: '15px', 
                        border: '2px solid black'
                    }}
                    onMove={handleViewportChange}      
                    mapStyle='mapbox://styles/mapbox/streets-v12'
                >
                    <GeolocateControl 
                        positionOptions={{enableHighAccuracy: true}}
                        trackUserLocation={true}
                        />
                    <FullscreenControl />
                    <NavigationControl />
                    {renderUser}
                    {renderMarkers}
                </MapGL>
 
               
            </div>

                {selectedPark ? <ParkBlurb park={selectedPark} /> : null }

           </div>
    )
    
}

export default MapComp