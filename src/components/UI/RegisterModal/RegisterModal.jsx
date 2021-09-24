import Card from "../Card/Card";
import Button from "../Button/Button";
import styles from "./RegisterModal.module.css";
import ReactDOM from "react-dom";
import React, {Component} from "react";

class Backdrop extends Component {
    render() {
        return <div className={styles.backdrop} onClick={this.props.onClose}></div>;
    }
}

class ModalOverlay extends Component {
    state = {
        name: "",
        dateOfBirth: "",
        email: "",
        password: "",
        isNameValid: false,
        isDateOfBirthValid: false,
        isEmailValid: false,
        isPasswordValid: false,
    };

    setInitialState = () => {
        this.setState({
            name: "",
            dateOfBirth: "",
            email: "",
            password: "",
            isNameValid: false,
            isDateOfBirthValid: false,
            isEmailValid: false,
            isPasswordValid: false,
        });
    }

    nameChangeHandler = (event) => {
        this.setState(prevState => {
            let isNameValid = true;

            if (event.target.value.trim().length < 3) {
                isNameValid = false;
            }

            return {...prevState, name: event.target.value, isNameValid: isNameValid};
        })
    }

    dateOfBirthChangeHandler = (event) => {
        this.setState(prevState => {
            let isDateOfBirthValid = true;
            let date = new Date(event.target.value);
            if (date.getFullYear() < 1900 || date.getFullYear() > 2100) {
                isDateOfBirthValid = false;
            }
            return {...prevState, dateOfBirth: event.target.value, isDateOfBirthValid: isDateOfBirthValid};
        })
    }

    emailChangeHandler = (event) => {
        this.setState(prevState => {
            let isEmailValid = true;
            if (!event.target.value.includes("@")) {
                isEmailValid = false;
            }
            return {...prevState, email: event.target.value, isEmailValid: isEmailValid};
        })
    }

    passwordChangeHandler = (event) => {
        this.setState(prevState => {
            let isPasswordValid = true;
            if (event.target.value.trim().length < 3) {
                isPasswordValid = false;
            }
            return {...prevState, password: event.target.value, isPasswordValid: isPasswordValid};
        })
    }


    render() {
        return (
            <Card className={styles.modal}>
                <button className={styles.closeButton}>X</button>
                <header className={styles.header}>
                    <h2>{this.props.title}</h2>
                </header>
                <form className={styles.content} onSubmit={(event) => {
                    event.preventDefault();

                    const formData = {
                        name: this.state.name,
                        date: this.state.dateOfBirth,
                        email: this.state.email,
                        password: this.state.password,
                    };

                    console.log("name is valid", this.state.isNameValid);
                    console.log("date is valid", this.state.isDateOfBirthValid);
                    console.log("email is valid", this.state.isEmailValid);
                    console.log("password is valid", this.state.isPasswordValid);

                    if (this.state.isNameValid
                        && this.state.isDateOfBirthValid
                        && this.state.isEmailValid && this.state.isPasswordValid) {

                        this.setInitialState();
                        this.props.onFormSubmit(event);
                    } else {
                        console.log("Something went wrong");
                    }

                }}>
                    <div className={styles.controls}>
                        <label htmlFor="name">Name</label>
                        <input type="text"
                               id="name"
                               value={this.state.name}
                               required
                               onChange={e => this.nameChangeHandler(e)
                               }
                               />
                    </div>
                    <div className={styles.controls}>
                        <label htmlFor="date-of-birth">Date of Birth</label>
                        <input type="date"
                               id="date-of-birth"
                               value={this.state.dateOfBirth}
                               min="1900-01-01"
                               max="2100-12-31"
                               required
                               onChange={e => this.dateOfBirthChangeHandler(e)}
                        />
                    </div>
                    <div className={styles.controls}>
                        <label htmlFor="email">Email</label>
                        <input type="email"
                               id="email" value={this.state.email}
                               required
                               onChange={e => this.emailChangeHandler(e)}
                               />
                    </div>
                    <div className={styles.controls}>
                        <label htmlFor="password">Password</label>
                        <input type="password"
                               id="password"
                               value={this.state.password}
                               required
                               onChange={e => this.passwordChangeHandler(e)}
                               />
                    </div>
                    <div className={styles.actions}>
                        <Button type="submit">{this.props.buttonMessage}</Button>
                    </div>
                </form>
            </Card>
        )
    }
}

class RegisterModal extends Component {
    render() {
        return (
            <>
                {ReactDOM.createPortal(<Backdrop onClose={this.props.onClose}/>,
                    document.getElementById('backdrop-root'))}
                {ReactDOM.createPortal(<ModalOverlay
                        title={this.props.title}
                        message={this.props.message}
                        onFormSubmit={this.props.onFormSubmit}
                        onClose={this.props.onClose}
                        buttonMessage={this.props.buttonMessage}/>,
                    document.getElementById('overlay-root'))}
            </>
        )
    }
}

export default RegisterModal;