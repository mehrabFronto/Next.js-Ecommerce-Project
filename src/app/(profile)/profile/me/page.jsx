"use client";

import ThreeDotsLoading from "@/common/ThreeDotsLoading";
import { useGetUser } from "@/hooks/useAuth";
import { includeObj } from "@/utils/objectUtils";
import { useEffect, useState } from "react";

function MePage() {
   const { data, isLoading } = useGetUser();

   const [formData, setFormData] = useState({});
   const { user } = data || {};

   const includesKey = ["name", "email", "phoneNumber", "biography"];

   useEffect(() => {
      if (user) setFormData(includeObj(user, includesKey));
   }, [user]);

   const submitHandler = async (e) => {};

   if (isLoading) return <ThreeDotsLoading />;

   return (
      <div className="container max-w-sm mt-20">
         <h1 className="text-2xl font-bold mb-4">اطلاعات کاربری</h1>
         <form
            onSubmit={submitHandler}
            className=" flex flex-col-reverse space-y-5 w-full pr-4">
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
         </form>
      </div>
   );
}
export default MePage;
