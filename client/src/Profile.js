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

            <img className='profileImg' alt={user.username} src={user.user_image ? user.user_image.url : "http://res.cloudinary.com/dfbe9u9zm/image/upload/v1680705302/cuhgah9jlswpb2uc7p9e.jpg"}/>

            
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
                        <Button onClick={clickEdit}>Edit</Button>
                    </div>  
                )
            }

  


        </div>
    )
}

export default Profile