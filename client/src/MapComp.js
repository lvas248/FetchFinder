import ReactMapGL, { Marker, NavigationControl, FullscreenControl } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css'

import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import ParkBlurb from './ParkBlurb';
import { useParams } from 'react-router-dom'

function MapComp(){

    const params = useParams()
    const user = useSelector(state => state.user)
    const parks = useSelector(state => state.park.entity)
    const parkStatus = useSelector(state => state.park.status)
    const apiKey = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN


    const [ viewport, setViewport] = useState({
        latitude: 40.77686530072597,
        longitude: -73.85443092329274,
        zoom: 10
    })
    const [ selectedMarker, setSelectedMarker ] = useState(params.parkId)
   const selectedPark = parks.find( p => {
        return p.id === parseInt(selectedMarker)
    })
    useEffect( ()=>{
        if(selectedPark){
            setViewport({
                longitude: selectedPark.long,
                latitude: selectedPark.lat,
                zoom: 11
            })
        }
    },[selectedPark])


    function handleViewportChange(v){
            setViewport(v)
    }

 
   
    const renderMarkers = parks.map( p => {
        return (<Marker 
                    key={p.id} 
                    longitude={p.long} 
                    latitude={p.lat}
                    onClick={()=> {
                        setSelectedMarker(p.id)
                    }}
                >
                    
                    <button className={ parseInt(selectedMarker) === p.id ? "selected" : 'marker'}>🌳</button>
                </Marker>)
    })
    const renderHome =  user.entity?.home ? <Marker className='marker' latitude={user.entity.home[1]} longitude={user.entity.home[0]}>🏠</Marker> : null
    const renderUser = user.location ? <Marker className='marker' latitude={user.location[1]} longitude={user.location[0]}>❌</Marker> : null

 

    return (
       
           <div id='map_container'>
            <div id='map'>
                 <ReactMapGL                   
                    {...viewport}
                    mapboxAccessToken={apiKey}
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
                </ReactMapGL>
 
            </div>
                { selectedMarker ? <ParkBlurb park={selectedPark} /> : <p>Select a park for details</p> }
                { parkStatus === 'pending' ? <p className='loading'>Loading...</p> : null }

           </div>
    )
    
}

export default MapComp