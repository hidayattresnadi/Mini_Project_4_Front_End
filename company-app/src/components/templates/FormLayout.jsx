import Container from '../elements/container';

function FormLayout({ title, children }) {
    return (
        <Container className="min-vh-100 d-flex flex-column align-items-center" style={{ marginTop: '80px' }}>
            <Container className="card" style={{ width: '90%', maxWidth: '600px' }}>
                <Container className="card-header bg-dark text-white text-center">
                    <h1 className="mb-0">{title}</h1>
                </Container>
                <Container className="card-body">
                    {children}
                </Container>
            </Container>
        </Container>
    );
}

export default FormLayout;
