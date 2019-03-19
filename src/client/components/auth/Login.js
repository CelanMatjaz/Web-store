import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

//Components
import ErrorMessage from '../layout/ErrorMessage';

//Actions
import { action_login } from '../../store/actions/authActions';
import { action_resetErrors } from '../../store/actions/authActions';

class Login extends Component {
    state = {
        username: '',
        password: '',
        errors: []
    };

    componentDidMount(){
        this.props.action_resetErrors();
    }

    handleChange = e => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    handleSubmit = e => {
        e.preventDefault();
        
        const { username, password } = this.state;
        if(username && password){            
            this.setState({errors: []});
            this.props.action_login({username, password});
        }
        else{
            const errors = [];
            if(!username) errors.push('Username field is empty');
            if(!password) errors.push('Password field is empty');    
            this.setState({errors});
        }
    }

    render() {
        const { auth } = this.props;
        if(!auth.isEmpty) return <Redirect to="/"/>        
        const { username, password, errors } = this.state;
        const loginErrors = auth.logErrors.map((error, i) => <ErrorMessage key={i} message={error}/>);
        const formErrors = errors.map((error, i) => <ErrorMessage key={i} message={error}/>);

        return (
            <div className="auth-form">
                <form onSubmit={this.handleSubmit}>
                    {loginErrors}
                    {formErrors}
                    <label htmlFor="username">Username</label>
                    <input type="text" value={username} id="username" onChange={this.handleChange}/>
                    <label htmlFor="password">Password</label>
                    <input type="password" value={password} id="password" onChange={this.handleChange}/>
                    <button>Login</button> <br/>
                    <Link style={{}} to="/register">Or register</Link>
                </form>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, { action_login, action_resetErrors })(Login);