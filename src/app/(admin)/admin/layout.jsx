import vazirFont from "@/constants/localFonts";
import { Toaster } from "react-hot-toast";
import Providers from "../../Providers";
import "../../globals.css";

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
               <main className="container xl:max-w-screen-xl min-h-screen pt-6 lg:pt-8 pb-8 px-2">
                  {children}
               </main>
            </Providers>
         </body>
      </html>
   );
};

export default Layout;
