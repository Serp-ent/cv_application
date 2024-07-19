import './styles/App.css'
import { InputItem } from './components/InputItem'
import { SectionHeader } from './components/SectionHeader'

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
          <SectionHeader title={'Credentials'}></SectionHeader>
          <CredentialsInput />
        </section>
        <section className='inputSection'>
          <SectionHeader title={'Education experience'}></SectionHeader>
          <EducationInput></EducationInput>
        </section>
        <section className='inputSection'>
          <SectionHeader title={'Work experience'}></SectionHeader>
          <PreviousWorkInput />
        </section>
        <div className='submit'>
          <button>
            Submit
          </button>
        </div>

      </form>
    </main>
  )
}

function CredentialsInput() {
  return (
    <>
      <InputItem name='First Name'></InputItem>
      <InputItem name='Last Name'></InputItem>
      <InputItem name='Address'></InputItem>
      <InputItem name='Phone number'></InputItem>
    </>
  );
}

function EducationInput() {
  return (
    <>
      <InputItem name='School name'></InputItem>
      <InputItem name='Title of study'></InputItem>
      <InputItem name='start of study' type='date'></InputItem>
      <InputItem name='end of study' type='date'></InputItem>
      <div className='addNew'>
        <button>+</button>
      </div>
    </>
  );
}

function PreviousWorkInput() {
  return (
    <>
      <InputItem name='Company name'></InputItem>
      <InputItem name='position title'></InputItem>
      <InputItem name='main responsibilities'></InputItem>
      <InputItem name='start of work' type='date'></InputItem>
      <InputItem name='end of work' type='date'></InputItem>
      <div className='addNew'>
        <button>+</button>
      </div>
    </>
  );
}

export default App
