import React, { useState } from 'react'
import { Button, Input, Label } from 'reactstrap'
import { useDispatch, useSelector } from 'react-redux'
import { login } from './features/sessionSlice'
import { useHistory } from 'react-router-dom'

function Login(){   

    const dispatch = useDispatch()
    const history = useHistory()
   
    const [ loginObj, setLoginObj ] = useState({
        username: 'demo',
        password: 'password'
    })

    const session = useSelector(state => state.session)
    function updateLoginObj(e){
        const copy = {...loginObj}
        copy[e.target.id] = e.target.value
        setLoginObj(copy)
    }

    function submitForm(e){
        e.preventDefault()
        dispatch(login(loginObj)).then(result =>{
            if(result.type === 'session/login/fulfilled'){
                history.push('/map')   
            }
        })
        setLoginObj({
            username: '',
            password: ''
        })
    }

    function navigateToSignup(){
        history.push('/signup')
    }
    
    return (
        <form 
            id='form'
            className='login'
            onSubmit={submitForm}>
                <h1>Login</h1>
            <div className='inputField'>

                <Label>Username</Label>
                <Input 
                    id='username' 
                    value={loginObj.username} 
                    onChange={updateLoginObj} 
                    required 
                />

            </div>

            <div className='inputField'>

                <Label>Password</Label>
                <Input 
                    type='password'
                    id='password' 
                    value={loginObj.password} 
                    onChange={updateLoginObj} 
                    required 
                />

            </div>

            <div className='inputField'>

                <Button color="primary" >Submit</Button>
                <p className='error'>{session?.error?.error}</p>

            </div>

            <p>New user? Signup <Button color='success' size='sm' id='signupHere' onClick={navigateToSignup}>HERE</Button></p>

            { session?.status === 'pending' ? <p className='loading'>Loading...</p> : null }
        </form>
    )
}

export default Login