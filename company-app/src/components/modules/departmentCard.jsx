import DepartmentDetail from "../widgets/dataDetail";
import '../../bookCard.css'
import Container from "../elements/container";

const DepartmentDetailCard = ({ detailDepartment}) => {
    return (
        <>
            <Container className="book-details">
                <DepartmentDetail label="Id" value={detailDepartment.deptNo} />
                <DepartmentDetail label="Department Name" value={detailDepartment.departmentName} />
                <DepartmentDetail label="Manager Name" value={detailDepartment.managerName} />
            </Container>
        </>

    );
};

export default DepartmentDetailCard;
