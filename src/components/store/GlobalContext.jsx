import React, { useEffect, useState } from "react";
import checkAuth from "../../methods/requests/checkAuth";
import { getCookie } from "../../methods/getCookie";
const GlobalContext = React.createContext();

const GlobalProvider = ({ children }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [modalContent, setModalContent] = useState('');
  const [modalData, setModalData] = useState('');

  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [alertContent, setAlertContent] = useState('');
  const [alertData, setAlertData] = useState('');

  const [allUsers, setAllUsers] = useState(0);
  const [averageVote, setAverageVote] = useState(0);
  const [tapToday, setTapToday] = useState(0);

  const [allTasks, setAllTasks] = useState([]);

  const [status, setStatus] = useState("");
  const [data, setData] = useState("");

  const getAccess = async () => {
    const authStatus = await checkAuth(setStatus);
  };

  useEffect(()=> {
    getCookie("currentToken") ? setStatus(200) : setStatus('')

  })

  return <GlobalContext.Provider value={{
    isModalOpen, setIsModalOpen,
    modalContent, setModalContent,
    modalData, setModalData,

    isAlertOpen, setIsAlertOpen,
    alertContent, setAlertContent,
    alertData, setAlertData,

    allUsers, setAllUsers, 
    averageVote, setAverageVote, 
    tapToday, setTapToday,

    allTasks, setAllTasks,

    status, setStatus,
    data, setData
  }}>
      {children}
    </GlobalContext.Provider>;
};

export { GlobalContext, GlobalProvider };
