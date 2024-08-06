import { UserProfile, UserProfileToken } from "@/models/User";
import axios from "axios";

// Replace with your backend's login endpoint
const api = "http://192.168.1.102:8080/api/v1";

export const loginApi = async (email: string, password: string) => {
  try {
    const data = axios
      .post<UserProfile>(api + "/auth/login", {
        email: email,
        password: password,
      })
      .then(function (response) {
        console.log(response);
        // return response;
      });
  } catch (error) {
    console.log(error);
  }
};

// import axios from "axios";

// const api = "http://localhost:8080/api/v1";

// export const loginApi = async (email: string, password: string) => {
//   console.log(api, email, password);

//   const res = await axios.post(api + "/auth/login", {
//     email: email,
//     password: password,
//   });

//   console.log(res);
//   // axios({
//   //   method: "post",
//   //   url: api + "/auth/login",
//   //   data: {
//   //     email: email,
//   //     password: password,
//   //   },
//   // }).then(function (response) {
//   //   return response.data;
//   // });
//   // axios
//   //   .post(api + "/auth/login", {
//   //     email: email,
//   //     password: password,
//   //   })
//   //   .then(function (response) {
//   //     console.log(response);
//   //   });
//   // try {
//   //   const data = axios
//   //     .post(api + "/auth/login", {
//   //       email: email,
//   //       password: password,
//   //     })
//   //     .then(function (response) {
//   //       console.log(response);
//   //     });

//   //   // console.log(data);
//   //   // return data;
//   // } catch (error) {
//   //   console.log(error);
//   // }
// };

// export default api;
