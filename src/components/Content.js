import { Box, useToast } from "@chakra-ui/react";
import React, { useContext, useEffect } from "react";
import LoadingSpinner from "./LoadingSpinner";
import NotFound from "./NotFound";
import { PokedexContext } from "./Pokedex";
import PokemonList from "./PokemonList";

const Content = () => {
  const {
    pokemonsAuxiliar,
    handlePokemonSelection,
    loadingPokemons,
    showError,
  } = useContext(PokedexContext);
  const toast = useToast();
  useEffect(() => {
    if (!loadingPokemons)
      toast({
        title: `Pokemons loaded successfully`,
        position: "top-right",
        isClosable: true,
      });
  }, [loadingPokemons]);

  return (
    <>
      {loadingPokemons && (
        <Box
          h="auto"
          display="flex"
          justifyContent="center"
          alignItems="center"
          color="red"
        >
          <LoadingSpinner />
        </Box>
      )}
      {!loadingPokemons && !showError && (
        <PokemonList
          pokemons={pokemonsAuxiliar}
          handlePokemonSelection={handlePokemonSelection}
        />
      )}
      {showError && <NotFound />}
    </>
  );
};

export default Content;
