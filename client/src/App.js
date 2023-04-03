import './App.css';
import Signup from './Signup';
import { useSelector } from 'react-redux';

function App() {

  const session = useSelector(state => state)

  console.log(session)


  return (
    <div className="App">
      
     <Signup />
      
    </div>
  );
}

export default App;
