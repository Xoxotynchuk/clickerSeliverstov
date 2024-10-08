import { BrowserRouter, Route, Routes } from "react-router-dom";

import Clicker from "./screens/clicker";
import Modal from "./modals/Modal";
import { useContext } from "react";

import { GlobalContext } from "./store/GlobalContext";
import Alert from "./alerts/Alert";
import Login from "./screens/login";
import PageNotFound from "./screens/PageNotFound";

const Container = () => {
  const { isModalOpen, modalContent, isAlertOpen, alertContent, status } =
    useContext(GlobalContext);
    console.log(status);
  return (
    <div className="App">
      <BrowserRouter>
        {status && status === 200 ? (
          <Routes>
            <Route path="/" element={<Clicker />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        ) : (
          <Routes>
            <Route path="*" element={<PageNotFound />} />
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Login />} />
          </Routes>
        )}

        <Modal isOpen={isModalOpen} content={modalContent} />
        <Alert isOpen={isAlertOpen} content={alertContent} />
      </BrowserRouter>
    </div>
  );
};

export default Container;
