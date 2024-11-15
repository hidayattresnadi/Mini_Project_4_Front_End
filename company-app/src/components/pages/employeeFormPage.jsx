import EmployeeForm from '../modules/employeeForm'
import FormLayout from '../templates/FormLayout';
import { failedSwal, successSwal, validateEmployee } from '../../helper';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import LoadingSpinner from '../elements/loading';

function EmployeeFormPage({ setErrors, setEditingEmployee, setDepartments, editingEmployee, departments, errors, setRefresh, refresh }) {
    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [errorStatus, setErrorStatus] = useState();

    const addEmployee = async (employee) => {
        try {
            const listErrors = validateEmployee(employee)
            setErrors(listErrors);
            if (Object.keys(listErrors).length === 0) {
                await axios.post('http://localhost:5227/Employee', employee)
                successSwal('Employee Added successfully');
                setRefresh(!refresh);
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
                setRefresh(!refresh);
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
                const DepartmentResponse = await axios.get(`http://localhost:5227/Department?pageNumber=1`);
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
            />
        </FormLayout>
    )
}

export default EmployeeFormPage;