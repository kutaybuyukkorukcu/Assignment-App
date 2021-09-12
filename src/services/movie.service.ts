import axios, { AxiosError, AxiosResponse } from 'axios';

// const API_KEY: string = process.env.API_KEY;
const API_KEY: string = 'f2e05a22';

export const getMoviesBySearchParam = (searchParam: string, page: number = 1) => {
    return axios
        .get(`http://www.omdbapi.com/?s="${searchParam}"&page=${page}&apikey=${API_KEY}`, 
            { headers: {'Content-Type': 'application/json'} }
        )
        .then((movieList: AxiosResponse) => {
            return movieList.data;
        })
        .catch((error: AxiosError) => {
            console.log(error.toJSON());
        });
}

export const getMovieDetailByImdbId = (movieImdbId: string) => {
    return axios
        .get(`http://www.omdbapi.com/?i=${movieImdbId}&apikey=${API_KEY}`,
            { headers: {'Content-Type': 'application/json'} }
        )
        .then((movieDetail: AxiosResponse) => {
            return movieDetail.data;
        })
}

export const getMoviesByRandomWords = () => {
    
    // const randomWord = randomWords[Math.floor(Math.random() * 10)];
    const randomWord = 'MARVEL';

    return axios
        // .get(`http://www.omdbapi.com/?s="${randomWord}"&apikey=${API_KEY}`, 
        .get(`http://www.omdbapi.com/?s=${randomWord}&apikey=${API_KEY}`, 
            { headers: {'Content-Type': 'application/json'} }
        )
        .then((movieList: AxiosResponse) => {
            return movieList.data;
        });
}

export const getAdditionalMoviesBySearchParam = (searchParam: string, page: number = 1) => {
    return axios
        .all(
            [
                axios.get(`http://www.omdbapi.com/?s="${searchParam}"&page=${page}&apikey=${API_KEY}`, 
                    { headers: {'Content-Type': 'application/json'} }
                ),
                axios.get(`http://www.omdbapi.com/?s="${searchParam}"&page=${page + 1}&apikey=${API_KEY}`, 
                    { headers: {'Content-Type': 'application/json'} }
                )
            ]
        )
        .then(
            axios.spread((firstMovieList: AxiosResponse, secondMovieList: AxiosResponse) => {
                return [ ...firstMovieList.data, ...secondMovieList.data ]
            })
        );

} 

// const randomWords = [
//     'MARVEL',
//     'SPIDERMAN',
//     'GOOD',
//     'SONY',
//     'BATMAN',
//     'HOME',
//     'XMEN',
//     'ROMANTIC',
//     'COMEDY'
// ]