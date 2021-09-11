import React from "react";

import { AppContainer, MovieContainer, MovieCard, SearchBar } from "components";
import { MovieProdiver } from "context";

const Home: React.FC = () => {
  return (
    <AppContainer>
      <MovieProdiver>
        <MovieContainer />
      </MovieProdiver>
    </AppContainer>
  );
};

export default Home;
