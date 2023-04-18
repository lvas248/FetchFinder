import MapGL, { Marker, NavigationControl, FullscreenControl, GeolocateControl } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css'

import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import ParkBlurb from './ParkBlurb';
import { updateParkDistanceFromUser } from './features/park/parkSlice';

function MapComp(){


    const home = useSelector(state => state.user.entity.home)
    const parks = useSelector(state => state.park.entity)
    const [ viewport, setViewport] = useState({
        latitude: 40.77686530072597,
        longitude: -73.85443092329274,
        zoom: 10
    })
    const [ selectedMarker, setSelectedMarker ] = useState(null)
    const dispatch = useDispatch()

    function updateUserLocation(e){
        dispatch(updateParkDistanceFromUser([e.coords.longitude, e.coords.latitude]))
    }

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
    const renderUser =  home ? <Marker className='marker' latitude={home[1]} longitude={home[0]}>🏠</Marker> : null
  
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
                    <GeolocateControl 
                        positionOptions={{enableHighAccuracy: true}}
                        trackUserLocation={true}
                        onGeolocate={updateUserLocation}
                        />
                    <FullscreenControl />
                    <NavigationControl />
                    {renderUser}
                    {renderMarkers}
                </MapGL>
 
               
            </div>

                {selectedMarker ? <ParkBlurb park={selectedPark} /> : <p>Select a park for details</p> }
           </div>
    )
    
}

export default MapComp