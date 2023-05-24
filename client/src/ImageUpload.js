import { Input, Button } from 'reactstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { uploadUserImage, clearError  } from './features/user/userSlice'

function ImageUpload({navigateTo}){

    const dispatch = useDispatch()
    const error = useSelector( state => state.user.error)
    
    useEffect(()=>{
        return ()=>{
            dispatch(clearError())
        }
    },[])

    function submitUpload(e){
        e.preventDefault()
        const formData = new FormData(e.target)
        dispatch(uploadUserImage(formData)).then( data => {
            if(data.meta.requestStatus === 'fulfilled') navigateTo()
        })
    }

    return (
        <form 
            id='form'
            onSubmit={submitUpload}
        >
            <div className='labelContainer'>
                <h4 className='left'>Upload Image</h4>
                <p className='error'>{error?.image}</p>
            </div>
            
            <Input 
                className='inputField'
                name='image'
                type='file' 
            />

            <Button size='sm' color='success'>Upload</Button>
            <Button size='sm' color='warning' type='button' onClick={()=>navigateTo()}>Back</Button>
        </form>
    )

}

export default ImageUpload