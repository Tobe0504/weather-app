import useSWR, { SWRConfiguration } from "swr";
import { useLocation, useNavigate } from "react-router-dom";

const useGetHook = (url: string | null, props?: SWRConfiguration) => {
  const { data, error, isLoading, isValidating } = useSWR(url, { ...props });

  // Router
  const navigate = useNavigate();
  const location = useLocation();

  const errorMessage = error?.response?.data?.error
    ? error?.response?.data?.error?.responseMessage
    : !error?.response?.data?.error
    ? error?.response?.data?.responseMessage.toString()
    : error?.request
    ? "There was an issue making this request"
    : error?.message;

  if (errorMessage) {
    // setNotiticationFunction(setNotifications, errorMessage);
  }

  if (errorMessage === "Expired Token" || errorMessage === "Unauthorized") {
    navigate("/sign-in", { state: location.pathname });
    console.log(errorMessage, "Error message");
  }

  return { data, error, isLoading, isValidating };
};

export default useGetHook;
