import { Button, Container, Flex, HStack, Text, useColorMode } from "@chakra-ui/react";
import { HiSquaresPlus } from "react-icons/hi2";
import { FaRegCircleUser, FaMoon } from "react-icons/fa6";
import { IoIosSunny } from "react-icons/io";
import { Link } from "react-router-dom";
import { useProductStore } from "../store/product";

const Navbar = () => {
    const { colorMode, toggleColorMode } = useColorMode()

  return (
    <Container maxW={"1140px"} px={1}>
      <Flex
        h={16}
        alignItems={"center"}
        justifyContent={"space-between"}
        flexDir={{
          base: "column",
          md: "row",
        }}
      >
        <Text
          bgGradient="linear(to-l, #79A, #FF9080)"
          bgClip="text"
          fontSize="6xl"
          fontWeight={"extrabold"}
          textTransform="uppercase"
        >
          <Link to={"/"}>Dukaan</Link>
        </Text>

        <HStack spacing={8} alignItems={"center"}>
          <Link to={"/create"}>
            <Button><HiSquaresPlus fontSize={40} /></Button>
          </Link>
            <Button onClick={toggleColorMode}>
                {colorMode === "light" ? <FaMoon fontSize="40"/>:<IoIosSunny fontSize="40" />}
            </Button>
          <Link to={"/user"}>
            <Button><FaRegCircleUser fontSize={40} /></Button>
          </Link>
        </HStack>
      </Flex>
    </Container>
  );
};

export default Navbar;
