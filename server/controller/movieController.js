const { Op } = require('sequelize');

const {Movie} = require('../model')


const listAllMovie = async (req, res) => {
    const { title } = req.query;

    if (title) {
        const movies = await Movie.findAll({
            where: {
                title: {
                    [Op.or]: {
                        [Op.substring]: title
                    }
                }
            }
        });
        return res.json(movies);
    }
    else {
        const movies = await Movie.findAll({ raw: true });
        return res.json(movies);
    }
    
}

const findMovieById = async(req, res) => {
    const { movieId } = req.params;

    const movie = await Movie.findOne({
        where: {
            id: Number(movieId)
        }
    })
    if (!movie) {
        return res.status(404).json({
            message: "Movie Id not found please try again with valid id."
        });
    }
    return res.json(movie);
}

const addMovie = async (req, res) => {
    const {movieId,name,poster} = req.body;
    
    if(!name || !poster){
        return res.status(400).json({message:"Please fill all the mandatory fields"});
    }
   
    const movieRecord = {
        movieId:movieId,
        title:name,
        poster:poster
    }
    
    const result = await Movie.create(movieRecord);
    if (result) {
        return res.json({message:"Successfully added movies."});
    } else {
        console.log("Errors")
    }
    
}

const deleteMovie = async (req, res) => {
    const { name } = req.body;
    const deleteResult = await Movie.destroy({
        where: {
            title: name
        }
    });
    return res.json({"message":"Movie deleted succesfully."})
    
}
module.exports = {
    listAllMovie, findMovieById,addMovie,deleteMovie
}