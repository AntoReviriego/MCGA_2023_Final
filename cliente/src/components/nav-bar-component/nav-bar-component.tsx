import { signOut } from "firebase/auth";
import { useEffect } from "react"
import { NavDropdown } from "react-bootstrap";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { auth } from "../../firebase";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../provider/user.context.provider";
import { UserContextType } from "../../provider/type";

const NavBar = () => {
    const navigate = useNavigate();
    const { user, setLoggedInUser } = useUser() as UserContextType; 
    useEffect(() => {
        const iconUser = localStorage.getItem('user');
        if (iconUser !== null) {
            const userObject = JSON.parse(iconUser);
            if (userObject.email) {
                setLoggedInUser(userObject.email);
            }
        }
    }, []);

    const handleLogOut = async () => {
        await signOut(auth);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setLoggedInUser(null);
        navigate("/");
    }
    // Verificar si hay un usuario autenticado
    const isAuthenticated = user !== '' && user !== null;

    return (
        <>
            <Navbar expand="lg" bg="dark" data-bs-theme="dark">
                <Container>
                    <Navbar.Brand  className="text-white" href="/">Universidad Ficticia</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
                        <Nav className="me-auto">
                            <Nav.Link  className="text-white" href="/noticias">Noticias</Nav.Link>
                            {isAuthenticated && (
                                <>
                                    <Nav.Link  className="text-white" href="/carrera">Carrera</Nav.Link> 
                                    <Nav.Link  className="text-white" href="/noticias-form"><i className="fas fa-plus-circle"></i> Nueva Noticia</Nav.Link>
                                </>
                            )}
                        </Nav>
                        <Nav>
                        {!isAuthenticated && (
                            <>
                                <Nav.Link className="text-white" href="/login">Iniciar sesión</Nav.Link>
                                <Nav.Link className="text-white" href="/registro">Registrarse</Nav.Link>
                            </>
                        )}
                        {isAuthenticated && (
                            <NavDropdown className="text-white" title={<span className="text-white"><i className="fa fa-user-o me-1" aria-hidden="true"></i>{user}</span>} id="navbarScrollingDropdown">
                                <NavDropdown.Item onClick={handleLogOut}>Salir</NavDropdown.Item>
                            </NavDropdown>
                        )}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    )
}
export default NavBar