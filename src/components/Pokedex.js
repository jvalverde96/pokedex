import React, { createContext, useCallback, useEffect, useState } from "react";
import axiosClient from "../api/axios-config";
import { Flex, useDisclosure } from "@chakra-ui/react";
import PokemonData from "./PokemonData";
import Content from "./Content";
import Filters from "./Filters";
import { propKeys } from "../constants/constants";
import Intro from "./Intro";

export const PokedexContext = createContext();

const Pokedex = () => {
  const [pokemons, setPokemons] = useState([]);
  const [pokemonsAuxiliar, setPokemonsAuxiliar] = useState([]);
  const [loadingPokemons, setLoadingPokemons] = useState(true);
  const [clickedPokemonId, setclickedPokemonId] = useState(null);
  const [imageType, setImageType] = useState("official-artwork");
  const [renderApplication, setRenderApplication] = useState(false);
  const [showError, setShowError] = useState(false);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const getPokemons = useCallback(async () => {
    const response = await axiosClient.get("pokemon?limit=1118");

    const buildPokemonObject = async (pokemon) => {
      const pokemonData = await axiosClient.get(pokemon.url);
      const speciesData = await axiosClient.get(pokemonData.data.species.url);
      const {
        flavor_text_entries: textEntries,
        gender_rate: genderRate,
        capture_rate: captureRate,
        generation,
        evolution_chain,
      } = speciesData.data;
      const description = textEntries
        .reverse()
        .find((entry) => entry.language.name === "en").flavor_text;
      const femaleRatio = genderRate !== -1 ? 12.5 * genderRate : 0;
      const maleRatio = genderRate !== -1 ? 12.5 * (8 - genderRate) : 0;
      const pokemonCaptureRate = Math.round((100 / 255) * captureRate);
      const pokemonGeneration = generation.name.replace("generation-", "").toUpperCase();
      const evolutionChain = await axiosClient.get(evolution_chain.url);
      const { id: chainId } = evolutionChain.data;
      let pokemonFinalOject = {};
      Object.keys(pokemonData.data).forEach((key) => {
        if (propKeys.includes(key)) {
          pokemonFinalOject[key] = pokemonData.data[key];
        }
      });
      pokemonFinalOject = {
        ...pokemonFinalOject,
        description,
        maleRatio,
        femaleRatio,
        maleRatio,
        pokemonCaptureRate,
        pokemonGeneration,
        chainId,
      };
      return pokemonFinalOject;
    };
    const allPokemons = await Promise.all(
      response.data.results.map(async (pokemon) => buildPokemonObject(pokemon))
    );
    
    setPokemons([...allPokemons]);
    setPokemonsAuxiliar([...allPokemons]);
    setLoadingPokemons(false);
  }, []);

  const handlePokemonSelection = (id) => {
    setclickedPokemonId(id);
  };

  const context = {
    pokemons,
    pokemonsAuxiliar,
    setPokemonsAuxiliar,
    clickedPokemonId,
    setclickedPokemonId,
    loadingPokemons,
    imageType,
    handlePokemonSelection,
    setImageType,
    showError,
    setShowError,
  };

  useEffect(() => {
    onOpen();
  }, []);

  useEffect(() => {
    if (!isOpen && renderApplication) {
      getPokemons();
    }
  }, [renderApplication]);

  return (
    <PokedexContext.Provider value={context}>
      {renderApplication && (
        <Flex
          alignItems="center"
          justifyContent="center"
          flexDirection="column"
          p={["20px", "20px", "50px", "50px"]}
        >
          <Filters />
          <Content />
          <PokemonData
            clickedPokemonId={clickedPokemonId}
            clickedPokemonData={
              clickedPokemonId
                ? pokemons.find((pokemon) => pokemon.id === clickedPokemonId)
                : null
            }
            setclickedPokemonId={setclickedPokemonId}
          />
        </Flex>
      )}
      <Intro
        isOpen={isOpen}
        onClose={() => {
          onClose();
          setRenderApplication(true);
        }}
      />
    </PokedexContext.Provider>
  );
};

export default Pokedex;
