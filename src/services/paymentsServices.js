import http from "./httpService";

export function getAllPayments() {
   return http.get("/admin/payment/list").then(({ data }) => data.data);
}
