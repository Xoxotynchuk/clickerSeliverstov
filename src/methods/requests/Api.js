import axios from "axios";
import { getCookie } from "../getCookie";

export class Api {
  static auth() {
    return {
      headers: {
        Authorization: "Bearer " + getCookie("currentToken"),
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
  static async createTasks() {
    const response = await axios.post(this.baseUrl("admin/tasks"), this.auth());
    return response;
  }

  // Редактировать задание
  static async editTasks(id) {
    const response = await axios.patch(this.baseUrl("admin/tasks/" + id), this.auth());
    return response;
  }

  // Удалить задание
  static async deleteTasks(id) {
    const response = await axios.delete(this.baseUrl("admin/tasks/" + id), this.auth());
    return response;
  }

  // Активировать задание
  static async setTaskActive(id) {
    const response = await axios.get(this.baseUrl("admin/tasks/active/" + id), this.auth());
    return response;
  }

  // Деактивировать задание
  static async setTaskActive(id) {
    const response = await axios.get(this.baseUrl("admin/tasks/deactive/" + id), this.auth());
    return response;
  }
}
