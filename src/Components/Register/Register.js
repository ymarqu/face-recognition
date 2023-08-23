import React, { Component } from "react";

class Register extends Component{

    render(){
        let { onRouteChange } = this.props;
        return(
            <article className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-50-l mw6 shadow-5 center bg-white">
            <main className="pa4 black-80 w-75">
            <form className="measure center flex flex-column">
                <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                <legend className="f4 fw6 ph0 mh0 h1">Register</legend>
                <div className="mt3">
                    <label className="db fw6 lh-copy f6" htmlFor="text">Full Name</label>
                    <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="text" name="full-name"  id="full-name" />
                </div>
                <div className="mt3">
                    <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                    <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address"  id="email-address" />
                </div>
                <div className="mv3">
                    <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                    <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password"  id="password" />
                </div>
                </fieldset>
                <div className="">
                <input onClick={() => onRouteChange('home')} className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="button" value="Register" />
                </div>
            </form>
            </main>
            </article>
        )
    }
}

export default Register;
