import React, {Component} from 'react';
import Products from "./components/Products/Products/Products";
import Register from "./components/Register/Register";
import {v4 as uuidv4} from 'uuid';

const NUMBER_OF_REQUESTS = 100;
const REQUEST_URL = "https://api.punkapi.com/v2/beers/random";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = this.getInitialState();
    }

    getInitialState() {
        return {products: [], isRegistered: false, filterText: ""};
    }

    componentDidMount() {
        const fetchedProducts = [];
        for (let i = 0; i < NUMBER_OF_REQUESTS; i++) {
            fetch(REQUEST_URL)
                .then(res => res.json())
                .then(product => {
                    fetchedProducts.push({
                        id: uuidv4(),
                        image_url: product[0].image_url,
                        name: product[0].name,
                        description: product[0].description
                    });
                });
        }
        this.setState({products: fetchedProducts, isRegistered: false});
    }

    registerChangeHandler = () => {
        this.setState(prevState => {
            return {...prevState, isRegistered: !prevState.isRegistered}
        });
    }

    handleInputChange = (event) => {
        this.setState(prevState => {
            return {...prevState, filterText: event.target.value};
        });
    }

    render() {
        const isRegistered = this.state.isRegistered;
        return (
            <div className="App">
                {isRegistered && <div>
                    <label htmlFor="filter-text">Search beer by name: </label>
                    <input type="text"
                           id="filter-text"
                           className="input-filter-text"
                           value={this.state.filterText}
                           onChange={this.handleInputChange}/>
                </div>}
                {isRegistered
                    ? <Products
                        filterText={this.state.filterText}
                        products={this.state.products}/>
                    : <Register isRegistered={isRegistered}
                                onIsRegisteredChange={this.registerChangeHandler}/>}
            </div>
        );
    }
}

export default App;
