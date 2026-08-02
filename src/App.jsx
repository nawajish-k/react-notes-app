import React from "react";
import { useState } from "react";

const App = () => {
  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");
  const [tasks, setTasks] = useState([]);

  const submitHandler = (e) => {
    e.preventDefault();

    if (title.trim() === "" || details.trim() === "") {
      return;
    }

    const copyTasks = [...tasks];
    copyTasks.push({ title, details });
    setTasks(copyTasks);

    setTitle("");
    setDetails("");
  };

  const deleteNote = (idx) => {
    const copyTasks = [...tasks];

    copyTasks.splice(idx, 1);
    setTasks(copyTasks);
  };

  return (
    <div className="min-h-screen bg-[#f7f7f5] text-black">
      <div className="max-w-7xl mx-auto">
      <h1 className="text-5xl font-bold mb-10">Notes</h1>
      <div className="grid lg:grid-cols-[320px_1fr] gap-8">
        <form
          onSubmit={(e) => {
            submitHandler(e);
          }}
          className="flex flex-col items-start gap-4 p-8 bg-white border border-gray-200 rounded-2xl shadow-sm"
        >
          <h2 className="text-2xl font-semibold">Add notes:</h2>

          <input
            type="text"
            placeholder="Heading"
            className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-300 focus:ring-2 focus:ring-blue-100"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            />

          <textarea
            name=""
            id=""
            type="text"
            placeholder="Write details-"
            rows={6}
            className="w-full resize-none rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-300 focus:ring-2 focus:ring-blue-100"
            value={details}
            onChange={(e) => {
              setDetails(e.target.value);
            }}
          />

          <button className="w-full active:scale-95 bg-black text-white hover:bg-gray-800 font-medium px-5 py-2 rounded outline-none">
            Add Note
          </button>
        </form>
        <div className="p-8">
          <h2 className="text-2xl font-semibold">Recent notes:</h2>
          <div className="flex flex-wrap items-start justify-start gap-5 mt-5 overflow-auto h-full">
            {tasks.map(function (elem, idx) {
              return (
                <div
                key={idx}
                  className="flex justify-between flex-col items-start relative min-h-52 w-40  rounded-2xl p-4 text-black bg-white"
                >
                  <div>
                    <h3 className="leading-tight text-xl font-bold">
                      {elem.title}
                    </h3>
                    <p className="mt-4 leading-tight font-medium wrap-break-word whitespace-pre-wrap">
                      {elem.details}
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      deleteNote(idx);
                    }}
                    className="w-full cursor-pointer active:scale-95 bg-red-500 py-1 text-xs rounded font-bold text-white"
                  >
                    Delete
                  </button>
                </div>
              );
            })}
          </div>
        </div>
              </div>
      </div>
    </div>
  );
};

export default App;
