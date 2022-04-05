import React, { useContext, useEffect, useMemo, useState } from "react";
import {
  useDisclosure,
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Tbody,
  Table,
  Tr,
  Td,
  Text,
  Image,
  HStack,
  Box,
  Flex,
  Stack,
  Heading,
  ModalOverlay,
  VStack,
} from "@chakra-ui/react";
import grayPokeball from "../images/gray-pokeball-bg.png";
import whiteArrow from "../images/white-arrow.png";
import PokemonType from "./PokemonType";
import { PokedexContext } from "./Pokedex";
import customTheme from "../theme/theme";
import { Icon } from "@chakra-ui/icons";
import { IoMdFemale, IoMdMale } from "react-icons/io";
import axiosClient from "../api/axios-config";

const PokemonData = ({
  clickedPokemonId,
  setclickedPokemonId,
  clickedPokemonData,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { pokemons, imageType } = useContext(PokedexContext);
  const { types } = clickedPokemonData || {};

  const [evolutionChain, setEvolutionChain] = useState([]);

  const memoizedPokemonFields = useMemo(
    () => [
      {
        label: "Generation:",
        value: clickedPokemonData?.pokemonGeneration,
      },
      {
        label: "Gender:",
        value:
          clickedPokemonData?.maleRatio === 0 &&
          clickedPokemonData?.femaleRatio === 0 ? (
            <Text>Genderless</Text>
          ) : (
            <HStack>
              <Icon
                w={["5", "6", "8", "8"]}
                h={["5", "6", "8", "8"]}
                color="#008CEE"
                as={IoMdMale}
              />
              <Text>{clickedPokemonData?.maleRatio}%</Text>
              <Icon
                w={["5", "6", "8", "8"]}
                h={["5", "6", "8", "8"]}
                color="#DE43BA"
                as={IoMdFemale}
              />
              <Text>{clickedPokemonData?.femaleRatio}%</Text>
            </HStack>
          ),
      },
      {
        label: "Type(s):",
        value: <PokemonType pokemon={clickedPokemonData} />,
      },
      {
        label: "Abilities:",
        value: clickedPokemonData?.abilities.map((ability) => (
          <Text key={ability.ability.name}>{ability.ability.name}</Text>
        )),
      },
      {
        label: "Height:",
        value: `${(clickedPokemonData?.height / 10).toFixed(1)} m`,
      },
      {
        label: "Weight:",
        value: `${(clickedPokemonData?.weight / 10).toFixed(1)} kg`,
      },
    ],
    [clickedPokemonId]
  );

  const background = useMemo(
    () => ({
      bgGradient:
        types?.length === 2
          ? `linear(to-r, ${
              customTheme.colors[types[0].type.name][200] ||
              customTheme.colors[types[0].type.name][500]
            }, ${
              customTheme.colors[types[1].type.name][200] ||
              customTheme.colors[types[1].type.name][500]
            })`
          : "",
      bg:
        types?.length === 1
          ? customTheme.colors[types[0].type.name][200] ||
            customTheme.colors[types[0].type.name][500]
          : "",
    }),
    [clickedPokemonId]
  );

  const buildEvolutionChain = async () => {
    const response = await axiosClient.get(
      `evolution-chain/${clickedPokemonData.chainId}`
    );
    const { chain } = response.data;

    const evoChain = [];
    let evolutionData = chain;

    do {
      const name = evolutionData.species.name;
      const urlSplit = evolutionData.species.url.split("/");
      evoChain.push({
        name: name,
        id: parseInt(urlSplit[urlSplit.length - 2]),
      });

      evolutionData = evolutionData["evolves_to"][0];
    } while (!!evolutionData && evolutionData.hasOwnProperty("evolves_to"));

    setEvolutionChain([...evoChain]);
  };

  useEffect(() => {
    if (clickedPokemonId) {
      onOpen();
      buildEvolutionChain();
    }
  }, [clickedPokemonId]);

  useEffect(() => {
    if (clickedPokemonId && !isOpen) setclickedPokemonId(null);
  }, [isOpen]);

  return (
    <Modal
      onClose={onClose}
      isOpen={isOpen}
      size='4xl'
      scrollBehavior="inside"
    >
      <ModalOverlay bg="none" backdropFilter="auto" backdropBlur="6px" />
      <ModalContent
        pb="15px"
        width={"fit-content"}
        height={["600px", "600px", "750px", "750px"]}
        bgGradient={background.bgGradient}
        bg={background.bg}
      >
        <ModalHeader
          boxShadow="base"
          color="black"
          fontWeight="normal"
          fontSize={["xl", "xl", "4xl", "4xl"]}
        >
          <Box>
            <Text>{clickedPokemonData?.name}</Text>
            <Text mr="50px">#{clickedPokemonId}</Text>
          </Box>
        </ModalHeader>
        <ModalCloseButton color="black" />
        <ModalBody>
          <Box
            rounded="md"
            p="20px"
            boxShadow="base"
            mt="15px"
            textAlign="center"
            bgGradient={background.bgGradient}
            bg={background.bg}
          >
            <Heading fontSize="lg" fontFamily="Luckiest Guy">
              Biography:{" "}
            </Heading>
            <br />
            <Text fontSize="sm">{clickedPokemonData?.description}</Text>
          </Box>
          <Stack
            direction={["column", "column", "row", "row"]}
            justifyContent="center"
            spacing="30px"
          >
            <Box
              m="auto"
              display="flex"
              bgImage={grayPokeball}
              bgRepeat="no-repeat"
              bgPosition="center"
              bgSize="cover"
              h={["200px", "200px", "400px", "400px"]}
              w={["200px", "200px", "400px", "400px"]}
              justifyContent="center"
              alignItems="center"
            >
              <Image
                boxSize={[200, 200, 300, 300]}
                src={
                  imageType !== "default"
                    ? clickedPokemonData?.sprites.other[imageType].front_default
                    : clickedPokemonData?.sprites.front_default
                }
              />
            </Box>
            <Flex alignItems="center" justifyContent="center">
              <Table
                boxShadow="base"
                variant="striped"
                color="black"
                bg="white"
                width={["100px", "100px", "200px", "400px"]}
                height={["80px", "80px", "80px", "80px"]}
                fontSize={["xs", "md", "md", "md"]}
              >
                <Tbody>
                  {memoizedPokemonFields.map((field) => (
                    <Tr key={field.label}>
                      <Td p="10px">{field.label}</Td>
                      <Td p="10px">{field.value}</Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </Flex>
          </Stack>
          {evolutionChain.length > 1 && (
            <Box p="30px" textAlign="center" boxShadow="base" mt="40px">
              <Heading fontSize="md" fontFamily="Luckiest Guy">
                Evolution chain:{" "}
              </Heading>
              <HStack
                divider={
                  <Image
                    src={whiteArrow}
                    boxSize={["30px", "30px", "50px", "50px"]}
                  />
                }
                mt="30px"
                justifyContent="center"
                spacing={["10px", "10px", "20px", "20px"]}
              >
                {evolutionChain.map((pokemon) => (
                  <VStack
                  key={pokemon.name}
                    bgImage={grayPokeball}
                    bgRepeat="no-repeat"
                    bgPosition="center"
                    bgSize={["80px", "80px", "150px", "150px"]}
                  >
                    <Image
                      boxSize={["60px", "60px", "140px", "140px"]}
                      src={
                        imageType !== "default"
                          ? pokemons.find((p) => p.id === pokemon.id).sprites
                              .other[imageType].front_default
                          : pokemons.find((p) => p.id === pokemon.id).sprites
                              .front_default
                      }
                    />
                    <Text fontSize="xs" fontWeight="normal">
                      {pokemon.name}
                    </Text>
                  </VStack>
                ))}
              </HStack>
            </Box>
          )}
        </ModalBody>
        <ModalFooter display={["none", "none", "inline-flex", "inline-flex"]}>
          <Button bg="black" color="white" mr={3} onClick={onClose} _hover={{backgroundColor: 'blue.500'}}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default PokemonData;
