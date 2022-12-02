import React, {useState} from 'react';
import {useParams} from 'react-router-dom';

const UpdateRestaurant = (props) => {
  const {id} = useParams();
  const [name, setName] =useState();
  const [location, setLocation] =useState();
  const [priceRange, setPriceRange] =useState();
  return (
    <div>
      <form action="">
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input id="name" className="form-control" type="text" />
        </div>
        <div className="form-group">
          <label htmlFor="location">Location</label>
          <input id="location" className="form-control" type="text" />
        </div>
        <div className="form-group">
          <label htmlFor="price_range">Price Range</label>
          <input id="price_range" className="form-control" type="number" />
        </div>
        <button className="btn btn-primary">Submit</button>
      </form>
    </div>
  )
}

export default UpdateRestaurant