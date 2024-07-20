/* eslint-disable react/prop-types */
import './styles/App.css'

import { Education } from './components/Education'
import { Credentials } from './components/Credentials';
import { WorkExperience } from './components/WorkExperience';

function App() {
  // const [count, setCount] = useState(0)

  return (
    <main>
      {
        /* TODO; 
        each section should contain button to save/edit fields
        */}
      <Credentials />
      <Education />
      <WorkExperience />
      <div className='submit'>
        <button>
          Submit
        </button>
      </div>
    </main>
  )
}



export default App