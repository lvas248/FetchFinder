import { Input, Button } from 'reactstrap'
import { useDispatch, useSelector } from 'react-redux'
import { uploadParkImages, clearError } from './features/park/parkSlice'
import { useEffect } from 'react'

function MultipleImageUpload({id, clickBtn}){

    const dispatch = useDispatch()
    const error = useSelector( state => state.park.error)

    useEffect(()=>{
        return ()=>{
            dispatch(clearError())
        }
    })
    function submitUpload(e){
        e.preventDefault()
        const form = e.target
        const formData = new FormData(form)
        dispatch(uploadParkImages({formData: formData, park_id: id})).then(data => {
            if(data.meta.requestStatus === 'fulfilled')clickBtn()
        })
        
    }

    return (
        <form 
            id='form'
            onSubmit={submitUpload}
        >
            <div className='labelContainer'>
                <h6 className='left'>Upload Images</h6>
                <p className='error'>{error?.image}</p>                
            </div>

            <Input 
                name='images[]'
                type='file' 
                multiple
            />

            <Button size='sm' color='success'>Upload</Button>
            <Button size='sm' type='button' color='warning' onClick={clickBtn}>Back</Button>
        </form>
    )

}

export default MultipleImageUpload