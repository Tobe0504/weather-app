import { useContext, useEffect } from "react";
import { AppContext, notificationsType } from "../../Context/AppContext";
import classes from "./Toast.module.css";

type ToastProps = {
  children: React.ReactNode;
};

const Toast = ({ children }: ToastProps) => {
  // Context
  const { notifications, setNotifications } = useContext(AppContext);

  // Utils
  const filterNotifications = (id: string | number) => {
    const newNotifications = notifications?.filter((data) => {
      return data.id !== id;
    });

    setNotifications(newNotifications as notificationsType);
  };

  // Effects
  useEffect(() => {
    const timeoutIds: NodeJS.Timeout[] = [];

    notifications?.forEach((data) => {
      const timeoutId = setTimeout(() => {
        filterNotifications(data.id);
      }, 6000);
      timeoutIds.push(timeoutId);
    });

    // Clear timeouts unconditionally
    return () => {
      timeoutIds.forEach((timeoutId) => clearTimeout(timeoutId));
    };

    // eslint-disable-next-line
  }, [notifications]);

  return (
    <div className={classes.container}>
      <div className={classes.body}>{children}</div>
      {notifications && (
        <div className={classes.notificationContainer}>
          {notifications?.map((data) => (
            <div
              key={data.id}
              className={classes.notification}
              style={{
                background: data.severity === "success" ? "#38CCB3" : "#DC362E",
                color: data.severity === "success" ? "#011627" : "#FFFFFF",
              }}
            >
              <div className={classes.leftSection}>
                <p>{data.title}</p>
              </div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 40 40"
                fill="none"
                onClick={() => {
                  filterNotifications(data.id);
                }}
              >
                <path
                  d="M10 30L30 10M10 10L30 30"
                  stroke={`${
                    data.severity === "success" ? "#011627" : "#FFFFFF"
                  }`}
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Toast;
