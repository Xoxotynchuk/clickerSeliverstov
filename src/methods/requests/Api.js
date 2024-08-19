import axios from "axios";
import { getCookie } from "../getCookie";

export class Api {
  static auth() {
    return {
      headers: {
        Authorization: "Bearer " + getCookie("clickerToken"),
      },
    };
  }

  // Переменная для api + route
  static baseUrl(route) {
    return "https://api.seliverstov-mgd.ru/api/" + route;
  }

  // Получить статистику
  static async getStatistic() {
    const response = await axios.get(this.baseUrl("statistics"), this.auth());
    return response;
  }

  // Получить все задания
  static async getAllTasks() {
    const response = await axios.get(this.baseUrl("admin/tasks"), this.auth());
    return response;
  }

  // Создать задание
  static async createTasks(data) {
    // Создаем объект FormData
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("task_type_id", data.category);
    formData.append("image", data.image); // Здесь передаем файл
    formData.append("price", data.price);
    formData.append("link", data.link);
    formData.append("description", data.description);
    formData.append("count", data.count);
    formData.append("active", data.active);

    const response = await axios.post(
      this.baseUrl("admin/tasks"),
      formData,
      this.auth()
    );

    return response;
  }

  // Редактировать задание
  static async editTasks(id, data) {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("task_type_id", data.category);
    if (data.image) {
      formData.append("image", data.image)
    };
    formData.append("price", data.price);
    formData.append("link", data.link);
    formData.append("description", data.description);
    formData.append("count", data.count);
    formData.append("active", data.active);

    console.log(data);
    
    const response = await axios.post(
      this.baseUrl("admin/tasks/" + id),
      formData,
      this.auth()
    );
    return response;
  }

  // Удалить задание
  static async deleteTasks(id) {
    const response = await axios.get(
      this.baseUrl("admin/tasks/" + id),
      this.auth()
    );
    return response;
  }

  // Получение юзеров
  static async getUsers(page) {
    const response = await axios.get(
      this.baseUrl("users/" + page),
      this.auth()
    );
    return response;
  }

  // Получение utm меток
  static async getUtm() {
    const response = await axios.get(
      this.baseUrl("utms"),
      this.auth()
    );
    return response;
  }
}
