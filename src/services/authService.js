import http from "./httpService";

export function getOtp(phoneNumber) {
   return http
      .post("/user/get-otp", { phoneNumber })
      .then(({ data }) => data.data);
}

export function checkOtp(data) {
   return http.post("/user/check-otp", data).then(({ data }) => data.data);
}
