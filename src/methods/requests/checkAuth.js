import { getCookie } from "../getCookie";

const checkAuth = async (setStatus) => {
  if (getCookie("clickerToken")) {
    setStatus(200);
  } else {
    setStatus(0);
  }
};

export default checkAuth;
