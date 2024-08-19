import { useContext, useState } from "react";
import { GlobalContext } from "../store/GlobalContext";
import { loginRequest } from "../../methods/requests/login";

function Login() {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  const { setStatus } = useContext(GlobalContext);

  const loginHandler = (event) => {
    setLogin(event.target.value);
  };

  const passwordHandler = (event) => {
    setPassword(event.target.value);
  };

  const authHandler = async (e) => {
    e.preventDefault();

    try {
      const response = await loginRequest(login, password);  
      setStatus(response.data.data.status)
      document.cookie =
        "clickerToken=" + response.data.data + "; max-age=15638400";
      localStorage.setItem(login, response.data.data);
      window.location.reload();
    } catch (err) {
      if (err.response.status === 403) {
        // setAlert(true);
        // setAlertBorder('negative');
        // setAlertName("Неверный пароль");
      }
    }
  };

  return (
    <div className="clicker">
      <form className="login" action="" method="POST" onSubmit={authHandler}>
        <h1>Авторизация</h1>
        <label htmlFor="">
          <h3>Логин</h3>
          <input
            value={login}
            onChange={loginHandler}
            name="login"
            type="text"
            required
          />
        </label>
        <label htmlFor="">
          <h3>Пароль</h3>
          <input
            value={password}
            onChange={passwordHandler}
            name="password"
            type="password"
            required
          />
        </label>
        <button>Войти</button>
      </form>
    </div>
  );
}

export default Login;
