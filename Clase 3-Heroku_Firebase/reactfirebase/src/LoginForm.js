import React, { Component } from 'react';
import firebaseConfig from './firebaseConfg';
import firebase from 'firebase';
import ErrorAlert from './ErrorAlert'

class LoginForm extends Component {
    constructor(props) {
        super(props)
        this.email = React.createRef();
        this.password = React.createRef();

        this.submitForm = this.submitForm.bind(this);

        this.state = {
            error: {

            },
            codeInfo: null
        }

        //se comprueba la instalacion
        console.log(firebaseConfig);
        console.log(firebase);
        //

        firebase.initializeApp(firebaseConfig);

    };

    submitForm(e) {
        e.preventDefault()
        this.setState({error: null});

        //current = referencia actual del forms
        firebase.auth().createUserWithEmailAndPassword(this.email.current.value, this.password.current.value).then(user => {
            console.table(user);
        }).catch(error => {
            this.setState({error: error});
            this.setState({codeInfo: error.code})
            console.log (error);
        })
    }
    render() {
        
        
        return (

            <form onSubmit={this.submitForm} noValidate={true}>
                <ErrorAlert error={this.state.error}/>
                <p>{ this.state.codeInfo ? 'API error - ' + this.state.codeInfo : ''}</p>
                <div>
                    <input id="email"
                           type="text"
                           placeholder="email"
                           required ref={this.email} /> 
                </div>
                <div>
                    <input id="password"
                           type="password"
                           placeholder="password"
                           required ref = {this.password} />
                </div> 
                <div>
                    <button id="registrar" > Registrar </button> <button id="login" > Login </button> 
                </div>

            </form>

        )
    }

}

export default LoginForm