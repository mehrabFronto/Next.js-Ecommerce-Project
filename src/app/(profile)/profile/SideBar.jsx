import Link from "next/link";

const SideBar = () => {
   return (
      <div>
         <ul className="flex flex-col gap-y-8">
            <li>
               <Link href="/">صفحه اصلی</Link>
            </li>
            <li>
               <Link href="/profile/me">اطلاعات کاربری</Link>
            </li>
         </ul>
      </div>
   );
};

export default SideBar;
