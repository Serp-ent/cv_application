
import { useState } from "react";
import { InputItem } from "./InputItem";

export function Credentials() {
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

