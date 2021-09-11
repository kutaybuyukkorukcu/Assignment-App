import { AxiosError, AxiosResponse } from "axios";
import { createContext, ReactNode, useState } from "react";
import { 
    getAdditionalMoviesBySearchParam,
    getMovieDetailByImdbId,
    getMoviesByRandomWords,
    getMoviesBySearchParam 
} from "../../services"
import { 
    MovieDetail, 
    SimpleMovieDetail,
    MovieSearchResponse
} from "../../types";

export type MovieContextType = {
    movieDetail: MovieDetail,
    movieList: SimpleMovieDetail[],
    searchMovie: (searchParam: string, page: number) => MovieSearchResponse,
    inspectMovie: (movieImdbId: string) => MovieDetail,
    searchRandomMovies: () => MovieSearchResponse,
    extendedSearchMovie: (searchParam: string, page: number) => MovieSearchResponse
}

export const MovieContext = createContext<MovieContextType | any | null>(null);

export const MovieProdiver: React.FC<ReactNode> = ({children}) => {
    const [movieDetail, setMovieDetail] = useState<MovieDetail>(null);
    const [movieList, setMovieList] = useState<SimpleMovieDetail[]>([]);

    const searchMovie = (searchParam: string, page: number = 1) => {

        getMoviesBySearchParam(searchParam, page)
            .then( (response: MovieSearchResponse) => {
                setMovieList(response.Search);
            })
            .catch( (error: AxiosError) => {
                console.log(error.toJSON());
            });
    }

    const inspectMovie = (movieImdbId: string) => {

        getMovieDetailByImdbId(movieImdbId)
            .then( (response: MovieDetail) => {
                setMovieDetail(response);
            })
            .catch( (error: AxiosError) => {
                console.log(error.toJSON());
            });
    }

    const searchRandomMovies = () => {

        getMoviesByRandomWords()
            .then( (response: MovieSearchResponse) => {
                setMovieList(response.Search);
            })
            .catch( (error: AxiosError) => {
                console.log(error.toJSON());
            })
    }

    const extendedSearchMovie = (searchParam: string, page: number) => {

        getAdditionalMoviesBySearchParam(searchParam, page)
            .then( (response: MovieSearchResponse[]) => {
                let movieList: SimpleMovieDetail[] = [];

                response.map((item: MovieSearchResponse) => {
                    movieList = [ 
                        ...movieList, 
                        ...item.Search 
                    ];
                })
                setMovieList(movieList);
            })
            .catch( (error: AxiosError) => {
                console.log(error.toJSON());
            })
    }

    return (
        <MovieContext.Provider value={{ 
            movieDetail,
            movieList,
            searchMovie,
            inspectMovie,
            searchRandomMovies,
            extendedSearchMovie
        }}>
            { children }
        </MovieContext.Provider>
    )
}
