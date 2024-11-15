import { useParams } from 'react-router-dom';
import DetailLayout from '../templates/detailLayout';
import ProjectDetailCard from '../modules/projectCard';
import WorksOnsPage from './WorksOnsPage';
import LoadingSpinner from '../elements/loading';
import { useEffect, useState } from 'react';
import axios from 'axios';

function ProjectDetailPage({ projects, departments, worksOns, employees, columns, onEdit, onDelete }) {
    const { id } = useParams();
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [projectData,setProjectData] = useState();
    useEffect(() => {
        const loadData = async () => {
            try {
                const ProjectResponse = await axios.get(`http://localhost:5227/Project/detail/${id}`);
                setProjectData(ProjectResponse.data);
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
    }, [id, setProjectData]);

    if (loading) {
        return <LoadingSpinner/>; 
    }

    if (error) {
        return <div>{error}</div>; 
    }
    return (
        <>
        <DetailLayout title={'Project Details'}>
            <ProjectDetailCard
            detailProject={projectData}
        />
        </DetailLayout>
        {/* <WorksOnsPage worksOns={worksOnProjects} projects={projects} employees={employees} columns={columns} onEdit={onEdit} onDelete={onDelete} /> */}
        </>
        

    )
}

export default ProjectDetailPage;