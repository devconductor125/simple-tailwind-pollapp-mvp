import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";

export default function AddPoll() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [validTitle, setValidTitle] = useState(true);
  const [validDesc, setValidDesc] = useState(true);
  const [validOptions, setValidOptions] = useState(true);
  const [chipData, setChipData] = useState([]);
  const [tempChip, setTempChip] = useState("");
  const [pollOrin, setPollOrin] = useState(null);

  const chipHandler = (event) => {
    setTempChip(event.target.value);
  };

  const removeChip = (index) => {
    const temp = [...chipData];
    temp.splice(index, 1);
    setChipData(temp);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.target.value != "" &&
        !chipData.includes(e.target.value) &&
        setChipData([...chipData, e.target.value]);
      setTempChip("");
    }
  };

  const savePoll = () => {
    console.log(router.query.id);
    if (!title || title.length < 6) {
      setValidTitle(false);
      return;
    } else setValidTitle(true);
    if (!description || description.length < 10) {
      setValidDesc(false);
      return;
    } else setValidDesc(true);
    if (chipData.length < 2) {
      setValidOptions(false);
      return;
    } else setValidOptions(true);

    axios
      .post("http://localhost:3000/api/polls/edit", {
        chipData,
        title,
        description,
        pollId: router.query.id,
      })
      .then((response) => {
        console.log(response);
      });
  };

  useEffect(() => {
    if (router.query.id) {
      axios
        .get(`http://localhost:3000/api/polls/${router.query.id}`)
        .then((res) => {
          const poll = res.data[0][0];
          setPollOrin(poll);
          setTitle(poll?.title);
          setDescription(poll?.description);
          setChipData(poll?.poll_options?.split(","));
        });
    }
  }, [router]);

  return (
    <div className="p-4 h-full">
      <div className="h-full flex justify-center items-center">
        <div className="w-full  md:max-w-[900px] px-8">
          <div className="mb-5">
            <label
              htmlFor="name"
              className="block mb-2 font-bold text-gray-600"
            >
              Title
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
              placeholder="Put Title of new poll"
              className="border border-gray-300 shadow p-3 w-full rounded mb-2"
            />
            {validTitle || (
              <p className="text-red-600">Input title at least 6 characters</p>
            )}
          </div>

          <div className="mb-5">
            <label
              htmlFor="description"
              className="block mb-2 font-bold text-gray-600"
            >
              Description
            </label>
            <textarea
              rows={3}
              type="text"
              id="description"
              name="description"
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
              }}
              placeholder="Put in description"
              className="border border-red-300 shadow p-3 w-full rounded mb-"
            />
            {validDesc || (
              <p className="text-sm text-red-600 mt-2">
                Put description at least 10 characters
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor="chip_maker"
              className="block mb-2 font-bold text-gray-600"
            >
              Add poll option
            </label>
            <input
              type="text"
              id="chip_maker"
              value={tempChip}
              placeholder="Type something"
              className="border border-gray-300 shadow p-3 w-full rounded mb-2"
              onChange={chipHandler}
              onKeyDown={handleKeyDown}
            />
            {validOptions || (
              <p className="text-red-600">You must add options at least 2</p>
            )}
          </div>

          <div className="flex my-3 w-full flex-wrap">
            {chipData?.length > 0 &&
              chipData.map((chip, index) => (
                <div
                  key={index}
                  className="bg-blue-500 text-white rounded-full w-fit py-1 px-3 flex items-center my-1 mx-1"
                >
                  <span>{chip}</span>
                  <button
                    className="ml-2 bg-red-500 rounded-full h-5 w-5 flex items-center justify-center hover:bg-emerald"
                    onClick={() => removeChip(index)}
                  >
                    <svg
                      className="h-3 w-3 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fillrole="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </button>
                </div>
              ))}
          </div>
          <button
            className="block w-full bg-blue-500 text-white font-bold p-4 rounded-lg"
            onClick={savePoll}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
