"use client";

import { api } from "@/services/api.provider";
import LocalStorageService from "@/services/localStorageService";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Text,
  Input,
  Stack,
  useToast,
} from "@chakra-ui/react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

import React, { useState } from "react";

const LoginForm = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const toast = useToast();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log("credenciais: ", email, password);
    const usuario = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    if (usuario?.error) {
      toast({
        title: "Erro no login",
        description:
          "Usuario ou senha invalidos, tente novamente ou entre em contato com o responsavel pelo sistema",
        status: "error",
        duration: 4000,
      });
      return;
    }
    console.log("result SignIn: ", usuario);
    const usuarioLogado = await api.post("auth/login", {
      email: email,
      password: password,
    });
    LocalStorageService.addUsuario(usuarioLogado.data);
    router.replace("/");
  };

  return (
    <Box justifyContent={"center"} w="100%" display={"flex"}>
      <Box
        justifyContent={"center"}
        h={"100vh"}
        display={"flex"}
        flexDirection={"column"}
      >
        <Box
          bg="white"
          p={{ base: "6px", md: "10px", lg: "15px" }}
          borderRadius={"15px"}
          boxShadow={"1px 1px 2px 3px black"}
          minW={{ base: "90vw", md: "50vw", lg: "40vw" }}
        >
          <Text
            fontSize={"5vh"}
            justifyContent={"center"}
            display={"flex"}
            fontWeight={700}
            color={"GrayText"}
          >
            Login
          </Text>
          <form onSubmit={handleSubmit}>
            <Stack spacing={15} padding={"2vw"}>
              <FormControl id="email">
                <FormLabel>Email</FormLabel>
                <Input
                  type="email"
                  placeholder="Digite seu email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </FormControl>
              <FormControl id="password">
                <FormLabel>Senha</FormLabel>
                <Input
                  type="password"
                  placeholder="Digite sua senha"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </FormControl>
              <Box display={"flex"} justifyContent={"center"}>
                <Button
                  type="submit"
                  colorScheme="blue"
                  backgroundColor="#035191"
                  width="80%"
                  h={"3vh"}
                  color={"snow"}
                  borderRadius={"15px"}
                  _hover={{ backgroundColor: "#002544" }}
                >
                  Entrar
                </Button>
              </Box>
            </Stack>
          </form>
        </Box>
      </Box>
    </Box>
  );
};

export default LoginForm;
