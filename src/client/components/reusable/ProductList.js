import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

//Components
import Product from './Product';

class ProductList extends Component {
    render() {
        if(this.props.loading) 
            return <div style={{textAlign: 'center'}}><img src="/images/spinner.svg" alt=""/></div>
        if(this.props.error)
            return <div style={{textAlign: 'center'}}><h1>{this.props.error}</h1></div>

        const productData = this.props.productData.map(product => {
            return <Product key={product.id} data={product}/>
        }); 

        return (
            <div className="products">
                {productData}
            </div>
        );
    }
}

const mapStateToProps = state => ({
    loading: state.products.loading,
    error: state.products.error
});

export default withRouter(connect(mapStateToProps)(ProductList));