import { useState } from "react";
import { InputItem } from "./InputItem";

import '../styles/WorkExperience.css'

import editIcon from '../assets/editIcon.svg'
import trashIcon from '../assets/trashIcon.svg'

export function WorkExperience() {
    const [workList, setWorkList] = useState([]);
    const [newWorkItem, setNewWorkItem] = useState({
        companyName: '',
        positionTitle: '',
        responsibilities: [],
        startOfWork: '',
        endOfWork: ''
    });
    const [editable, setEditable] = useState(true);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setNewWorkItem(prevState => ({
            ...prevState,
            [name]: value
        }))
    };

    const addRespItem = (item) => {
        const newRespArray = {
            ...newWorkItem, responsibilities:
                [...newWorkItem.responsibilities, { value: item, id: crypto.randomUUID() }]
        };
        setNewWorkItem(newRespArray);
    }


    const addItem = () => {
        // TODO: check if all fields are filled and with correct data
        const newItem = { ...newWorkItem, id: crypto.randomUUID() };
        setWorkList([...workList, newItem]);

        setNewWorkItem({
            companyName: '',
            positionTitle: '',
            responsibilities: [],
            startOfWork: '',
            endOfWork: ''
        });
        // reset input fields
    }

    const removeItem = (id) => {
        console.log(`Removing item with id = ${id}`);
        setWorkList(prevList => prevList.filter(item => item.id !== id));
    }

    const updateItem = (updatedItem) => {
        setWorkList(prevList => {
            return prevList.map(item => (item.id === updatedItem.id ? updatedItem : item));
        })
    }

    const WorkDOMList = workList.map((item) => {
        return <WorkItem
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
                <h3>Work Experience</h3>
                <div>
                    <button type='button' onClick={() => setEditable(!editable)}>
                        {editable ? 'Save' : 'Edit'}
                    </button>
                </div>
            </div>

            {WorkDOMList}
            {editable && (
                <WorkItemForm
                    workItem={newWorkItem}
                    handleChange={handleChange}
                    addItem={addItem}
                    addRespItem={addRespItem}
                />
            )}
        </section >
    );
}


function WorkItem({ item, editable, onRemove, onSave }) {
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

    const ResponsibilitiesList = item.responsibilities.map(resp => (
        <li key={resp.id}>{resp.value}</li>
    ));


    if (isEditMode) {
        return (
            <form className='educationItem'>
                <InputItem
                    label='Company Name'
                    name='companyName'
                    onInput={handleChange}
                    value={editedItem.companyName}
                />
                <InputItem
                    label='Position title'
                    name='positionTitle'
                    onInput={handleChange}
                    value={editedItem.positionTitle}
                />

                {/* TODO */}
                <ul>
                    {ResponsibilitiesList}
                </ul>
                <InputItem
                    label='start of work'
                    name='startOfWork'
                    type='date'
                    onInput={handleChange}
                    value={editedItem.startOfWork}
                />
                <InputItem
                    label='End of work'
                    name='endOfWork'
                    type='date'
                    onInput={handleChange}
                    value={editedItem.endOfWork}
                />
                <div>
                    <button onClick={handleSave}>Save</button>
                </div>
            </form>
        );
    }

    return (
        <div className='educationItem'>
            {item.endOfWork === '' ? (
                <h6>since {item.startOfWork}</h6>
            ) : (
                <h6>from {item.startOfWork} to {item.endOfWork}</h6>
            )}
            <p>Company Name: <span className='itemContent'>{item.companyName}</span></p>
            <p>Position Title: <span className='itemContent'>{item.positionTitle}</span></p>
            <ul>Responsibilities:
                {ResponsibilitiesList}
            </ul>
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

function WorkItemForm({ workItem, handleChange, addItem, addRespItem }) {
    return (
        <form>
            <InputItem
                label='Company name'
                name='companyName'
                onInput={handleChange}
                value={workItem.companyName}
            />
            <InputItem
                label='Position Title'
                name='positionTitle'
                onInput={handleChange}
                value={workItem.positionTitle}
            />

            <ResponsibilitiesInput list={workItem.responsibilities} addItem={addRespItem} />
            {/* <InputItem
                label='Responsibilities'
                name='responsibilities'
                onInput={handleChange}
                value={workItem.responsibilities}
            /> */}

            <InputItem
                label='Start Of Work'
                name='startOfWork'
                type='date'
                onInput={handleChange}
                value={workItem.startOfWork}
            />
            <InputItem
                label='End Of Work'
                name='endOfWork'
                type='date'
                onInput={handleChange}
                value={workItem.endOfWork}
            />
            <div className='addNew'>
                <button type='button' onClick={addItem}>+</button>
            </div>
        </form>
    );
}

function ResponsibilitiesInput({ list, addItem }) {
    const [respItem, setRespItem] = useState('');

    const handleChange = (event) => {
        setRespItem(event.target.value);
    }

    const handleAddItem = () => {
        addItem(respItem);
        setRespItem('');
    }

    const items = list.map(resp => (
        <li key={resp.id} >
            {resp.value}

            <div className="resp-actions">
                <button onClick={() => {
                    console.log(`editing responsibility`);
                }}>Edit</button>
                <button>Remove</button>
            </div>
        </li>
    ));

    return (
        <div className="responsibilities">
            <div className="add-resp-item">
                <div>Responsibilities:</div>
                <div className="resp-input">
                    <input onChange={handleChange} value={respItem}></input>
                    <button type='button' onClick={handleAddItem}>Add</button>
                </div>
            </div>
            <ul className="resp-list">{items}</ul>
        </div >
    );
}