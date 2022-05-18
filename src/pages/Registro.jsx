import React from "react";
import styles from "./LoginPage.module.css";
import { FaUsers } from 'react-icons/fa';
import { Form, Button, CloseButton } from 'react-bootstrap';
import axios from 'axios';
import { API_URL } from '../appConfig'
import Cookies from 'universal-cookie' 


export class Registro extends React.Component {
    constructor(props){

        super(props);

        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
        // this.changeStateApp = this.props.onTryLogin;

        this.state = {
            nombre: "",
            username: "",
            password: "",
        }

        }

        async handleClick(){
            //let response = await axios.post(API_URL + 'registrar', this.state)
            let value = {
                nombre: this.state.nombre,
                username: this.state.username,
                password: this.state.password
            }
            let bool = 1
            console.log(value)
            async function validate(){
            let response2 = await axios.get(API_URL + 'user')
            console.log(response2)
             for (let index = 0; index < response2.data.length; index++) {
                 console.log(response2.data[index].username)
                 if (value.username === response2.data[index].username){
                    bool = 0
                    break
                }
             }
             if (bool == 0){
                alert("El usuario ya existe")
             } else {
                alert("Usuario registrado")
                await axios.post(API_URL + 'registrar', value)
                const cookies = new Cookies();
                cookies.remove('registro');
                window.location.href="/"
             }
            }
             if (this.state.username == "" || this.state.password == "" || this.state.nombre == "") {
                 alert("Se deben rellenar todos los campos")
             } else {
                validate()
             }

        }
        async handleChange(e){
            console.log(e)
            if(e.target.name === "username"){
                await this.setState({
                    username: e.target.value
                })
            }
            else if(e.target.name === "password"){
                await this.setState({
                    password: e.target.value
                })
            }
            else if(e.target.name === "nombre"){
                await this.setState({
                    nombre: e.target.value
                })
        }
        console.log(this.state);
    }

    async handleClose(){
        const cookies = new Cookies();
        cookies.remove('registro');
        window.location.href="/"
    }

    render() {
        return(
            <div>
            <CloseButton onClick={this.handleClose} className={styles.topRightButton} />
            <div className={styles.body}>
                <div className={styles.login}>

                <FaUsers className={styles.image} />
                <br/>
                <Form>
                    <Form.Group className="mb-3" >
                    <Form.Control autoComplete="off" type="text" name="nombre" placeholder="Nombre completo" onChange={this.handleChange} />
                    </Form.Group>

                    <Form.Group className="mb-3" >
                    <Form.Control autoComplete="off" type="text" name="username" placeholder="username" onChange={this.handleChange} />
                    </Form.Group>

                    <Form.Group className="mb-3" >
                    <Form.Control autoComplete="off" type="text" name="password" placeholder="password" onChange={this.handleChange} />
                    </Form.Group>

                    <Button onClick={this.handleClick}>
                        Registro
                    </Button>
                    <br/>
                </Form>

                </div>
            </div>
            </div>
        )
    }
    }