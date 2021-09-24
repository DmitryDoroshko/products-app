import styles from "./Products.module.css";
import {Component} from "react";
import Product from "../Product/Product";

class Products extends Component {
    render() {
        const {filterText, products} = this.props;

        let productsFiltered = null;

        if (!filterText) {
            return (
                <div className={styles.products}>
                    {products?.map(product => <Product key={product.id} product={product}/>)}
                </div>
            );
        }

        if (filterText.trim().length !== 0) {
            productsFiltered = products.filter(product => product.name.indexOf(filterText) >= 0);
        } else {
            productsFiltered = products;
        }

        if (productsFiltered == null) {
            return <div>No Products Available...</div>
        }

        return (
            <div className={styles.products}>
                {productsFiltered?.map(product => <Product key={product.id} product={product}/>)}
            </div>
        );
    }

}

export default Products;