import { useNavigate } from 'react-router-dom';
import TableLayout from '../templates/TableLayout';
import { useEffect, useState } from 'react';
import LoadingSpinner from '../elements/loading';
import TableDepartments from '../modules/tableDepartments';
import axios from 'axios';
import Swal from 'sweetalert2';

function DepartmentsPage({ columns = { columns }, departments, setDepartments, setRefresh, refresh}) {
    const navigate = useNavigate();
    const buttonTitle = 'Add Department';
    const onClick = ()=>navigate('/departments/new')
    const [loading, setLoading] = useState(true);
    const [errorStatus, setErrorStatus] = useState();

    useEffect(() => {
        const myFetch = async () => {
            try {
                const response = await axios.get(`http://localhost:5227/Department?pageNumber=1`);
                setDepartments(response.data);
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

    const handleDeleteDepartment = (id) => {
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
                    await axios.delete(`http://localhost:5227/Department/${id}`);
                    Swal.fire("Deleted!", "Department Deleted successfully", "success");
                    // setDepartments(prevDepartments => prevDepartments.filter(department => department.deptNo !== id));
                    setRefresh(!refresh);
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
        {loading ? <LoadingSpinner/> : <TableLayout title="List of Departments" buttonTitle={buttonTitle} onClick={onClick} >
            <TableDepartments columns={columns} departments={departments}  onDelete={handleDeleteDepartment} />
        </TableLayout> }
        </>
    )
}

export default DepartmentsPage;