import { useContext, useEffect } from "react";
import { GlobalContext } from "../store/GlobalContext";
import { Api } from "../../methods/requests/Api";

const Alert = ({ isOpen, content }) => {
  const { isAlertOpen, setIsAlertOpen, alertData, setAlertContent } =
    useContext(GlobalContext);
  //   if (!isOpen) return null;

  const closeAlert = () => {
    isAlertOpen &&
      document.querySelector(".alert").classList.remove("alert_active");
    setIsAlertOpen(false);
  };

  const deleteTask = async () => {
    try {
      await Api.deleteTasks(alertData);
      setAlertContent("Успешное удаление задачи");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    isAlertOpen &&
      document.querySelector(".alert").classList.add("alert_active");
    setTimeout(closeAlert, 10000);
  }, [isAlertOpen === true]);

  return (
    <div className="alert">
      {content === "Создание задачи" && (
        <div className="alert-content">
          <h2>Задача добавлена</h2>
          <p>Задача успешного добавлена</p>
        </div>
      )}
      {content === "Редактирование задачи" && (
        <div className="alert-content">
          <h2>Задача отредактирована</h2>
          <p>Задача успешного отредактирована</p>
        </div>
      )}
      {content === "Удаление задачи" && (
        <div className="alert-content">
          <h2>Вы действительно хотите удалить задачу?</h2>
          <div className="alert-buttons">
            <button className="button-red" onClick={deleteTask}>Да</button>
            <button onClick={closeAlert}>Нет</button>
          </div>
        </div>
      )}
      {content === "Успешное удаление задачи" && (
        <div className="alert-content">
          <h2>Задача удалена</h2>
          <p>Задача успешного удалена</p>
        </div>
      )}
    </div>
  );
};

export default Alert;
