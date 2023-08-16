"use client";

import ThreeDotsLoading from "@/common/ThreeDotsLoading";
import { useGetUser } from "@/hooks/useAuth";
import { updateUserProfile } from "@/services/authService";
import { includeObj } from "@/utils/objectUtils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

function MePage() {
   const { data, isLoading } = useGetUser();

   const [formData, setFormData] = useState({});
   const { user } = data || {};

   const includesKey = ["biography", "phoneNumber", "email", "name"];

   const { isLoading: isUpdating, mutateAsync } = useMutation({
      mutationFn: updateUserProfile,
   });

   const queryClient = useQueryClient();

   useEffect(() => {
      if (user) setFormData(includeObj(user, includesKey));
   }, [user]);

   const submitHandler = async (e) => {
      e.preventDefault();
      try {
         const { message } = await mutateAsync(formData);
         toast.success(message);
         queryClient.invalidateQueries({ queryKey: ["get-user"] });
      } catch (error) {
         toast.error(error?.response?.data?.message || error.message);
      }
   };

   if (isLoading) return <ThreeDotsLoading />;

   return (
      <div className="container max-w-md mt-20 ">
         <h1 className="text-2xl font-bold mb-4">اطلاعات کاربری</h1>
         <form
            onSubmit={submitHandler}
            className=" flex flex-col w-full bg-primary-200 p-4 pb-8 rounded-xl shadow-xl">
            <div className="w-full flex flex-col-reverse gap-y-4 mb-8">
               {Object.keys(includeObj(user, includesKey)).map((key) => {
                  return (
                     // text field
                     <div
                        key={key}
                        className="flex flex-col w-full">
                        {/* label */}
                        <div
                           className={`w-full flex items-center justify-between ${
                              key === "biography" ? "mt-4" : "mt-0"
                           }
                        `}>
                           <label className="text-xl text-slate-800 font-semibold">
                              {key}
                           </label>
                        </div>
                        {/* input */}
                        <input
                           value={formData[key] || ""}
                           name={key}
                           type="text"
                           className="textField__input"
                           placeholder={`${key}...`}
                           onChange={(e) =>
                              setFormData({
                                 ...formData,
                                 [e.target.name]: e.target.value,
                              })
                           }
                        />
                     </div>
                  );
               })}
            </div>
            <button
               className="w-full bg-primary-600 text-secondary-100 py-3 rounded-lg mt-2 
                        disabled:opacity-50 outline-none"
               type="submit">
               {isUpdating ? <ThreeDotsLoading /> : "ثبت"}
            </button>
         </form>
      </div>
   );
}
export default MePage;
