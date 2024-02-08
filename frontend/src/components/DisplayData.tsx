import React, { useState, useEffect } from 'react';
import {cleaningService} from "../../../common/src/types";

/**
 * populates the table on the webpage with the inputted data
 * @param tableData where we take in the data from the elements of each field in put this into html form
 */
function GenerateTableRows(tableData: cleaningService[]): JSX.Element[] {
    return tableData.map((item, index) => (
        <tr key={index}>
            <td>{item.date}</td>
            <td>{item.room}</td>
            <td>{item.employeeName}</td>
            <td>{item.priorityLevel}</td>
            <td>{item.typeOfCleaning}</td>
            <td>{item.status}</td>
        </tr>
    ));
}

//Headers for the Table; the GenerateTableRows is the function above which populates the actual data
const TableEdges: React.FC<{ tableData: cleaningService[] }> = ({tableData}) => {
    return (
        <table>
            <thead>
            <tr>
                <th>Date</th>
                <th>Room</th>
                <th>Employee Name</th>
                <th>Priority Level</th>
                <th>Cleaning Type</th>
                <th>Status</th>
            </tr>
            </thead>
            <tbody>
            {GenerateTableRows(tableData)}
            </tbody>
        </table>
    );
};

//to update the page in real time
interface GetDataProps {
    onUpdate: () => void;
}

export const GetData: React.FC<GetDataProps> = ({ onUpdate }) => {
    const [data, setData] = useState<cleaningService[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/api/cleaning-request');

                if (!response.ok) {
                    throw new Error(`Error loading data: ${response.status} - ${response.statusText}`);
                }

                const result = await response.json();
                setData(result);
                onUpdate(); //updates the page in real time
            } catch (err: any) {
                console.error(`Error loading data: ${err.message}`);
            } finally {
                setLoading(false);
            }
        };

        fetchData().then();
    }, [onUpdate]);

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

