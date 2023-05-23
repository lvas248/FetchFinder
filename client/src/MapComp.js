import ReactMapGL, { Marker, NavigationControl, FullscreenControl, Source, Layer } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css'

import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import ParkBlurb from './ParkBlurb';
import { useParams } from 'react-router-dom'
import { Button } from 'reactstrap';

function MapComp(){

    const params = useParams()
    const user = useSelector(state => state.user)
    const parks = useSelector(state => state.park.entity)
    const parkStatus = useSelector(state => state.park.status)
    const apiKey = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN


    const [ viewport, setViewport] = useState({
        latitude: 40.77686530072597,
        longitude: -73.85443092329274,
        zoom: 10,
        transitionDuration: 500
    })

    const [ route, setRoute ] = useState(null)
    
    const [ selectedMarker, setSelectedMarker ] = useState(params.parkId)
    
    const selectedPark = parks.find( p => {
        return p.id === parseInt(selectedMarker)
    })

        useEffect( ()=>{
            if(params.parkId){
                setViewport({
                    longitude: selectedPark?.central_coords[1],
                    latitude: selectedPark?.central_coords[0],
                    zoom: 18
                })
            }
        },[params])

    function handleViewportChange(v){
            setViewport(v)
    }
    

    function getRoute(){
        fetch(`https://api.mapbox.com/directions/v5/mapbox/driving/${user?.location[0]},${user.location[1]};${selectedPark.central_coors[1]},${selectedPark.central_coords[0]}?geometries=geojson&access_token=${apiKey}`)
        .then(res => res.json())
        .then(data => {
            setRoute({
                type: 'FeatureCollection',
                features: [
                  {
                    type: 'Feature',
                    geometry: data.routes[0].geometry,
                    properties: {}
                  }
                ]
              })
            })
    }

    const renderMarkers = parks.map( p => {
        return (<Marker 
                    key={p.id} 
                    longitude={p.central_coords[1]} 
                    latitude={p.central_coords[0]}
                    onClick={()=> {
                        setSelectedMarker(p.id)
                    }}
                >
                    
                    <button className={ parseInt(selectedMarker) === p.id ? "selected" : 'marker'}>🌳</button>
                </Marker>)
    })

    const parkGeometryArray = parks.map( p =>{
        return {
            type: 'Feature',
            geometry:{
                type: "Polygon",
                coordinates: [ p.coordinates ]
            },
            properties: {}
        }
    })

    const geojson = {
        type: 'FeatureCollection',
        features: parkGeometryArray
    }



    const renderUser = user.location ? <Marker className='marker' latitude={user.location[1]} longitude={user.location[0]}>❌</Marker> : null

    return (
       
           <div id='map_container'>
            <div id='map'>
                 <ReactMapGL                   
                    {...viewport}
                    mapboxApiAccessToken={apiKey}
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

                    {renderUser}
                    {renderMarkers}

                    
                    <Source
                        type='geojson'
                        data={geojson}
                    >
                        <Layer
                            id='polygon'
                            type='fill'
                            paint={{
                                'fill-color': '#f7ec04',
                                'fill-opacity': 1
                            }}
                        />
                    </Source>
                  


                 


                    {
                        route ? (
                            <Source type='geojson' data={route}>

                                <Layer
                                    id='route'
                                    type='line'
                                    paint={{
                                        'line-color': 'red',
                                        'line-width': 2,
                                    }}
                                />

                            </Source>   
                        ) : null
                    }
 
                </ReactMapGL>
 
            </div>
                { selectedMarker ? <ParkBlurb park={selectedPark} /> : <p>Select a park for details</p> }
                { parkStatus === 'pending' ? <p className='loading'>Loading...</p> : null }

                    <Button type='button' onClick={()=>getRoute()}>Get Route</Button>
           </div>
    )
    
}

export default MapComp