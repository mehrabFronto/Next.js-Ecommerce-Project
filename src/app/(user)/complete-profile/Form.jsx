"use client";
import FormikTextField from "@/common/FormikTextField";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import * as Yup from "yup";

const initialValues = {
   name: "",
   email: "",
};

const validationSchema = Yup.object({
   name: Yup.string()
      .min(6, "نام باید شامل حداقل 6 کاراکتر باشد")
      .required("نام اجباری است"),
   email: Yup.string().email("ایمیل نامعتبر است").required("ایمیل اجباری است"),
});

const Form = ({ mutateAsync }) => {
   const router = useRouter();

   const onSubmit = async (values) => {
      try {
         const { message } = await mutateAsync(values);
         toast.success(message);
         router.push("/");
      } catch (error) {
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
         className="w-full flex flex-col items-start gap-y-8"
         onSubmit={formik.handleSubmit}>
         {/* Page title */}
         <h1 className="text-blue-600 text-3xl font-black">تکمیل اطلاعات</h1>
         {/* inputs */}
         <div className="flex flex-col gap-y-6 w-full pr-2">
            {/* name section */}
            <FormikTextField
               label="نام"
               name="name"
               formik={formik}
               placeholder="نام..."
            />
            {/* email section */}
            <FormikTextField
               label="ایمیل"
               name="email"
               formik={formik}
               placeholder="ایمیل..."
            />

            {/* submit btn */}
            <button
               className="w-full bg-blue-600 text-white py-3 rounded-lg mt-2 disabled:opacity-50 outline-none"
               type="submit"
               disabled={!formik.isValid}>
               ثبت اطلاعات
            </button>
         </div>
      </form>
   );
};

export default Form;
