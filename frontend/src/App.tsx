import React, { useState } from 'react';
import './App.css';

import {GetData} from "./components/DisplayData";

//Initial fields/variables for the inputs to be placed in
function App() {
    const [formData, setFormData] = useState({
        employeeName: '',
        room: '',
        priorityLevel:'low',
        typeOfCleaning: 'regular',
        date: '',
        status:'unassigned',
    });

    //to update the page with data
    const [dataUpdateCounter, setDataUpdateCounter] = useState(0);

    //handles submit button
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
            setDataUpdateCounter((prevCounter) => prevCounter + 1);

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
                    <label htmlFor="empolyeeName">Employee Name:</label>
                    <input type="text" id="empolyeeName" name="employeeName" required value={formData.employeeName}
                           onChange={(e) => setFormData({...formData, employeeName: e.target.value})}/>
                    <br/>

                    <label htmlFor="status">Status:</label>
                    <select
                        id="status"
                        name="status"
                        required
                        value={formData.status}
                        onChange={(e) => setFormData({...formData, status: e.target.value})}
                    >
                        <option value="unassigned">Unassigned</option>
                        <option value="assigned">Assigned</option>
                        <option value="inProgress">In Progress</option>
                        <option value="completed">Completed</option>
                    </select>
                    <br/>

                    <label htmlFor="room">Room:</label>
                    <input type="text" id="room" name="room" required value={formData.room}
                           onChange={(e) => setFormData({...formData, room: e.target.value})}/>
                    <br/>

                    <label htmlFor="priorityLevel">Priority Level:</label>
                    <select id={"priorityLevel"} name={"priorityLevel"} required value={formData.priorityLevel}
                            onChange={(e) => setFormData({...formData, priorityLevel: e.target.value})}>
                        <option value={"low"}>Low Priority</option>
                        <option value={"medium"}>Medium Priority</option>
                        <option value={"high"}>High Priority</option>
                    </select>
                    <br/>

                    <label htmlFor="cleaningChoice">Cleaning Choice:</label>
                    <select id="cleaningChoice" name="cleaningChoice" required value={formData.typeOfCleaning}
                            onChange={(e) => setFormData({...formData, typeOfCleaning: e.target.value})}>
                        <option value={"regular"}>Regular Cleaning</option>
                        <option value={"deep"}>Deep Cleaning</option>
                        <option value={"emergency"}>Emergency Cleaning</option>
                    </select>
                    <br/>

                    <label htmlFor="text">Date:</label>
                    <input
                        type="text"
                        id="text"
                        name="date"
                        placeholder="MM/DD/YY"
                        value={formData.date}
                        onChange={(e) => setFormData({...formData, date: e.target.value})}
                        required
                    />
                    <br/>

                    <button type="submit">Submit</button>
                </form>
            </div>

            <GetData onUpdate={() => setDataUpdateCounter((prevCounter) => prevCounter + 1)} />
        </div>
    );
}

export default App;
