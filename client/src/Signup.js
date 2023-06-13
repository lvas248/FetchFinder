import React, { useState } from 'react'
import { Button, Input, Label } from 'reactstrap'
import { useDispatch, useSelector } from 'react-redux'
import { signup } from './features/sessionSlice'
import { useHistory } from 'react-router-dom'
function Signup(){

    const dispatch = useDispatch()
    const history = useHistory()
    const session = useSelector( state => state.session)
    
    
    

    const [ signupObj, setSignupObj ] = useState({
        username: '',
        password: '',
        password_confirmation: ''
    })

    function updateSignupObj(e){
        const copy = {...signupObj}
        copy[e.target.id] = e.target.value
        setSignupObj(copy)
    }

    function submitForm(e){
        e.preventDefault()
        dispatch(signup(signupObj)).then( data => {
            if(data.meta.requestStatus === 'fulfilled'){
                history.push('/map')   
                setSignupObj({
                    username: '',
                    password: '',
                    password_confirmation: ''
                })
            }
        })
     
    }

    function navigateToLogin(){
        history.push('/')
    }

    return (
        <form 
            id='form'
            className='login'
            onSubmit={submitForm}>

            <h1>Signup</h1>

            <div className='inputField'>
                <div className='labelContainer'>
                    <Label>Username</Label>
                    <p className='error'>{session?.error?.errors?.username}</p>
                </div>
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
                <div className='labelContainer'>
                    <Label>Password Confirmation</Label>
                    <p className='error'>{session?.error?.errors?.password_confirmation}</p>
                </div>
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

            <Button id='signupHere' size='sm' color='success' onClick={navigateToLogin}>BACK TO LOGIN</Button>
           
            { session?.status === 'pending' ? <p className='loading'>Loading...</p> : null }

        </form>
    )
}

export default Signup