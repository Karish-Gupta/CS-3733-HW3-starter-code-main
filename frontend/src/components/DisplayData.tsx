import React, { useState, useEffect } from 'react';
import {cleaningService} from "../../../common/src/types";
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


export const GetData = () => {
    const [data, setData] = useState<cleaningService[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("/api/cleaning-request");

                if (!response.ok) {
                    throw new Error(`Error loading data: ${response.status} - ${response.statusText}`);
                }

                const result = await response.json();
                setData(result);
            } catch (err: any) {
                console.error(`Error loading data: ${err.message}`);
            } finally {
                setLoading(false);
            }
        };


        fetchData().then();
    }, []);

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

