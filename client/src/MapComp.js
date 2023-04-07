import MapGL, { Marker, NavigationControl, GeolocateControl, FullscreenControl } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css'

import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import ParkBlurb from './ParkBlurb';

function MapComp(){

    const [ viewport, setViewport] = useState({
        latitude: 40.7128,
        longitude: -74.0060,
        zoom: 12
    })
    const [ userLocation, setUserLocation ] = useState(null)

    useEffect(()=>{
        navigator.geolocation.getCurrentPosition(p => {
            console.log('yes')
            setUserLocation({latitude: p.coords.latitude, longitude: p.coords.longitude})
            setViewport({...viewport,latitude: p.coords.latitude, longitude: p.coords.longitude})})
    },[userLocation])

    const parks = useSelector(state => state.park.entity)
    const [ selectedPark, setSelectedPark ] = useState(null)
    



    const renderMarkers = parks.map( p => {
        return (<Marker 
                    key={p.id} 
                    longitude={p.long} 
                    latitude={p.lat}
                    onClick={()=> setSelectedPark(p)}
                >
                    
            <button>❌</button>
        </Marker>)
    })
    
   function handleViewportChange(v){
        setViewport(v)
   }


    const renderUser =  userLocation ? <Marker latitude={userLocation.latitude} longitude={userLocation.longitude}>🤷🏽‍♂️</Marker> : null
    return (
       
           <div id='map_container'>
            <div>
                 <MapGL                   
                    {...viewport}
                    mapboxAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
                    style={{ 
                        width: '500px', 
                        height: '500px', 
                        borderRadius: '15px', 
                        border: '2px solid black'
                    }}
                    onMove={handleViewportChange}      
                    mapStyle='mapbox://styles/mapbox/streets-v12'
                    
                >
                    <GeolocateControl 
                    />
                    <FullscreenControl />
                    <NavigationControl />
                    {renderUser}
                    {renderMarkers}
                </MapGL>
 
               
            </div>

                {selectedPark ? <ParkBlurb park={selectedPark}/> : null }

           </div>
    )
    
}

export default MapComp