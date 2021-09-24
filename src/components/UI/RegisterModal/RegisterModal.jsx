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
        dateOfBirth: null,
        email: "",
        password: "",
        nameInputRef: React.createRef(),
        dateInputRef: React.createRef(),
        emailInputRef: React.createRef(),
        passwordInputRef: React.createRef(),
    };

    setInitialState = () => {
        this.setState({
            name: "",
            dateOfBirth: null,
            email: "",
            password: "",
            nameInputRef: React.createRef(),
            dateInputRef: React.createRef(),
            emailInputRef: React.createRef(),
            passwordInputRef: React.createRef(),
        });
    }

    formDataValidCheck = (formData) => {
        if (formData.name.trim().length < 3) {
            this.state.nameInputRef.current.classList.add('error');
            return false;
        } else {
            this.state.nameInputRef.current.classList.remove('error');
        }

        if (+formData.dateOfBirth?.getFullYear() < 1900) {
            this.state.dateInputRef.current.classList.add("error");
            return false;
        } else {
            this.state.dateInputRef.current.classList.remove("error");
        }

        if (+formData.dateOfBirth?.getFullYear() > 2100) {
            this.state.dateInputRef.current.classList.add("error");
            return false;
        } else {
            this.state.dateInputRef.current.classList.remove("error");
        }

        if (!formData.email.includes("@")) {
            this.state.emailInputRef.current.classList.add("error");
            return false;
        } else {
            this.state.emailInputRef.current.classList.remove("error");
        }

        if (formData.password.trim().length < 3) {
            this.state.passwordInputRef.current.classList.add("error");
            return false;
        } else {
            this.state.passwordInputRef.current.classList.remove("error");
        }

        return true;
    }

    nameChangeHandler = (event) => {
        this.setState(prevState => {
            return {...prevState, name: event.target.value};
        })
    }

    dateOfBirthChangeHandler = (event) => {
        this.setState(prevState => {
            return {...prevState, dateOfBirth: event.target.value};
        })
    }

    emailChangeHandler = (event) => {
        this.setState(prevState => {
            return {...prevState, email: event.target.value};
        })
    }

    passwordChangeHandler = (event) => {
        this.setState(prevState => {
            return {...prevState, password: event.target.value};
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

                    if (this.formDataValidCheck(formData)) {
                        this.setInitialState();
                        this.props.onFormSubmit(event);
                    }

                }}>
                    <div className={styles.controls}>
                        <label htmlFor="name">Name</label>
                        <input type="text"
                               id="name"
                               value={this.state.name}
                               onChange={e => this.nameChangeHandler(e)}
                               ref={this.state.nameInputRef}/>
                    </div>
                    <div className={styles.controls}>
                        <label htmlFor="date-of-birth">Date of Birth</label>
                        <input type="date"
                               id="date-of-birth"
                               value={this.state.dateOfBirth}
                               onChange={e => this.dateOfBirthChangeHandler(e)}
                               ref={this.state.dateInputRef}/>
                    </div>
                    <div className={styles.controls}>
                        <label htmlFor="email">Email</label>
                        <input type="email"
                               id="email" value={this.state.email}
                               onChange={e => this.emailChangeHandler(e)}
                               ref={this.state.emailInputRef}/>
                    </div>
                    <div className={styles.controls}>
                        <label htmlFor="password">Password</label>
                        <input type="password"
                               id="password"
                               value={this.state.password}
                               onChange={e => this.passwordChangeHandler(e)}
                               ref={this.state.passwordInputRef}/>
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