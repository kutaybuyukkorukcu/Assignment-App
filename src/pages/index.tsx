import React from "react";

import { AppContainer, MovieContainer } from "components";
import { MovieProdiver } from "context";
import { Route, Switch } from "react-router";
import { MovieDetailCard } from "components/layout/main/MovieDetailCard";

const Home: React.FC = () => {
  return (
    <AppContainer>
      <MovieProdiver>
        <Switch>
          <Route exact path="/" component={MovieContainer} />
          <Route path="/movieDetail" component={MovieDetailCard} />
        </Switch>
      </MovieProdiver>
    </AppContainer>
  );
};

export default Home;
