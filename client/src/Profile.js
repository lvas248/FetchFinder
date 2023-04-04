import { useState } from 'react'
import EditUserForm from "./features/user/EditUserForm"
import { useSelector } from 'react-redux'
import { Button } from 'reactstrap'
function Profile(){


    const user = useSelector(state => state.user.entity)

    const [ editBtnClick, setEditBtnClick ] = useState(false)
    
    function clickEdit(){
        setEditBtnClick(!editBtnClick)
    }

    console.log(user)
    return (
        <div>
            {
                editBtnClick ? <EditUserForm user={user} clickEdit={clickEdit}/> :(
                <div>
                    <label>Username: </label>
                    <h5>{user.username}</h5>
                    <Button onClick={clickEdit}>Edit</Button>
                </div>  
                )
            }
  


        </div>
    )
}

export default Profile