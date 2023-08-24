import vazirFont from "@/constants/localFonts";
import { Toaster } from "react-hot-toast";
import Providers from "../../Providers";
import "../../globals.css";
import MobileHeader from "./MobileHeader";
import SideBar from "./SideBar";

export const metadata = {
   title: "پنل ادمین",
   description: "پنل ادمین",
};

const Layout = ({ children }) => {
   return (
      <html
         lang="fa"
         dir="rtl">
         <body className={`${vazirFont.variable} font-sans`}>
            <Providers>
               <Toaster />
               {/* mobile header */}
               <header
                  className="w-full text-xl sticky top-0 z-50 bg-primary-600 text-secondary-100 
                  shadow-lg md:hidden mb-8">
                  <MobileHeader />
               </header>
               <main className="w-full min-h-screen grid grid-cols-5  bg-white">
                  {/* side bar */}
                  <div className="hidden md:block col-span-2 xl:col-span-1 bg-gray-100 overflow-y-auto">
                     <SideBar />
                  </div>
                  {/* page content */}
                  <div className="col-span-5 md:col-span-3 xl:col-span-4 overflow-y-auto p-2 md:p-4">
                     {children}
                  </div>
               </main>
            </Providers>
         </body>
      </html>
   );
};

export default Layout;
