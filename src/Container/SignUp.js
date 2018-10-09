import React, { Component } from 'react';
import { InputGroup, InputGroupAddon, Button, Input, Col, Row, Form } from 'reactstrap';
import { createUser } from '../networks/UserData';
import { Link } from "react-router-dom";


class SignUp extends Component {
    state = {
        userForm: {
            username: null,
            password: null,
            confirm: null,
            email: null,
            fullname: null,
        },
        loop: {
            username: false,
            email: false,
        },
        diss: false
    }

    componentDidMount() {
        if (this.props.myUserData) {
            this.props.history.push('/Userlist');
        }
    }

    _handleInputFormChange = (e) => {
        let user = this.state.userForm;
        user[e.target.name] = (e.target.value) ? e.target.value : null;
        this.setState({
            userForm: user,
            loop: {
                username: false,
                email: false,
            }
        })
    }

    _handleSubmitForm = (e) => {
        e.preventDefault();
        this.setState({
            diss: true
        })
        if (this.state.userForm.password !== this.state.userForm.confirm || this.state.loop.username === true || this.state.loop.email === true) {
        }
        else {
            let { username, password, email, fullname } = this.state.userForm;
            createUser({ username, password, email, fullname })
                .then((res) => {
                    let looper = this.state.loop;
                    if (res.data.message && res.data.message.includes('username')) {
                        looper.username = true;
                    } else if (res.data.message && res.data.message.includes('email')) {
                        looper.email = true;
                    } else {
                        this.props.history.push('/');
                    }
                    this.setState({
                        loop: looper
                    })
                })
                .catch(err => {
                    console.error(err);
                })
        }
        this.setState({
            diss: false
        })
    }


    render() {

        const confirmPassword = (this.state.userForm.confirm === null || this.state.userForm.password === this.state.userForm.confirm) ? "" : <p className='text-danger mt-1'>Confirm password not equal</p>;

        const loopUsername = (this.state.loop.username) ? <p className='text-danger mt-1'>Username have already</p> : '';

        const loopEmail = (this.state.loop.email) ? <p className='text-danger mt-1'>Email have already</p> : '';

        return (
            <Row className='mt-5'>
                <Col sm='3'></Col>
                <Col sm='6' className='text-center img-thumbnail shadow p-3 mb-5 bg-white rounded'>
                    <h1 className='mt-2'>Sign Up</h1>
                    <Form onSubmit={this._handleSubmitForm}>
                        <InputGroup className='mt-3'>
                            <InputGroupAddon addonType="prepend"><Button disabled color='success' ><i className="fas fa-user"></i> User Name</Button></InputGroupAddon>
                            <Input name='username' onChange={this._handleInputFormChange} placeholder="VanANguyen" required />
                        </InputGroup>
                        {loopUsername}
                        <InputGroup className='mt-3'>
                            <InputGroupAddon addonType="prepend"><Button disabled color='danger' ><i className="fas fa-key"></i> Password</Button></InputGroupAddon>
                            <Input name='password' onChange={this._handleInputFormChange} type='password' placeholder="********" required />
                        </InputGroup>
                        <InputGroup className='mt-3'>
                            <InputGroupAddon addonType="prepend"><Button disabled color='danger' > <i className="fas fa-key"></i> Confirm Password</Button></InputGroupAddon>
                            <Input name='confirm' onChange={this._handleInputFormChange} type='password' placeholder="********" required/>
                        </InputGroup>
                        {confirmPassword}
                        <InputGroup className='mt-3'>
                            <InputGroupAddon addonType="prepend"><Button disabled color='warning' ><i className="far fa-envelope"></i> Email</Button></InputGroupAddon>
                            <Input name='email' onChange={this._handleInputFormChange} type='email' placeholder="NguyenVanA@gmail.com" required />
                        </InputGroup>
                        {loopEmail}
                        <InputGroup className='mt-3'>
                            <InputGroupAddon addonType="prepend"><Button disabled color='secondary' ><i className="fas fa-pen-alt"></i> Full Name</Button></InputGroupAddon>
                            <Input name='fullname' onChange={this._handleInputFormChange} type='text' placeholder="Nguyen Van A" required />
                        </InputGroup>
                        <Link to={'/'}><Button type='submit' outline color='danger' className='mt-3 mr-2' ><i className="fas fa-backward"></i> Back to manager</Button></Link>
                        <Button type='submit' outline={!this.state.diss} color='primary' className='mt-3' disabled={this.state.diss} >Sign Up <i className="fas fa-check"></i></Button>
                    </Form>
                </Col>
            </Row>
        );
    }
}

export default SignUp;