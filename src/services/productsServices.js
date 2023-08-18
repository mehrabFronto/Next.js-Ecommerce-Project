import http from "./httpService";

export function getAllProducts(query) {
   return http.get(`/product/list?${query}`).then(({ data }) => data.data);
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
