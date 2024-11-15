import { useNavigate } from 'react-router-dom';
import TableLayout from '../templates/TableLayout';
import { useEffect, useState } from 'react';
import LoadingSpinner from '../elements/loading';
import TableProjects from '../modules/tableProjects';
import axios from 'axios';
import Swal from 'sweetalert2';

function ProjectsPage({ columns = { columns }, projects, setProjects, refresh, setRefresh }) {
    const navigate = useNavigate();
    const buttonTitle = 'Add Project';
    const onClick = ()=>navigate('/projects/new')
    const [loading, setLoading] = useState(true);
    const [errorStatus, setErrorStatus] = useState();

    useEffect(() => {
        const myFetch = async () => {
            try {
                const response = await axios.get(`http://localhost:5227/Project?pageNumber=1`);
                setProjects(response.data);
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

    const handleDeleteProject = (id) => {
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
                    await axios.delete(`http://localhost:5227/Project/${id}`);
                    Swal.fire("Deleted!", "Project Deleted successfully", "success");
                    setRefresh(!refresh);
                } catch (error) {
                    console.log("Error deleting project:", error);
                    setErrorStatus(true);
                }
            }
        });
    };

    if (loading) return <LoadingSpinner />;
    if (errorStatus) return <p>Error loading employees</p>;

    return (
        <>
        <TableLayout title="List of Projects" buttonTitle={buttonTitle} onClick={onClick} >
            <TableProjects columns={columns} projects={projects} onDelete={handleDeleteProject} />
        </TableLayout>
        </>
    )
}

export default ProjectsPage;