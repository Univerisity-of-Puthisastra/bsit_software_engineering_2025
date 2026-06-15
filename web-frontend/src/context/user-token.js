import React from "react";

const UserContext = React.createContext({
  setLogin: () => {},
  setToken: () => {},
});

export default UserContext;
