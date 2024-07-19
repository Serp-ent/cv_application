import './styles/App.css'
import './styles/SectionHeader.css'
import { InputItem } from './components/InputItem'
import { useState } from 'react'

function App() {
  // const [count, setCount] = useState(0)

  return (
    <main>
      <form>
        {
        /* TODO; 
        each section should contain button to save/edit fields
        */}
        <Credentials />
        <Education />
        <PreviousWork />
        <div className='submit'>
          <button>
            Submit
          </button>
        </div>
      </form>
    </main>
  )
}

function Credentials() {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [address, setAddress] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [editable, setEditable] = useState(true);

  const handleFirstNameChange = (event) => {
    setFirstName(event.target.value)
  };
  const handleLastNameChange = (event) => {
    setLastName(event.target.value)
  };
  const handleAddressChange = (event) => {
    setAddress(event.target.value)
  };
  const handlePhoneChange = (event) => {
    setPhoneNumber(event.target.value)
  };

  if (editable) {
    return (
      <section className='inputSection'>
        <div className="sectionHeader">
          <h3>Credentials</h3>
          <button type='button' onClick={() => setEditable(false)}>save</button>
        </div>
        <InputItem name='First Name' onInput={handleFirstNameChange} value={firstName}></InputItem>
        <InputItem name='Last Name' onInput={handleLastNameChange} value={lastName}></InputItem>
        <InputItem name='Address' onInput={handleAddressChange} value={address}></InputItem>
        <InputItem name='Phone' onInput={handlePhoneChange} value={phoneNumber}></InputItem>
      </section>
    );
  }

  return (
    <section className='inputSection'>
      <div className="sectionHeader">
        <h3>Credentials</h3>
        <button type='button' onClick={() => setEditable(true)}>Edit</button>
      </div>
      <h3>{firstName} {lastName}</h3>
      <p>Address: {address}</p>
      <p>Phone number: {phoneNumber}</p>
    </section>
  )
}

function Education() {
  return (
    <section className='inputSection'>
      {/* <SectionHeader title={'Education experience'}></SectionHeader> */}
      {/* <InputItem name='School name'></InputItem>
      <InputItem name='Title of study'></InputItem>
      <InputItem name='start of study' type='date'></InputItem>
      <InputItem name='end of study' type='date'></InputItem> */}
      <div className='addNew'>
        <button type='button'>+</button>
      </div>
    </section>
  );
}

function PreviousWork() {
  return (
    <section className='inputSection'>
      {/* <SectionHeader title={'Work experience'}></SectionHeader> */}
      {/* <InputItem name='Company name'></InputItem>
      <InputItem name='position title'></InputItem>
      <InputItem name='main responsibilities'></InputItem>
      <InputItem name='start of work' type='date'></InputItem>
      <InputItem name='end of work' type='date'></InputItem> */}
      <div className='addNew'>
        <button>+</button>
      </div>
    </section>
  );
}

export default App