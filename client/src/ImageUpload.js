import { Input, Button } from 'reactstrap'
import { useDispatch } from 'react-redux'
import { uploadUserImage } from './features/user/userSlice'

function ImageUpload(){

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

            <Input 
                name='image'
                type='file' 
            />

            <Button>Upload</Button>
        </form>
    )

}

export default ImageUpload