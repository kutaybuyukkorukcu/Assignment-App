import { MovieContext, MovieContextType } from "context";
import React, { useContext } from "react";
import { Link } from "react-router-dom";

export const MovieDetailCard: React.FC = () => {

    const {
        movieDetail,
        loading
    } = useContext(MovieContext) as MovieContextType;

    if (loading == false) {
        return (
            <div className="max-w-4xl flex items-center h-auto lg:h-screen flex-wrap mx-auto my-32 lg:my-0">
                <div className="w-full lg:w-3/5 rounded-lg lg:rounded-l-lg lg:rounded-r-none shadow-2xl bg-white mx-6 lg:mx-0">
                    <div className="p-4 md:p-12 text-center lg:text-left">
                        <p> <span className="text-lg font-extrabold"> Title: </span> { movieDetail.Title } </p>
                        <p> <span className="text-lg font-extrabold"> Year: </span> { movieDetail.Year } </p>
                        <p> <span className="text-lg font-extrabold"> Runtime: </span> { movieDetail.Runtime } </p>
                        <p> <span className="text-lg font-extrabold"> Director: </span> { movieDetail.Director } </p>
                        <p> <span className="text-lg font-extrabold"> Actors: </span> { movieDetail.Actors } </p>
                        <p> <span className="text-lg font-extrabold"> Awards: </span> { movieDetail.Awards } </p>
                    </div>
                </div>
                <div className="w-full lg:w-2/5">
                    <img src={movieDetail.Poster} className="rounded-none lg:rounded-lg shadow-2xl hidden lg:block" alt="Movie's poster"/>
                </div>
                <div className="absolute top-20 h-12 w-18 p-4">
                    <Link to="/">
                        Home Page
                    </Link>
                </div>
            </div>
        )
    }

    if (loading == true) {
        // Spinner
        return null;
    }
}
