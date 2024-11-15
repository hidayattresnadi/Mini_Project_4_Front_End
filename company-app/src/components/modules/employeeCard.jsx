import EmployeeDetail from "../widgets/dataDetail";
import '../../bookCard.css'
import Container from "../elements/container";

const EmployeeDetailCard = ({ detailEmployee}) => {
    return (
        <>
            <Container className="book-details">
                <EmployeeDetail label="Id" value={detailEmployee.empNo} />
                <EmployeeDetail label="First Name" value={detailEmployee.firstName} />
                <EmployeeDetail label="Last Name" value={detailEmployee.lastName} />
                <EmployeeDetail label="Date of Birth" value={detailEmployee.dob} />
                <EmployeeDetail label="Sex" value={detailEmployee.sex} />
                <EmployeeDetail label="Position" value={detailEmployee.position} />
                <EmployeeDetail label="Department" value={detailEmployee.departmentName} />
                <EmployeeDetail label="Address" value={detailEmployee.address} />
            </Container>
        </>

    );
};

export default EmployeeDetailCard;
