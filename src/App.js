import React, {Component} from 'react';
import Products from "./components/Products/Products/Products";
import Register from "./components/Register/Register";



class App extends Component {
    constructor(props) {
        super(props);
        this.state = this.getInitialState();
    }

    getInitialState() {
        return {products: [], isRegistered: false};
    }

    componentDidMount() {
        const fetchedProducts = [];
        for (let i = 0; i < 10; i++) {
            fetch("https://api.punkapi.com/v2/beers/random")
                .then(res => res.json())
                .then(product => {
                fetchedProducts.push({
                    id: product[0].id,
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

    render() {
        const isRegistered = this.state.isRegistered;

        return (
            <div className="App">
                { isRegistered ? <Products products={this.state.products}/> : <Register isRegistered={isRegistered} onIsRegisteredChange={this.registerChangeHandler}/> }
            </div>
        );
    }
}

export default App;
