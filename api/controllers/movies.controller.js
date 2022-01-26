const { ObjectId } = require('bson');
const mongoose = require('mongoose');
const { off } = require('process');
const Movie = mongoose.model(process.env.MOVIE_MODEL);

const _runGeoQuery = function(req, res){
    const lng = parseFloat(req.query.lng);
    const lat = parseFloat(req.query.lat);
    let distance = parseFloat(process.env.GEO_SEARCH_MAX_DIST,10);
    const point = { 
        type: "Point",
        coordinates: [lng, lat]
    };
    const query = {
        "production.location.coordinates": {
            $near: {
                $geometry: point,
                $maxDistance: distance,
                $minDistance: parseFloat(process.env.GEO_SEARCH_MIN_DIST, 10)
            }
        }
    };
    Movie.find(query).exec(function(err, movies) {
        if (err) {
            res.status(500).json({"message":err});
        }
        else {
            console.log(movies);
            res.status(200).json(movies);
        }
    });
    
};

const _searchByTitle = function(req,res){
    Movie.find({title:req.query.title}).exec(function(err, movies) {
        if (err) {
            res.status(500).json({"message":err});
        }
        else {
            console.log(movies);
            res.status(200).json(movies);
        }
    });
}
const _searchByState = function(req,res){
    Movie.find({"production.location.state":req.query.state}).exec(function(err, movies) {
        if (err) {
            res.status(500).json({"message":err});
        }
        else {
            console.log(movies);
            res.status(200).json(movies);
        }
    });
}



const getAll = function(req,res){
    console.log("GET All movies controller");
    let offset = parseInt(process.env.DEFAULT_OFFSET,10);
    let count = parseInt(process.env.DEFAULT_COUNT,10);

    if(req.query && req.query.offset){
        offset = parseInt(req.query.offset,10);
    }
    if(req.query && req.query.count){
        count = parseInt(req.query.count,10);
    }
    if(isNaN(offset) || isNaN(count)){
        res.status(400).json({"Message": process.env.OFFSET_AND_COUNT_INVALID_MSG});
    }
    else if(count > process.env.DEFAULT_MAX_COUNT){
        res.status(400).json({"Message":"Maximum count is "+process.env.DEFAULT_MAX_COUNT});  
    }
    else if (req.query && req.query.lat && req.query.lng) {
            _runGeoQuery(req, res);
    }
    else if(req.query && req.query.title){
          _searchByTitle(req,res);
    }
    else if(req.query && req.query.state){
           _searchByState(req,res);
    }
    else{
        Movie.find().skip(offset).limit(count).exec(function(err,movies){
            let response = {
                status:200,
                message: movies
            }
            if(err){
                response.status = 500;
                response.message = {"Error":err};
            }
            res.status(response.status).json(response.message);
        });
    }
    
};
const getOne = function(req,res){
    console.log("GET one movie controller");
    const movieId =req.params.movieId;
    if(!mongoose.isValidObjectId(movieId)){
        res.status(400).json({"Message":process.env.INVALID_MOVIE_ID});
        return;
    }
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
            response.message = {"Message":process.env.MOVIE_NOT_FOUND_MSG};
        }
        res.status(response.status).json(response.message);

    });
};
const addOne = function(req,res){
    console.log("POST add one movie");
    const newMovie = {
        title:req.body.title,
        year:req.body.year,
        genre:req.body.genre,
        casts:[],
        production:{}
        // location: { coordinates : [req.body.lng,req.body.lat] }
    }
    Movie.create(newMovie,function(err,movie){
        const response ={
            status:200,
            message:movie
        };
        if(err){
            response.status = 500;
            response.message = {"Error":err};
        }
        res.status(response.status).json(response.message);
    });

};

const _updateOne = function(req,res,updateOneCallback){
    const movieId =req.params.movieId;
    if(!mongoose.isValidObjectId(movieId)){
        res.status(400).json({"Message":process.env.INVALID_MOVIE_ID});
    }
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
        if(response.status !== 200){
            res.status(response.status).json(response.message);
        }
        else{
            updateOneCallback(req,res,movie,response);
        }
    });
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
    movie.title = req.body.title;
    movie.year = req.body.year;
    movie.genre = req.body.genre;
    _saveUpdate(res,movie,response);
    
}
const fullUpdateOne = function(req,res){
    console.log("PUT update one movie controller");
    _updateOne(req,res,_fullUpdateOne);
};

const _partialUpdateOne = function(req,res,movie,response){
    if(req.body.title){
        movie.title = req.body.title;
    }
    if(req.body.year){
        movie.year = req.body.year
    }
    if(req.body.gerne){
        movie.genre = req.body.genre
    }
    _saveUpdate(res,movie,response);
    
}
const partialUpdateOne = function(req,res){
    console.log("PATCH update one movie controller");
    _updateOne(req,res,_partialUpdateOne);
};

const removeOne = function(req,res){
    console.log("DELETE one movie controller");
    const movieId = req.params.movieId;
    if(!mongoose.isValidObjectId(movieId)){
        res.status(400).json({"Message":process.env.INVALID_MOVIE_ID});
    }
    else{
        Movie.findByIdAndDelete(movieId).exec(function(err,movie){
            let response = {
                status:201,
                message: process.env.MOVIE_DELETE_SUCCESS_MSG
            }
            if(err){
                response.status = 500;
                response.message = {"Error":err};
            }
            else if(!movie){
                response.status = 404;
                response.message = {"Message":process.env.MOVIE_NOT_FOUND_MSG};
            }
            res.status(response.status).json(response.message);
    
        });
    }
};

module.exports = {
    getAll,
    addOne,
    getOne,
    fullUpdateOne,
    partialUpdateOne,
    removeOne
}