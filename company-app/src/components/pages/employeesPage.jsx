import { useNavigate } from 'react-router-dom';
import TableEmployees from '../modules/tableEmployees';
import TableLayout from '../templates/TableLayout';
import { useEffect, useState } from 'react';
import LoadingSpinner from '../elements/loading';
import axios from "axios";
import Swal from 'sweetalert2';

function EmployeesPage({ columns = { columns }, employees, setEmployees,refresh,setRefresh }) {
    const navigate = useNavigate();
    const buttonTitle = 'Add Employee';
    const onClick = () => navigate('/employees/new')
    const [loading, setLoading] = useState(true);
    const [errorStatus, setErrorStatus] = useState();

    useEffect(() => {
        const myFetch = async () => {
            try {
                const response = await axios.get(`http://localhost:5227/Employee?pageNumber=1`);
                setEmployees(response.data);
            } catch (error) {
                setErrorStatus(true);
                console.log("Error:", error);
            } finally {
                setTimeout(() => {
                    setLoading(false);
                }, 2000);
            }
        };
        myFetch();
    }, [refresh]);

    const handleDeleteEmployee = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await axios.delete(`http://localhost:5227/Employee/${id}`);
                    Swal.fire("Deleted!", "Employee Deleted successfully", "success");
                    // setEmployees(prevEmployees => prevEmployees.filter(employee => employee.id !== id));
                    setRefresh(!refresh); // trigger ulang fetch
                } catch (error) {
                    console.log("Error deleting employee:", error);
                    setErrorStatus(true);
                }
            }
        });
    };


    if (loading) return <LoadingSpinner />;
    if (errorStatus) return <p>Error loading employees</p>;

    return (
        <>
            <TableLayout title="List of Employees" buttonTitle={buttonTitle} onClick={onClick} >
                <TableEmployees columns={columns} employees={employees} onDelete={handleDeleteEmployee} />
            </TableLayout>
        </>
    )
}

export default EmployeesPage;