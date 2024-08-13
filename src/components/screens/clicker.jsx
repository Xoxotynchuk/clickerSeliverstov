import { useContext, useEffect } from "react";
import { GlobalContext } from "../store/GlobalContext";
import { Api } from "../../methods/requests/Api";

function Clicker() {
  const {
    setModalContent,
    setIsModalOpen,
    allUsers,
    setAllUsers,
    averageVote,
    setAverageVote,
    tapToday,
    setTapToday,
    allTasks,
    setAllTasks,
  } = useContext(GlobalContext);

  const getStatistic = async () => {
    try {
      const response = await Api.getStatistic();
      setAllUsers(response.data.data.users)
      setAverageVote(response.data.data.avg_votes)
      setTapToday(response.data.data.records)
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const getAllTasks = async () => {
    try {
      const response = await Api.getAllTasks();
      setAllTasks(response.data.data)
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const openModal = (content) => {
    setModalContent(content);
    setIsModalOpen(true);
  };

  const deleteTask = async () => {
    console.log("Удаление задачи");
  };

  useEffect(() => {
    getStatistic();
  });

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
        <div className="clicker-items">
          <div className="clicker-tasks__item clicker-component">
            <div className="clicker-tasks__left">
              <div className="clicker-tasks__item-icon">
                <svg
                  width="51"
                  height="51"
                  viewBox="0 0 51 51"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clipPath="url(#clip0_60_96)">
                    <path
                      d="M25.5 0C18.7385 0 12.248 2.68826 7.4707 7.46871C2.68854 12.2511 0.00136843 18.7369 0 25.5C0 32.2603 2.68945 38.7508 7.4707 43.5313C12.248 48.3117 18.7385 51 25.5 51C32.2615 51 38.752 48.3117 43.5293 43.5313C48.3105 38.7508 51 32.2603 51 25.5C51 18.7397 48.3105 12.2492 43.5293 7.46871C38.752 2.68826 32.2615 0 25.5 0Z"
                      fill="#2AABEE"
                    />
                    <path
                      d="M11.5427 25.2307C18.9776 21.9922 23.9341 19.8571 26.4124 18.8254C33.4966 15.8798 34.9669 15.3682 35.9271 15.3509C36.1383 15.3475 36.6084 15.3997 36.9152 15.6477C37.1702 15.8569 37.2419 16.1398 37.2778 16.3384C37.3097 16.5368 37.3535 16.989 37.3177 17.3421C36.9352 21.3742 35.2737 31.1591 34.429 35.6754C34.0744 37.5863 33.3691 38.2269 32.6878 38.2895C31.2056 38.4258 30.082 37.3109 28.6477 36.371C26.4044 34.8996 25.1374 33.984 22.958 32.5484C20.4398 30.8893 22.0734 29.9773 23.5078 28.4871C23.8823 28.0971 30.4087 22.1623 30.5323 21.6241C30.5482 21.5567 30.5641 21.3057 30.4127 21.1734C30.2653 21.0407 30.0462 21.0862 29.8868 21.122C29.6597 21.173 26.0777 23.5429 19.129 28.2313C18.113 28.9302 17.1926 29.2709 16.3638 29.2529C15.4554 29.2334 13.7023 28.7382 12.3994 28.315C10.8056 27.7959 9.5346 27.5213 9.64617 26.6396C9.70195 26.1806 10.3355 25.7108 11.5427 25.2307Z"
                      fill="white"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_60_96">
                      <rect width="51" height="51" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </div>
              <div className="clicker-tasks__item-text">
                <h3>Подпишись на канал</h3>
                <p>+300 голосов</p>
                <p>Кол-во выполнений: 30</p>
              </div>
            </div>

            <div className="clicker-tasks__item-buttons">
              <button
                onClick={() => openModal("Редактирование задачи")}
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
              <button onClick={deleteTask} className="button-square button-red">
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
          <div className="clicker-tasks__item clicker-component">
            <div className="clicker-tasks__left">
              <div className="clicker-tasks__item-icon">
                <svg
                  width="51"
                  height="51"
                  viewBox="0 0 51 51"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clipPath="url(#clip0_60_96)">
                    <path
                      d="M25.5 0C18.7385 0 12.248 2.68826 7.4707 7.46871C2.68854 12.2511 0.00136843 18.7369 0 25.5C0 32.2603 2.68945 38.7508 7.4707 43.5313C12.248 48.3117 18.7385 51 25.5 51C32.2615 51 38.752 48.3117 43.5293 43.5313C48.3105 38.7508 51 32.2603 51 25.5C51 18.7397 48.3105 12.2492 43.5293 7.46871C38.752 2.68826 32.2615 0 25.5 0Z"
                      fill="#2AABEE"
                    />
                    <path
                      d="M11.5427 25.2307C18.9776 21.9922 23.9341 19.8571 26.4124 18.8254C33.4966 15.8798 34.9669 15.3682 35.9271 15.3509C36.1383 15.3475 36.6084 15.3997 36.9152 15.6477C37.1702 15.8569 37.2419 16.1398 37.2778 16.3384C37.3097 16.5368 37.3535 16.989 37.3177 17.3421C36.9352 21.3742 35.2737 31.1591 34.429 35.6754C34.0744 37.5863 33.3691 38.2269 32.6878 38.2895C31.2056 38.4258 30.082 37.3109 28.6477 36.371C26.4044 34.8996 25.1374 33.984 22.958 32.5484C20.4398 30.8893 22.0734 29.9773 23.5078 28.4871C23.8823 28.0971 30.4087 22.1623 30.5323 21.6241C30.5482 21.5567 30.5641 21.3057 30.4127 21.1734C30.2653 21.0407 30.0462 21.0862 29.8868 21.122C29.6597 21.173 26.0777 23.5429 19.129 28.2313C18.113 28.9302 17.1926 29.2709 16.3638 29.2529C15.4554 29.2334 13.7023 28.7382 12.3994 28.315C10.8056 27.7959 9.5346 27.5213 9.64617 26.6396C9.70195 26.1806 10.3355 25.7108 11.5427 25.2307Z"
                      fill="white"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_60_96">
                      <rect width="51" height="51" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </div>
              <div className="clicker-tasks__item-text">
                <h3>Подпишись на канал</h3>
                <p>+300 голосов</p>
                <p>Кол-во выполнений: 30</p>
              </div>
            </div>

            <div className="clicker-tasks__item-buttons">
              <button
                onClick={() => openModal("Редактирование задачи")}
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
              <button onClick={deleteTask} className="button-square button-red">
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
          <div className="clicker-tasks__item clicker-component">
            <div className="clicker-tasks__left">
              <div className="clicker-tasks__item-icon">
                <svg
                  width="51"
                  height="51"
                  viewBox="0 0 51 51"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clipPath="url(#clip0_60_96)">
                    <path
                      d="M25.5 0C18.7385 0 12.248 2.68826 7.4707 7.46871C2.68854 12.2511 0.00136843 18.7369 0 25.5C0 32.2603 2.68945 38.7508 7.4707 43.5313C12.248 48.3117 18.7385 51 25.5 51C32.2615 51 38.752 48.3117 43.5293 43.5313C48.3105 38.7508 51 32.2603 51 25.5C51 18.7397 48.3105 12.2492 43.5293 7.46871C38.752 2.68826 32.2615 0 25.5 0Z"
                      fill="#2AABEE"
                    />
                    <path
                      d="M11.5427 25.2307C18.9776 21.9922 23.9341 19.8571 26.4124 18.8254C33.4966 15.8798 34.9669 15.3682 35.9271 15.3509C36.1383 15.3475 36.6084 15.3997 36.9152 15.6477C37.1702 15.8569 37.2419 16.1398 37.2778 16.3384C37.3097 16.5368 37.3535 16.989 37.3177 17.3421C36.9352 21.3742 35.2737 31.1591 34.429 35.6754C34.0744 37.5863 33.3691 38.2269 32.6878 38.2895C31.2056 38.4258 30.082 37.3109 28.6477 36.371C26.4044 34.8996 25.1374 33.984 22.958 32.5484C20.4398 30.8893 22.0734 29.9773 23.5078 28.4871C23.8823 28.0971 30.4087 22.1623 30.5323 21.6241C30.5482 21.5567 30.5641 21.3057 30.4127 21.1734C30.2653 21.0407 30.0462 21.0862 29.8868 21.122C29.6597 21.173 26.0777 23.5429 19.129 28.2313C18.113 28.9302 17.1926 29.2709 16.3638 29.2529C15.4554 29.2334 13.7023 28.7382 12.3994 28.315C10.8056 27.7959 9.5346 27.5213 9.64617 26.6396C9.70195 26.1806 10.3355 25.7108 11.5427 25.2307Z"
                      fill="white"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_60_96">
                      <rect width="51" height="51" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </div>
              <div className="clicker-tasks__item-text">
                <h3>Подпишись на канал</h3>
                <p>+300 голосов</p>
                <p>Кол-во выполнений: 30</p>
              </div>
            </div>

            <div className="clicker-tasks__item-buttons">
              <button
                onClick={() => openModal("Редактирование задачи")}
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
              <button onClick={deleteTask} className="button-square button-red">
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
        </div>
      </div>
    </div>
  );
}

export default Clicker;
