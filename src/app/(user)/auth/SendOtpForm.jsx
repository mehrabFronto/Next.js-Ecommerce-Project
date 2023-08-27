import FormikTextField from "@/common/FormikTextField";
import { toPersianDigits } from "@/utils/toPersianDigits";
import { useFormik } from "formik";
import toast from "react-hot-toast";
import * as Yup from "yup";

const initialValues = {
   phoneNumber: "",
};

const validationSchema = Yup.object({
   phoneNumber: Yup.string()
      .matches(/^[0-9]{11}$/, "شماره تلفن نا معتبر است")
      .required("شماره تلفن اجباری است"),
});

const SendOtpForm = ({
   mutateGetOtp,
   setStep,
   setPhoneNumber,
   setTime,
   RESEND_TIME,
}) => {
   const onSubmit = async ({ phoneNumber }) => {
      try {
         const { data } = await mutateGetOtp(phoneNumber);
         toast.success(data.message);
      } catch (error) {
         setStep(2);
         setPhoneNumber(phoneNumber);
         setTime(RESEND_TIME);
         toast.error(error?.response?.data?.message || error.message);
      }
   };

   const formik = useFormik({
      initialValues,
      onSubmit,
      validationSchema,
      validateOnMount: true,
   });

   return (
      <form
         className="w-full flex flex-col items-start gap-y-8 justify-center"
         onSubmit={formik.handleSubmit}>
         {/* Page title */}
         <h1 className="text-primary-600 text-3xl font-black">ورود</h1>
         {/* input */}
         <div className="flex flex-col gap-y-6 w-full pr-2">
            {/* email section */}
            <FormikTextField
               label="شماره تلفن خود را وارد کنید"
               name="phoneNumber"
               formik={formik}
               placeholder={`${toPersianDigits("0912xxxxxxx")}`}
            />
            {/* submit btn */}
            <button
               className="btn btn--primary mt-2 disabled:opacity-50 "
               type="submit"
               disabled={!formik.isValid}>
               ارسال کد
            </button>
         </div>
      </form>
   );
};

export default SendOtpForm;
