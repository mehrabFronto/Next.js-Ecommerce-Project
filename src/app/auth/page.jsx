"use client";

import { getOtp } from "@/services/authService";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { ThreeDots } from "react-loader-spinner";
import SendOtpForm from "./SendOtpForm";

const AuthPage = () => {
   const [phoneNumber, setPhoneNumber] = useState("");

   const [step, setStep] = useState(1);

   const {
      data,
      error,
      isLoading,
      mutateAsync: mutateGetOtp,
   } = useMutation({
      mutationFn: getOtp,
   });

   return (
      <div className="container max-w-[500px] px-2 mt-20">
         {isLoading ? (
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
         ) : step === 1 ? (
            <SendOtpForm
               mutateGetOtp={mutateGetOtp}
               setStep={setStep}
               setPhoneNumber={setPhoneNumber}
            />
         ) : (
            <div>step 2</div>
         )}
      </div>
   );
};

export default AuthPage;
