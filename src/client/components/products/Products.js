import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

//Components
import ProductList from '../reusable/ProductList';

//Actions
import { GetProducts } from '../../store/actions/productsActions';

class Products extends Component {
    componentDidMount(){
        this.props.GetProducts();
    }

    render() {
        const { products } = this.props;
        const { path } = this.props.match;
        return (
            <div className="product-list">
                <h3>{path === '/' ? 'Some products' : 'Products'}</h3>
                <ProductList productData={path === '/' ? products.slice(0, 6) : products}/>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    products: state.products.products,
    cartItems: state.products.cartItems
});

export default withRouter(connect(mapStateToProps, { GetProducts })(Products));