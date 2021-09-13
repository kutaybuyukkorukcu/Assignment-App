import { AxiosError, AxiosResponse } from "axios";
import { createContext, ReactNode, useState } from "react";
import { SearchType } from "types";
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
    totalMovieResults: number,
    loading: boolean, // Simple loading state
    searchParam: string,
    setSearchParam: (searchParam: string) => void, 
    searchType: SearchType,
    setSearchType: (searchType: SearchType) => void,
    searchMovie: (searchParam: string, page: number, override: boolean) => MovieSearchResponse,
    inspectMovie: (movieImdbId: string) => MovieDetail,
    searchRandomMovies: () => MovieSearchResponse,
    extendedSearchMovie: (searchParam: string, page: number, override: boolean) => MovieSearchResponse
}

export const MovieContext = createContext<MovieContextType | any | null>(null);

export const MovieProdiver: React.FC<ReactNode> = ({children}) => {

    const [searchType, setSearchType] = useState<SearchType>(SearchType.BASIC_SEARCH);
    const [searchParam, setSearchParam] = useState<string>('Funny');
    const [movieDetail, setMovieDetail] = useState<MovieDetail>(null);
    const [movieList, setMovieList] = useState<SimpleMovieDetail[]>([]);
    const [totalMovieResults, setTotalMovieResults] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(true);

    const searchMovie = (searchParam: string, page: number = 1, override: boolean = true) => {

        setLoading(true);

        getMoviesBySearchParam(searchParam, page)
            .then( (response: MovieSearchResponse) => {

                if (response?.Search) {
                    override == true ? setMovieList(response?.Search) : setMovieList([...movieList , ...response?.Search])
                    setTotalMovieResults(Number(response?.totalResults));
                }

                setLoading(false);
            })
            .catch( (error: AxiosError) => {
                console.log(error.toJSON());
                setLoading(false);
            });
    }

    const inspectMovie = (movieImdbId: string) => {

        setLoading(true);

        getMovieDetailByImdbId(movieImdbId)
            .then( (response: MovieDetail) => {
                setMovieDetail(response);
                setLoading(false);
            })
            .catch( (error: AxiosError) => {
                console.log(error.toJSON());
                setLoading(false);
            });
    }

    const searchRandomMovies = () => {

        setLoading(true);

        getMoviesByRandomWords()
            .then( (response: MovieSearchResponse) => {
                setMovieList(response.Search);
                setTotalMovieResults(Number(response.totalResults));
                setLoading(false);
            })
            .catch( (error: AxiosError) => {
                console.log(error.toJSON());
                setLoading(false);
            })
    }

    const extendedSearchMovie = (searchParam: string, page: number = 1, override: boolean = true) => {

        setLoading(true);

        getAdditionalMoviesBySearchParam(searchParam, page)
            .then( (response: MovieSearchResponse[]) => {
                let summedMovieList: SimpleMovieDetail[] = [];

                response.map((item: MovieSearchResponse) => {
                    
                    if (item?.Search) {
                        summedMovieList = [ 
                            ...summedMovieList, 
                            ...item.Search 
                        ];
                    }
                })
                
                override == true ? setMovieList(summedMovieList) : setMovieList([...movieList, ...summedMovieList])
                setTotalMovieResults(Number(response[0].totalResults));
                setLoading(false);
            })
            .catch( (error: AxiosError) => {
                setLoading(false);
            })
    }

    return (
        <MovieContext.Provider value={{ 
            movieDetail,
            movieList,
            totalMovieResults,
            loading,
            searchParam,
            setSearchParam,
            searchType,
            setSearchType,
            searchMovie,
            inspectMovie,
            searchRandomMovies,
            extendedSearchMovie
        }}>
            { children }
        </MovieContext.Provider>
    )
}
