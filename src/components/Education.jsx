import { useState } from "react";
import { InputItem } from "./InputItem";

import editIcon from '../assets/editIcon.svg'
import trashIcon from '../assets/trashIcon.svg'

export function Education() {
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
            return prevList.map(item => (item.id === updatedItem.id ? updatedItem : item));
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