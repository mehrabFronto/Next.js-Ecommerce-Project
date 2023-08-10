import vazirFont from "@/constants/localFonts";
import Header from "./Header";
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
            <Header />
            <main className="container mx-auto xl:max-w-screen-xl min-h-screen pt-6 lg:pt-8 pb-8 px-2">
               {children}
            </main>
         </body>
      </html>
   );
};

export default Layout;
