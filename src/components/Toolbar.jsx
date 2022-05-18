import { FaPowerOff } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Container, Nav, NavDropdown, Form, FormControl } from 'react-bootstrap';
import Cookies from 'universal-cookie'
import styles from "./Toolbar.module.css";
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { deepOrange } from '@mui/material/colors';


export function Toolbar () {

  const cookies = new Cookies();

  const a = function handleLogout () {
     cookies.remove('estado');
     cookies.remove('usuario');
     cookies.remove('nombre');
     window.location.href="/";
    //alert("Logout");
  }


    return (
        <Navbar bg="light" expand="lg">
  <Container fluid>
    <Navbar.Brand href="/">Movie Media</Navbar.Brand>
    <Navbar.Toggle aria-controls="navbarScroll" />
    <Navbar.Collapse id="navbarScroll">
      <Nav
        className="me-auto my-2 my-lg-0"
        style={{ maxHeight: '100px' }}
        navbarScroll
      >
        <Nav.Link href="amigos">Amigos</Nav.Link>
        <Nav.Link href="top">Top</Nav.Link>
        <Nav.Link href="estrenos">Estrenos</Nav.Link>
        <NavDropdown title="Tendencias" id="navbarScrollingDropdown">
          <NavDropdown.Item href="diario">Diarias</NavDropdown.Item>
          <NavDropdown.Item href="semanal">Semanales</NavDropdown.Item>
        </NavDropdown>

        <NavDropdown title="Ajustes" id="navbarScrollingDropdown">
          <NavDropdown.Item href="#action3">Mi cuenta</NavDropdown.Item>
          <NavDropdown.Item href="#action4">Terms</NavDropdown.Item>
        </NavDropdown>
        <Nav.Link>{cookies.get('nombre')}</Nav.Link>
        <Nav.Link>
          <Stack direction="row" spacing={2}>
            <Avatar
            sx={{ bgcolor: deepOrange[500], width: 27, height: 27 }}
            alt={cookies.get('nombre')}
            src='../default-placeholder.png'
            />
          </Stack>
        </Nav.Link>
      </Nav>
      <Form className="d-flex">
        <FormControl
          type="search"
          placeholder="Añadir Amigos"
          className="me-2"
          aria-label="Search"
        />
        <a className={styles.circledButton} href='/' onClick={a}>
        <FaPowerOff className={styles.imagePower} />
        </a>
      </Form>
    </Navbar.Collapse>
  </Container>
</Navbar>
    )
}


