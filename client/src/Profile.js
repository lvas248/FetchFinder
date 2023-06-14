import { useSelector } from 'react-redux'
import { Button } from 'reactstrap'
import { Switch, Route, useHistory } from 'react-router-dom' 

import ImageUpload from './ImageUpload'
import EditUserForm from "./features/user/EditUserForm"

import { useDispatch } from 'react-redux'
import { deleteUser } from './features/user/userSlice'
import VisitedParks from './VisitedParks'

function Profile(){

    const dispatch = useDispatch()
    const user = useSelector(state => state.user.entity)
    const history = useHistory()



    function navigateTo(endPoint=''){
        history.push(`/profile/${endPoint}`)
    }

    function submitDelete(){
        dispatch(deleteUser()).then(data => {
            if(data.meta.requestStatus === 'fulfilled') history.push('')
        })

        
    }

    return (
        <div>
            <h1>{user.username}</h1>
            <img className='profileImg' alt={user.username} src={user.image ? user.image.url : 'https://cdn.pixabay.com/photo/2018/11/13/21/43/avatar-3814049_1280.png' }/>
            
            <div className='profileSwitchContainer'>
                <Switch>

                    <Route exact path='/profile'>
                        <Button size='sm' color='primary' onClick={()=>navigateTo('edit_username')}>Edit Username</Button> 
                        <Button size='sm' color='success' onClick={()=>navigateTo('edit_user_image')}>Change Profile Image</Button> 
                        <Button size='sm' color='danger' onClick={()=>navigateTo('delete_account')}>Delete Account</Button>

                        <VisitedParks />
                    </Route>

                    <Route path='/profile/edit_username'>
                        <EditUserForm user={user} navigateTo={navigateTo}/> 
                    </Route>

                    <Route path='/profile/edit_user_image'>
                        <ImageUpload navigateTo={navigateTo}/>
                    </Route>

                    <Route path='/profile/delete_account'>
                        <div>
                            <p>Are your sure?</p>
                            <div>
                                <Button color='warning' onClick={()=>navigateTo()}>Back</Button>
                                <Button color='danger' onClick={submitDelete}>Delete</Button>
                            </div>
                        </div>
                    </Route>

                </Switch>
  
            </div>


            
    

  


        </div>
    )
}

export default Profile