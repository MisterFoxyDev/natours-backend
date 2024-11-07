import axios from "axios";
import { showAlert } from "./alerts";

// Type is either "password" or "data"
export const updateSettings = async (data, type) => {
  try {
    const res = await axios({
      method: "PATCH",
      url:
        type === "password"
          ? "/api/v1/users/updatePassword"
          : "/api/v1/users/updateMe",
      data,
    });

    if (res.data.status === "success") {
      showAlert("success", `${type.toUpperCase()} updated successfully!`);
      window.setTimeout(() => {
        location.reload(true);
      }, 1500);
    }
  } catch (err) {
    showAlert("error", err.response.data.message);
  }
};
