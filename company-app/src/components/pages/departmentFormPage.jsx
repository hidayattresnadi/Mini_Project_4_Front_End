import axios from 'axios';
import LoadingSpinner from '../elements/loading';
import DepartmentForm from '../modules/departmentForm';
import FormLayout from '../templates/FormLayout';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { failedSwal, successSwal, validateDepartment } from '../../helper';

function DepartmentFormPage({ setEmployees, setErrors, editingDepartment,employees, errors, setEditingDepartment }) {
    const navigate = useNavigate();
    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [errorStatus, setErrorStatus] = useState();
    const [shouldNavigate, setShouldNavigate]=useState();

    const addDepartment = async (department) => {
        try {
            const listErrors = validateDepartment(department)
            setErrors(listErrors);
            if (Object.keys(listErrors).length === 0) {
                await axios.post('http://localhost:5227/Department', department)
                successSwal('Department Added successfully');
            }
            return listErrors;

        } catch (error) {
            setErrors(error.response.data)
            failedSwal(error.response.data)
            return error.response.data
        }
    };

    const updateDepartment = async (department) => {
        try {
            const listErrors = validateDepartment(department);
            setErrors(listErrors);

            if (Object.keys(listErrors).length === 0) {
                department.empNo = parseInt(department.empNo);
                await axios.put(`http://localhost:5227/Department/${id}`, department)
                successSwal('Employee Edited successfully');
                setEditingDepartment(null);
            }
            return listErrors;

        } catch (error) {
            setErrors(error.response.data)
            failedSwal(error.response.data)
            return error.response.data;
        }

    };

    useEffect(() => {
        const loadData = async () => {
            try {
                const EmployeeResponse = await axios.get(`http://localhost:5227/Employee/select`);
                setEmployees(EmployeeResponse.data);
                if (!id) {
                    setLoading(false);
                    return;
                }
                const departmentResponse = await axios.get(`http://localhost:5227/Department/${id}`);
                setEditingDepartment(departmentResponse.data);
            } catch (error) {
                setErrorStatus(true);
                console.log(error);
            } finally {
                setTimeout(() => {
                    setLoading(false);
                }, 2000);
            }
        };
        loadData();
    }, [id, setEmployees, setEditingDepartment, setErrorStatus]);

    useEffect(()=>{
        if (shouldNavigate) {
            navigate('/departments');
        }
    }, [shouldNavigate, navigate])

    if (loading) return <LoadingSpinner />;
    if (errorStatus) return <p>Error loading employees</p>;
    return (
        <FormLayout title={editingDepartment ? "Form to Update Department" : "Form to Add Department"}>
            <DepartmentForm
                employees={employees}
                addDepartment={addDepartment}
                updateDepartment={updateDepartment}
                editingDepartment={editingDepartment}
                errors={errors}
                shouldNavigate={shouldNavigate}
                setShouldNavigate={setShouldNavigate}
            />
        </FormLayout>
    )
}

export default DepartmentFormPage;