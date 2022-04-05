import React, { useEffect } from "react";
import Header from "./components/Header";
import Pokedex from "./components/Pokedex";
import Footer from "./components/Footer";

const App = () => {
  return (
    <React.Fragment>
      <Header />
      <Pokedex />
      <Footer />
    </React.Fragment>
  );
};

export default App;
