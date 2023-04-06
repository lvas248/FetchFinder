import { Input, Button } from 'reactstrap'
import { useDispatch } from 'react-redux'
import { uploadParkImages } from './features/park/parkSlice'

function MultipleImageUpload({id, clickBtn}){

    const dispatch = useDispatch()
  

    function submitUpload(e){
        e.preventDefault()
        const form = e.target
        const formData = new FormData(form)
        dispatch(uploadParkImages({formData: formData, park_id: id}))
        clickBtn()
    }

    return (
        <form 
            id='form'
            onSubmit={submitUpload}
        >

            <Input 
                name='images[]'
                type='file' 
                multiple
            />

            <Button>Upload</Button>
        </form>
    )

}

export default MultipleImageUpload