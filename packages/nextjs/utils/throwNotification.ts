import toast from "react-hot-toast";

export const throwNotification = (type: "success" | "error", message: string) => {
  return toast[type](message, {
    style: {
      border: "1px solid #713200",
      padding: "16px",
      color: "#713200",
      width: "900px",
    },
    iconTheme: {
      primary: "#42D1D1",
      secondary: "#FFFAEE",
    },
  });
};
