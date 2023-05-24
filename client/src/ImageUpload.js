import { Input, Button } from 'reactstrap'
import { useDispatch } from 'react-redux'
import { uploadUserImage } from './features/user/userSlice'

function ImageUpload({navigateTo}){

    const dispatch = useDispatch()

    function submitUpload(e){
        e.preventDefault()
        const formData = new FormData(e.target)
        dispatch(uploadUserImage(formData))
    }

    return (
        <form 
            id='form'
            onSubmit={submitUpload}
        >

            <h4 className='left'>Upload Image</h4>
            
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