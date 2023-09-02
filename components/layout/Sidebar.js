import React from "react";
import classNames from "classnames";
import {
  UserGroupIcon,
  PlusIcon,
  EllipsisHorizontalIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";

const Sidebar = ({ open, setOpen }) => {
  return (
    <div
      className={classNames({
        "flex flex-col justify-between items-center": true, // layout
        "h-[calc(100vh_-_64px)]  w-[80px]": true, // for height and width
      })}
    >
      <nav className="md:sticky top-0 md:top-16">
        {/* nav items */}
        <ul className="py-6  flex flex-col gap-2">
          <li className="my-1">
            <Link href="/admin/dashboard" passHref>
              <UserGroupIcon className="w-[60px] h-[60px] flex justify-center items-center border p-3 shadow rounded-md cursor-pointer" />
            </Link>
          </li>
          <li className="my-1">
            <Link href="/admin/addpoll" passHref>
              <PlusIcon className="w-[60px] h-[60px] flex justify-center items-center border p-3 shadow rounded-md cursor-pointer" />
            </Link>
          </li>
          <li className="my-1">
            <EllipsisHorizontalIcon className="w-[60px] h-[60px] flex justify-center items-center border p-3 shadow rounded-md cursor-pointer" />
          </li>
          <li className="my-1">
            <EllipsisHorizontalIcon className="w-[60px] h-[60px] flex justify-center items-center border p-3 shadow rounded-md cursor-pointer" />
          </li>
        </ul>
      </nav>
    </div>
  );
};
export default Sidebar;
