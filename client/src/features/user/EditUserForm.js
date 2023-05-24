import { useDispatch} from "react-redux"
import React, { useState } from 'react'
import { Button,Label, Input } from 'reactstrap'
import { editUser } from "./userSlice"
import ImageUpload from "../../ImageUpload"


function EditUserForm({user={}, clickEdit}){

    const dispatch = useDispatch()

    const [ userObj, setUserObj ] = useState({
        username: user ? user.username : ''
    })

 
    
    function updateUserObj(e){
        const copy = {...userObj}
        copy[e.target.name] = e.target.value
        setUserObj(copy)
    }

    function submitUpdate(e){
        e.preventDefault()
        dispatch(editUser(userObj))
        setUserObj({
            username: '',
            image_url: ''
        })
        clickEdit()
    }

    return (
        <>
            <form 
                id='form'
                onSubmit={submitUpdate}
                >

                <h1>Edit User Form</h1>

                <div className='inputField'>
                    <Label>Username</Label>
                    <Input
                        name='username'
                        placeholder='username'
                        value={userObj.username}
                        onChange={updateUserObj}
                    />                  
                </div>

                <Button color='primary'>Submit</Button>
            </form>
            <ImageUpload />

        </>
    )
}
export default EditUserForm