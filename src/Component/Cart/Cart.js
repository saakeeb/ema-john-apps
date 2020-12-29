import React from 'react';
import './Cart.css';

const Cart = (props) => {
    
    const cart = props.cart;
    console.log(cart);
    const total = cart.reduce((total, item)=> total + item.price * item.quantity, 0);
    
    let shippingCost = 0;
    if (total>100){
        shippingCost = 0;
    }
    else if(total>49.99){
        shippingCost = 4.99;
    }
    else if(total> 0){
        shippingCost = 12.99;
    }
    const tax = (total*7.5)/100;

    const formatNumber = num=>{
        const precision = num.toFixed(2);
        return Number(precision);
    }
    const grandTotal = formatNumber(total + shippingCost + tax)
    // console.log(total);
    return (
        <div className='cart'>
            <h3>Order Summary</h3>
            <h5>Items Ordered: {cart.length}</h5>
            <p>Product Price: ${formatNumber(total)}</p>
            <p><small>Shipping Cost: ${formatNumber(shippingCost)}</small></p>
            <p><small>Tax(7.5%): ${formatNumber(tax)}</small></p>
            <p><strong>Total Price: ${grandTotal}</strong></p>
            <br/>
            {props.children}
        </div>
    );
};

export default Cart;