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

    return (
        <div>

            <img className='profileImg' alt={user.username} src={user.image ? user.image.url : 'https://cdn.pixabay.com/photo/2018/11/13/21/43/avatar-3814049_1280.png' }/>

            
            {
                editBtnClick ? (
                    <>                    
                        <EditUserForm user={user} clickEdit={clickEdit}/> 

                        <Button onClick={clickEdit}>Back</Button>

                    </>
                    ):(
                    <div>
                        <label>Username: </label>
                        <h5>{user.username}</h5>
                        <Button size='sm' color='primary'onClick={clickEdit}>Edit</Button> 
                        <Button size='sm' color='danger'>Delete Account</Button>
                    </div>  
                )
            }

  


        </div>
    )
}

export default Profile