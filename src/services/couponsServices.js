import http from "./httpService";

export function getAllCoupons() {
   return http.get("/admin/coupon/list").then(({ data }) => data.data);
}

export function addCoupon(data) {
   return http.post("/admin/coupon/add", data).then(({ data }) => data.data);
}
