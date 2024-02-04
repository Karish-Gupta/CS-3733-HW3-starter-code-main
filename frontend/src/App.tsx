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

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            const res = await axios.post('/api/cleaning-request', JSON.stringify(formData), {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (res.status === 200) {
                console.log('Cleaning request sent');
            } else {
                console.log('Cleaning request failed');
            }
        } catch (error) {
            console.error('Cleaning request error:', error);
        }

        // Add any additional logic after the form submission if needed

        // Reset form data after submission
        setFormData({
            patientName: '',
            room: '',
            typeOfCleaning: '',
            date: '',
        });
    };


    return (
        <div>
            <div className={"form-container"}>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="patientName">Patient Name:</label>
                    <input type="text" id="patientName" name="patientName" required />
                    <br />

                    <label htmlFor="room">Room:</label>
                    <input type="text" id="room" name="room" required />
                    <br />

                    <label htmlFor="cleaningChoice">Cleaning Choice:</label>
                    <select id="cleaningChoice" name="cleaningChoice" required>
                        <option value="regular">Regular Cleaning</option>
                        <option value="deep">Deep Cleaning</option>
                        <option value="emergency">Emergency Cleaning</option>
                    </select>
                    <br />

                    <label htmlFor="text">Date:</label>
                    <input
                        type="text"
                        id="text"
                        name="date"
                        placeholder="MM/DD/YY"
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
