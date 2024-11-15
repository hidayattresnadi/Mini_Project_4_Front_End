import Swal from 'sweetalert2'
export function successSwal(message) {
    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
    })

    Toast.fire({
        icon: 'success',
        title: message
    })
}

export function failedSwal(error) {
    Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: error,
        footer: '<a href="">Why do I have this issue?</a>'
    })
}

export function validateEmployee(employee) {
    const newErrors = {};

    if (!employee.fname) {
        newErrors.fname = 'First Name is required'
    }
    if (!employee.lname) {
        newErrors.lname = 'Last Name is required'
    }
    if (!employee.address) {
        newErrors.address = 'address is required'
    }
    if (!employee.sex) {
        newErrors.sex = 'gender is required'
    }
    if (!employee.dob) {
        newErrors.dob = 'date of birth is required'
    }
    if (!employee.position) {
        newErrors.position = 'position is required'
    }
    if (!employee.deptNo) {
        newErrors.deptNo = 'please select department'
    }
    return newErrors;
};



export function validateDepartment(department) {
    const newErrors = {};

    if (!department.deptName) {
        newErrors.deptName = 'Department Name is required'
    }

    if (!department.mgrEmpNo) {
        newErrors.mgrEmpNo = 'Department Manager is required'
    }

    return newErrors;
}

export function validateProject(project) {
    const newErrors = {};

    if (!project.projName) {
        newErrors.projName = 'Project Name is required'
    }

    if (!project.deptNo) {
        newErrors.deptNo = 'Department is required'
    }

    return newErrors;
}

export function validateWorksOn(worksOn){
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

    return newErrors;
}


