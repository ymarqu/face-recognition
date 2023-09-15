import React, { Component } from "react";

class Register extends Component{

    constructor(){
        super();
        this.state = {
         registerEmail : "",
         registerPassword: "",
         userName: ""
        }
    }

    onNameInput = (e) => {
        this.setState({userName: e.target.value})
    }

    onPasswordChange = (e) => {
        this.setState({registerPassword: e.target.value});
    }

    onEmailChange = (e) => {
        this.setState({registerEmail: e.target.value})
    }

    onSubmitRegister = () => {
        fetch('http://localhost:3000/register', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                name: this.state.userName,
                password: this.state.registerPassword,
                email: this.state.registerEmail
            })
        })
        .then(response => response.json())
        .then(user => {
            if(user){
                this.props.loadUser(user)
                this.props.onRouteChange("home");
            }
        })
    }

    render(){
        return(
            <article className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-50-l mw6 shadow-5 center bg-white">
            <main className="pa4 black-80 w-75">
            <form className="measure center flex flex-column">
                <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                <legend className="f4 fw6 ph0 mh0 h1">Register</legend>
                <div className="mt3">
                    <label className="db fw6 lh-copy f6" htmlFor="text">Full Name</label>
                    <input
                    onChange={this.onNameInput}
                    className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                    type="text" name="name"
                    id="full-name"
                    />
                </div>
                <div className="mt3">
                    <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                    <input
                    onChange={this.onEmailChange}
                    className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                    type="email"
                    name="email"
                    id="email-address"
                    />
                </div>
                <div className="mv3">
                    <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                    <input
                    onChange={this.onPasswordChange}
                    className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                    type="password"
                    name="password"
                    id="password"
                    />
                </div>

                <div className="mv3">
                <input
                onClick={this.onSubmitRegister}
                className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                type="button"
                value="Register"
                />
                </div>
                </fieldset>
            </form>
            </main>
            </article>
        )
    }
}

export default Register;
