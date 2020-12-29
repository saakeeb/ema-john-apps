import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { UserContext } from '../../App';
import './Shipment.css'

const Shipment = () => {
    const { register, handleSubmit, watch, errors } = useForm();
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const onSubmit = data => console.log(data);
  
    return (
      <form className='ship-form' onSubmit={handleSubmit(onSubmit)}>
        <input name="name" defaultValue={loggedInUser.name} ref={register({ required: true })} placeholder='Your Name'/>
        {errors.name && <span className='error'>This field is required</span>}

        <input name="email" defaultValue={loggedInUser.email} ref={register({ required: true })} placeholder='Your Email'/>
        {errors.email && <span className='error'>This field is required</span>}

        <input name="mobile" defaultValue={loggedInUser.mobile} ref={register({ required: true })} placeholder='Your Mobile Number'/>
        {errors.mobile && <span className='error'>This field is required</span>}

        <input name="address" defaultValue={loggedInUser.address} ref={register({ required: true })} placeholder='Your Address'/>
        {errors.address && <span className='error'>This field is required</span>}
        
        <input type="submit" />
      </form>
    );
};

export default Shipment;