import React from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import './App.css';
import Header from "./components/header";
import homepage from "./pages/homepage";
import coin from "./pages/coin";
import Alert from "./components/alert";
function App() {
  return (
    <BrowserRouter>
      <div>
        <Header />
        <Routes >
          <Route path='/' Component={homepage} exact/>
          <Route path='/coins/:id' Component={coin} />
        </Routes>
      </div>
      <Alert />

    </BrowserRouter>
  );
}

export default App;
