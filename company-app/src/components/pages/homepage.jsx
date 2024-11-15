import '../../dashboard.css'
import Container from '../elements/container';
import Icon from '../elements/icon';
import Text from '../elements/text';
function HomePage({totalEmployees, totalDepartments, totalProjects}) {
    return (
        <>
        <Container className='dashboard-container'>
        <h1 className='text-center'>Company Dashboard</h1>
        <Container className='dashboard-grid'>
            <Container className='card'>
                <Icon className='fas fa-users fa-2x'></Icon>
                <h2>Total Employees</h2>
                <Text>{totalEmployees}</Text>
            </Container>
            <Container className='card'>
                <Icon className='fas fa-book fa-2x'></Icon>
                <h2>Total Departments</h2>
                <Text>{totalDepartments}</Text>
            </Container>
            <Container className='card'>
                <Icon className='fas fa-book fa-2x'></Icon>
                <h2>Total Projects</h2>
                <Text>{totalProjects}</Text>
            </Container>
        </Container>
    </Container>
    </>
    )
}

export default HomePage;