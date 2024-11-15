import { useParams } from 'react-router-dom';
import EmployeeDetailCard from '../modules/employeeCard';
import DetailLayout from '../templates/detailLayout';
import WorksOnsPage from './WorksOnsPage';
import { useEffect, useState } from 'react';
import axios from 'axios';
import LoadingSpinner from '../elements/loading';

function EmployeeDetailPage({ setRefresh, refresh, setWorksOns, worksOns, columns }) {
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
    
    return (
        <>
            <DetailLayout title="Employee Details">
                    <EmployeeDetailCard detailEmployee={employeeData} />
            </DetailLayout>

            <WorksOnsPage
            columns = { columns } 
            worksOns ={worksOns} 
            setWorksOns ={setWorksOns} 
            refresh ={refresh} 
            setRefresh ={setRefresh}
            />
        </>
    )
}

export default EmployeeDetailPage;