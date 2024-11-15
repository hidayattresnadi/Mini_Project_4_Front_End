import { useEffect, useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import HomePage from "../components/pages/homepage";
import Layout from "../components/templates/layout";
import Swal from "sweetalert2";
import { successSwal } from "../helper";
import EmployeesPage from "../components/pages/employeesPage";
import EmployeeFormPage from "../components/pages/employeeFormPage";
import EmployeeDetailPage from "../components/pages/employeeDetailPage";
import DepartmentsPage from "../components/pages/departmentsPage";
import DepartmentFormPage from "../components/pages/departmentFormPage";
import DepartmentDetailPage from "../components/pages/departmentDetailPage";
import ProjectsPage from "../components/pages/projectsPage";
import ProjectFormPage from "../components/pages/projectFormPage";
import ProjectDetailPage from "../components/pages/projectDetailPage";
import WorksOnsPage from "../components/pages/WorksOnsPage";
import WorksOnFormPage from "../components/pages/worksOnFormPage";
import WorksOnDetailPage from "../components/pages/worksOnDetailPage";

const columnsTableEmployees = ["Id", "First Name", "Last Name", "Position", "Department Number", "Edit", "Delete", "Detail"];
const columnsTableDepartments = ["Id", "Department Name", "Manager Name", "Edit", "Delete", "Detail"];
const columnsTableProjects = ["Id", "Project Name", "Department", "Edit", "Delete", "Detail"];
const columnsTableWorksOns = ["Id", "Employee Name", "Project Name", "Date Worked", "Hours Worked", "Edit", "Delete", "Detail"];

const AppRouter = () => {
    const getEmployeesFromLocalStorage = () => {
        const savedEmployees = localStorage.getItem('employees');
        return savedEmployees ? JSON.parse(savedEmployees) : [
            { id: '2fa03f06-ec99-4419-a63b-7a9cb9ab5ac7', fName: "Kishimoto", lName: 'Masashi', dob: "1999-08-12", position: 'Manager', sex: "Male", deptNo: '2fa03f06-ec99-4419-a63b-7a9cb9ab5ac4', address: "Bandung" },
            { id: '2fa03f06-ec99-4419-a63b-7a9cb9ab5ac6', fName: "Eiichiro", lName: 'Oda', dob: "1999-09-12", position: 'Manager', sex: "Male", deptNo: '2fa03f06-ec99-4419-a63b-7a9cb9ab5ac3', address: "Jakarta" },
            { id: '2fa03f06-ec99-4419-a63b-7a9cb9ab5ac5', fName: 'Akira', lName: 'Toriyama', dob: "1999-07-12", position: 'Manager', sex: "Male", deptNo: '2fa03f06-ec99-4419-a63b-7a9cb9ab5ac2', address: "Bogor" }
        ];
    };

    const getDepartmentsFromLocalStorage = () => {
        const savedDepartments = localStorage.getItem('departments');
        return savedDepartments ? JSON.parse(savedDepartments) : [
            { id: '2fa03f06-ec99-4419-a63b-7a9cb9ab5ac4', deptName: "IT", mgrEmpNo: '2fa03f06-ec99-4419-a63b-7a9cb9ab5ac7' },
            { id: '2fa03f06-ec99-4419-a63b-7a9cb9ab5ac3', deptName: "HR", mgrEmpNo: '2fa03f06-ec99-4419-a63b-7a9cb9ab5ac6' },
            { id: '2fa03f06-ec99-4419-a63b-7a9cb9ab5ac2', deptName: "Marketting", mgrEmpNo: '2fa03f06-ec99-4419-a63b-7a9cb9ab5ac5' }
        ];
    };

    const getProjectsFromLocalStorage = () => {
        const savedProjects = localStorage.getItem('projects');
        return savedProjects ? JSON.parse(savedProjects) : [
            { id: '2fa03f06-ec99-4419-a63b-7a9cb9ab5ac1', projName: "A", deptNo: '2fa03f06-ec99-4419-a63b-7a9cb9ab5ac4' },
            { id: '2fa03f06-ec99-4419-a63b-7a9cb9ab5ac0', projName: "B", deptNo: '2fa03f06-ec99-4419-a63b-7a9cb9ab5ac3' },
            { id: '2fa03f06-ec99-4419-a63b-7a9cb9ab4ac7', projName: "C", deptNo: '2fa03f06-ec99-4419-a63b-7a9cb9ab5ac2' }
        ];
    };

    const getWorksOnsFromLocalStorage = () => {
        const savedWorksOns = localStorage.getItem('worksOns');
        return savedWorksOns ? JSON.parse(savedWorksOns) : [
            { id: '2fa03f06-ec99-4419-a63b-7a9cb9ab3ac7', projNo: '2fa03f06-ec99-4419-a63b-7a9cb9ab5ac1', empNo: '2fa03f06-ec99-4419-a63b-7a9cb9ab5ac7', dateWorked: '2024-10-14', hoursWorked: 5 },
            { id: '2fa03f06-ec99-4419-a63b-7a9cb9ab2ac7', projNo: '2fa03f06-ec99-4419-a63b-7a9cb9ab5ac0', empNo: '2fa03f06-ec99-4419-a63b-7a9cb9ab5ac6', dateWorked: '2024-10-15', hoursWorked: 6 },
            { id: '2fa03f06-ec99-4419-a63b-7a9cb9ab1ac7', projNo: '2fa03f06-ec99-4419-a63b-7a9cb9ab4ac7', empNo: '2fa03f06-ec99-4419-a63b-7a9cb9ab5ac5', dateWorked: '2024-10-16', hoursWorked: 4 }
        ];
    };

    const [employees, setEmployees] = useState(getEmployeesFromLocalStorage());
    const [departments, setDepartments] = useState(getDepartmentsFromLocalStorage());
    const [projects, setProjects] = useState(getProjectsFromLocalStorage());
    const [worksOns, setWorksOns] = useState(getWorksOnsFromLocalStorage());
    const [refresh, setRefresh] = useState(false);

    useEffect(() => {
        localStorage.setItem('departments', JSON.stringify(departments));
    }, [departments]);

    useEffect(() => {
        localStorage.setItem('projects', JSON.stringify(projects));
    }, [projects]);

    useEffect(() => {
        localStorage.setItem('worksOns', JSON.stringify(worksOns));
    }, [worksOns]);

    const [selectedEmployeeId, setSelectedEmployeeId] = useState(null);
    const [editingEmployee, setEditingEmployee] = useState(null);
    const [selectedDepartmentId, setSelectedDepartmentId] = useState(null);
    const [editingDepartment, setEditingDepartment] = useState(null);
    const [selectedProjectId, setSelectedProjectId] = useState(null);
    const [editingProject, setEditingProject] = useState(null);
    const [selectedWorksOnId, setSelectedWorksOnId] = useState(null);
    const [editingWorksOn, setEditingWorksOn] = useState(null);
    const [errors, setErrors] = useState(null);

    const handleEditEmployee = (id) => {
        setSelectedEmployeeId(id);
        const employeeToEdit = employees.find((employee) => employee.id == id);
        setEditingEmployee(employeeToEdit);
    };

    const handleEditProject = (id) => {
        setSelectedProjectId(id);
        const projectToEdit = projects.find((project) => project.id == id);
        setEditingProject(projectToEdit);
    };

    const handleEditWorksOn = (id) => {
        setSelectedWorksOnId(id);
        const worksOnToEdit = worksOns.find((worksOn) => worksOn.id == id);
        setEditingWorksOn(worksOnToEdit);
    };

    const updateProject = (project) => {
        const newErrors = {};

        if (!project.projName) {
            newErrors.projName = 'Project Name is required'
        }

        if (!project.deptNo) {
            newErrors.deptNo = 'Department is required'
        }

        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            const updatedProjects = [...projects];
            project.id = selectedProjectId
            const indexProject = projects.findIndex((project) => project.id === selectedProjectId);
            updatedProjects[indexProject] = project;
            setProjects(updatedProjects);
            successSwal('Project Edited successfully');
            setSelectedProjectId(null);
            setEditingProject(null);
        }
        return newErrors;
    };

    const updateWorksOn = (worksOn) => {
        const newErrors = {};

        if (!worksOn.projNo) {
            newErrors.projNo = 'Project Number is required'
        }

        if (!worksOn.empNo) {
            newErrors.empNo = 'Employee Number is required'
        }

        if (!worksOn.dateWorked) {
            newErrors.dateWorked = 'Date Worked is required'
        }

        if (!worksOn.hoursWorked) {
            newErrors.hoursWorked = 'Hours Worked is required'
        }

        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            worksOn.hoursWorked = parseInt(worksOn.hoursWorked);

            const updatedWorksOns = [...worksOns];
            worksOn.id = selectedWorksOnId
            const indexWorksOn = worksOns.findIndex((worksOn) => worksOn.id === selectedWorksOnId);
            updatedWorksOns[indexWorksOn] = worksOn;

            setWorksOns(updatedWorksOns);
            successSwal('WorksOn Edited successfully');
            setSelectedWorksOnId(null);
            setEditingWorksOn(null);
        }
        return newErrors;
    };

    const addProject = (project) => {
        const newErrors = {};

        if (!project.projName) {
            newErrors.projName = 'Project Name is required'
        }

        if (!project.deptNo) {
            newErrors.deptNo = 'Department is required'
        }

        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            const id = uuidv4();
            project.id = id;
            setProjects([...projects, project]);
            successSwal('Project Added successfully');
        }
        return newErrors;
    };

    const addWorksOn = (worksOn) => {
        const newErrors = {};

        if (!worksOn.projNo) {
            newErrors.projNo = 'Project Number is required'
        }

        if (!worksOn.empNo) {
            newErrors.empNo = 'Employee Number is required'
        }

        if (!worksOn.dateWorked) {
            newErrors.dateWorked = 'Date Worked is required'
        }

        if (!worksOn.hoursWorked) {
            newErrors.hoursWorked = 'Hours Worked is required'
        }

        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            const id = uuidv4();
            worksOn.id = id;
            worksOn.hoursWorked = parseInt(worksOn.hoursWorked);
            setWorksOns([...worksOns, worksOn]);
            successSwal('WorksOn Added successfully');
        }
        return newErrors;
    };

    const handleDeleteEmployee = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                const updatedEmployees = employees.filter((employee) => employee.id !== id);
                setEmployees(updatedEmployees);
                setSelectedEmployeeId(null);
                setEditingEmployee(null);
                successSwal('Employee Deleted successfully');
            }
        });
    };

    const handleDeleteProject = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                const updatedProjects = projects.filter((project) => project.id !== id);
                setProjects(updatedProjects);
                setSelectedProjectId(null);
                setEditingProject(null);
                successSwal('Project Deleted successfully');
            }
        });
    };

    const handleDeleteWorksOn = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                const updatedWorksOns = worksOns.filter((worksOn) => worksOn.id !== id);
                setWorksOns(updatedWorksOns);
                setSelectedWorksOnId(null);
                setEditingWorksOn(null);
                successSwal('WorksOn Deleted successfully');
            }
        });
    };

    const router = createBrowserRouter([
        {
            path: "/",
            element: <Layout
                setEditingEmployee={setEditingEmployee}
                setEditingDepartment={setEditingDepartment}
                setEditingProject={setEditingProject}
                setEditingWorksOn={setEditingWorksOn}
                setErrors={setErrors}
            />,
            children: [
                {
                    path: "/",
                    element: (
                        <HomePage
                            totalDepartments={departments.length}
                            totalEmployees={employees.length}
                            totalProjects={projects.length}
                        />
                    )
                },
                {
                    path: "/employees",
                    element: (
                        <EmployeesPage
                            employees={employees}
                            setEmployees={setEmployees}
                            columns={columnsTableEmployees}
                            refresh={refresh}
                            setRefresh={setRefresh}
                        />
                    )
                },
                {
                    path: "/employees/new",
                    element: (
                        <EmployeeFormPage
                            setErrors={setErrors}
                            setDepartments={setDepartments}
                            departments={departments}
                            errors={errors}
                            refresh={refresh}
                            setRefresh={setRefresh}
                        />
                    ),
                },
                {
                    path: "/employees/:id",
                    element: (
                        <EmployeeFormPage
                            setEditingEmployee={setEditingEmployee}
                            editingEmployee={editingEmployee}
                            setDepartments={setDepartments}
                            departments={departments}
                            errors={errors}
                            setErrors={setErrors}
                            setRefresh={setRefresh}
                            refresh={refresh}
                        />
                    ),
                },
                {
                    path: "/employees/detail/:id",
                    element: (
                        <EmployeeDetailPage
                            employees={employees}
                            departments={departments}
                            worksOns={worksOns}
                            projects={projects}
                            onEdit={handleEditWorksOn}
                            onDelete={handleDeleteWorksOn}
                            columns={columnsTableWorksOns}
                        />
                    ),
                },
                {
                    path: "/departments",
                    element: (
                        <DepartmentsPage
                            departments={departments}
                            columns={columnsTableDepartments}
                            setDepartments={setDepartments}
                            refresh={refresh}
                            setRefresh={setRefresh}
                        />
                    ),
                },
                {
                    path: "/departments/new",
                    element: (
                        <DepartmentFormPage
                            employees={employees}
                            setEmployees={setEmployees}
                            errors={errors}
                            setErrors={setErrors}
                            refresh={refresh}
                            setRefresh={setRefresh}
                        />
                    ),
                },
                {
                    path: "/departments/:id",
                    element: (
                        <DepartmentFormPage
                            editingDepartment={editingDepartment}
                            setEditingDepartment={setEditingDepartment}
                            employees={employees}
                            setEmployees={setEmployees}
                            errors={errors}
                            setErrors={setErrors}
                            refresh={refresh}
                            setRefresh={setRefresh}
                        />
                    ),
                },
                {
                    path: "/departments/detail/:id",
                    element: (
                        <DepartmentDetailPage
                            departments={departments}
                            employees={employees}
                            onEdit={handleEditEmployee}
                            onDelete={handleDeleteEmployee}
                            columns={columnsTableEmployees}
                        />
                    ),
                },
                {
                    path: "/projects",
                    element: (
                        <ProjectsPage
                            projects={projects}
                            setProjects={setProjects}
                            refresh={refresh}
                            setRefresh={setRefresh}
                            columns={columnsTableProjects}
                        />
                    ),
                },
                {
                    path: "/projects/new",
                    element: (
                        <ProjectFormPage
                            setDepartments={setDepartments}
                            departments={departments}
                            errors={errors}
                            setErrors={setErrors}
                            refresh={refresh}
                            setRefresh={setRefresh}
                        />
                    ),
                },
                {
                    path: "/projects/:id",
                    element: (
                        <ProjectFormPage
                            setDepartments={setDepartments}
                            departments={departments}
                            editingProject={editingProject}
                            setEditingProject={setEditingProject}
                            errors={errors}
                            setErrors={setErrors}
                            refresh={refresh}
                            setRefresh={setRefresh}
                        />
                    ),
                },
                {
                    path: "/projects/detail/:id",
                    element: (
                        <ProjectDetailPage
                            projects={projects}
                            worksOns={worksOns}
                            departments={departments}
                            employees={employees}
                            onEdit={handleEditWorksOn}
                            onDelete={handleDeleteWorksOn}
                            columns={columnsTableWorksOns}
                        />
                    ),
                },
                {
                    path: '/assignments',
                    element: (
                        <WorksOnsPage
                            worksOns={worksOns}
                            setWorksOns={setWorksOns}
                            columns={columnsTableWorksOns}
                            refresh={refresh}
                            setRefresh={setRefresh}
                        />
                    ),
                },
                {
                    path: "/assignments/new",
                    element: (
                        <WorksOnFormPage
                            employees={employees}
                            setEmployees={setEmployees}
                            projects={projects}
                            setProjects={setProjects}
                            errors={errors}
                            setErrors={setErrors}
                            refresh={refresh}
                            setRefresh={setRefresh}
                        />
                    ),
                },
                {
                    path: "/assignments/:id",
                    element: (
                        <WorksOnFormPage
                            employees={employees}
                            setEmployees={setEmployees}
                            projects={projects}
                            setProjects={setProjects}
                            editingWorksOn={editingWorksOn}
                            setEditingWorksOn={setEditingWorksOn}
                            errors={errors}
                            setErrors={setErrors}
                            refresh={refresh}
                            setRefresh={setRefresh}
                        />
                    ),
                },
                {
                    path: "/assignments/:empNo/:projNo",
                    element: (
                        <WorksOnDetailPage
                            worksOns={worksOns}
                            employees={employees}
                            projects={projects}
                        />
                    ),
                },
            ]
        }
    ]);

    return (
        <RouterProvider router={router} />
    );
};

export default AppRouter;
