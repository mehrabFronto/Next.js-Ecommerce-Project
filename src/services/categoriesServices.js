import http from "./httpService";

export function getAllCategories() {
   return http.get("/category/list").then(({ data }) => data.data);
}

export function addCategory(data) {
   return http.post("/admin/category/add", data).then(({ data }) => data.data);
}
