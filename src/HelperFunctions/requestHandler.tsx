import axios, { AxiosResponse } from "axios";
import { Dispatch, SetStateAction } from "react";
import { notificationsType } from "../Context/AppContext";
import { setNotiticationFunction } from "./setNotificationsFunction";

export type requestType = {
  data: any;
  isLoading: boolean;
  error: any;
};

type RequestType = {
  method: string;
  url: string;
  headers?: any;
  data?: any;
  isMultipart?: boolean;
  state?: requestType;
  setState?: Dispatch<SetStateAction<requestType>>;
  setNotificationsSuccess?: boolean;
  setNotificationsFailure?: boolean;
  setNotifications?: Dispatch<SetStateAction<notificationsType>>;
  successMessage?: string;
  successFunction?: (res?: AxiosResponse) => void;
  errorFunction?: () => void;
  load?: boolean;
  requestCleanup?: boolean;
};

export async function requestHandler({
  method,
  url,
  headers,
  data,
  isMultipart,
  setState,
  setNotificationsFailure,
  setNotificationsSuccess,
  setNotifications,
  successMessage,
  successFunction,
  errorFunction,
  load,
  requestCleanup,
}: RequestType) {
  const userToken = localStorage.getItem("iseAdminAccessToken");
  if ((setState && load === true) || (setState && load === undefined)) {
    setState((prevState) => {
      return { ...prevState, isLoading: true };
    });
  } else if (setState && load === false) {
    setState((prevState) => {
      return { ...prevState, isLoading: false };
    });
  }
  axios({
    method,
    url,
    headers: {
      Authorization: `Bearer ${userToken}`,
      "Content-Type": !isMultipart ? "application/json" : "multipart/form-data",
      ...headers,
    },
    data,
  })
    .then((res) => {
      if (setState) {
        setState({
          isLoading: false,
          data: res?.data,
          error: null,
        });

        if (requestCleanup) {
          setTimeout(() => {
            setState({
              isLoading: false,
              data: null,
              error: null,
            });
          }, 5000);
        }
      }
      if (successFunction) {
        successFunction(res);
      }
      if (setNotificationsSuccess) {
        setNotiticationFunction(
          setNotifications as Dispatch<SetStateAction<notificationsType>>,
          successMessage || res?.data,
          "success"
        );
      }
    })
    .catch((err) => {
      console.log(err, "Error");
      if (setState) {
        setState({
          isLoading: false,
          data: null,
          error: err.response?.data?.error
            ? err.response?.data?.error?.responseMessage
            : !err.response?.data?.error
            ? err.response?.data?.responseMessage.toString()
            : err.message,
        });

        if (requestCleanup) {
          setTimeout(() => {
            setState({
              isLoading: false,
              data: null,
              error: null,
            });
          }, 5000);
        }
      }
      if (errorFunction) {
        errorFunction();
      }
      if (setNotificationsFailure) {
        setNotiticationFunction(
          setNotifications as Dispatch<SetStateAction<notificationsType>>,
          err.response?.data?.error
            ? err.response?.data?.error?.responseMessage
            : !err.response?.data?.error
            ? err.response?.data?.responseMessage.toString()
            : err.message
        );
      }
      if (err?.response?.data?.error?.responseMessage === "Expired Token") {
        localStorage.removeItem("iseAdminAccessToken");
        localStorage.removeItem("iseAdminRefreshToken");

        window.location.href =
          "/sign-in?redirect=" + encodeURIComponent(window.location.pathname);
      }
    });
}
