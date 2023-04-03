import React, { useState } from 'react'
import { Button, Input, Label } from 'reactstrap'
import { useDispatch } from 'react-redux'
import { signup } from './features/sessionSlice'

function Signup(){

    const dispatch = useDispatch()

    
    const [ signupObj, setSignupObj ] = useState({
        username: '',
        password: '',
        password_confirmation: ''
    })
    const [ errors, setErrors] = useState([])

    function updateSignupObj(e){
        const copy = {...signupObj}
        copy[e.target.id] = e.target.value
        setSignupObj(copy)
    }

    function submitForm(e){
        e.preventDefault()
        dispatch(signup(signupObj)).then(result =>{
            if(result.type === 'session/signup/rejected'){
              setErrors(result.payload.errors)
            }
        })
        setSignupObj({
            username: '',
            password: '',
            password_confirmation: ''
        })
    }

    const renderErrors = errors?.map( e => {
        return <li className='error' key={e}>{e}</li>
    })

    console.log()
    return (
        <form 
            id='form'
            onSubmit={submitForm}>

            <h1>Signup</h1>

            <div className='inputField'>

                <Label>Username</Label>
                <Input 
                    id='username' 
                    value={signupObj.username} 
                    onChange={updateSignupObj} 
                    required 
                />

            </div>

            <div className='inputField'>

                <Label>Password</Label>
                <Input 
                    id='password' 
                    value={signupObj.password} 
                    onChange={updateSignupObj} 
                    required 
                />

            </div>

            <div className='inputField'>

                <Label>Password Confirmation</Label>
                <Input 
                    id='password_confirmation' 
                    value={signupObj.password_confirmation} 
                    onChange={updateSignupObj} 
                    required 
                />

            </div>

            <div className='inputField'>

                <Button color='primary' >Submit</Button>
                
            </div>

            <ul className='errorList'>{renderErrors}</ul>
           
        </form>
    )
}

export default Signup