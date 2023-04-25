import { useDispatch, useSelector } from 'react-redux'
import { alphabetizeParks, reverseAlphabetizeParks, organizeParksByDistance } from './features/park/parkSlice'
function ParkFilter({updatefilterInput, filterInput}){

    const dispatch = useDispatch()
    const user = useSelector(state => state.user)

    function handleChange(e){
        if(e.target.value === 'alpha'){
            dispatch(alphabetizeParks())
        }else if(e.target.value === 'reverseAlpha'){
            dispatch(reverseAlphabetizeParks())
        }
        else{ dispatch(organizeParksByDistance())}
    }

    return (
        <div id='parkFilter'>

            <div className='filterDiv'>
                <label>Sort by: </label>
                <select onChange={handleChange}>
                    <option value='alpha'>A to Z</option>
                    <option value='reverseAlpha'>Z to A</option>
                    { user.location ? <option>Distance</option> : null}
                </select>
            </div>

            <div className='filterDiv'>

                <label>Search by name: </label>

                <input type='text' value={filterInput} onChange={updatefilterInput} />

            </div>

        </div>
    )
}
 export default ParkFilter