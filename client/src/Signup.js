import React, { useState } from 'react'
import { Button, Input, Label } from 'reactstrap'
import { useDispatch, useSelector } from 'react-redux'
import { signup } from './features/sessionSlice'
import { useHistory } from 'react-router-dom'
function Signup(){

    const dispatch = useDispatch()
    const history = useHistory()
    const errors = useSelector( state => state.session.error)
    
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
                history.push('/home')   
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

            { errors?.hasOwnProperty('errors') ? <p className='error left'>{errors.errors.username}</p>: null }

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

            { errors?.hasOwnProperty('errors') && errors.errors.password_confirmation ? <p className='error left'>{errors.errors.password_confirmation}</p> : null }

            {/* <div className='inputField'>

                <Label>Home Address: </Label>
                <Input 
                    id='home_address' 
                    value={signupObj.home_address} 
                    onChange={updateSignupObj} 
                    required 
                />

            </div> */}

            <div className='inputField'>

                <Button color='primary' >Submit</Button>
                
            </div>

            <Button id='signupHere' size='sm' color='success' onClick={navigateToLogin}>BACK TO LOGIN</Button>
           
        </form>
    )
}

export default Signup