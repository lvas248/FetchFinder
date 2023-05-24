import { useDispatch ,useSelector } from "react-redux"
import React, { useState, useEffect } from 'react'
import { Button,Label, Input } from 'reactstrap'
import { editUser } from "./userSlice"
import { clearError } from "./userSlice"


function EditUserForm({user={}, navigateTo}){

    const dispatch = useDispatch()
    const error = useSelector(state => state.user.error)

    useEffect(()=>{
        return ()=>{
            dispatch(clearError())
        }
    },[dispatch])


    const [ userObj, setUserObj ] = useState({
        username: user.username
    })



    
 
    
    function updateUserObj(e){
        const copy = {...userObj}
        copy[e.target.name] = e.target.value
        setUserObj(copy)
    }

    function submitUpdate(e){
        e.preventDefault()
        dispatch(editUser(userObj)).then(data => {
            if(data.meta.requestStatus === 'fulfilled') navigateTo()
        })
  
    }

    return (
        <>
            <form 
                id='form'
                onSubmit={submitUpdate}
                >

                <h4 className='left'>Edit User Form</h4>

                <div className='inputField'>

                    <div className='labelContainer'>
                        <Label>Username</Label>
                        <p className='error left'>{error?.username}</p>
                    </div>

                    <Input
                        name='username'
                        placeholder='username'
                        value={userObj.username}
                        onChange={updateUserObj}
                    />     

                </div>

                <Button color='success' type='submit' size='sm'>Submit</Button>
                <Button color='warning' type='button' size='sm' onClick={()=>navigateTo()}>Back</Button>
            </form>

        </>
    )
}
export default EditUserForm