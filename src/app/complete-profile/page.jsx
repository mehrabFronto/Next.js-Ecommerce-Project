"use client";
import ThreeDotsLoading from "@/common/ThreeDotsLoading";
import { completeProfileService } from "@/services/authService";
import { useMutation } from "@tanstack/react-query";
import Form from "./Form";

const CompleteProfilePage = () => {
   const { data, error, isLoading, mutateAsync } = useMutation({
      mutationFn: completeProfileService,
   });

   return (
      <div className="container mx-auto max-w-[500px] px-2 mt-6">
         {isLoading ? <ThreeDotsLoading /> : <Form mutateAsync={mutateAsync} />}
      </div>
   );
};

export default CompleteProfilePage;
