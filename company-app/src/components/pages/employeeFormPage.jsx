import EmployeeForm from '../modules/employeeForm'
import FormLayout from '../templates/FormLayout';
import { failedSwal, successSwal, validateEmployee } from '../../helper';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import LoadingSpinner from '../elements/loading';

function EmployeeFormPage({ setErrors, setEditingEmployee, setDepartments, editingEmployee, departments, errors}) {
    const { id } = useParams();
    const navigate = useNavigate()
    const [loading, setLoading] = useState(true);
    const [shouldNavigate, setShouldNavigate]=useState();
    const [errorStatus, setErrorStatus] = useState();

    const addEmployee = async (employee) => {
        try {
            const listErrors = validateEmployee(employee)
            setErrors(listErrors);
            if (Object.keys(listErrors).length === 0) {
                await axios.post('http://localhost:5227/Employee', employee)
                successSwal('Employee Added successfully');
            }
            return listErrors;

        } catch (error) {
            setErrors(error.response.data)
            failedSwal(error.response.data)
            return error.response.data
        }
    };

    const updateEmployee = async (employee) => {
        try {
            const listErrors = validateEmployee(employee);
            setErrors(listErrors);

            if (Object.keys(listErrors).length === 0) {
                employee.empNo = parseInt(employee.empNo);
                await axios.put(`http://localhost:5227/Employee/${id}`, employee)
                successSwal('Employee Edited successfully');
                setEditingEmployee(null);
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
                const DepartmentResponse = await axios.get(`http://localhost:5227/Department/select`);
                setDepartments(DepartmentResponse.data);
                if (!id) {
                    setLoading(false);
                    return;
                }
                const employeeResponse = await axios.get(`http://localhost:5227/Employee/${id}`);
                setEditingEmployee(employeeResponse.data);
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
    }, [id, setDepartments, setEditingEmployee, setErrorStatus]);

    useEffect(()=>{
        if (shouldNavigate) {
            navigate('/employees');
        }
    }, [shouldNavigate, navigate])

    if (loading) return <LoadingSpinner />;
    if (errorStatus) return <p>Error loading employees</p>;

    return (
        <FormLayout title={editingEmployee ? "Form to Update Employee" : "Form to Add Employee"}>
            <EmployeeForm
                addEmployee={addEmployee}
                departments={departments}
                updateEmployee={updateEmployee}
                editingEmployee={editingEmployee}
                errors={errors}
                shouldNavigate={shouldNavigate}
                setShouldNavigate={setShouldNavigate}
            />
        </FormLayout>
    )
}

export default EmployeeFormPage;