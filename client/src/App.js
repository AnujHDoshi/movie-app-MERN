import React from 'react';
import { Switch, Route } from "react-router-dom";
import {Container} from "reactstrap";
import './App.css';

import Header from './component.js/Header';
import MovieList from './pages/MovieList';
import MovieDetail from './pages/MovieDetails';

function App() {
  return (
     <main>
      <Header />
        <Container>
            <Switch>
              <Route path="/:movieId" component={MovieDetail} />
              <Route path="/" component={MovieList} />
            </Switch>
        </Container>
      </main>
  );
}

export default App;
