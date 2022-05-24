import React from 'react';
// import logo from './trivia.png';
import { Switch, Route } from 'react-router-dom';
import Config from './pages/Config';
import Login from './pages/Login/Login';
import Game from './pages/Game/Game';
import './App.css';

export default function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route path="/settings" component={ Config } />
        <Route path="/game" component={ Game } />
      </Switch>
    </div>
  );
}
