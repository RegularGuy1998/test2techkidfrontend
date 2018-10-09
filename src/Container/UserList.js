import React, { Component } from 'react';
import {
    Col, Row, Pagination, PaginationItem, PaginationLink, Card, CardText, CardBody, CardTitle,
    CardSubtitle, Button, InputGroup, InputGroupAddon, Input, Dropdown, DropdownToggle, DropdownMenu, DropdownItem
} from 'reactstrap';
import { getAll, update } from "../networks/UserData";

class UserList extends Component {
    state = {
        userData: null,
        fromData: null,
        pagLength: null,
        userData5element: null,
        dropdownOpen: false,
        history: {
            sortby: 'User Name',
            pagin: 1,
            search: 'b'
        },
    }

    componentDidMount() {
        this.setState({
            history: this.props.myUserData.history
        })
        getAll()
            .then(res => {
                this.setState({
                    fromData: res.data.userList,
                    userData: res.data.userList
                });
                this._handleChangePaginLength(res.data.userList.length);
                this._handleChange5Element();
                this._searchChange((this.state.history.search) ? this.state.history.search : '');
            })
            .catch(err => {
                console.error(err);
            })
    }

    toggle = () => {
        this.setState(prevState => ({
            dropdownOpen: !prevState.dropdownOpen
        }));
    }

    _handleChangePaginLength = (input) => {
        let pagLength = [];
        for (let i = 1; i <= Math.ceil((input) / 5); i++) {
            pagLength.push(i);
        }
        this.setState({
            pagLength: pagLength
        })
    }

    _handleChange5Element = () => {
        setTimeout(() => {
            let pag = (this.state.history.pagin) ? this.state.history.pagin : 1;
            let locat = ((Number)(pag) - 1) * 5;
            let userFive = [];
            for (let i = locat; i < locat + 5; i++) {
                if (i < this.state.userData.length) {
                    userFive.push(this.state.userData[i]);
                } else {
                    break;
                }
            }
            this.setState({
                userData5element: userFive
            })
        }, 100);
    }

    _handlePaginChange = (e) => {
        let his = this.state.history;
        his.pagin = (Number)(e.target.name.substring(1, e.target.name.length));
        this.setState({
            history: his
        })
        this._handleChange5Element();
    }

    _handlePaginNext = () => {

        if (this.state.history.pagin < this.state.pagLength.length) {
            let his = this.state.history;
            his.pagin = (Number)(this.state.history.pagin) + 1;
            this.setState({
                history: his
            })
        }
        this._handleChange5Element();
    }

    _handlePaginPrevious = () => {
        if (this.state.history.pagin > 1) {
            let his = this.state.history;
            his.pagin = (Number)(this.state.history.pagin) - 1;
            this.setState({
                history: his
            })
        }
        this._handleChange5Element();
    }

    _handleSearchChange = (e) => {
        let search = e.target.value;
        this._searchChange(search);
        let his = this.state.history;
        his.search = search;
        his.pagin = 1;
        this.setState({
            history: his
        });
    }

    _searchChange = (search) => {
        if (search === '') {
            this.setState({
                userData: this.state.fromData
            });
        } else {
            let userListWithSearch = [];
            for (let i = 0; i < this.state.fromData.length; i++) {
                let user = this.state.fromData[i];
                if (user.username.toLowerCase().includes(search) || user.fullname.toLowerCase().includes(search)) {
                    userListWithSearch.push(user);
                }
            }
            this.setState({
                userData: userListWithSearch
            });
        }
        this._handleChange5Element();
        setTimeout(() => {
            this._handleChangePaginLength(this.state.userData.length);
        }, 80);
    }

    _handleSortByDropdown = (e) => {
        let his = this.state.history;
        his.sortby = e.target.name
        this.setState({
            history: his
        })
        let userSort = this.state.userData;
        userSort.sort((a, b) => {
            return (a[e.target.value] < b[e.target.value]) ? -1 : 1;
        })
        this.setState({
            userData: userSort
        });
        this._handleChange5Element();
        setTimeout(() => {
            this._handleChangePaginLength(this.state.userData.length);
        }, 80);
    }

    _buttonLogout = () => {
        const id = this.props.myUserData._id;
        const history = this.state.history;
        update({id, history})
            .then(res => {
                this.props.handleLogout();
            })
            .catch(err => {
                console.error(err);
            })
    }

    render() {
        const pagin = (this.state.pagLength) ? <Pagination aria-label="Page navigation example">
            <PaginationItem disabled={(this.state.history.pagin === 1) ? true : false}>
                <PaginationLink previous onClick={this._handlePaginPrevious} />
            </PaginationItem>
            {this.state.pagLength.map((pag, index) => {
                return <PaginationItem key={index} active={(Number)(this.state.history.pagin) === (Number)(pag)}>
                    <PaginationLink name={`p${pag}`} onClick={this._handlePaginChange}>
                        {pag}
                    </PaginationLink>
                </PaginationItem>
            })}
            <PaginationItem disabled={(this.state.pagLength !== null && this.state.history.pagin === this.state.pagLength.length) ? true : false}>
                <PaginationLink next onClick={this._handlePaginNext} />
            </PaginationItem>
        </Pagination> : '';

        const listUser = (this.state.userData5element) ?
            this.state.userData5element.map((user, index) => {
                return <Col key={index} sm='4' className='mb-4'>
                    <Card>
                        <CardBody>
                            <CardTitle>{user.fullname}</CardTitle>
                            <CardSubtitle>{user.username}</CardSubtitle>
                            <CardText>{user.email}</CardText>
                        </CardBody>
                    </Card>
                </Col>
            }) : ''

        const sortBy = (this.state.history.sortby) ? this.state.history.sortby : 'None';

        return (
            <Row className='mt-5'>
                <Col sm='12' className='text-center img-thumbnail shadow p-3 mb-5 bg-white rounded'>
                    <h1 className='mt-3 mb-5'>{this.props.myUserData.fullname}</h1>
                    <Row>
                        <Col sm='2'></Col>
                        <Col sm='5'>
                            <InputGroup className='mb-3'>
                                <InputGroupAddon addonType="prepend"><Button disabled color='success' ><i className="fas fa-search"></i></Button></InputGroupAddon>
                                <Input type='text' name='search' value={(this.state.history.search) ? this.state.history.search : ''} onChange={this._handleSearchChange} placeholder="Search" required />
                            </InputGroup>
                        </Col>
                        <Col sm='3'>
                            <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                                <DropdownToggle className='btn-block' caret>
                                    Sort by: {sortBy}
                                </DropdownToggle>
                                <DropdownMenu className='btn-block' right>
                                    <DropdownItem name='User Name' value='username' onClick={this._handleSortByDropdown} >User Name</DropdownItem>
                                    <DropdownItem name='Full Name' value='fullname' onClick={this._handleSortByDropdown} >Full Name</DropdownItem>
                                    <DropdownItem name='Email' value='email' onClick={this._handleSortByDropdown} >Email</DropdownItem>
                                </DropdownMenu>
                            </Dropdown>
                        </Col>
                        {listUser}
                    </Row>
                    {pagin}
                    <button onClick={this._buttonLogout} className=' btn btn-danger mt-3 mr-2' >Log Out</button>
                </Col>
                
            </Row>
        );
    }
}

export default UserList;