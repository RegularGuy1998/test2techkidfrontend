import React, { Component } from 'react';
import { InputGroup, InputGroupAddon, Button, Input, Col, Row, Form } from 'reactstrap';
import { login } from "../networks/UserData";
import { Link } from "react-router-dom";

class Login extends Component {
    state = {
        loginForm: {
            username: null,
            password: null
        },
        isWrong: false
    }

    componentDidMount() {
        if (this.props.myUserData) {
            this.props.history.push('/Userlist');
        }
    }

    _handleInputFormChange = (e) => {
        let user = this.state.loginForm;
        user[e.target.name] = (e.target.value) ? e.target.value : null;
        this.setState({
            loginForm: user,
            isWrong: false
        })
    }

    _handleSubmitForm = (e) => {
        e.preventDefault();
        let { username, password } = this.state.loginForm;
        login({ username, password })
            .then(res => {
                if (!res.data.userFound) {
                    this.setState({
                        isWrong: true
                    })
                } else if (this.props.handleLogin(res.data.userFound) === 1) {
                    this.props.history.push('/UserList');
                }
            })
            .catch(err => {
                console.error(err);
            })
    }

    render() {

        const wrong = (this.state.isWrong) ? <p className='text-danger mt-1'>Wrong Username or Password</p> : '';

        return (
            <Row className='mt-5'>
                <Col sm='3'></Col>
                <Col sm='6' className='text-center img-thumbnail shadow p-3 mb-5 bg-white rounded'>
                    <h1 className='mt-2'>Login</h1>
                    <Form onSubmit={this._handleSubmitForm}>
                        <InputGroup className='mt-3'>
                            <InputGroupAddon addonType="prepend"><Button disabled color='success' ><i className="fas fa-user"></i> User Name</Button></InputGroupAddon>
                            <Input type='text' name='username' onChange={this._handleInputFormChange} placeholder="User Name" required />
                        </InputGroup>
                        <InputGroup className='mt-3'>
                            <InputGroupAddon addonType="prepend"><Button disabled color='danger' ><i className="fas fa-key"></i> Password</Button></InputGroupAddon>
                            <Input type='password' name='password' onChange={this._handleInputFormChange} placeholder="Password" required />
                        </InputGroup>
                        {wrong}
                        <Link to={'/'}><Button type='submit' outline color='danger' className='mt-3 mr-2' ><i className="fas fa-backward"></i> Back to manager</Button></Link>
                        <Button type='submit' outline color='primary' className='mt-3' >Login <i className="fas fa-sign-in-alt"></i></Button>
                    </Form>
                </Col>
            </Row>
        );
    }
}

export default Login;