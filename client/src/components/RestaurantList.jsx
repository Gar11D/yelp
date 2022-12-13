import React, {useEffect, useContext} from 'react';
import { useNavigate } from 'react-router-dom';
import RestaurantFinder from "../apis/RestaurantFinder";
import { RestaurantsContext } from '../context/RestaurantsContext';
import StarRating from './StarRating';

const RestaurantList = (props) => {
  const {restaurants, setRestaurants} = useContext(RestaurantsContext);
  let navigate = useNavigate();
  useEffect( () => {
    const fetchData = async () => {
      try{
        const response = await RestaurantFinder.get("/");
        console.log(response.data.data);
        setRestaurants(response.data.data.restaurant);
      } catch(err){
        console.log(err);
      }
    };
    fetchData();
  }, []);

  const handleDelete = async (e, id) => {
    e.stopPropagation();
    try{
      const response = await RestaurantFinder.delete(`/${id}`);
      setRestaurants(restaurants.filter(el => {return el.id !== id}))
    } catch(err) {
      console.log(err);
    }
  };

  const handleUpdate = (e, id) => {
    e.stopPropagation();
    navigate(`/restaurants/${id}/update`);
  };

  const handleRestaurantSelect = (id) => {
    navigate(`/restaurants/${id}`)
  }

  const renderRating = (restaurant) => {
    if(!restaurant.count) {
      return <span className="text-warning">0 reviews</span>
    }
    return (
      <>
        <StarRating rating={restaurant.average_rating}/>
        <span className="text-warning ml-1">({restaurant.count})</span>
      </>
    )
  }

  return (
    <div className="list-group">
        <table className="table table-hover table-dark">
            <thead>
                <tr className="bg-primary">
                    <th scope="col">Restaurant</th>
                    <th scope="col">Location</th>
                    <th scope="col">Price Range</th>
                    <th scope="col">Ratings</th>
                    <th scope="col">Edit</th>
                    <th scope="col">Delete</th>
                </tr>
            </thead>
            <tbody>
              {restaurants && restaurants.map(el => {
                return(
                  <tr onClick={() => handleRestaurantSelect(el.id)} key={el.id}>
                    <td>{el.name}</td>
                    <td>{el.location}</td>
                    <td>{"$".repeat(el.price_range)}</td>
                    <td>{renderRating(el)}</td>
                    <td><button onClick={(e) => handleUpdate(e, el.id)} 
                    className="btn btn-warning"
                    >Update</button></td>
                    <td><button onClick={(e) => handleDelete(e, el.id)}
                    className="btn btn-danger">
                      Delete
                    </button></td>
                  </tr>
                );
              })}
              {/* <tr>
                <td>mcdonalds</td>
                <td>london</td>
                <td>$$</td>
                <td>Rating</td>
                <td><button className="btn btn-warning">Update</button></td>
                <td><button className="btn btn-danger">Delete</button></td>
              </tr>
              <tr>
                <td>mcdonalds</td>
                <td>london</td>
                <td>$$</td>
                <td>Rating</td>
                <td><button className="btn btn-warning">Update</button></td>
                <td><button className="btn btn-danger">Delete</button></td>
              </tr> */}
            </tbody>
        </table>

    </div>
  )
}

export default RestaurantList