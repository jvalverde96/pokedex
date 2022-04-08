import { InfoIcon } from "@chakra-ui/icons";
import {
  Button,
  Heading,
  Icon,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import React from "react";

const Intro = ({ isOpen, onClose }) => (
  <Modal onClose={onClose} isOpen={isOpen} size="sm" isCentered>
    <ModalOverlay bg="none" backdropFilter="auto" backdropBlur="6px" />
    <ModalContent fontWeight="normal">
      <ModalHeader boxShadow="base" display="flex">
        <Icon color="blue.500" as={InfoIcon} />
        <Heading
          ml="10px"
          fontSize="lg"
          fontFamily="Luckiest Guy"
          fontWeight="normal"
        >
          About this app
        </Heading>
      </ModalHeader>
      <ModalCloseButton />
      <ModalBody mt="15px" fontSize="sm">
        Welcome to Javier's Pokedex. This app has been built for fun and here
        you can consult the Pokemons information. You can be sure that you will
        see accurate information since I'm using the official pokemon API to
        fetch the data.
      </ModalBody>

      <ModalFooter>
        <Button colorScheme="blue" onClick={onClose} fontWeight="normal" >
          Got it!
        </Button>
      </ModalFooter>
    </ModalContent>
  </Modal>
);

export default Intro;
