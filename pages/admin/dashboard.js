import { Fragment, useEffect, useState } from "react";
import { Menu, Transition } from "@headlessui/react";
import {
  AdjustmentsHorizontalIcon,
  SparklesIcon,
  BookOpenIcon,
  TagIcon,
} from "@heroicons/react/24/outline";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import axios from "axios";
import { useRouter } from "next/router";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
export default function Home() {
  const [polls, setPolls] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [options, setOptions] = useState([]);
  const [voteData, setVoteData] = useState([]);

  const router = useRouter();

  useEffect(() => {
    axios.get(`http://localhost:3000/api/polls`).then((res) => {
      setPolls(res.data);
      initContent(res.data, 0);
    });
  }, []);

  const initContent = (allPoll, index) => {
    let selectedPoll = allPoll[index];
    if (allPoll.length < 1) return;
    axios
      .post(`http://localhost:3000/api/polls/vote`, { id: selectedPoll.id })
      .then((res) => {
        setVoteData(res.data);
      });
    setTitle(selectedPoll?.title);
    setDescription(selectedPoll?.description);
    setOptions(selectedPoll?.poll_options.split(","));
  };

  const pollHandler = (index) => {
    setActiveIndex(index);
    initContent(polls, index);
  };

  const handleEdit = () => {
    router.push(`/admin/editpoll/${polls[activeIndex].id}`);
  };

  const colors = [
    "#E01E84",
    "#9C46D0",
    "#007ED6",
    "#7CDDDD",
    "#26D7AE",
    "#2DCB75",
    "#1BAA2F",
    "#52D726",
    "#FCE900",
    "#FF7300",
    "#FF0000",
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active) {
      return (
        <div className="custom-tooltip">
          <p className="label">{`${payload[0].name} : ${payload[0].value}`}</p>
        </div>
      );
    }
    return null;
  };

  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
  }) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  const deleteHandler = () => {
    confirm(
      "Do you want to remove this poll permanently?\nVote data can be remove."
    ) &&
      axios
        .delete(`http://localhost:3000/api/polls/${polls[activeIndex].id}`, {
          poll: polls[activeIndex],
        })
        .then((res) => {
          console.log(res.data);
        });
  };

  return (
    <div className="mt-4 p-10 h-[100vh-100px]">
      <div className="px-4 grid grid-cols-4 gap-4">
        <div className="col-start-1 col-span-1 h-full max-h-[600px]  shadow-md p-3">
          <h2 className="text-2xl my-3">Polls</h2>
          <div className="max-h-[calc(100%-70px)] overflow-hidden overflow-y-auto ">
            <div className="w-full bg-white rounded-lg shadow ">
              <ul className="divide-y-2 divide-gray-100 cursor-pointer ">
                {polls.length > 0 &&
                  polls.map((item, index) => {
                    return (
                      <li
                        key={index}
                        className={classNames(
                          "p-3 hover:bg-slate-400 rounded-md",
                          index === activeIndex ? "active" : ""
                        )}
                        onClick={() => pollHandler(index)}
                      >
                        {item.title}
                      </li>
                    );
                  })}
              </ul>
            </div>
          </div>
        </div>
        <div className="col-end-5 col-span-3 h-full">
          <div className="grid grid-cols-2 gap-3 rounded overflow-hidden shadow-lg p-4">
            <div className=" md:ml-4">
              <div className="text-2xl flex items-center ">
                <SparklesIcon
                  width={20}
                  height={20}
                  className="text-red-600 mr-2"
                />{" "}
                <span>Title</span>
              </div>
              <p className="ml-5 text my-2">{title}</p>
              <div className="text-2xl flex items-center  mt-5">
                <BookOpenIcon
                  width={20}
                  height={20}
                  className="text-red-600 mr-2"
                />{" "}
                <span>Description</span>
              </div>
              <p className="ml-5  my-2">{description}</p>
              <p className="text-2xl mt-5">Options</p>
              <div>
                {options.length > 0 &&
                  options.map((option, index) => {
                    return (
                      <div className="relative group my-3" key={index}>
                        <div className="absolute -inset-[0.3px] bg-gradient-to-r from-gray-600 to-gray-900 rounded-lg blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
                        <div className="relative px-8 py-4 bg-white ring-1 ring-gray-900/5 rounded-lg leading-none flex items-top justify-start space-x-6">
                          <div className="items-center flex ">
                            <TagIcon width={30} height={30} />
                            <p className="text-slate-800 text-md ml-3">
                              {option}
                            </p>
                            {/* <a
                      href="https://braydoncoyer.dev/blog/tailwind-gradients-how-to-make-a-glowing-gradient-background"
                      className="block text-indigo-400 group-hover:text-slate-800 transition duration-200"
                      target="_blank"
                    >
                      Read Article →
                    </a> */}
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
            <div>
              <div className="flex justify-end">
                <Menu as="div" className="relative ml-3">
                  <div>
                    <Menu.Button className="relative flex rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                      <span className="absolute -inset-1.5" />
                      <span className="sr-only">Open user menu</span>
                      <AdjustmentsHorizontalIcon
                        className="h-6 w-6"
                        aria-hidden="true"
                      />
                    </Menu.Button>
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
                            onClick={handleEdit}
                            className={classNames(
                              active ? "bg-gray-100" : "",
                              "block px-4 py-2 text-sm text-gray-700"
                            )}
                          >
                            Edit
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
                            onClick={deleteHandler}
                          >
                            Delete
                          </a>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
              <div className="flex justify-center">
                <div className="w-[350px] h-[350px] mt-10">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart width={730} height={250}>
                      <Pie
                        data={voteData}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        fill="#8884d8"
                      >
                        {voteData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={colors[index]} />
                        ))}
                      </Pie>
                      <Tooltip content={<CustomTooltip />} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
