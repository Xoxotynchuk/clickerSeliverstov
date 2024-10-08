import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../store/GlobalContext";
import { Api } from "../../methods/requests/Api";

function Clicker() {
  const {
    setModalContent,
    setIsModalOpen,
    isModalOpen,
    setModalData,
    allUsers,
    setAllUsers,
    averageVote,
    setAverageVote,
    tapToday,
    setTapToday,
    allInfoUsers,
    setAllInfoUsers,
    allTasks,
    setAllTasks,
    setAlertContent,
    setIsAlertOpen,
    setAlertData,
    isAlertOpen,
    spiner,
    setSpiner,
    allUtm,
    setAllUtm,
  } = useContext(GlobalContext);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1); // Общее количество страниц

  const getStatistic = async () => {
    try {
      const response = await Api.getStatistic();
      setAllUsers(response.data.users);
      setAverageVote(response.data.avg_votes);
      setTapToday(response.data.records);
    } catch (error) {
      console.log(error);
    }
  };

  const getAllInfoUsers = async () => {
    setSpiner(true);
    try {
      const response = await Api.getUsers(page);
      setAllInfoUsers(response.data.data);
      setTotalPages(response.data.pagination.totalPage);
    } catch (error) {
      console.log(error);
    }
    setSpiner(false);
  };


  const getUtm = async () => {
    setSpiner(true);
    try {
      const response = await Api.getUtm();
      setAllUtm(response.data.data);
    } catch (error) {
      console.log(error);
    }
    // setSpiner(false);
  };

  const handleNextPage = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const getAllTasks = async () => {
    try {
      const response = await Api.getAllTasks();
      setAllTasks(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const openModal = (content, item) => {
    setModalData(item);
    setModalContent(content);
    setIsModalOpen(true);
  };

  const deleteTask = async (id) => {
    setAlertContent("Удаление задачи");
    setIsAlertOpen(true);
    setAlertData(id);
  };

  useEffect(() => {
    getStatistic();
    getAllTasks();
  }, [isModalOpen, isAlertOpen]);

  useEffect(() => {
    getAllInfoUsers();
  }, [page]);
  useEffect(() => {
    getUtm();
  }, []);

  return (
    <div className="clicker">
      <h1>Админ панель</h1>
      <div className="clicker-statistic">
        <h2>Статистика</h2>
        <div className="clicker-items">
          <div className="clicker-component">
            <h3>Количество пользователей</h3>
            <p>{allUsers}</p>
          </div>
          <div className="clicker-component">
            <h3>Среднее количество голосов</h3>
            <p>{averageVote}</p>
          </div>
          <div className="clicker-component">
            <h3>Тапателей сегодня</h3>
            <p>{tapToday}</p>
          </div>
        </div>
      </div>
      <div className="clicker-tasks">
        <div className="clicker-tasks__header">
          <h2>Cписок заданий</h2>
          <button
            onClick={() => openModal("Новая задача")}
            className="button-max-content"
          >
            Добавить задание
          </button>
        </div>
        {Object.keys(allTasks).length === 0 && spiner ? (
          <div className="skeleton-table__list">
            <div className="skeleton-table-item clicker-component">
              <div className="block pulsate block-img"></div>
              <div className="skeleton-table__text">
                <div className="block pulsate"></div>
                <div className="skeleton-table__description">
                  <div className="block pulsate"></div>
                  <div className="block pulsate"></div>
                </div>
              </div>
            </div>
            <div className="skeleton-table-item clicker-component">
              <div className="block pulsate block-img"></div>
              <div className="skeleton-table__text">
                <div className="block pulsate"></div>
                <div className="skeleton-table__description">
                  <div className="block pulsate"></div>
                  <div className="block pulsate"></div>
                </div>
              </div>
            </div>
            <div className="skeleton-table-item clicker-component">
              <div className="block pulsate block-img"></div>
              <div className="skeleton-table__text">
                <div className="block pulsate"></div>
                <div className="skeleton-table__description">
                  <div className="block pulsate"></div>
                  <div className="block pulsate"></div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="clicker-items">
            {allTasks
              ? allTasks &&
                allTasks.map((item) => (
                  <div
                    key={item.id}
                    className="clicker-tasks__item clicker-component"
                  >
                    <div className="clicker-tasks__left">
                      <div className="clicker-tasks__item-icon">
                        <img src={item.image} alt="" />
                      </div>
                      <div className="clicker-tasks__item-text">
                        <h3>{item.name}</h3>
                        <p>+{item.price} голосов</p>
                      </div>
                    </div>

                    <div className="clicker-tasks__item-buttons">
                      <button
                        onClick={() =>
                          openModal("Редактирование задачи", { item })
                        }
                        className="button-square"
                      >
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g clipPath="url(#clip0_128_45)">
                            <path
                              d="M2.81326 15.4667L1.54659 20.9334C1.50289 21.1332 1.50439 21.3403 1.55097 21.5394C1.59756 21.7386 1.68805 21.9249 1.81583 22.0846C1.94362 22.2444 2.10547 22.3735 2.28957 22.4627C2.47368 22.5519 2.67537 22.5988 2.87992 22.6C2.9752 22.6103 3.07131 22.6103 3.16659 22.6L8.66659 21.3334L19.2266 10.8133L13.3333 4.93335L2.81326 15.4667Z"
                              fill="white"
                            />
                            <path
                              d="M22.5466 5.54673L18.6133 1.61339C18.3547 1.3561 18.0048 1.21167 17.64 1.21167C17.2752 1.21167 16.9252 1.3561 16.6666 1.61339L14.48 3.80006L20.3666 9.68673L22.5533 7.50006C22.6813 7.37145 22.7826 7.21886 22.8516 7.05104C22.9205 6.88321 22.9557 6.70344 22.955 6.52201C22.9544 6.34058 22.918 6.16106 22.848 5.99371C22.7779 5.82636 22.6755 5.67447 22.5466 5.54673Z"
                              fill="white"
                            />
                          </g>
                          <defs>
                            <clipPath id="clip0_128_45">
                              <rect width="24" height="24" fill="white" />
                            </clipPath>
                          </defs>
                        </svg>
                      </button>
                      <button
                        onClick={() => {
                          deleteTask(item.id);
                        }}
                        className="button-square button-red"
                      >
                        <svg
                          width="18"
                          height="22"
                          viewBox="0 0 18 22"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M18 1.22222H13.5L12.2143 0H5.78571L4.5 1.22222H0V3.66667H18M1.28571 19.5556C1.28571 20.2039 1.55663 20.8256 2.03887 21.284C2.5211 21.7425 3.17516 22 3.85714 22H14.1429C14.8248 22 15.4789 21.7425 15.9611 21.284C16.4434 20.8256 16.7143 20.2039 16.7143 19.5556V4.88889H1.28571V19.5556Z"
                            fill="white"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))
              : ""}
          </div>
        )}
      </div>
      <div className="clicker-utm">
        <h2>Utm метки</h2>
        {Object.keys(allUtm).length === 0 && spiner ? (
          <div className="skeleton-table__list">
            <div className="skeleton-table-item clicker-component">
              <div className="block pulsate block-img"></div>
              <div className="skeleton-table__text">
                <div className="block pulsate"></div>
                <div className="skeleton-table__description">
                  <div className="block pulsate"></div>
                  <div className="block pulsate"></div>
                </div>
              </div>
            </div>
            <div className="skeleton-table-item clicker-component">
              <div className="block pulsate block-img"></div>
              <div className="skeleton-table__text">
                <div className="block pulsate"></div>
                <div className="skeleton-table__description">
                  <div className="block pulsate"></div>
                  <div className="block pulsate"></div>
                </div>
              </div>
            </div>
            <div className="skeleton-table-item clicker-component">
              <div className="block pulsate block-img"></div>
              <div className="skeleton-table__text">
                <div className="block pulsate"></div>
                <div className="skeleton-table__description">
                  <div className="block pulsate"></div>
                  <div className="block pulsate"></div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="clicker-items">
          {allUtm ? allUtm && allUtm.map((item)=> (
            <div key={item.id} className="clicker-component">
              <h3>Название: {item.source}</h3>
              <p>Количество: {item.total}</p>
            </div>
            )): ""}
          </div>
        )}
      </div>
      <div className="clicker-users">
        <h2>Пользователи</h2>
        {Object.keys(allInfoUsers).length === 0 && spiner ? (
          <div className="skeleton-table__list">
            <div className="skeleton-table-item clicker-component">
              <div className="block pulsate block-img"></div>
              <div className="skeleton-table__text">
                <div className="block pulsate"></div>
                <div className="skeleton-table__description">
                  <div className="block pulsate"></div>
                  <div className="block pulsate"></div>
                </div>
              </div>
            </div>
            <div className="skeleton-table-item clicker-component">
              <div className="block pulsate block-img"></div>
              <div className="skeleton-table__text">
                <div className="block pulsate"></div>
                <div className="skeleton-table__description">
                  <div className="block pulsate"></div>
                  <div className="block pulsate"></div>
                </div>
              </div>
            </div>
            <div className="skeleton-table-item clicker-component">
              <div className="block pulsate block-img"></div>
              <div className="skeleton-table__text">
                <div className="block pulsate"></div>
                <div className="skeleton-table__description">
                  <div className="block pulsate"></div>
                  <div className="block pulsate"></div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="clicker-users__list">
            {allInfoUsers &&
              allInfoUsers.map((item) => (
                <div
                  key={item.id}
                  className="clicker-users__item clicker-component"
                >
                  <svg
                    width="104"
                    height="109"
                    viewBox="0 0 104 109"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M28.8889 24.2222C28.8889 17.7981 31.3238 11.6371 35.658 7.09452C39.9921 2.55198 45.8706 0 52 0C58.1294 0 64.0078 2.55198 68.342 7.09452C72.6762 11.6371 75.1111 17.7981 75.1111 24.2222C75.1111 30.6464 72.6762 36.8074 68.342 41.3499C64.0078 45.8925 58.1294 48.4444 52 48.4444C45.8706 48.4444 39.9921 45.8925 35.658 41.3499C31.3238 36.8074 28.8889 30.6464 28.8889 24.2222ZM28.8889 60.5556C21.2271 60.5556 13.8791 63.7455 8.46136 69.4237C3.04364 75.1019 0 82.8032 0 90.8333C0 95.6514 1.82619 100.272 5.07682 103.679C8.32745 107.086 12.7362 109 17.3333 109H86.6667C91.2638 109 95.6726 107.086 98.9232 103.679C102.174 100.272 104 95.6514 104 90.8333C104 82.8032 100.956 75.1019 95.5386 69.4237C90.1209 63.7455 82.7729 60.5556 75.1111 60.5556H28.8889Z"
                      fill="#282F6A"
                    />
                  </svg>
                  <div>
                    <h3>
                      {item.firstName} {item.lastName}{" "}
                      {item.username ? "(" + item.username + ")" : ""}
                    </h3>
                    <div className="users-item__description">
                      <p>Количество голосов: {item.getVotes}</p>
                      <p>Количество рефералов: {item.referrals}</p>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        )}
        {totalPages && totalPages > 1 && (
          <div className="pagination">
            <button onClick={handlePreviousPage} disabled={page === 1}>
              Назад
            </button>
            <span>
              Страница {page} из {totalPages}
            </span>
            <button onClick={handleNextPage} disabled={page === totalPages}>
              Вперед
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Clicker;
