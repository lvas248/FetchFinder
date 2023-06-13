import ReactMapGL, { Marker, Source, Layer } from 'react-map-gl';
import { Button } from 'reactstrap'

import 'mapbox-gl/dist/mapbox-gl.css'

import React, { useState, useEffect, useRef, useMemo } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { getUserPosition } from './features/user/userSlice';

import ParkBlurb from './ParkBlurb';

function MapComp(){

    const { parkId } = useParams()
    const user = useSelector(state => state.user)
    const parks = useSelector(state => state.park.entity)
    const parkStatus = useSelector(state => state.park.status)
    const apiKey = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN
    const mapRef = useRef(null)
    const dispatch = useDispatch()

    const [ viewport, setViewport] = useState({
        latitude: 40.68216366325822,
        longitude: -73.99999977096383,
        zoom: 9.25,
        transitionDuration: 500
    })

    const [ route, setRoute ] = useState(null)
    
    const [ selectedMarker, setSelectedMarker ] = useState(parkId || null)
    
    const selectedPark = parks.find( p =>  p.id === parseInt(selectedMarker))

    useEffect( ()=>{
        if(selectedPark && parkId){
            setViewport({
                longitude: selectedPark?.central_coords[1],
                latitude: selectedPark?.central_coords[0],
                zoom: 18
            })
        }
    },[ parkId ])

    function handleViewportChange(v){
            setViewport(v)
    }

    function selectMarker(p){
        setSelectedMarker(p.id)
        setRoute(null)
    }

    function getRoute(){
        fetch(`https://api.mapbox.com/directions/v5/mapbox/driving/${user?.location[0]},${user.location[1]};${selectedPark.central_coords[1]},${selectedPark.central_coords[0]}?geometries=geojson&access_token=${apiKey}`)
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
                mapRef.current.fitBounds(
                    [
                        [user.location[0], user.location[1]],
                        [selectedPark.central_coords[1], selectedPark.central_coords[0]]
                    ],
                    {
                        padding: 60,
                        duration: 2000
                    }
                )

            })
    }

    function routeClick(e){
        if(e.target.textContent === 'Get Route') getRoute() 
        else setRoute(null)
    }

    function zoomOnPark(){
        if (mapRef.current){
            mapRef.current.flyTo({
                center: [ selectedPark.central_coords[1], selectedPark.central_coords[0]],
                zoom: 18,
                duration: 2000
            })            
        }

    }

    function zoomOut(){
        if (mapRef.current){
       
            mapRef.current.flyTo({
                center: [ -73.99999977096383, 40.68216366325822],
                zoom: 9.25,
                duration: 2000
            })
        }
    }

    function zoomToUser(){
        if(user.location && mapRef.current){
            mapRef.current.flyTo({
                center: [ user?.location[0], user?.location[1]],
                zoom: 13,
                duration: 2000
            })  
        }else{
            dispatch(getUserPosition())
        }

    }

    const renderMarkers = useMemo(()=> parks.map( p => {
            return <Marker 
                key={p.id} 
                longitude={p.central_coords[1]} 
                latitude={p.central_coords[0]}
                onClick={()=>selectMarker(p)}
            >
                <button className={ parseInt(selectedMarker) === p.id ? "selected" : 'marker'}>🌳</button>
            </Marker>
            }),[parks, selectedMarker])
 
    const geojson = {
        type: 'FeatureCollection',
        features:  parks.map( p =>{
            return {
                type: 'Feature',
                geometry:{
                    type: "Polygon",
                    coordinates: [ p.coordinates ]
                },
                properties: {}
            }
        })
    }

    const renderUser = user.location ? <Marker className='marker' anchor='center' latitude={user.location[1]} longitude={user.location[0]}>❌</Marker> : null

    return (
       
           <div id='map_container'>
            <div id='map'>
                 <ReactMapGL  
                    ref={mapRef}                 
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
                 
                    {user.location ? renderUser : null }
                    {renderMarkers}

                    <Source
                        type='geojson'
                        data={geojson}
                    >
                        <Layer
                            // id='polygon'
                            type='fill'
                            paint={{
                                'fill-color': '#f7ec04',
                                'fill-opacity': 1,
                                'fill-outline-color':'black'
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

                    <div className='mapBtn'>
                        { selectedPark ? <Button size='sm' color='warning' onClick={zoomOnPark}>Closer Look</Button> : null }
                        <Button size='sm' color='warning' onClick={zoomOut}>View Entire Map</Button>
                        {  user.location && selectedPark ? <Button size='sm' color='warning' onClick={routeClick}>{ route ? 'Clear Route' : 'Get Route'}</Button> : null }
                        <Button size='sm' color='warning' onClick={zoomToUser}>{ user.location? '👤' : '📍'}</Button>
                    </div>

                </ReactMapGL>
 
            </div>
                { selectedMarker ? <ParkBlurb park={selectedPark} /> : <p>Select a park for details</p> }
                { parkStatus === 'pending' ? <p className='loading'>Loading...</p> : null }
           </div>
    )
    
}

export default MapComp