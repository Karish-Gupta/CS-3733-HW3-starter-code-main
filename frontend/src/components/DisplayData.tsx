import React, { useState, useEffect } from 'react';
import {cleaningService} from "common/src/types";
function GenerateTableRows(tableData: cleaningService[]): JSX.Element[] {
    return tableData.map((item, index) => (
        <tr key={index}>
            <td>{tableData[index].date}</td>
            <td>{tableData[index].room}</td>
            <td>{tableData[index].patientName}</td>
            <td>{tableData[index].typeOfCleaning}</td>
        </tr>
    ));
}

const TableEdges: React.FC<{ tableData: cleaningService[] }> = ({tableData}) => {
    return (
        <table>
            <thead>
            <tr>
                <th>Date</th>
                <th>Room</th>
                <th>Patient Name</th>
                <th>Cleaning Type</th>
            </tr>
            </thead>
            <tbody>
            {GenerateTableRows(tableData)}
            </tbody>
        </table>
    );
};


export const GetData = () => {
    const [data, setData] = useState<cleaningService[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Make a GET request to the API endpoint
                const response = await fetch("/api/cleaning-request");

                // Check if the request was successful (status code 2xx)
                if (!response.ok) {
                    throw new Error(`Error loading data: ${response.status}`);
                }

                // Parse the JSON response
                const result = await response.json();

                // Set the data in the state
                setData(result);
                console.log(result);
            } catch (err) {
                // Handle errors
                console.log(err);
            } finally {
                // Set loading to false, indicating that the request has completed
                setLoading(false);
            }
        };

        fetchData().then();
    }, []); //

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <br/>
            <TableEdges tableData={data}></TableEdges>
        </div>
    );
};

