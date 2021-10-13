# Movie-App

This project was generated with [superplate](https://github.com/pankod/superplate).

## Getting Started

superplate is a Next.js all-in-one project generator. Create your project with the tools you need without spending hours on setting them up.

## Available Scripts

### Running the development server. Craco Start

```bash
    npm run start
```

### Building for production.

```bash
    npm run build
```

### Running the dev server. Craco start

```bash
    npm run start
```
### Bonus Items

• Api returns 10 item in one call. Find a way to show 20 item in per page. **DONE**\
• Use client side caching for reduce your api calls and explain it how to achieve this. **DONE** (Context api)\

With the use of context api the user does not have to reselect the search type or retype the search parameter.\

Although the user switches between the pages, when the user goes to the page where the movies are listed, the user will see that the previous selections will remain the same.\

I could not include the pageNumber state into the context api due to time limitation. If I did, my expectation would be that the pagination would not reset after the person went to the movie detail page and came.\

• Unit Tests **DONE** (Didnt have enough time for them. Tried to implement for some components and did but was out of time to corret them)\
• Reusable components **DONE**\

### Additional Libraries

TailwindCSS, React Context API, Jest, Testing Library, Axios, Craco

## Application Parts

#### Services (https://github.com/kutaybuyukkorukcu/Assignment-App/blob/main/src/services/movie.service.ts)

- getMoviesBySearchParam(searchParam: string, page: number = 1)\
// Returns 10 movie data depending on the search parameter
- getMovieDetailByImdbId(movieImdbId: string)\
// Returns all the details of a given movie
- getAdditionalMoviesBySearchParam(searchParam: string, page: number = 1)\
// Returns 20 movie data depending on the search parameter

#### Types

- SimpleMovieDetail\
// omdb search response movie data list
- MovieSearchResponse\
Response: string | boolean;
Search: SimpleMovieDetail[];
totalResults: string | number;
// omdb search response entity
- MovieDetail\
// omdb get movie detail by imdb id
- SearchType\
// BASIC_SEARCH implies listed movie data length per page is 3 and the used service is getMoviesBySearchParam
// EXTENDED_SEARCH implies listed movie data length per page is 20 and the used service is getAdditionalMoviesBySearchParam

#### Pages

- Movie Page\
// MovieContainer and MovieDetailCard with react-router implemented

#### Components

- MovieContainer (https://github.com/kutaybuyukkorukcu/Assignment-App/blob/main/src/components/layout/container/MovieContainer/index.tsx)\

MovieContainer includes SearchBar, MovieList and ReactPaginate components 

- SearchBar (https://github.com/kutaybuyukkorukcu/Assignment-App/blob/main/src/components/layout/main/SearchBar/index.tsx)\

uses searchParam, setSearchParam, searchType, setSearchType from context.\
Doesnt make api call as soon as input changes, it does after 300 ms.\

- MovieList (https://github.com/kutaybuyukkorukcu/Assignment-App/blob/main/src/components/layout/main/MovieList/index.tsx)

uses movieList, inspectMovie, loading from context\
pagination for 2 case.\
First one is 10 data by service and 3 movie per page\
Second one is 20 data by service and 20 movie per page\

Lists paginated movies with the usage of MovieCard component.\

- MovieCard (https://github.com/kutaybuyukkorukcu/Assignment-App/blob/main/src/components/layout/main/MovieCard/index.tsx)\

uses movieDetail, inspectMovie props.\
Simple cards that gives simple informations about the movies.\

- MovieDetailCard (https://github.com/kutaybuyukkorukcu/Assignment-App/blob/main/src/components/layout/main/MovieDetailCard.tsx)\

uses movieDetail, loading from context\
An independent card with detailed information about the movie\

#### Context

- MovieContext (https://github.com/kutaybuyukkorukcu/Assignment-App/blob/main/src/context/MovieContext/MovieContext.tsx)

// MovieContextType

**movieDetail**: *MovieDetail*\
**movieList**: *SimpleMovieDetail[]*\
**totalMovieResults**: *number*\
**loading**: *boolean // Simple loading state*\
**searchParam**: *string*\
**setSearchParam**: *(searchParam: string) => void*\
**searchType**: *SearchType*\
**setSearchType**: *(searchType: SearchType) => void*\
**searchMovie**: *(searchParam: string, page: number, override: boolean) => MovieSearchResponse*\
**inspectMovie**: *(movieImdbId: string) => MovieDetail*\
**searchRandomMovies**: *() => MovieSearchResponse*\
**extendedSearchMovie**: *(searchParam: string, page: number, override: boolean) => MovieSearchResponse*

- searchMovie\
// Uses getMoviesBySearchParam service
- inspectMovie\
// Uses getMovieDetailByImdbId service
- extendedSearchMovie
// Uses getAdditionalMoviesBySearchparam service

## License

MIT
