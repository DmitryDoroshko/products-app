import styles from "./Products.module.css";
import {Component} from "react";
import Product from "../Product/Product";

class Products extends Component {
    render() {
        if (this.props.products == null) {
            return <div>No Products</div>
        }
        const prods = this.props.products;
        return (
            <div className={styles.products}>
            {prods.map(product => {

                return <Product key={product.id} product={product} />
            })}
            </div>
        );
    }

}

export default Products;