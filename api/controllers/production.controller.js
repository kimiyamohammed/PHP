const { ObjectId } = require('bson');
const { log } = require('console');
const mongoose = require('mongoose');
const { off } = require('process');
const Movie = mongoose.model(process.env.MOVIE_MODEL);

// const getAll = function(req,res){
//     console.log("GET all actors controller");
//     const movieId =req.params.movieId;
//     if(!mongoose.isValidObjectId(movieId)){
//         res.status(400).json({"Message":process.env.INVALID_MOVIE_ID});
//         return;
//     }
//     Movie.findById(movieId).select("production").exec(function(err,movie){
//         let response = {
//             status:200,
//             message: movie.casts
//         }
//         if(err){
//             response.status = 500;
//             response.message = {"Error":err};
//         }
//         else if(!movie){
//             response.status = 404;
//             response.message = {"Message":process.env.INVALID_MOVIE_ID};
//         }
//         else{
//             response.message = movie.casts;
//         }
//         res.status(response.status).json(response.message);

//     });
    
// };

const getOne = function(req,res){
    console.log("GET one actor controller");
    const movieId =req.params.movieId;
    const productionId =req.params.productionId;
    if(!mongoose.isValidObjectId(movieId)){
        res.status(400).json({"Message":process.env.INVALID_MOVIE_ID});
    }
    else if(!mongoose.isValidObjectId(productionId)){
        res.status(400).json({"Message":process.env.INVALID_ACTOR_ID});
    }
    else{
        Movie.findById(movieId).select("production").exec(function(err,movie){
            let response = {
                status:200,
                message: movie
            }
            //console.log(movie.casts.id(productionId));
            if(err){
                response.status = 500;
                response.message = {"Error":err};
            }
            else if(!movie){
                response.status = 404;
                response.message = {"Message":process.env.MOVIE_NOT_FOUND_MSG};
            }
            else if(!movie.casts.id(productionId)){
                response.status = 404;
                response.message = {"Message":process.env.PRODUCTION_NOT_FOUND_MSG};
            }
            else{
                response.message = movie.casts.id(productionId);
            }
            res.status(response.status).json(response.message);
        });
    }
};


const _addProduction = function(req,res,movie){
    const lat = parseFloat(req.body.lat);
    const lng = parseFloat(req.body.lng);

    if(isNaN(lat) || isNaN(lng)){
        res.status(400).json({"Message": process.env.LAT_AND_LNG_INVALID_MSG});
    }

    else{
        movie.production.prodName = req.body.prodName;
    movie.production.location.state = req.body.state;
    movie.production.location.coordinates = [lng,lat];
    movie.save(function(err,cast){
        const response={
            status:200,
            message:cast
        };
        if(err){
            response.status = 500;
            response.message = {"message":err};
        }
        res.status(response.status).json(response.message);
    });  
    }
};
const addOne = function(req,res){
    console.log("POST add one actor");
    const movieId =req.params.movieId;
    const productionId =req.params.productionId;
    if(!mongoose.isValidObjectId(movieId)){
        res.status(400).json({"Message":process.env.INVALID_MOVIE_ID});
    }
    else if(!mongoose.isValidObjectId(productionId)){
        res.status(400).json({"Message":process.env.INVALID_ACTOR_ID});
    }
    else{
        Movie.findById(movieId).select("production").exec(function(err,movie){
            let response = {
                status:200,
                message: movie
            }
            if(err){
                response.status = 500;
                response.message = {"Error":err};
            }
            else if(!movie){
                response.status = 404;
                response.message = {"Message":process.env.MOVIE_NOT_FOUND_MSG};
            }
            else if(movie){
                _addProduction(req,res,movie)    
            }
            else{
                res.status(response.status).json(response.message);
            }
        });
    } 
};

const _updateOne = function(req,res,updateOneCallback){

    const movieId =req.params.movieId;
    const productionId =req.params.productionId;

    if(!mongoose.isValidObjectId(movieId)){
        res.status(400).json({"Message":process.env.INVALID_MOVIE_ID});
    }
    else if(!mongoose.isValidObjectId(productionId)){
        res.status(400).json({"Message":process.env.INVALID_ACTOR_ID});
    }
    else{
        Movie.findById(movieId).exec(function(err,movie){

            let response = {
                status:200,
                message: movie
            }
            if(err){
                response.status = 500;
                response.message = {"Error":err};
            }
            else if(!movie){
                response.status = 404;
                response.message = {"Message": process.env.MOVIE_NOT_FOUND_MSG};
            }
            else if(!movie.casts.id(productionId)){
                response.status = 404;
                response.message = {"Message":process.env.CAST_NOT_FOUND_MSG};
            }
            if(response.status !== 200){
                res.status(response.status).json(response.message);
            }
            else{
                updateOneCallback(req,res,movie,response);
            }
        });
    }
}
const _saveUpdate = function(res,movie,response){
    movie.save(function(err){
        if(err){
            response.status = 500;
            response.message = {"Error":err};
        }
        else{
            response.message = movie;
        }
        res.status(response.status).json(response.message);
    });
}
const _fullUpdateOne = function(req,res,movie,response){
    movie.casts.id(req.params.productionId).name = req.body.name;
    movie.casts.id(req.params.productionId).age = req.body.age;
    _saveUpdate(res,movie,response);
    
}
const _partialUpdateOne = function(req,res,movie,response){
    if(req.body.name){
        movie.casts.id(req.params.productionId).name = req.body.name;
    }
    if(req.body.age){
        movie.casts.id(req.params.productionId).age = req.body.age
    }
    _saveUpdate(res,movie,response);
    
}
const fullUpdateOne = function(req,res){
    console.log("PUT update one cast controller");
    _updateOne(req,res,_fullUpdateOne);
};

const partialUpdateOne = function(req,res){
    console.log("PATCH update one cast controller");
    _updateOne(req,res,_partialUpdateOne);
};


const removeOne = function(req,res){
    console.log("DELETE one actor controller");
    const movieId =req.params.movieId;
    const productionId =req.params.productionId;
    if(!mongoose.isValidObjectId(movieId)){
        res.status(400).json({"Message":process.env.INVALID_MOVIE_ID});
    }
    else if(!mongoose.isValidObjectId(productionId)){
        res.status(400).json({"Message":process.env.INVALID_ACTOR_ID});
    }
    else{
        Movie.findById(movieId).select("casts").exec(function(err,movie){
            let response = {
                status:200,
                message: process.env.CAST_DELETE_SUCCESS_MSG
            }
            if(err){
                response.status = 500;
                response.message = {"Error":err};
            }
            else if(!movie){
                response.status = 404;
                response.message = {"Message":process.env.MOVIE_NOT_FOUND_MSG};
            }
            else if(!movie.casts.id(productionId)){
                response.status = 404;
                response.message = {"Message":process.env.CAST_NOT_FOUND_MSG};
            }
            else{
                movie.casts.pull(productionId);
                movie.save(function (err) {
                    if (err){
                        response.status = 400
                        response.message = err;
                    }
                    res.status(response.status).json(response.message);
                    return;
                });
            }
            res.status(response.status).json(response.message);
        });
    }
};

module.exports = {
    // getAll,
    addOne,
    getOne,
    fullUpdateOne,
    partialUpdateOne,
    removeOne
}