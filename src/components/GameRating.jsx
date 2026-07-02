import React ,{useState, useEffect} from 'react'
import './gameRating.css';

function GameRating({ rating }) {
    const [stars, setStars] = useState([]);
     const generateStars = () => {
        let star = [];
        if(rating>5 || rating <1){
            return;
        }
        for(let i=0; i<rating; i++){
            star.push(i);
        }
        return star;
    };

    useEffect(()=>{
        setStars(generateStars());
    },[]);


  return <div className="gameRating">
    {stars.map((star, index) =>{
    return <i key={index} className="bi bi-star-fill"></i>;
    })}
  </div>
}

export default GameRating
