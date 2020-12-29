import React from 'react';
import { useParams } from 'react-router-dom';
import fakeData from '../../fakeData';
import Product from '../Product/Product';

const ProductDetails = (props) => {
    const style = {
        textAlign: 'center'
    }
    const {productKey} = useParams();
    const product = fakeData.find(pd=> pd.key === productKey)
    return (
        <div>
            <h1 style={style}>Product ID &quot;{productKey}&quot; Details Are Here...</h1>
            <Product
            showAddToCart={false}
            showInDetails={true}
            product={product}>

            </Product>
        </div>
    );
};

export default ProductDetails;