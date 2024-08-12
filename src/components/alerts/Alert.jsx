import { useContext, useEffect } from "react";
import { GlobalContext,  } from "../store/GlobalContext";

const Alert = ({ isOpen, content }) => {
  const { isAlertOpen, setIsAlertOpen } = useContext(GlobalContext);
//   if (!isOpen) return null;

  const closeAlert = () => {
    isAlertOpen && document.querySelector('.alert').classList.remove('alert_active')
    setIsAlertOpen(false);
  };

  useEffect(()=>{
      isAlertOpen && document.querySelector('.alert').classList.add('alert_active')
      setTimeout(closeAlert, 10000);
  },[isAlertOpen == true])

  useEffect(()=>{
  },[isAlertOpen == true])

  return (
    <div className="alert">
      {content == "Создание задачи" && (
        <div className="alert-content">
          <h2>Задача добавлена</h2>
          <p>Задача успешного добавлена</p>
        </div>
      )}
    </div>
  );
};

export default Alert;
