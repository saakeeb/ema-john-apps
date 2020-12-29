import React from 'react';

const ReviewItem = (props) => {
    const {name, quantity, key, price} = props.product;

    const reviewItemStyle = {
        borderBottom:'1px solid grey',
        paddingBottom:'5px',
        margin: '5px auto',
        textAlign:'center'
    }
    return (
        <div style= {reviewItemStyle}>
            <h3>{name}</h3>
            <p>Product Quantity: {quantity}</p>
            <p><small>Per Unit Cost: {price}</small></p>
            <br/>
            <button className='main-button' onClick={()=> props.removeProduct(key)}>Remove Item</button>
        </div>
    );
};

export default ReviewItem;