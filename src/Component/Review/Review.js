import React, { useState } from 'react';
import { useEffect } from 'react';
import fakeData from '../../fakeData';
import { getDatabaseCart, processOrder, removeFromDatabaseCart } from '../../utilities/databaseManager';
import Cart from '../Cart/Cart';
import ReviewItem from '../ReviewItem/ReviewItem';
import happyImage from '../../images/giphy.gif';
import { useHistory } from 'react-router-dom';
// import './Review.css'
//Review none

const Review = () => {
    const [cart, setCart] = useState([]);
    const removeProduct = productKey =>{
        console.log('Product clicked', productKey);
        const newCart = cart.filter(pd=> pd.key !== productKey);
        setCart(newCart);
        removeFromDatabaseCart(productKey);
    }
    const [orderPlaced, setOrderPlaced] = useState(false);
    const history = useHistory();

    const handlePlaceOrder = ()=>{
        history.push('/shipment')

    }
    const imageStyle={
        width:'300px', 
        height:'300px', 
        alignItem:'center', 
        margin:'50px', 
        padding:'10px auto'
    }
    let thankYou;
    if(orderPlaced){
        thankYou = <div >
            <img style={imageStyle}  src={happyImage} alt=""/>
            <h3 style={{margin:'0 60px'}}>Thank You for Purchasing from Us</h3>
        </div>;
    }

    useEffect(()=> {
        const saveCart = getDatabaseCart();
        const productKeys = Object.keys(saveCart);

        const cartProducts = productKeys.map(key=>{
            const product = fakeData.find( pd => pd.key === key);
            product.quantity = saveCart[key];
            return product;
        });

        console.log(cartProducts);
        setCart(cartProducts);
    }, [])

    return (
        <div className='twin-container'>
            <div className='product-container'>
                {
                    cart.map(pd => <ReviewItem 
                                        removeProduct={removeProduct}
                                        product={pd}>

                                    </ReviewItem>)
                }
                {thankYou}
            </div>
            <div className='cart-container'>
                <Cart cart={cart}>
                    <button className='main-button' onClick={handlePlaceOrder}>Proceed Checkout</button>
                </Cart>
            </div>

        </div>
    );
};

export default Review;