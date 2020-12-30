import React from 'react';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../App';
import logo from '../../images/logo.png';
import './Header.css';

const Header = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    return (
        <div className="header">
            <img src={logo} alt="logo"></img>
            <div className='title'>
                <nav>
                    <Link to="/shop">Shop</Link>
                    <Link to="/review">Order Review</Link>
                    <Link to="/orders">Order History</Link>
                    { loggedInUser.email && 
                        <p style={{display:'inline-block', margin:'0 1%', color:'white'}}>
                            Welcome, {loggedInUser.name}
                            
                            <button onClick={()=>setLoggedInUser({})} style={{ margin:'0 2px'}}> Sign Out
                            </button>
                        </p>
                    }
                </nav>
            </div>
        </div>
    );
};

export default Header;