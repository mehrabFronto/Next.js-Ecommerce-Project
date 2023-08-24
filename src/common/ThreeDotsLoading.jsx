import { ThreeDots } from "react-loader-spinner";

const ThreeDotsLoading = () => {
   return (
      <ThreeDots
         height="80"
         width="80"
         radius="9"
         color="#2563eb"
         ariaLabel="three-dots-loading"
         wrapperStyle={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
         }}
         wrapperClassName=""
         visible={true}
      />
   );
};

export default ThreeDotsLoading;
