import { Avatar, Box, Flex, Text, Wrap, WrapItem } from "@chakra-ui/react";
import React from "react";
import javier from "../images/javier.jpg";
import { SocialIcon } from "react-social-icons";

const icons = [
  {
    fgColor: "white",
    url: "https://github.com/jvalverde96",
    style: { width: "25px", height: "25px" },
  },
  {
    fgColor: "white",
    url: "https://www.linkedin.com/in/javier-valverde-solano/",
    style: { width: "25px", height: "25px" },
  },
  {
    fgColor: "white",
    url: "https://instagram.com/jvalverde96_?utm_medium=copy_link",
    style: { width: "25px", height: "25px" },
  },
];

const Footer = () => (
  <Flex
    w="100%"
    h={["100px", "110px", "130px", "130px"]}
    bg="black"
    boxShadow="dark-lg"
    justifyContent="space-between"
    position="fixed"
    bottom={0}
    right={0}
    borderTop="2px"
    borderColor="white"
  >
    <Wrap
      m="auto 0 auto 20px"
      spacing={["7px", "7px", "7px", "12px"]}
      textAlign="center"
    >
      {icons.map((icon) => (
        <WrapItem key={icon.url}>
          <SocialIcon {...icon} />
        </WrapItem>
      ))}
    </Wrap>
    <Box
      textAlign="center"
      m="auto"
      color="white"
      fontFamily="Lato"
      fontWeight="bold"
      fontSize={["xs", "sm", "md", "xl"]}
    >
      Copyright &copy; 2022 | Just for fun
    </Box>
    <Flex
      mr={["20px", "20px", "40px", "40px"]}
      color="white"
      fontWeight="bold"
      fontFamily="Lato"
      fontSize="2xl"
    >
      <Avatar ml="15px" mt="auto" mb="auto" size="md" src={javier} />
      <Box
        mt="auto"
        mb="auto"
        ml="3"
        display={["none", "none", "block", "block"]}
      >
        <Text fontWeight="bold" fontSize={["sm", "md", "md", "sm"]}>
          Javier Valverde 🇨🇷
        </Text>
        <Text fontSize={["0", "xs", "xs", "xs"]}>Software Engineer</Text>
      </Box>
    </Flex>
  </Flex>
);
export default Footer;
