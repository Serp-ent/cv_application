/* eslint-disable react/prop-types */
import './styles/App.css'
import './styles/SectionHeader.css'
import { InputItem } from './components/InputItem'
import { useState } from 'react'

import editIcon from './assets/editIcon.svg'
import trashIcon from './assets/trashIcon.svg'

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
      <PreviousWork />
      <div className='submit'>
        <button>
          Submit
        </button>
      </div>
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
        <form>
          <InputItem label="First Name" name='firstName' onInput={handleChange} value={credentials.firstName}></InputItem>
          <InputItem label='Last Name' name='lastName' onInput={handleChange} value={credentials.lastName}></InputItem>
          <InputItem label='Address' name="address" onInput={handleChange} value={credentials.address}></InputItem>
          <InputItem label='Phone' name="phoneNumber" onInput={handleChange} value={credentials.phoneNumber}></InputItem>
        </form>
      </section>
    );
  }

  return (
    <header>
      <div className='sectionHeader'>
        <h3>{credentials.firstName} {credentials.lastName}</h3>
        <div>
          <button type='button' onClick={() => setEditable(true)}>Edit</button>
        </div>
      </div>

      <div>
        <p>Address: {credentials.address}</p>
        <p>Phone number: {credentials.phoneNumber}</p>
      </div>
    </header >
  )
}

function Education() {
  const [educationList, setEducationList] = useState([]);
  const [newEducationItem, setNewEducationItem] = useState({
    schoolName: '',
    studyTitle: '',
    studyStart: '',
    studyEnd: ''
  });
  const [editable, setEditable] = useState(true);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setNewEducationItem(prevState => ({
      ...prevState,
      [name]: value
    }))
  };

  const addItem = () => {
    // TODO: check if all fields are filled and with correct data
    const newItem = { ...newEducationItem, id: crypto.randomUUID() };
    setEducationList([...educationList, newItem]);

    setNewEducationItem({
      schoolName: "",
      studyTitle: "",
      studyStart: "",
      studyEnd: ""
    });
    // reset input fields
  }

  const removeItem = (id) => {
    console.log(`Removing item with id = ${id}`);
    setEducationList(prevList => prevList.filter(item => item.id !== id));
  }

  const updateItem = (updatedItem) => {
    setEducationList(prevList => {
      return prevList.map(item => (item.id === updatedItem.id ? updatedItem : item.id));
    })
  }

  const EducationDOMlist = educationList.map((item) => {
    return <EducationItem
      key={item.id}
      item={item}
      editable={editable}
      onRemove={() => removeItem(item.id)}
      onSave={updateItem}
    />
  });

  const sectionName = (editable) ? "inputSection" : "result";
  return (
    <section className={sectionName}>
      <div className="sectionHeader">
        <h3>Education Experience</h3>
        <div>
          <button type='button' onClick={() => setEditable(!editable)}>
            {editable ? 'Save' : 'Edit'}
          </button>
        </div>
      </div>
      
      {EducationDOMlist}
      {editable && (
        <EducationItemForm
          educationItem={newEducationItem}
          handleChange={handleChange}
          addItem={addItem}
        />
      )}
    </section >
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

function EducationItem({ item, editable, onRemove, onSave }) {
  const [isEditMode, setEditMode] = useState(false);
  const [editedItem, setEditedItem] = useState({ ...item });

  const toggleEdit = () => {
    setEditMode(!isEditMode);
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedItem({ ...editedItem, [name]: value });
  }

  const handleSave = (e) => {
    onSave(editedItem);
    toggleEdit();
  }

  if (isEditMode) {
    return (
      <form className='educationItem'>
        <InputItem
          label='School name'
          name='schoolName'
          onInput={handleChange}
          value={editedItem.schoolName}
        />
        <InputItem
          label='Title of study'
          name='studyTitle'
          onInput={handleChange}
          value={editedItem.studyTitle}
        />
        <InputItem
          label='Start of study'
          name='studyStart'
          type='date'
          onInput={handleChange}
          value={editedItem.studyStart}
        />
        <InputItem
          label='End of study'
          name='studyEnd'
          type='date'
          onInput={handleChange}
          value={editedItem.studyEnd}
        />
        <div>
          <button onClick={handleSave}>Save</button>
        </div>
      </form>
    );
  }

  return (
    <div className='educationItem'>
      {item.studyEnd === '' ? (
        <h6>since {item.studyStart}</h6>
      ) : (
        <h6>from {item.studyStart} to {item.studyEnd}</h6>
      )}
      <p>School Name: <span className='itemContent'>{item.schoolName}</span></p>
      <p>Study Title: <span className='itemContent'>{item.studyTitle}</span></p>
      {editable && (
        <div className='actions'>
          <button className='itemActions'>
            <img src={editIcon} className='icon' onClick={toggleEdit} />
          </button>
          <button className='itemActions' onClick={onRemove}>
            <img src={trashIcon} className='icon' />
          </button>
        </div>
      )}
    </div>
  );

}

function EducationItemForm({ educationItem, handleChange, addItem }) {
  return (
    <form>
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
    </form>
  );
}

export default App