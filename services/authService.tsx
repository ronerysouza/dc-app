import { UserProfile } from "@/models/User";
import axios from "axios";

const api = "http://localhost:8080/api/v1";

export const loginApi = async (email: string, password: string) => {
  try {
    const data = await axios.post<UserProfile>(api + "/auth/login", {
      email: email,
      password: password,
    });
    return data;
  } catch (error) {
    console.log(error);
  }
};

// export default api;
