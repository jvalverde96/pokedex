import { Box, Wrap, WrapItem } from "@chakra-ui/react";
import React from "react";
import PokemonItem from "./PokemonItem";

const PokemonList = ({ pokemons, handlePokemonSelection }) => (
  <>
    <Box pb="100px">
      <Wrap
        maxWidth={["1000px", "1300px", "1700px", "1700px"]}
        spacing="20px"
        justify="center"
        mt={["30px", "30px", "50px", "50px"]}
      >
        {pokemons.map((pokemon) => (
          <WrapItem key={pokemon.name}>
            <PokemonItem       
              pokemon={pokemon}
              onClick={() => handlePokemonSelection(pokemon.id)}
            />
          </WrapItem>
        ))}
      </Wrap>
    </Box>
  </>
);

export default PokemonList;
