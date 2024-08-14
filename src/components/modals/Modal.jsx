import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../store/GlobalContext";
import { Api } from "../../methods/requests/Api";

const Modal = ({ isOpen, content }) => {
  const {
    setIsModalOpen,
    setModalContent,
    modalData,
    setAlertContent,
    setIsAlertOpen,
  } = useContext(GlobalContext);

  const [selectedCategory, setSelectedCategory] = useState("link");
  const [name, setName] = useState("");
  const [image, setImage] = useState(null);
  const [active, setActive] = useState(1);
  const [link, setLink] = useState("");
  const [count, setCount] = useState(1);
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");

  const nameHandler = (event) => {
    setName(event.target.value);
  };

  const imageHandler = (event) => {
    setImage(event.target.files[0]); // Получаем файл
  };

  const activeHandler = (event) => {
    if (event.target.checked) {
      setActive(1);
    } else {
      setActive(0);
    }
  };

  const linkHandler = (event) => {
    setLink(event.target.value);
  };

  const countHandler = (event) => {
    setCount(event.target.value);
  };

  const descriptionHandler = (event) => {
    setDescription(event.target.value);
  };

  const priceHandler = (event) => {
    setPrice(event.target.value);
  };

  useEffect(() => {
    const link = document.getElementById("link");
    const count = document.getElementById("count");
    if ((link, count)) {
      if (modalData && modalData.item.type.id == 1) {
        setSelectedCategory("link");
        count.classList.add("hidden");
        link.classList.remove("hidden");
      } else if (modalData && modalData.item.type.id == 2) {
        setSelectedCategory("friend");
        link.classList.add("hidden");
        count.classList.remove("hidden");
      }
    }
  }, [
    modalData &&
      modalData.item &&
      modalData.item.type.id &&
      document.getElementById("link") &&
      document.getElementById("count"),
  ]);

  useEffect(() => {
    if (modalData && modalData.item) {
      setName(modalData.item.name);
      setImage(null); // Сбросим изображение, если нужно
      setActive(modalData.item.active);
      modalData.item.type.id == 1
        ? setSelectedCategory("link")
        : setSelectedCategory("friend");
      setCount(modalData.item.count);
      setLink(modalData.item.link);
      setDescription(modalData.item.description);
      setPrice(modalData.item.price);
    }
  }, [modalData]);

  useEffect(() => {
    const link = document.getElementById("link");
    const count = document.getElementById("count");
    if ((link, count)) {
      if (selectedCategory == "link") {
        link.classList.remove("hidden");
        count.classList.add("hidden");
      } else {
        count.classList.remove("hidden");
        link.classList.add("hidden");
      }
    }
  }, [document.getElementById("link") && document.getElementById("count")]);

  if (!isOpen) return null;

  const handleChange = (event) => {
    setSelectedCategory(event.target.value);
    const count = document.getElementById("count");
    const link = document.getElementById("link");

    if (event.target.value == "link") {
      link.classList.remove("hidden");
      count.classList.add("hidden");
      setCount(1);
    } else {
      count.classList.remove("hidden");
      link.classList.add("hidden");
      setLink("");
    }
  };

  const body = document.querySelector("body");
  body.style.overflow = "hidden";

  const handleOverlayClick = (e) => {
    // Закрываем модалку только если кликнули на оверлей, а не на саму модалку
    if (e.target === e.currentTarget) {
      setIsModalOpen(false);
      body.style.overflow = "auto";
    }
  };

  const closeModal = () => {
    body.style.overflow = "auto";
    setIsModalOpen(false);
    setModalContent("");
  };

  const createTask = async (e) => {
    e.preventDefault();
    const data = {
      name: name,
      image: image,
      active: active,
      category: selectedCategory == "link" ? 1 : 2,
      link: link,
      count: count,
      description: description,
      price: price,
    };
    try {
      await Api.createTasks(data);
      setIsModalOpen(false);
      setModalContent("");
      setAlertContent("Создание задачи");
      setIsAlertOpen(true);
    } catch (err) {
      console.log(err);
    }
  };

  const editTask = async (id) => {
    const data = {};
    data.name = name;
    if (image != null) data.image = image; // Отправляем изображение только если оно изменилось
    if (active == true) data.active = 1;
    if (active == false) data.active = 0;
    data.category = selectedCategory === "link" ? 1 : 2;
    data.count = count;
    data.link = link;
    data.description = description;
    data.price = price;

    try {
      await Api.editTasks(id, data);
      setIsModalOpen(false);
      setModalContent("");
      setAlertContent("Редактирование задачи");
      setIsAlertOpen(true);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal">
        <div className="modal-close" onClick={closeModal}>
          <svg
            width="17"
            height="17"
            viewBox="0 0 17 17"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M16.6235 0.389437C16.5042 0.269901 16.3625 0.175066 16.2065 0.11036C16.0505 0.0456545 15.8833 0.0123481 15.7144 0.0123481C15.5455 0.0123481 15.3783 0.0456545 15.2223 0.11036C15.0663 0.175066 14.9246 0.269901 14.8053 0.389437L8.5 6.68189L2.19465 0.376542C2.07527 0.257163 1.93355 0.162467 1.77757 0.0978598C1.6216 0.0332526 1.45442 1.25786e-09 1.2856 0C1.11677 -1.25786e-09 0.949595 0.0332526 0.793619 0.0978598C0.637644 0.162467 0.495921 0.257163 0.376542 0.376542C0.257163 0.495921 0.162467 0.637644 0.0978598 0.793619C0.0332526 0.949595 -1.25786e-09 1.11677 0 1.2856C1.25786e-09 1.45442 0.0332526 1.6216 0.0978598 1.77757C0.162467 1.93355 0.257163 2.07527 0.376542 2.19465L6.68189 8.5L0.376542 14.8053C0.257163 14.9247 0.162467 15.0665 0.0978598 15.2224C0.0332526 15.3784 0 15.5456 0 15.7144C0 15.8832 0.0332526 16.0504 0.0978598 16.2064C0.162467 16.3624 0.257163 16.5041 0.376542 16.6235C0.495921 16.7428 0.637644 16.8375 0.793619 16.9021C0.949595 16.9667 1.11677 17 1.2856 17C1.45442 17 1.6216 16.9667 1.77757 16.9021C1.93355 16.8375 2.07527 16.7428 2.19465 16.6235L8.5 10.3181L14.8053 16.6235C14.9247 16.7428 15.0665 16.8375 15.2224 16.9021C15.3784 16.9667 15.5456 17 15.7144 17C15.8832 17 16.0504 16.9667 16.2064 16.9021C16.3624 16.8375 16.5041 16.7428 16.6235 16.6235C16.7428 16.5041 16.8375 16.3624 16.9021 16.2064C16.9667 16.0504 17 15.8832 17 15.7144C17 15.5456 16.9667 15.3784 16.9021 15.2224C16.8375 15.0665 16.7428 14.9247 16.6235 14.8053L10.3181 8.5L16.6235 2.19465C17.1134 1.70466 17.1134 0.879423 16.6235 0.389437Z"
              fill="black"
            />
          </svg>
        </div>
        {content == "Новая задача" && (
          <form
            className="modal-content"
            method="POST"
            encType="multipart/form-data"
            onSubmit={(e) => {
              e.preventDefault(); // Предотвращаем обновление страницы
            }}
          >
            <h2 className="form-title">Новая задачи</h2>
            <div className="form-content">
              <label htmlFor="title" className="modal-label">
                <h3>Название</h3>
                <input
                  name="title"
                  type="text"
                  defaultValue=""
                  onChange={nameHandler}
                  required
                />
              </label>

              <label htmlFor="image" className="modal-label">
                <h3>Картинка</h3>
                <input
                  name="image"
                  type="file"
                  onChange={imageHandler}
                  required
                />
              </label>

              <label htmlFor="active" className="modal-label">
                <h3>Активность</h3>
                <input
                  name="active"
                  type="checkbox"
                  onChange={activeHandler}
                  defaultChecked
                  required
                />
              </label>

              <label htmlFor="category" className="modal-label">
                <h3>Категория</h3>
                <select
                  name="category"
                  value={selectedCategory}
                  onChange={handleChange}
                  required
                >
                  <option name="link" value="link">
                    Ссылка
                  </option>
                  <option name="friend" value="friend">
                    Приглашение друзей
                  </option>
                </select>
              </label>

              <label htmlFor="count" className="modal-label hidden" id="count">
                <h3>Количество</h3>
                <input name="count" type="number" onChange={countHandler} />
              </label>

              <label htmlFor="text" className="modal-label" id="link">
                <h3>Ссылка</h3>
                <input
                  name="text"
                  type="text"
                  defaultValue=""
                  onChange={linkHandler}
                />
              </label>

              <label htmlFor="description" className="modal-label">
                <h3>Описание</h3>
                <input
                  name="description"
                  type="text"
                  defaultValue=""
                  onChange={descriptionHandler}
                  required
                />
              </label>

              <label htmlFor="price" className="modal-label">
                <h3>Цена</h3>
                <input
                  name="price"
                  type="text"
                  defaultValue=""
                  onChange={priceHandler}
                  required
                />
              </label>
            </div>
            <button onClick={createTask}>Создать</button>
          </form>
        )}

        {content == "Редактирование задачи" && (
          <form
            className="modal-content"
            method="POST"
            encType="multipart/form-data"
            onSubmit={(e) => {
              e.preventDefault(); // Предотвращаем обновление страницы
            }}
          >
            <h2 className="form-title">Редактирование задачи</h2>
            <div className="form-content">
              <label htmlFor="title" className="modal-label">
                <h3>Название</h3>
                <input
                  name="title"
                  type="text"
                  defaultValue={modalData.item.name}
                  onChange={nameHandler}
                  required
                />
              </label>

              <label htmlFor="image" className="modal-label">
                <h3>Картинка</h3>
                <input
                  name="image"
                  type="file"
                  onChange={imageHandler}
                  required
                />
              </label>

              <label htmlFor="active" className="modal-label">
                <h3>Активность</h3>
                <input
                  name="active"
                  type="checkbox"
                  onChange={activeHandler}
                  defaultChecked={modalData.item.active == 1}
                />
              </label>

              <label htmlFor="category" className="modal-label">
                <h3>Категория</h3>
                <select
                  name="category"
                  value={selectedCategory}
                  onChange={handleChange}
                  required
                >
                  <option name="link" value="link">
                    Ссылка
                  </option>
                  <option name="friend" value="friend">
                    Приглашение друзей
                  </option>
                </select>
              </label>

              <label htmlFor="count" className="modal-label" id="count">
                <h3>Количество</h3>
                <input
                  name="count"
                  type="number"
                  onChange={countHandler}
                  defaultValue={modalData.item.count}
                />
              </label>

              <label htmlFor="text" className="modal-label" id="link">
                <h3>Ссылка</h3>
                <input
                  name="text"
                  type="text"
                  onChange={linkHandler}
                  defaultValue={modalData.item.link}
                />
              </label>

              <label htmlFor="description" className="modal-label">
                <h3>Описание</h3>
                <input
                  name="description"
                  type="text"
                  onChange={descriptionHandler}
                  defaultValue={modalData.item.description}
                  required
                />
              </label>

              <label htmlFor="price" className="modal-label">
                <h3>Цена</h3>
                <input
                  name="price"
                  type="text"
                  onChange={priceHandler}
                  defaultValue={modalData.item.price}
                  required
                />
              </label>
            </div>
            <button onClick={() => editTask(modalData.item.id)}>
              Редактировать
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Modal;
