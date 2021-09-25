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
        isNameValid: true,
        isDateOfBirthValid: true,
        isEmailValid: true,
        isPasswordValid: true,
    };

    setInitialState = () => {
        this.setState({
            name: "",
            dateOfBirth: "",
            email: "",
            password: "",
            isNameValid: true,
            isDateOfBirthValid: true,
            isEmailValid: true,
            isPasswordValid: true,
        });
    }

    nameChangeHandler = ({target: {value}}) => {
        this.setState(prevState => {
            let isNameValid = true;

            if (value.trim().length < 3) {
                isNameValid = false;
            }

            return {...prevState, name: value, isNameValid: isNameValid};
        })
    }

    dateOfBirthChangeHandler = ({target: {value}}) => {
        this.setState(prevState => {
            let isDateOfBirthValid = true;
            let date = new Date(value);
            if (date.getFullYear() < 1900 || date.getFullYear() > 2100) {
                isDateOfBirthValid = false;
            }
            return {...prevState, dateOfBirth: value, isDateOfBirthValid: isDateOfBirthValid};
        })
    }

    emailChangeHandler = ({target: {value}}) => {
        this.setState(prevState => {
            let isEmailValid = true;
            if (!value.includes("@")) {
                isEmailValid = false;
            }
            return {...prevState, email: value, isEmailValid: isEmailValid};
        })
    }

    passwordChangeHandler = ({target: {value}}) => {
        this.setState(prevState => {
            let isPasswordValid = true;
            if (value.trim().length < 6) {
                isPasswordValid = false;
            }
            return {...prevState, password: value, isPasswordValid: isPasswordValid};
        })
    }

    render() {
        return (
            <Card className={styles.modal}>
                <button className={styles.closeButton} onClick={this.props.onClose}>X</button>
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

                    if (this.state.isNameValid
                        && this.state.isDateOfBirthValid
                        && this.state.isEmailValid && this.state.isPasswordValid) {

                        this.setInitialState();
                        this.props.onFormSubmit(event);
                    } else {
                        alert("Something went wrong");
                    }

                }}>
                    <div className={`${styles.controls}`}>
                        <label htmlFor="name">Name {!this.state.isNameValid ? <span className={styles.error}>{`Invalid name: (should be more than 2 characters)`}</span> : ""}</label>
                        <input type="text"
                               id="name"
                               value={this.state.name}
                               required
                               onChange={e => this.nameChangeHandler(e)
                               }
                               />
                    </div>
                    <div className={`${styles.controls}`}>
                        <label htmlFor="date-of-birth">Date of Birth {this.state.isDateOfBirthValid ? "" :
                            <span className={styles.error}>{`Invalid date: (should be between 1900-2100)`}</span>
                        }</label>
                        <input type="date"
                               id="date-of-birth"
                               value={this.state.dateOfBirth}
                               min="1900-01-01"
                               max="2100-12-31"
                               required
                               onChange={e => this.dateOfBirthChangeHandler(e)}
                        />
                    </div>
                    <div className={`${styles.controls}`}>
                        <label htmlFor="email">Email  {!this.state.isEmailValid ? <span className={styles.error}>{`Invalid email: (should contain @)`}</span> : ""}</label>
                        <input type="email"
                               id="email"
                               value={this.state.email}
                               required
                               onChange={e => this.emailChangeHandler(e)}
                               />
                    </div>
                    <div className={`${styles.controls}`}>
                        <label htmlFor="password">Password  {!this.state.isPasswordValid ? <span className={styles.error}>{`Invalid password: (should be more than 5 characters)`}</span>: ""}</label>
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