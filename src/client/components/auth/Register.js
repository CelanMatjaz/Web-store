import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

//Components
import Message from '../layout/Message';
import ErrorMessage from '../layout/ErrorMessage';

//Actions
import { action_register } from '../../store/actions/authActions';
import { action_resetErrors } from '../../store/actions/authActions';

class Register extends Component {
    state = {
        username: '',
        password: '',
        passwordRepeat: '',
        errors: []
    };

    componentDidMount(){
        this.props.action_resetErrors();
    }

    handleChange = e => {
        this.setState({
            [e.target.id]: e.target.value
        });
    }

    handleSubmit = e => {
        e.preventDefault();        
        const { username, password, passwordRepeat } = this.state;
        if(username && password && passwordRepeat && password === passwordRepeat){            
            this.setState({errors: [], username: '', password: '', passwordRepeat: ''});
            this.props.action_register({username, password, passwordRepeat});
        }
        else{
            const errors = [];
            if(!username) errors.push('Username field is empty');
            if(!password) errors.push('Password field is empty');
            if(!passwordRepeat) errors.push('Repeat password field is empty');
            if(password !== passwordRepeat) errors.push('Passwords do not match');    
            this.setState({errors});
        }        
    }

    render() {
        const { auth } = this.props;
        if(!auth.isEmpty) return <Redirect to="/"/>
        
        const { username, password, passwordRepeat, errors } = this.state;
        const registerErrors = auth.regErrors.map((error, i) => <ErrorMessage key={i} message={error}/>);
        const formErrors = errors.map((error, i) => <ErrorMessage key={i} message={error}/>);
        
        return (
            <div className="auth-form">
                <form onSubmit={(e) => this.handleSubmit(e)}>
                    {auth.regMsg ? <Message message={auth.regMsg}/> : ''}
                    {registerErrors}
                    {formErrors}
                    <label htmlFor="username">Username</label>
                    <input type="text" value={username} id="username" onChange={this.handleChange}/>
                    <label htmlFor="password">Password</label>
                    <input type="password" value={password} id="password" onChange={this.handleChange}/>
                    <label htmlFor="passwordRepeat">Repeat password</label>
                    <input type="password" value={passwordRepeat} id="passwordRepeat" onChange={this.handleChange}/>
                    <button>Register</button> <br/>
                    <Link style={{}} to="/login">Or login</Link>
                </form>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, { action_register, action_resetErrors })(Register);