import { BrowserRouter, Route, Routes } from "react-router-dom";

import Clicker from "./screens/clicker";
import Modal from "./modals/Modal";
import { useContext } from "react";

import { GlobalContext } from "./store/GlobalContext";
import Alert from "./alerts/Alert";

const Container = () => {
  const { isModalOpen, modalContent, isAlertOpen, alertContent } = useContext(GlobalContext);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Clicker />} />
        </Routes>

        <Modal
          isOpen={isModalOpen}
          content={modalContent}
        />
        <Alert
          isOpen={isAlertOpen}
          content={alertContent}
        />
      </BrowserRouter>
    </div>
  );
};

export default Container;
