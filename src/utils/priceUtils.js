export function priceUtils(price) {
   const priceArr = price.toString().split("");
   for (let i = priceArr.length - 3; i >= 1; i = i - 3) {
      priceArr.splice(i, undefined, ",");
   }
   return priceArr.join("");
}
