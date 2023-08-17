import http from "./httpService";

export function getAllProducts() {
   return http
      .get("/product/list")
      .then(({ data }) => data.data)
      .catch((err) => err);
}
