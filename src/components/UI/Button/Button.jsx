import styles from "./Button.module.css";
import {Component} from "react";

class Button extends Component {
    render() {
        return (
            <button className={styles.button}
                    type={this.props.type || "button"}
                    onClick={this.props.onClick}>
                {this.props.children}
            </button>
        )
    }
}

export default Button;