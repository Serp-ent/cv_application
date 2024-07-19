import './styles/App.css'
import { InputItem } from './components/InputItem'

function App() {
  // const [count, setCount] = useState(0)

  return (
    <main>
      <form>
        {
        /* TODO; 
        each section should contain button to save/edit fields
        */}
        <section className='inputSection'>
          <h3>Credentials</h3>
          <InputItem name='First Name'></InputItem>
          <InputItem name='Last Name'></InputItem>
          <InputItem name='Address'></InputItem>
          <InputItem name='Phone number'></InputItem>
        </section>
        <section className='inputSection'>
          <h3>Educational experience</h3>
          <InputItem name='School name'></InputItem>
          <InputItem name='Title of study'></InputItem>
          <InputItem name='start of study' type='date'></InputItem>
          <InputItem name='end of study' type='date'></InputItem>
        </section>
        <section className='inputSection'>
          <h3>Practical experience</h3>
          <InputItem name='Company name'></InputItem>
          <InputItem name='position title'></InputItem>
          <InputItem name='main responsibilities'></InputItem>
          <InputItem name='start of work' type='date'></InputItem>
          <InputItem name='end of work' type='date'></InputItem>
        </section>

      </form>

      {/* <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p> */}
    </main>
  )
}

export default App
