"use client";

import LocalStorageService from "@/services/localStorageService";
import {
  AvatarGroup,
  Avatar,
  Box,
  Text,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ImExit } from "react-icons/im";

const IconeUsuario = () => {
  const [nome, setNome] = useState<string | null>("Groscon");

  const [email, setEmail] = useState<string | null>("");
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    const user = LocalStorageService.findUsuario();
    if (user !== null) {
      setNome(user.nome);
      setEmail(user.email);
    }
  }, [nome]);
  const router = useRouter();

  const logout = async () => {
    LocalStorageService.cleanLocalStorage();

    router.replace("/login");

    await signOut();
  };

  return (
    <Box>
      <Box
        marginBottom={"5px"}
        display={"flex"}
        flexDirection={"row"}
        gap={"20px"}
        position={"relative"}
        mr={"18px"}
      >
        <Box
          color={"snow"}
          fontSize={"13px"}
          fontWeight={"500"}
          textShadow={"2px 3px 4px black"}
          mt={"8px"}
        >
          <Text>{nome}</Text>
          <Text>{email}</Text>
        </Box>
        <Box>
          <AvatarGroup>
            <Avatar
              bg="blue.500"
              w={"3vw"}
              h={"3vw"}
              borderRadius={"50%"}
              boxShadow={"1px 2px 4px 3px #002544"}
              cursor={"pointer"}
              onClick={onOpen}
            />
          </AvatarGroup>
        </Box>
      </Box>
      <Drawer placement={"right"} onClose={onClose} isOpen={isOpen} size={"md"}>
        <DrawerOverlay />

        <DrawerContent
          bgColor={"#0086FF"}
          boxShadow={"0px 0px 8px 10px #002544"}
          sx={{
            width: "400px !important",
            maxWidth: "400px !important",
          }}
        >
          <DrawerHeader
            fontSize={"30px"}
            fontWeight={"700"}
            textAlign={"center"}
            textShadow={"1px 2px 3px black"}
            color={"snow"}
            mt={"8px"}
            mb={"8px"}
          >
            PERFIL
          </DrawerHeader>
          <DrawerBody display={"flex"} flexDir={"column"}>
            <Box display={"flex"} justifyContent={"center"}>
              <AvatarGroup mt={"10px"}>
                <Avatar
                  bg="blue.500"
                  w={"160px"}
                  h={"160px"}
                  borderRadius={"50%"}
                  boxShadow={"1px 1px 12px 15px #002544"}
                  _hover={{
                    boxShadow: "0px 0px 8px 5px #fff",
                    transform: "scale(1.1)",
                    transition: "1.8s",
                  }}
                />
              </AvatarGroup>
            </Box>
            <Box
              display={"flex"}
              color={"snow"}
              justifyContent={"center"}
              mt={"25px"}
              flexDir={"column"}
              textAlign={"center"}
              fontSize={"19px"}
              fontWeight={500}
              textShadow={"1px 3px 4px black"}
            >
              <Box
                display={"flex"}
                flexDir={"row"}
                gap={"6px"}
                alignContent={"center"}
              >
                <Box
                  display={"flex"}
                  flexDir={"row"}
                  w={"100%"}
                  justifyContent={"center"}
                  gap={"7px"}
                >
                  <Text fontSize={"12px"} mt={"7px"}>
                    Nome:
                  </Text>{" "}
                  {nome}
                </Box>
              </Box>
              <Box
                display={"flex"}
                flexDir={"row"}
                gap={"6px"}
                alignContent={"center"}
              >
                <Box
                  display={"flex"}
                  flexDir={"row"}
                  w={"100%"}
                  justifyContent={"center"}
                  gap={"7px"}
                >
                  <Text fontSize={"12px"} mt={"7px"}>
                    E-mail:
                  </Text>{" "}
                  {email}
                </Box>
              </Box>
            </Box>

            <Box
              display={"flex"}
              w={"100%"}
              justifyContent={"center"}
              mt={"50px"}
            >
              <Box
                w={"50px"}
                h={"50px"}
                display={"flex"}
                justifyContent={"center"}
                fontSize={"30px"}
                color={"darkred"}
                cursor={"pointer"}
                borderRadius={"50%"}
                bgColor={"snow"}
                boxShadow={"1px 1px 10px 12px #002544"}
                _hover={{
                  boxShadow: "0px 0px 6px 3px #fff",
                  transform: "scale(1.11)",
                  transition: "0.8s",
                }}
                onClick={logout}
              >
                <Box
                  display={"flex"}
                  justifyContent={"center"}
                  flexDir={"column"}
                  ml={"5px"}
                >
                  <ImExit />
                </Box>
              </Box>
            </Box>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  );
};
export default IconeUsuario;
