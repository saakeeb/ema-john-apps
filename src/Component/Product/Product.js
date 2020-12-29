import React from 'react';
import './Product.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartPlus } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import ProductDetails from '../ProductDetails/ProductDetails';

const Product = (props) => {
    // console.log(props);
    const {name, img, seller, price, stock, key, star, starCount, category} = props.product
    return (
        <div className='product'>
            <div>
                <img src={img} alt=''></img>
            </div>
            <div>
                <h4 className='product-name'><Link to={'/product/'+ key}>{name}</Link></h4>
                <br/>
                {props.showInDetails && <p>Category: {category}</p>}
                <p><small>By: {seller}</small></p>
                <p><strong>Price: ${price}</strong></p>
                <p><small>Only {stock} left. Order soon</small></p>
                {props.showInDetails && <div>
                    <p><small>Rating: {star}/5</small></p>
                    <p><small>Total Review: {starCount}</small></p>
                </div>}
                {props.showAddToCart && <button className='main-button' onClick={()=> props.handleAddProduct(props.product)}><FontAwesomeIcon icon={faCartPlus}/> Add to cart</button>}

            </div>
            
        </div>
    );
};

export default Product;