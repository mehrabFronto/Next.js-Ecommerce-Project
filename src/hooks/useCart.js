import { addToCart } from "@/services/cartServices";
import { useMutation } from "@tanstack/react-query";

const useAddToCart = () => {
   return useMutation({
      mutationFn: addToCart,
   });
};

export default useAddToCart;
