import http from "./httpService";

export function getAllProducts(query, cookies) {
   return http
      .get(`/product/list?${query}`, {
         headers: {
            Cookie: cookies,
         },
      })
      .then(({ data }) => data.data);
   // return fetch(
   //    `${process.env.NEXT_PUBLIC_BASE_API_URL}/product/list?${query}`,
   //    {
   //       method: "GET",
   //       cache: "no-store",
   //    },
   // )
   //    .then((res) => res.json())
   //    .then(({ data }) => data);
}

export function getOneProductBySlug(slug) {
   return http.get(`/product/slug/${slug}`).then(({ data }) => data.data);
}

export function getOneProductById(id) {
   return http.get(`/product/${id}`).then(({ data }) => data.data);
}

export function likeProduct(id) {
   return http.post(`/product/like/${id}`).then(({ data }) => data.data);
}

export function addProduct(data) {
   return http.post("/admin/product/add", data).then(({ data }) => data.data);
}
export function updateProduct({ id, data }) {
   return http
      .patch(`/admin/product/update/${id}`, data)
      .then(({ data }) => data.data);
}
