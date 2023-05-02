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

    const [ viewport, setViewport] = useState({
        latitude: 40.77686530072597,
        longitude: -73.85443092329274,
        zoom: 10
    })

    useEffect( ()=>{
        if(selectedPark){
            setViewport({
                longitude: selectedPark.long,
                latitude: selectedPark.lat,
                zoom: 11
            })
        }
        // else 
        // if(user.location){
        //     setViewport({
        //         longitude: user.location[0],
        //         latitude: user.location[1],
        //         zoom: 11
        //     })
        // }
    },[])

    const [ selectedMarker, setSelectedMarker ] = useState(params.id)

    function handleViewportChange(v){
            setViewport(v)
    }

    const selectedPark = parks.find( p => {
        return p.id === parseInt(selectedMarker)
    })
   
    const renderMarkers = parks.map( p => {
        return (<Marker 
                    key={p.id} 
                    longitude={p.long} 
                    latitude={p.lat}
                    onClick={()=> {
                        setSelectedMarker(p.id)
                        // setViewport({latitude: p.lat, longitude: p.long, zoom: 11})
                    }}
                >
                    
                    <button className={ parseInt(selectedMarker) === p.id ? "selected" : 'marker'}>🌳</button>
                </Marker>)
    })
    const renderHome =  user.entity?.home ? <Marker className='marker' latitude={user.entity.home[1]} longitude={user.entity.home[0]}>🏠</Marker> : null
    const renderUser = user.location ? <Marker className='marker' latitude={user.location[1]} longitude={user.location[0]}>❌</Marker> : null

    // console.log(process.env.REACT_APP_MAPBOX_ACCESS_TOKEN)
    return (
       
           <div id='map_container'>
            <div id='map'>
                 <ReactMapGL                   
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
                    // transitionInterpolator={new FlyToInterpolator()}
                    // transitionDuration={10000}
                >
                    <FullscreenControl />
                    <NavigationControl />
                    {renderHome}                   
                    {renderUser}
                    {renderMarkers}
                </ReactMapGL>
 
               
            </div>
                {/* { user.location ? null : <Button>Geolocate</Button> } */}
                { selectedMarker ? <ParkBlurb park={selectedPark} /> : <p>Select a park for details</p> }
           </div>
    )
    
}

export default MapComp