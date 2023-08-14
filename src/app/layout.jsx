import vazirFont from "@/constants/localFonts";
import { Toaster } from "react-hot-toast";
import Header from "./Header";
import Providers from "./Providers";
import "./globals.css";

export const metadata = {
   title: "Next Shop Panel",
   description: "Next Shop Panel desc...",
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
               <main className="container xl:max-w-screen-xl min-h-screen pt-6 lg:pt-8 pb-8 px-2">
                  {children}
               </main>
            </Providers>
         </body>
      </html>
   );
};

export default Layout;
