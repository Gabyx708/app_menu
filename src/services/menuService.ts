import axios, { AxiosRequestConfig } from "axios";
import { getUser } from "./userService";
import axiosInstance from "./axiosInstance";

export const getNextMenuAvailable = async () => {
  const response = await axiosInstance.get<Menu>("menu/next-available");
  return response;
};

export const saveActualMenu = (menu: Menu): Menu => {
  sessionStorage.setItem("menu", JSON.stringify(menu));
  return menu;
};

export const getActualMenu = (): Menu | null => {
  const menuStringify: string | null = sessionStorage.getItem("menu");
  if (menuStringify != null) {
    return JSON.parse(menuStringify);
  }

  return null;
};
