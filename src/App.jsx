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
  const [credentials, setCredentials] = useState({
    firstName: '', lastName: "", address: "", phoneNumber: ""
  });

  const [editable, setEditable] = useState(true);

  const handleChange = (event) => {
    const { name, value } = event.target;
    console.log(`handleChange for name = '${name}'`);
    setCredentials(prevState => ({
      ...prevState,
      [name]: value
    }))
  };

  if (editable) {
    return (
      <section className='inputSection'>
        <div className="sectionHeader">
          <h3>Credentials</h3>
          <button type='button' onClick={() => setEditable(false)}>save</button>
        </div>
        <InputItem label="First Name" name='firstName' onInput={handleChange} value={credentials.firstName}></InputItem>
        <InputItem label='Last Name' name='lastName' onInput={handleChange} value={credentials.lastName}></InputItem>
        <InputItem label='Address' name="address" onInput={handleChange} value={credentials.address}></InputItem>
        <InputItem label='Phone' name="phoneNumber" onInput={handleChange} value={credentials.phoneNumber}></InputItem>
      </section>
    );
  }

  return (
    <section className='inputSection'>
      <div className="sectionHeader">
        <h3>Credentials</h3>
        <button type='button' onClick={() => setEditable(true)}>Edit</button>
      </div>
      <h3>{credentials.firstName} {credentials.lastName}</h3>
      <p>Address: {credentials.address}</p>
      <p>Phone number: {credentials.phoneNumber}</p>
    </section>
  )
}

function Education() {
  const [education, setEducation] = useState([]);
  const [educationItem, setEducationItem] = useState({
    schoolName: '',
    studyTitle: '',
    studyStart: '',
    studyEnd: ''
  });
  const [editable, setEditable] = useState(true);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setEducationItem(prevState => ({
      ...prevState,
      [name]: value
    }))
  };

  const addItem = () => {
    // TODO: check if all fields are filled and with correct data
    console.log(`adding ${JSON.stringify(educationItem)} item`);

    const newItem = { ...educationItem, id: crypto.randomUUID() };
    setEducation([...education, newItem]);

    setEducationItem({
      schoolName: "",
      studyTitle: "",
      studyStart: "",
      studyEnd: ""
    });
    // reset input fields
  }

  const educationList = education.map((item) => {
    return (
      <div key={item.id} style={{ border: '1px solid black' }}>
        <h6>from {item.studyStart} to {item.studyEnd}</h6>
        <h4>School Name {item.schoolName}</h4>
        <h4>Study Title {item.studyTitle}</h4>
      </div>
    );

  });

  return (
    <section className='inputSection'>
      <div className="sectionHeader">
        <h3>Education Experience</h3>
        <button type='button' onClick={() => setEditable(!editable)}>
          {editable ? 'View' : 'Edit'}
        </button>
      </div>
      {editable ? (
        <>
          {educationList}
          <InputItem
            label='School name'
            name='schoolName'
            onInput={handleChange}
            value={educationItem.schoolName}
          />
          <InputItem
            label='Title of study'
            name='studyTitle'
            onInput={handleChange}
            value={educationItem.studyTitle}
          />
          <InputItem
            label='Start of study'
            name='studyStart'
            type='date'
            onInput={handleChange}
            value={educationItem.studyStart}
          />
          <InputItem
            label='End of study'
            name='studyEnd'
            type='date'
            onInput={handleChange}
            value={educationItem.studyEnd}
          />
          <div className='addNew'>
            <button type='button' onClick={addItem}>+</button>
          </div>
        </>
      ) : (
        educationList
      )}
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