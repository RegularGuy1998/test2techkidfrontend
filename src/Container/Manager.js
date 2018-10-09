import React, { Component } from 'react';
import { Link } from "react-router-dom";

class Manager extends Component {
    render() {
        return (
            <div className='row'>
                <div className='col-4 mt-5 text-center offset-4 img-thumbnail shadow p-3 mb-5 bg-white rounded'>
                    <h1>Test 2</h1>
                    <Link to={'/Login'}>
                        <button className='btn btn-outline-success btn-block mt-2'>Log In</button>
                    </Link>
                    <Link to={'/Signup'}>
                        <button className='btn btn-outline-success btn-block mt-3'>Sign Up</button>
                    </Link>
                </div>
            </div>
        );
    }
}

export default Manager;