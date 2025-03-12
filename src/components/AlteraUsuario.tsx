import { api } from "../services/api.provider";
import { usuarioLogado } from "../services/localStorageService";
import {
  Avatar,
  Box,
  Button,
  FormControl,
  Text,
  Input,
  Modal,
  ModalBody,
  useToast,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  InputRightElement,
  InputGroup,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverFooter,
  PopoverHeader,
  PopoverTrigger,
  Portal,
  Tooltip,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { BiShow } from "react-icons/bi";
import { BiHide } from "react-icons/bi";
import { GrUserAdmin } from "react-icons/gr";

type AlteraUsuarioProps = {
  usuarios: Array<usuarioLogado>;
  usuario: usuarioLogado;
  // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
  carregaUsuarios: Function;
};

type UsuarioAlteracao = {
  id: number;
  name: string;
  email: string;
};

const AlteraUsuario = ({ usuario, carregaUsuarios }: AlteraUsuarioProps) => {
  const [change, setChange] = useState<boolean>(true);
  const [senhaChange, setSenhaChange] = useState<boolean>(false);
  const [novoNome, setNovoNome] = useState<string>("");

  const [novoEmail, setNovoEmail] = useState<string>("");

  const [novoSenha, setNovoSenha] = useState<string>("");

  const [show, setShow] = useState(false);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const handleClickShow = () => setShow(!show);
  const toast = useToast();

  const payload: UsuarioAlteracao = {
    id: 0,
    name: "",
    email: "",
  };

  const atualizaDados = () => {
    setNovoNome(usuario.name);
    setNovoEmail(usuario.email);
  };

  useEffect(() => {
    atualizaDados();
  }, []);

  const handleCancel = () => {
    setChange(true);
    setNovoNome(usuario.name);
    setNovoEmail(usuario.email);

    onClose();
  };

  const handleNomeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNovoNome(e.target.value);
    setChange(false);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNovoEmail(e.target.value);
    setChange(false);
  };

  const handleSenhaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNovoSenha(e.target.value);
  };

  const handleSaveChanges = async (e: React.FormEvent) => {
    e.preventDefault();
    payload.id = usuario.id;
    payload.name = novoNome;
    payload.email = novoEmail;
    console.log("payload: ", payload);
    try {
      await api.put("/alterarUsuario", payload);
      toast({
        title: `Usuario ${usuario.name} alterado com sucesso`,
        duration: 4000,
        status: "success",
      });
      await carregaUsuarios();
      atualizaDados();
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

  const alteraSenha = async () => {
    const alteracao = {
      id: usuario.id,
      senha: novoSenha,
    };
    try {
      const response = await api.put(`/user/${usuario.id}`, alteracao);
      console.log(response);
      toast({
        title: `Senha do usuario ${usuario.name} alterada com sucesso`,
        duration: 4000,
        status: "success",
      });
      setNovoSenha("");
      setSenhaChange(false);
    } catch (error) {
      toast({
        title: `falha na alteração de senha`,
        description: JSON.stringify(error),
        duration: 4000,
        status: "error",
      });
    }
  };

  const handleClose = () => {
    setNovoSenha("");
    setSenhaChange(false);
  };

  return (
    <Box
      w={"170px"}
      display={"flex"}
      flexDirection={"row"}
      justifyContent={"center"}
    >
      <Box display={"flex"} justifyContent={"center"} gap={"12px"}>
        <Tooltip
          hasArrow
          label="Alterar usuario"
          bg="blue.600"
          borderRadius={"10px"}
          placement="left"
          mr={"10px"}
        >
          <Box display={"flex"} justifyContent={"center"} flexDir={"column"}>
            <Avatar
              bg="blue.500"
              onClick={onOpen}
              w={"40px"}
              h={"40px"}
              name={usuario.name}
              borderRadius={"50%"}
              _hover={{
                boxShadow: "0.8px 0.8px 6px 5px #002544",
                transform: "scale(1.2)",
                transition: "0.5s",
              }}
              cursor={"pointer"}
            />
          </Box>
        </Tooltip>
        <Popover
          isLazy={true}
          id="popOverAlteraSenha"
          placement="bottom-start"
          onClose={() => handleClose()}
          isOpen={senhaChange}
        >
          <PopoverTrigger>
            <Tooltip
              hasArrow
              label="Alterar senha"
              bg="red"
              borderRadius={"10px"}
              placement="right"
              ml={"10px"}
            >
              <Button
                fontWeight={500}
                color={"snow"}
                w={"35px"}
                h={"38px"}
                borderRadius={"50%"}
                bgColor={"#035191"}
                p={"11px"}
                boxShadow={"1px 2px 6px 2px #002544"}
                _hover={{
                  boxShadow: "1px 2px 4px 2px red",
                  bgColor: "red",
                  transform: "scale(1.15)",
                  transition: "0.8s",
                }}
                onClick={() => setSenhaChange(true)}
              >
                <Box ml={"5px"} fontSize={"22px"}>
                  <GrUserAdmin />
                </Box>
              </Button>
            </Tooltip>
          </PopoverTrigger>
          <Portal>
            <PopoverContent
              boxShadow={"2px 3px 6px 3px #002544"}
              w={"500px"}
              sx={{
                width: "400px !important",
                maxWidth: "400px !important",
              }}
            >
              <PopoverArrow />
              <PopoverHeader color={"#035191"} fontWeight={"bold"}>
                Alterar senha (Usuario: {usuario.name})
              </PopoverHeader>
              <PopoverBody>
                <Box
                  color={"#035191"}
                  display={"flex"}
                  flexDirection={"row"}
                  fontWeight={"bold"}
                  mb={"10px"}
                >
                  <InputGroup size="md">
                    <Text mt={"8px"} mr={"8px"}>
                      Nova senha:{" "}
                    </Text>
                    <Input
                      type={show ? "text" : "password"}
                      w={"350px"}
                      h={"30px"}
                      boxShadow={"2px 2px 4px 2px #002544"}
                      m={"5px"}
                      placeholder="Senha de no minimo 6 caracteres..."
                      onChange={(e) => handleSenhaChange(e)}
                      value={novoSenha}
                    />
                    <InputRightElement width="4.5rem" mr={"4px"}>
                      <Button h="1.75rem" size="sm" onClick={handleClickShow}>
                        {show ? <BiHide /> : <BiShow />}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                </Box>
                {novoSenha.length < 6 ? (
                  <Text
                    color={"red"}
                    fontSize={"12px"}
                    marginLeft={"120px"}
                    mt={"-10px"}
                  >
                    Senha deve conter no mínimo 6 caracteres
                  </Text>
                ) : (
                  ""
                )}
              </PopoverBody>
              <PopoverFooter display={"flex"} gap={"8px"}>
                <Button
                  bgColor={"#035191"}
                  _hover={{ bgColor: "#002544" }}
                  onClick={alteraSenha}
                  color={"snow"}
                  isDisabled={novoSenha.length < 6 ? true : false}
                >
                  Salvar
                </Button>
                <Button
                  w={"80px"}
                  colorScheme="red"
                  justifyContent={"center"}
                  onClick={() => handleClose()}
                >
                  Cancelar
                </Button>
              </PopoverFooter>
            </PopoverContent>
          </Portal>
        </Popover>
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
            sx={{
              width: "400px !important",
              maxWidth: "400px !important",
            }}
          >
            <ModalHeader fontWeight={"bold"} color={"#035191"}>
              Editar o usuario {usuario.name}.
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
                    defaultValue={novoNome}
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
                    defaultValue={novoEmail}
                    type="email"
                    w={"400px"}
                    h={"30px"}
                    boxShadow={"2px 2px 4px 2px #002544"}
                    m={"5px"}
                    onChange={(e) => handleEmailChange(e)}
                  />
                </Box>
              </Box>
            </ModalBody>

            <ModalFooter>
              <Button
                color={"snow"}
                backgroundColor={"#035191"}
                _hover={{ backgroundColor: "#002544" }}
                mr={3}
                type={"submit"}
                isDisabled={!change == true ? false : true}
                onClick={(e) => handleSaveChanges(e)}
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

export default AlteraUsuario;
