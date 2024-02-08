import React, { useState } from 'react';
import './App.css';
import axios from 'axios';
import {GetData} from "./components/DisplayData";

function App() {
    const [formData, setFormData] = useState({
        patientName: '',
        room: '',
        typeOfCleaning: '',
        date: '',
    });

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const response = await fetch('/api/cleaning-request', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error(`Error submitting form: ${response.status}`);
            }

            // Optionally, you can fetch updated data after a successful submission
            // const updatedData = await fetchData();
            // setData(updatedData);

            console.log('Form submitted successfully');
        } catch (error) {
            // @ts-ignore
            console.error(`Error submitting form: ${error.message}`);
        }
    };


    return (
        <div>
            <div className={"form-container"}>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="patientName">Patient Name:</label>
                    <input type="text" id="patientName" name="patientName" required value={formData.patientName} onChange={(e) => setFormData({ ...formData, patientName: e.target.value })}/>
                    <br />

                    <label htmlFor="room">Room:</label>
                    <input type="text" id="room" name="room" required value={formData.room} onChange={(e) => setFormData({ ...formData, room: e.target.value })}/>
                    <br />

                    <label htmlFor="cleaningChoice">Cleaning Choice:</label>
                    <select id="cleaningChoice" name="cleaningChoice" required value={formData.typeOfCleaning} onChange={(e) => setFormData({ ...formData, typeOfCleaning: e.target.value })}>
                        <option value={"regular"}>Regular Cleaning</option>
                        <option value={"deep"}>Deep Cleaning</option>
                        <option value={"emergency"} >Emergency Cleaning</option>
                    </select>
                    <br />

                    <label htmlFor="text">Date:</label>
                    <input
                        type="text"
                        id="text"
                        name="date"
                        placeholder="MM/DD/YY"
                        value={formData.date}
                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                        required
                    />
                    <br />

                    <button type="submit">Submit</button>
                </form>
            </div>

            <GetData></GetData>
            </div>
    );
}

export default App;
