
import { useParams } from 'react-router-dom'
function Home(){

    const { parkId } = useParams()
    console.log(parkId)

    return (
        <div className='switchContainer'>
   
            
        </div>
    )
}
export default Home