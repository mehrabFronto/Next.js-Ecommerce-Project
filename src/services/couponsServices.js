import http from "./httpService";

export function getAllCoupons() {
   return http.get("/admin/coupon/list").then(({ data }) => data.data);
}
