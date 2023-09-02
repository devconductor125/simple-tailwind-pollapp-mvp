import { Fragment, useEffect, useState } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { useRouter } from "next/router";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Example() {
  const router = useRouter();
  const [userBalance, setBalance] = useState(0);
  const [username, setUserName] = useState("");
  const handleLogout = () => {
    localStorage.removeItem("user_info");
    router.push("/");
  };
  useEffect(() => {
    let userInfo = JSON.parse(localStorage.getItem("user_info"));
    console.log(userInfo);
    setBalance(userInfo.balance);
    setUserName(userInfo.name);
  }, []);

  return (
    <Disclosure as="nav" className="bg-gray-800 grid-rows-header ">
      {({ open }) => (
        <>
          <div className="mx-auto px-6">
            <div className="relative flex h-16 items-center justify-between">
              <div className="flex flex-1 ">
                <div className="flex flex-shrink-0 items-center">
                  <Image
                    className=""
                    src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                    alt="Your Company"
                    width={40}
                    height={40}
                  />
                </div>
                <div className="ml-6 block">
                  <div className="flex space-x-4">
                    <form className="w-[300px]">
                      <label className="hidden" htmlFor="search-form">
                        Search
                      </label>
                      <input
                        id="search-form"
                        className="bg-grey-lightest border-2 focus:border-orange p-2 rounded-lg shadow-inner w-full"
                        placeholder="Search"
                        type="text"
                      />
                      <button className="hidden">Submit</button>
                    </form>
                  </div>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center sm:static sm:inset-auto ml-6 pr-0">
                <button
                  type="button"
                  className="relative rounded-full bg-gray-800 mr-3 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                >
                  <span className="absolute -inset-1.5" />
                  <span className="sr-only">View notifications</span>
                  <BellIcon className="h-6 w-6" aria-hidden="true" />
                </button>

                <div className="text-white text-lg font-bold px-4 border py-1 rounded">
                  $ {userBalance}
                </div>

                {/* Profile dropdown */}
                <Menu as="div" className="relative ml-3">
                  <div className="flex items-center">
                    <Menu.Button className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                      <span className="absolute -inset-1.5" />
                      <span className="sr-only">Open user menu</span>
                      <Image
                        className="h-8 w-8 rounded-full"
                        src="/avatar.jpg"
                        alt=""
                        width={40}
                        height={40}
                      />
                    </Menu.Button>
                    <span className="text-white ml-2">{username}</span>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(
                              active ? "bg-gray-100" : "",
                              "block px-4 py-2 text-sm text-gray-700"
                            )}
                          >
                            Profile
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(
                              active ? "bg-gray-100" : "",
                              "block px-4 py-2 text-sm text-gray-700"
                            )}
                          >
                            Payments
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            onClick={handleLogout}
                            className={classNames(
                              active ? "bg-gray-100" : "",
                              "block px-4 py-2 text-sm text-gray-700"
                            )}
                          >
                            Sign out
                          </a>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>
        </>
      )}
    </Disclosure>
  );
}
