import vazirFont from "@/constants/localFonts";
import { Toaster } from "react-hot-toast";
import Providers from "../../Providers";
import "../../globals.css";
import SideBar from "./SideBar";

export const metadata = {
   title: "پنل کاربر",
   description: "پنل کاربر",
};

const Layout = ({ children }) => {
   return (
      <html
         lang="fa"
         dir="rtl">
         <body className={`${vazirFont.variable} font-sans`}>
            <Providers>
               <Toaster />
               <main className="min-h-screen grid grid-cols-4 bg-white">
                  <div className="col-span-1 bg-gray-100 overflow-y-auto">
                     <SideBar />
                  </div>
                  <div className="col-span-3 overflow-y-auto p-4">
                     {children}
                  </div>
               </main>
            </Providers>
         </body>
      </html>
   );
};

export default Layout;
