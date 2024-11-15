import { useParams } from 'react-router-dom';
import EmployeeDetailCard from '../modules/employeeCard';
import DetailLayout from '../templates/detailLayout';
import WorksOnsPage from './WorksOnsPage';
import { useEffect, useState } from 'react';
import axios from 'axios';
import LoadingSpinner from '../elements/loading';

function EmployeeDetailPage({ employees, projects, departments, worksOns, columns, onEdit, onDelete }) {
    const { id } = useParams();
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [employeeData,setEmployeeData] = useState();
    useEffect(() => {
        const loadData = async () => {
            try {
                const EmployeeResponse = await axios.get(`http://localhost:5227/Employee/detail/${id}`);
                setEmployeeData(EmployeeResponse.data);
            } catch (error) {
                setError(true);
                console.log(error);
            }
            finally {
                setTimeout(() => {
                    setLoading(false)
                }, 1000);
            }
        };
        loadData();
    }, [id, setEmployeeData]);

    if (loading) {
        return <LoadingSpinner/>; 
    }

    if (error) {
        return <div>{error}</div>; 
    }
    
    // const worksOnEmployees = worksOns.filter((worksOn) => worksOn.empNo === id);
    return (
        <>
            <DetailLayout title="Employee Details">
                    <EmployeeDetailCard detailEmployee={employeeData} />
            </DetailLayout>

            {/* <WorksOnsPage worksOns={worksOnEmployees} projects={projects} employees={employees} columns={columns} onEdit={onEdit} onDelete={onDelete} /> */}
        </>

    )
}

export default EmployeeDetailPage;