import React from "react";
import styles from "./Card.module.css";

export default class Card extends React.Component {
    render = () => {
        return (
            <div className={`${styles.card} ${this.props.className}`}>
                {this.props.children}
            </div>
        );
    }
}