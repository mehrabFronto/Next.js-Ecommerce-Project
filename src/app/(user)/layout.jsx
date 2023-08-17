import vazirFont from "@/constants/localFonts";
import { Toaster } from "react-hot-toast";
import Header from "../Header";
import Providers from "../Providers";
import "../globals.css";

export const metadata = {
   title: "نکست شاپ",
   description: "نکست شاپ",
};

const Layout = ({ children }) => {
   return (
      <html
         lang="fa"
         dir="rtl">
         <body className={`${vazirFont.variable} font-sans`}>
            <Providers>
               <Toaster />
               <Header />
               <main className="container min-h-screen pt-6 lg:pt-8 pb-8 px-2 md:px-0">
                  {children}
               </main>
            </Providers>
         </body>
      </html>
   );
};

export default Layout;
