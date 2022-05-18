import React from "react";
import styles from "./LoginPage.module.css";
import { FaReact } from 'react-icons/fa';
import { Form, Button} from 'react-bootstrap';
import axios from 'axios';
import { API_URL } from '../appConfig'
import Cookies from 'universal-cookie' 


export class LoginPage extends React.Component {
    constructor(props){

        super(props);

        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
        // this.changeStateApp = this.props.onTryLogin;

        this.state = {
            username: "",
            password: "",
        }

        }

        async handleClick(){
           let response = await axios.post(API_URL + 'credentials', this.state)    
           console.log(response)
           if(response.data == ""){
            alert("Usuario o contraseña incorrectos")
           } else {
            this.props.parentCallback(response.data.username, response.data.nombre)
           } 
        }
        async handleChange(e){
            console.log(e)
            if(e.target.name === "username"){
                await this.setState({
                    username: e.target.value
                })
            }else{
                await this.setState({
                    password: e.target.value
                })
            }
            console.log(this.state);
        }
        async registro(){
            const cookies = new Cookies();
            cookies.set('registro', 'true', { path: '/', expires: new Date(Date.now()+2592000) });
        }

    render() {
        return(

            <div className={styles.body}>
                <div className={styles.login}>

                <FaReact className={styles.image} />
                <br/>
                
                <Form>
                    <Form.Group className="mb-3" >
                    <Form.Control autoComplete="off" type="text" name="username" placeholder="username" onChange={this.handleChange} />
                    </Form.Group>

                    <Form.Group className="mb-3" >
                    <Form.Control type="password" name="password" placeholder="password" onChange={this.handleChange} />
                    </Form.Group>

                    <Button onClick={this.handleClick}>
                        Login
                    </Button>
                    <br/>
                    <br/>
                    <Button href="/registro" onClick={this.registro}>
                        Registro
                    </Button>
                </Form>

                </div>
            </div>
        )
    }
    }