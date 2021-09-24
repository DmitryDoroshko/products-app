import React from "react";
import styles from "./Register.module.css";
import Button from "../UI/Button/Button";
import RegisterModal from "../UI/RegisterModal/RegisterModal";

class Register extends React.Component {
    constructor(props) {
        super(props);
    }

    state = {
        registerClicked: false
    };

    closeHandler = () => {
        this.setState((prevState) => {
            return {...prevState, registerClicked: false};
        })
    }

    registerClickedHandler = () => {
        this.setState((prevState) => {
            return {...prevState, registerClicked: true};
        })
    }

    formSubmitHandler = (event) => {
        event.preventDefault();
        this.props.onIsRegisteredChange();
    }

    render() {
        return (
            <div className={styles.register}>
                {!this.state.registerClicked ? (<Button className={styles.registerBtn} onClick={this.registerClickedHandler}>Register</Button>)
                    : <RegisterModal
                        title="Registration Form"
                        buttonMessage="Click me!"
                        onFormSubmit={this.formSubmitHandler}
                        onClose={this.closeHandler}/>}
            </div>
        );
    }
}

export default Register;