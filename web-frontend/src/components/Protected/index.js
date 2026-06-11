import { useContext } from "react";
import Login from "../../pages/Login";
import UserContext from "../../context/user-token";

const Protected = (props) => {
  const { isLogin } = useContext(UserContext);

  if (isLogin === undefined) {
    return (
      <div className="container mt-5 text-center">
        <h3>Loading...</h3>
      </div>
    );
  }

  return !isLogin ? <Login /> : props.children;
};

export default Protected;

