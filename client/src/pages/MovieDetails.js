import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function MovieDetail() {
    const [details, setDetails] = useState({});
    const { movieId } = useParams();

    useEffect(() => {
        getMovieDetails();
    }, [])

    const getMovieDetails = async () => {
        const response = await axios({
            url: `http://localhost:4000/movie/${movieId}`,
            method: 'get'
        });
        console.log(response.data);
        setDetails(response.data);
    }
    
    return (
        <div>
            Movie Detail of {details.title}
            <p>{details.title}</p>
            <img src={details.poster} alt={details.title} />
        </div>
    )
}

export default MovieDetail
