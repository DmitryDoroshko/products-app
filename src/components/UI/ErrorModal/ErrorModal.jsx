import Card from "../Card/Card";
import Button from "../Button/Button";
import styles from "./ErrorModal.module.css";
import ReactDOM from "react-dom";
import {Component} from "react";

class Backdrop extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <div className={styles.backdrop}></div>;
    }
}

class ModalOverlay extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Card className={styles.modal}>
                <header className={styles.header}>
                    <h2>{this.props.title}</h2>
                </header>
                <div className={styles.content}>
                    <p>{this.props.message}</p>
                </div>
                <footer className={styles.actions}>
                    <Button onClick={() => this.props.onErrorOccured()}>{this.props.buttonMessage}</Button>
                </footer>
            </Card>
        )
    }
}

class ErrorModal extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <>
                {ReactDOM.createPortal(<Backdrop/>,
                    document.getElementById('backdrop-root'))}
                {ReactDOM.createPortal(<ModalOverlay
                        title={this.props.title}
                        message={this.props.message}
                        onErrorOccured={this.props.onErrorOccured}
                        buttonMessage={this.props.buttonMessage}/>,
                    document.getElementById('overlay-root'))}
            </>
        )
    }
}

export default ErrorModal;