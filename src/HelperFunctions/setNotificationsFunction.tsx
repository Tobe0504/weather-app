import { notificationsType } from "../Context/AppContext";
import { v4 } from "uuid";
import { Dispatch, SetStateAction } from "react";
import { capitalize } from "../HelperFunctions/capitalize";

export const setNotiticationFunction = (
  setState: Dispatch<SetStateAction<notificationsType>>,
  errorMessage: string,
  severity?: string
) => {
  if (setState) {
    setState((prevState: any) => {
      if (prevState) {
        return [
          ...prevState,
          {
            title: capitalize((errorMessage as string) || ""),
            severity: severity || "error",
            id: v4(),
          },
        ];
      } else {
        return [
          {
            title: capitalize((errorMessage as string) || ""),
            severity: severity || "error",
            id: v4(),
          },
        ];
      }
    });
  }
};
