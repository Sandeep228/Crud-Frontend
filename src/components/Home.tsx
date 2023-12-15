import React from "react";
import {
  Box,
  Text,
  HStack,
  Icon,
  Button,
  Heading,
  Center
} from "@chakra-ui/react";

import { FaUsers, FaUserPlus } from 'react-icons/fa';
import { LiaUsersSolid } from "react-icons/lia";
import { PiUserSwitchFill } from "react-icons/pi";

import { useNavigate } from "react-router-dom";
import '../App.css';

const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Box
      bg="#131316"
      w="100%"
      h="100vh"
      background="linear-gradient(to right, #292C31, #9A2EFE, #D5DBDB)"
    >
      <Box
        h="70px"
        borderBottom="1px solid #363739"
        style={{ overflow: "hidden" }}
        backgroundColor="black"
      >
        <Box px="24px" py="16px" marginLeft="80px" marginRight="80px">
          <HStack
            display="flex"
            justifyContent={{ base: "center", md: "space-between" }}
            position="sticky"
          >
            <Box display="flex" alignItems="center">
              <Icon as={PiUserSwitchFill} h={6} w={6} color="white" mr="8px" />
              <Text
                as="b"
                sx={{
                  base: {
                    fontSize: "2xl",
                    textAlign: "center",
                  },
                  md: {
                    fontSize: "3xl",
                    textAlign: "left",
                  },
                }}
                color="white"
              >
                User Data
              </Text>
            </Box>
            <Box display={{ base: "none", md: "flex" }} alignItems="center">
              <Button
                mr="23px"
                onClick={() => navigate("/form")}
                leftIcon={<Icon as={FaUserPlus} boxSize={6} />}
              >
                Create User
              </Button>
              <Button
                onClick={() => navigate("/table")}
                leftIcon={<Icon as={LiaUsersSolid} boxSize={6} />}
              >
                See User
              </Button>
            </Box>
          </HStack>
        </Box>
      </Box>
      <Center height="90vh" flexDirection="column">
        <Heading className="typing" fontSize="10vw" color="white">
          Welcome!
        </Heading>
        <Box className="nav-buttons" display="flex" flexDirection="row">
          <Button
            className="big-btn"
            width="10vw"
            height="10vw"
            backgroundColor="rgba(0, 0, 0, 0.4)"
            boxShadow="0 8px 32px 0 rgba(31, 38, 135, 0.37)"
            backdropFilter="blur(8px)"
            margin="1rem 2rem"
            cursor="pointer"
            borderRadius="10px"
            transition="all 0.2s cubic-bezier(.4,0,.2,1)"
            _hover={{ transform: 'scale(1.2)' }}
            onClick={() => navigate("/table")}
          >
            <span> <FaUsers fontSize={{ base: "1.8rem", md: "2.3rem" }as any} color="white" /> </span>
          </Button>
          <Button
            className="big-btn"
            width="10vw"
            height="10vw"
            backgroundColor="rgba(0, 0, 0, 0.4)"
            boxShadow="0 8px 32px 0 rgba(31, 38, 135, 0.37)"
            backdropFilter="blur(8px)"
            margin="1rem 2rem"
            cursor="pointer"
            borderRadius="10px"
            transition="all 0.2s cubic-bezier(.4,0,.2,1)"
            _hover={{ transform: 'scale(1.2)' }}
            onClick={() => navigate("/form")}
          >
            <span> <FaUserPlus fontSize={{ base: "1.8rem", md: "2.3rem" } as any} color="white" /> </span>
          </Button>
        </Box>
      </Center>
    </Box>
  );
};

export default Home;
