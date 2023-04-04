import React, { useState } from 'react'
import { Button, Input, Label } from 'reactstrap'
import { useDispatch, useSelector } from 'react-redux'
import { login } from './features/sessionSlice'
import { useHistory } from 'react-router-dom'

function Login(){   

    const dispatch = useDispatch()
    const history = useHistory()
   
    const [ loginObj, setLoginObj ] = useState({
        username: '',
        password: ''
    })

    const sessionError = useSelector(state => state.session.error)

    function updateLoginObj(e){
        const copy = {...loginObj}
        copy[e.target.id] = e.target.value
        setLoginObj(copy)
    }

    function submitForm(e){
        e.preventDefault()
        dispatch(login(loginObj)).then(result =>{
            if(result.type === 'session/login/fulfilled'){
                history.push('/profile')
            }
        })
        setLoginObj({
            username: '',
            password: ''
        })
    }
    
    return (
        <form 
            id='form'
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
                    id='password' 
                    value={loginObj.password} 
                    onChange={updateLoginObj} 
                    required 
                />

            </div>

            <div className='inputField'>

                <Button color="primary" >Submit</Button>
                
                { sessionError ? <p className='error'>{sessionError.error}</p> : null }
            </div>



        </form>
    )
}

export default Login