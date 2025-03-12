type usuarioLogado = {
  id: number;
  name: string;
  email: string;
  token: string;
};

const LocalStorageService = {
  addUsuario: async (usuario: usuarioLogado) => {
    if (typeof window.localStorage !== "undefined") {
      await window.localStorage?.setItem("id", usuario.id.toString());
      await window.localStorage?.setItem("nome", usuario.name);
      await window.localStorage?.setItem("email", usuario.email);
      await window.localStorage?.setItem("token", usuario.token);

      return "sucess";
    } else {
      return "failed";
    }
  },
  findUsuario: () => {
    if (typeof window.localStorage !== "undefined") {
      const id = window.localStorage?.getItem("id");
      const nome = window.localStorage?.getItem("nome");
      const email = window.localStorage?.getItem("email");
      const token = window.localStorage?.getItem("token");

      const usuariologado = {
        id: id,
        nome: nome,
        email: email,
        token: token,
      };
      return usuariologado;
    } else {
      return null;
    }
  },
  cleanLocalStorage: () => {
    if (typeof window.localStorage !== "undefined") {
      window.localStorage.clear();
    }
  },
};

export default LocalStorageService;
