import { SearchIcon } from "@chakra-ui/icons";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Flex,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  Select,
  VStack,
} from "@chakra-ui/react";
import React, { useContext, useEffect, useMemo, useState } from "react";
import axiosClient from "../api/axios-config";
import { PokedexContext } from "./Pokedex";
import debounce from "lodash.debounce";
import "../index.css";

const imageTypes = [
  { name: "Official Artwork", value: "official-artwork" },
  { name: "Dream World", value: "dream_world" },
  { name: "Home", value: "home" },
  { name: "Default", value: "front_default" },
  { name: "Shiny", value: "front_shiny" },
];

const Filters = () => {
  const [types, setTypes] = useState([]);
  const [generations, setGenerations] = useState([]);
  const [actionLabel, setActionLabel] = useState("Open");
  const [searchText, setSearchText] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [generationFilter, setGenerationFilter] = useState("I");

  const {
    pokemons,
    pokemonsAuxiliar,
    setPokemonsAuxiliar,
    loadingPokemons,
    imageType,
    setImageType,
    showError,
    setShowError,
  } = useContext(PokedexContext);

  const filterPokemons = (event = null) => {
    const selectedType = event?.target.value || typeFilter;
    if (selectedType !== "") {
      if (selectedType === "all") {
        setPokemonsAuxiliar(
          generationFilter === "all"
            ? [...pokemons]
            : [...pokemons].filter(
                (pokemon) => pokemon.pokemonGeneration === generationFilter
              )
        );
        setTypeFilter("all");
      } else {
        const result =
          generationFilter !== "all"
            ? pokemons.filter(
                (pokemon) =>
                  pokemon.types.some(
                    (type) => type.type.name === selectedType
                  ) && pokemon.pokemonGeneration === generationFilter
              )
            : pokemons.filter((pokemon) =>
                pokemon.types.some((type) => type.type.name === selectedType)
              );
        setPokemonsAuxiliar([...result]);
        setTypeFilter(selectedType);
      }
    }
  };

  const changeImageDisplay = (event) => {
    const imageDisplay = event.target.value;
    if (imageDisplay !== "") setImageType(imageDisplay);
  };

  const filterByGeneration = (event) => {
    const generation = event.target.value;
    if (generation === "") return;
    if (generation === "all") {
      setPokemonsAuxiliar(
        typeFilter === "all"
          ? [...pokemons]
          : [...pokemons].filter((pokemon) =>
              pokemon.types.some((type) => type.type.name === typeFilter)
            )
      );
      setGenerationFilter("all");
    } else {
      const filteredPokemons =
        typeFilter !== "all"
          ? pokemons.filter(
              (pokemon) =>
                pokemon.pokemonGeneration === generation &&
                pokemon.types.some((type) => type.type.name === typeFilter)
            )
          : pokemons.filter(
              (pokemon) => pokemon.pokemonGeneration === generation
            );
      setPokemonsAuxiliar([...filteredPokemons]);
      setGenerationFilter(generation);
    }
  };

  const handleSearch = (event) => {
    setSearchText(event.target.value);
  };

  const debouncedResults = useMemo(() => {
    return debounce(handleSearch, 500);
  }, []);

  useEffect(async () => {
    const typesResponse = await axiosClient.get("type");
    const pokemonTypes = typesResponse.data.results
      .map((type) => type.name)
      .filter((type) => type !== "unknown" && type !== "shadow");
    const generationsResponse = await axiosClient.get("generation");
    const pokemonGenerations = generationsResponse.data.results.map((gen) =>
      gen.name.replace("generation-", "").toUpperCase()
    );
    setTypes([...pokemonTypes]);
    setGenerations([...pokemonGenerations]);
  }, []);

  useEffect(() => {
    const filteredPokemons = pokemons.filter(
      (pokemon) => pokemon.pokemonGeneration === generationFilter
    );
    setPokemonsAuxiliar([...filteredPokemons]);
  }, [pokemons]);

  useEffect(() => {
    if (showError) setShowError(false);
    if (searchText === "") {
      filterPokemons();
    } else {
      const result = pokemonsAuxiliar.filter((pokemon) =>
        pokemon.name.includes(searchText)
      );
      if (result.length === 0) setShowError(true);
      else setPokemonsAuxiliar(result);
    }
  }, [searchText]);

  useEffect(() => {
    return () => {
      debouncedResults.cancel();
    };
  });

  return (
    <Flex>
      <Accordion allowToggle w={["300px", "350px", "580px", "580px"]}>
        <AccordionItem border="none">
          <AccordionButton
            className="red-gradient"
            onClick={() =>
              setActionLabel(actionLabel === "Open" ? "Close" : "Open")
            }
            _hover={{
              bg: "radial-gradient(ellipse at 50% 50%, #D5554D 0%, #640202 100%)",
            }}
          >
            <Box flex="1" textAlign="left" color="white">
              {actionLabel} Filters
            </Box>
            <Box
              flex="1"
              textAlign="right"
              opacity="0.5"
              color="white"
              fontSize="sm"
              mr="10px"
            >
              Showing {showError ? 0 : pokemonsAuxiliar.length} pokemons...
            </Box>
            <AccordionIcon color="white" />
          </AccordionButton>
          <AccordionPanel className="black-gradient" >
            <Flex
              flexDirection={["column", "column", "row", "row"]}
              h="fit-content"
              alignItems="center"
              justifyContent="center"
            >
              <VStack spacing="25px" p="10px">
                <FormControl>
                  <FormLabel color="white">Generation</FormLabel>
                  <Select
                    placeholder="Filter by generation..."
                    bg="white"
                    w="250px"
                    disabled={loadingPokemons}
                    focusBorderColor="blue.500"
                    onChange={filterByGeneration}
                    value={generationFilter}
                  >
                    <option value="all">All</option>
                    {generations.map((gen, index) => (
                      <option value={gen}>{gen}</option>
                    ))}
                  </Select>
                </FormControl>

                <FormControl>
                  <FormLabel size={["sm", "md", "lg", "lg"]} color="white">
                    Type
                  </FormLabel>
                  <Select
                    value={typeFilter}
                    placeholder="Filter by type..."
                    bg="white"
                    w="250px"
                    disabled={loadingPokemons}
                    focusBorderColor="blue.500"
                    onChange={filterPokemons}
                  >
                    <option value="all">All</option>
                    {types.map((type) => (
                      <option key={type} value={type}>
                        {type.charAt(0).toUpperCase() + type.slice(1)}
                      </option>
                    ))}
                  </Select>
                </FormControl>
              </VStack>
              <VStack spacing={["30px", "30px", "60px", "60px"]} p="10px">
                <FormControl>
                  <FormLabel color="white">Pokemon Image</FormLabel>
                  <Select
                    placeholder="Change image display..."
                    bg="white"
                    w="250px"
                    disabled={loadingPokemons}
                    focusBorderColor="blue.500"
                    value={imageType}
                    onChange={changeImageDisplay}
                  >
                    {imageTypes.map((type) => (
                      <option value={type.value}>{type.name}</option>
                    ))}
                  </Select>
                </FormControl>
                <InputGroup>
                  <InputLeftElement children={<SearchIcon color="black" />} />
                  <Input
                    w="250px"
                    onChange={debouncedResults}
                    placeholder="Search Pokemon..."
                    cursor="pointer"
                    focusBorderColor="blue.500"
                    bg="gray.200"
                  />
                </InputGroup>
              </VStack>
            </Flex>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </Flex>
  );
};

export default Filters;
