"use client";

import { api } from "../services/api.provider";
import { usuarioLogado } from "@/services/localStorageService";
import {
  Box,
  Button,
  Select,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tooltip,
  Tr,
  Text,
  useDisclosure,
  FormControl,
  Input,
  InputGroup,
  InputRightElement,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useToast,
  Modal,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { RiUserAddFill } from "react-icons/ri";
import AlteraUsuario from "./AlteraUsuario";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import { BiHide, BiShow } from "react-icons/bi";

const ListaUsuarios = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [usuarios, setUsuarios] = useState<Array<usuarioLogado>>([]);
  const [isLoading, setIsloading] = useState<boolean>(true);
  // Estado de paginação
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(4); // Quantidade de itens por página
  const [change, setChange] = useState<boolean>(true);
  const [usuarioNome, setUsuarioNome] = useState<string>("");
  const [show, setShow] = useState(false);
  const [usuarioEmail, setUsuarioEmail] = useState<string>("");
  const toast = useToast();
  const [usuarioSenha, setUsuarioSenha] = useState<string>("");

  // Cálculo dos itens a serem exibidos na página atual
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = usuarios
    ? usuarios.slice(indexOfFirstItem, indexOfLastItem)
    : [];

  const totalPages = usuarios ? Math.ceil(usuarios.length / itemsPerPage) : 1;

  // Funções para navegar entre páginas
  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleItemsPerPage = (e: React.ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault();
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  const carregaUsuarios = async () => {
    const listaUsuarios = await api.get("/users");
    console.log("lista Usuarios: ", listaUsuarios);
    setIsloading(false);
    setUsuarios(listaUsuarios.data);
  };

  useEffect(() => {
    carregaUsuarios();
  }, []);

  const handleNomeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsuarioNome(e.target.value);
    setChange(false);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsuarioEmail(e.target.value);
    setChange(false);
  };

  const handleSenhaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsuarioSenha(e.target.value);
  };

  const handleCancel = () => {
    setChange(true);
    setUsuarioNome("");
    setUsuarioEmail("");
    setUsuarioSenha("");
    onClose();
  };

  const handleClickShow = () => setShow(!show);

  let payload = {
    name: "",
    email: "",
    senha: "",
  };

  const handleSaveUsuario = async (e: React.FormEvent) => {
    e.preventDefault();
    payload.name = usuarioNome;
    payload.email = usuarioEmail;
    payload.senha = usuarioSenha;
    console.log("payload: ", payload);
    try {
      await api.post("/users", payload);
      toast({
        title: `Usuario ${payload.name} cadastrado com sucesso`,
        duration: 4000,
        status: "success",
      });
      await carregaUsuarios();
      setUsuarioSenha("");
      onClose();
    } catch (error) {
      toast({
        title: `Falha na alteração do usuario`,
        description: JSON.stringify(error),
        duration: 4000,
        status: "error",
      });
    }
  };

  return (
    <Box>
      <Box>
        <Box
          marginTop={"10px"}
          pos={"relative"}
          mb={"10px"}
          w={"100%"}
          h={"fit-content"}
          border={"0px #035191 solid"}
          borderRadius={"12px"}
          backgroundColor={"snow"}
          position={"relative"}
          display={"flex"}
          flexDirection={"column"}
          justifyContent={"center"}
          alignContent={"center"}
          alignItems={"center"}
        >
          <TableContainer marginBottom={"10px"}>
            <Table size="sm" variant="simple" justifyContent={"center"}>
              <Thead fontSize={"25px"}>
                <Tr>
                  <Th
                    textAlign={"center"}
                    fontSize={"20px"}
                    textColor={"#035191"}
                    fontWeight={900}
                    textShadow={"0px 0.5px 1px black"}
                    letterSpacing={"2px"}
                    pl={"25px"}
                    w={"150px"}
                    pb={"10px"}
                  >
                    Nome
                  </Th>
                  <Th
                    textAlign={"center"}
                    fontSize={"20px"}
                    textColor={"#035191"}
                    fontWeight={800}
                    textShadow={"0px 0.5px 1px black"}
                    letterSpacing={"2px"}
                    pl={"25px"}
                    w={"150px"}
                    pb={"10px"}
                  >
                    Email
                  </Th>
                  <Th
                    textAlign={"center"}
                    fontSize={"20px"}
                    textColor={"#035191"}
                    fontWeight={800}
                    textShadow={"0px 0.5px 1px black"}
                    letterSpacing={"2px"}
                    pl={"25px"}
                    w={"150px"}
                    pb={"10px"}
                  >
                    Opções
                  </Th>
                </Tr>
              </Thead>
              <Tbody>
                {currentItems.map((item) => (
                  <Tr key={item.id}>
                    <Td
                      textColor={"#035191"}
                      textAlign={"center"}
                      w={"fit-content"}
                      fontWeight={"500"}
                      h={"38px"}
                    >
                      {item.name}
                    </Td>
                    <Td
                      textColor={"#035191"}
                      textAlign={"center"}
                      w={"fit-content"}
                      fontWeight={"500"}
                      h={"38px"}
                    >
                      {item.email}
                    </Td>
                    <Td
                      textColor={"#035191"}
                      textAlign={"center"}
                      w={"fit-content"}
                      fontWeight={"500"}
                      h={"38px"}
                      pb={"18px"}
                    >
                      <Box display={"flex"} justifyContent={"center"}>
                        <AlteraUsuario
                          usuarios={usuarios}
                          usuario={item}
                          carregaUsuarios={carregaUsuarios}
                        />
                      </Box>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
          <Box
            borderTop={"1px #035191 solid"}
            w={"600px"}
            justifyContent={"center"}
            display={"flex"}
            mt={"20px"}
          >
            {/* Paginação */}
            <Box
              w={"100%"}
              display={"flex"}
              justifyContent={"center"}
              flexDir={"row"}
              bottom={"5px"}
              right={"5px"}
              mt={"15px"}
            >
              <Box
                display="flex"
                gap={"15px"}
                justifyContent="space-between"
                alignItems="center"
                mt={"2px"}
                mb={"8px"}
              >
                <Button
                  onClick={handlePrevPage}
                  isDisabled={currentPage === 1}
                  fontWeight={500}
                  fontSize={"38px"}
                  color={"snow"}
                  w={"35px"}
                  h={"38px"}
                  borderRadius={"50%"}
                  bgColor={"#035191"}
                  p={"11px"}
                  boxShadow={"1px 1px 2px 2px #002544"}
                  _hover={{
                    boxShadow: "1px 1px 4px 2px black",
                    transform: "scale(1.15)",
                    transition: "0.8s",
                  }}
                >
                  <AiOutlineLeft />
                </Button>
                <Text fontWeight={700}>
                  Página {currentPage} de {totalPages}
                </Text>
                <Button
                  onClick={handleNextPage}
                  isDisabled={currentPage === totalPages}
                  fontWeight={500}
                  fontSize={"38px"}
                  color={"snow"}
                  w={"35px"}
                  h={"38px"}
                  borderRadius={"50%"}
                  bgColor={"#035191"}
                  p={"11px"}
                  boxShadow={"1px 1px 2px 2px #002544"}
                  _hover={{
                    boxShadow: "1px 1px 4px 2px black",
                    transform: "scale(1.15)",
                    transition: "0.8s",
                  }}
                >
                  <AiOutlineRight />
                </Button>
                <Box>
                  <Tooltip
                    hasArrow
                    textShadow={"1px 2px 3px black"}
                    label="Quantidade de items por página"
                    bg="blue.600"
                    borderRadius={"10px"}
                    placement="top"
                    mb={"5px"}
                  >
                    <Select
                      defaultValue={itemsPerPage}
                      onChange={(e) => handleItemsPerPage(e)}
                      boxShadow={"1px 1px 2px 2px #002544"}
                      fontWeight={500}
                      _hover={{
                        boxShadow: "1px 1px 4px 2px black",
                        transform: "scale(1.05)",
                        transition: "0.8s",
                      }}
                    >
                      <option value="4" style={{ fontWeight: "500" }}>
                        4
                      </option>
                      <option value="6" style={{ fontWeight: "500" }}>
                        6
                      </option>
                      <option value="10" style={{ fontWeight: "500" }}>
                        10
                      </option>
                      <option value="15" style={{ fontWeight: "500" }}>
                        15
                      </option>
                      <option value="25" style={{ fontWeight: "500" }}>
                        25
                      </option>
                    </Select>
                  </Tooltip>
                </Box>
                <Button
                  gap={"5px"}
                  bgColor={"#035191"}
                  color={"snow"}
                  boxShadow={"1px 2px 8px 2px #002544"}
                  _hover={{
                    boxShadow: "1px 1px 8px 6px #002544",
                    transform: "scale(1.02)",
                    transition: "0.5s",
                  }}
                  onClick={onOpen}
                  ml={"50px"}
                >
                  <RiUserAddFill />
                  Adicionar Usuário
                </Button>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
      <Modal
        closeOnOverlayClick={false}
        isOpen={isOpen}
        onClose={onClose}
        size={"xl"}
      >
        <FormControl as="fieldset">
          <ModalOverlay />
          <ModalContent
            boxShadow={"2px 8px 25px 10px #002544"}
            border={"2px #002544 solid"}
          >
            <ModalHeader fontWeight={"bold"} color={"#035191"}>
              Cadastrar usuario.
            </ModalHeader>
            <ModalBody pb={6}>
              <Box>
                <Box
                  color={"#035191"}
                  display={"flex"}
                  flexDirection={"row"}
                  fontWeight={"bold"}
                >
                  <Text mt={"8px"} mr={"8px"}>
                    Nome:{" "}
                  </Text>
                  <Input
                    id="nomeUsuario"
                    placeholder={"Digite o nome..."}
                    type="text"
                    w={"400px"}
                    h={"30px"}
                    boxShadow={"2px 2px 4px 2px #002544"}
                    m={"5px"}
                    onChange={(e) => handleNomeChange(e)}
                  />
                </Box>

                <Box
                  color={"#035191"}
                  display={"flex"}
                  flexDirection={"row"}
                  fontWeight={"bold"}
                >
                  <Text mt={"8px"} mr={"8px"}>
                    E-mail:{" "}
                  </Text>
                  <Input
                    id="emailUsuario"
                    placeholder={"Digite o e-mail..."}
                    type="email"
                    w={"400px"}
                    h={"30px"}
                    boxShadow={"2px 2px 4px 2px #002544"}
                    m={"5px"}
                    onChange={(e) => handleEmailChange(e)}
                  />
                </Box>

                <Box
                  color={"#035191"}
                  display={"flex"}
                  flexDirection={"row"}
                  fontWeight={"bold"}
                  mb={"10px"}
                >
                  <InputGroup size="md">
                    <Text mt={"8px"} mr={"8px"}>
                      Senha:{" "}
                    </Text>
                    <Input
                      type={show ? "text" : "password"}
                      w={"405px"}
                      h={"30px"}
                      boxShadow={"2px 2px 4px 2px #002544"}
                      m={"5px"}
                      placeholder="Senha de no minimo 6 caracteres..."
                      onChange={(e) => handleSenhaChange(e)}
                      value={usuarioSenha}
                    />
                    <InputRightElement width="4.5rem" mr={"40px"}>
                      <Button h="1.75rem" size="sm" onClick={handleClickShow}>
                        {show ? <BiHide /> : <BiShow />}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                </Box>
                {usuarioSenha.length < 6 ? (
                  <Text
                    color={"red"}
                    fontSize={"12px"}
                    marginLeft={"80px"}
                    mt={"-10px"}
                  >
                    Senha deve conter no mínimo 6 caracteres
                  </Text>
                ) : (
                  ""
                )}
              </Box>
            </ModalBody>

            <ModalFooter>
              <Button
                color={"snow"}
                backgroundColor={"#035191"}
                _hover={{ backgroundColor: "#002544" }}
                mr={3}
                type={"submit"}
                isDisabled={
                  !change == true && usuarioSenha.length >= 6 ? false : true
                }
                onClick={(e) => handleSaveUsuario(e)}
              >
                Save
              </Button>
              <Button
                onClick={handleCancel}
                backgroundColor={"red"}
                _hover={{ backgroundColor: "darkred" }}
                color={"snow"}
              >
                Cancel
              </Button>
            </ModalFooter>
          </ModalContent>
        </FormControl>
      </Modal>
      <Modal
        closeOnOverlayClick={false}
        isOpen={isOpen}
        onClose={onClose}
        size={"xl"}
      >
        <FormControl as="fieldset">
          <ModalOverlay />
          <ModalContent
            boxShadow={"2px 8px 25px 10px #002544"}
            border={"2px #002544 solid"}
          >
            <ModalHeader fontWeight={"bold"} color={"#035191"}>
              Cadastrar usuario.
            </ModalHeader>
            <ModalBody pb={6}>
              <Box>
                <Box
                  color={"#035191"}
                  display={"flex"}
                  flexDirection={"row"}
                  fontWeight={"bold"}
                >
                  <Text mt={"8px"} mr={"8px"}>
                    Nome:{" "}
                  </Text>
                  <Input
                    id="nomeUsuario"
                    placeholder={"Digite o nome..."}
                    type="text"
                    w={"400px"}
                    h={"30px"}
                    boxShadow={"2px 2px 4px 2px #002544"}
                    m={"5px"}
                    onChange={(e) => handleNomeChange(e)}
                  />
                </Box>

                <Box
                  color={"#035191"}
                  display={"flex"}
                  flexDirection={"row"}
                  fontWeight={"bold"}
                >
                  <Text mt={"8px"} mr={"8px"}>
                    E-mail:{" "}
                  </Text>
                  <Input
                    id="emailUsuario"
                    placeholder={"Digite o e-mail..."}
                    type="email"
                    w={"400px"}
                    h={"30px"}
                    boxShadow={"2px 2px 4px 2px #002544"}
                    m={"5px"}
                    onChange={(e) => handleEmailChange(e)}
                  />
                </Box>

                <Box
                  color={"#035191"}
                  display={"flex"}
                  flexDirection={"row"}
                  fontWeight={"bold"}
                  mb={"10px"}
                >
                  <InputGroup size="md">
                    <Text mt={"8px"} mr={"8px"}>
                      Senha:{" "}
                    </Text>
                    <Input
                      type={show ? "text" : "password"}
                      w={"405px"}
                      h={"30px"}
                      boxShadow={"2px 2px 4px 2px #002544"}
                      m={"5px"}
                      placeholder="Senha de no minimo 6 caracteres..."
                      onChange={(e) => handleSenhaChange(e)}
                      value={usuarioSenha}
                    />
                    <InputRightElement width="4.5rem" mr={"40px"}>
                      <Button h="1.75rem" size="sm" onClick={handleClickShow}>
                        {show ? <BiHide /> : <BiShow />}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                </Box>
                {usuarioSenha.length < 6 ? (
                  <Text
                    color={"red"}
                    fontSize={"12px"}
                    marginLeft={"80px"}
                    mt={"-10px"}
                  >
                    Senha deve conter no mínimo 6 caracteres
                  </Text>
                ) : (
                  ""
                )}
              </Box>
            </ModalBody>

            <ModalFooter>
              <Button
                color={"snow"}
                backgroundColor={"#035191"}
                _hover={{ backgroundColor: "#002544" }}
                mr={3}
                type={"submit"}
                isDisabled={
                  !change == true && usuarioSenha.length >= 6 ? false : true
                }
                onClick={(e) => handleSaveUsuario(e)}
              >
                Save
              </Button>
              <Button
                onClick={handleCancel}
                backgroundColor={"red"}
                _hover={{ backgroundColor: "darkred" }}
                color={"snow"}
              >
                Cancel
              </Button>
            </ModalFooter>
          </ModalContent>
        </FormControl>
      </Modal>
    </Box>
  );
};

export default ListaUsuarios;
