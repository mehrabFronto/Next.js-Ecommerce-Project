"use client";

import ThreeDotsLoading from "@/common/ThreeDotsLoading";
import { checkOtp, getOtp } from "@/services/authService";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import CheckOtpForm from "./CheckOtpForm";
import SendOtpForm from "./SendOtpForm";

const RESEND_TIME = 90;

const AuthPage = () => {
   const [time, setTime] = useState(RESEND_TIME);
   const [phoneNumber, setPhoneNumber] = useState("");
   const [step, setStep] = useState(1);

   const {
      data,
      error,
      isLoading: isSending,
      mutateAsync: mutateGetOtp,
   } = useMutation({
      mutationFn: getOtp,
   });

   const { isLoading: isChecking, mutateAsync: mutateCheckOtp } = useMutation({
      mutationFn: checkOtp,
   });

   const renderSendOtpForm = () => {
      if (isSending) return <ThreeDotsLoading />;

      return (
         <SendOtpForm
            mutateGetOtp={mutateGetOtp}
            setStep={setStep}
            setPhoneNumber={setPhoneNumber}
            setTime={setTime}
            RESEND_TIME={RESEND_TIME}
         />
      );
   };

   const renderCheckOtpForm = () => {
      if (isChecking) return <ThreeDotsLoading />;

      return (
         <CheckOtpForm
            phoneNumber={phoneNumber}
            mutateCheckOtp={mutateCheckOtp}
            onBack={() => setStep((s) => s - 1)}
            time={time}
            onResend={resendHandler}
         />
      );
   };

   const resendHandler = async (setOtp) => {
      try {
         const { data } = await mutateGetOtp(phoneNumber);
         toast.success(data.message);
         setStep(2);
         setPhoneNumber(phoneNumber);
         setTime(RESEND_TIME);
         setOtp("");
      } catch (error) {
         toast.error(error?.response?.data?.message || error.message);
      }
   };

   useEffect(() => {
      const timer = time > 0 && setInterval(() => setTime((t) => t - 1), 1000);
      return () => {
         if (timer) clearInterval(timer);
      };
   }, [time]);

   return (
      <div className="container max-w-[500px] px-2 mt-20">
         {step === 1 ? renderSendOtpForm() : renderCheckOtpForm()}
      </div>
   );
};

export default AuthPage;
