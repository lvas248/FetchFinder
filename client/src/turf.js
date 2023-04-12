import * as turf from '@turf/turf'
import { useSelector } from 'react-redux';

function updateParkDistances(coord1,coord2){

    const distance = turf.distance(turf.point(coord1), turf.point(coord2), { units: 'miles'})
    return Number(distance).toFixed(2) + ' miles'

}

export default updateParkDistances;