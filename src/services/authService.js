import http from "./httpService";

export function getOtp(phoneNumber) {
   return http
      .post("/user/get-otp", { phoneNumber })
      .then(({ data }) => data.data);
}
