import { useParams } from 'react-router-dom';
import DetailLayout from '../templates/detailLayout';
import DepartmentDetailCard from '../modules/departmentCard';
import EmployeesPage from './employeesPage';
import LoadingSpinner from '../elements/loading';
import { useEffect, useState } from 'react';
import axios from 'axios';

function DepartmentDetailPage({ departments, employees, onEdit, onDelete, columns }) {
    const { id } = useParams();
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [departmentData,setDepartmentData] = useState();

    useEffect(() => {
        const loadData = async () => {
            try {
                const DepartmentResponse = await axios.get(`http://localhost:5227/Department/detail/${id}`);
                setDepartmentData(DepartmentResponse.data);
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
    }, [id, setDepartmentData]);

    if (loading) {
        return <LoadingSpinner/>; 
    }

    if (error) {
        return <div>{error}</div>; 
    }
    return (
        <>
            <DetailLayout title={'Department Details'}>
                <DepartmentDetailCard detailDepartment={departmentData} />
            </DetailLayout>
            {/* <EmployeesPage employees={departmentEmployees} departments={departments} columns={columns} onEdit={onEdit} onDelete={onDelete} /> */}
        </>


    )
}

export default DepartmentDetailPage;