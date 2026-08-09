import React from "react";
import { useEffect } from "react";
import { useState } from "react";

const App = () => {
  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");
  const [tasks, setTasks] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [search, setSearch] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();

    if (title.trim() === "" || details.trim() === "") {
      return;
    }

    const copyTasks = [...tasks];
    if (editIndex === null) {
      copyTasks.push({
        title,
        details,
        date: new Date(),
      });
    } else {
      copyTasks[editIndex] = {
        title,
        details,
        date: copyTasks[editIndex].date,
      };
    }

    setTasks(copyTasks);
    setTitle("");
    setDetails("");
    setEditIndex(null);
  };

  const deleteNote = (idx) => {
    const copyTasks = [...tasks];

    copyTasks.splice(idx, 1);
    setTasks(copyTasks);
  };

  useEffect(() => {
    const data = localStorage.getItem("tasks");

    if (data) {
      setTasks(JSON.parse(data));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const filteredTasks = tasks.filter((note) => {
    return (
      note.title.toLowerCase().includes(search.toLowerCase()) ||
      note.details.toLowerCase().includes(search.toLowerCase())
    );
  });

  return (
    <div className="min-h-screen bg-[#f7f7f5] text-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-8 sm:mb-10">
          Notes
        </h1>
        <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-6 lg:gap-8">
          <form
            onSubmit={(e) => {
              submitHandler(e);
            }}
            className="flex flex-col items-start gap-4 p-5 sm:p-6 lg:p-8 bg-white border border-gray-200 rounded-2xl shadow-sm"
          >
            <h2 className="text-2xl font-semibold">
              {editIndex === null ? "Add note:" : "Edit note:"}
            </h2>

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

            <button
              type="submit"
              className="w-full active:scale-95 bg-black text-white hover:bg-gray-800 font-medium px-5 py-2 rounded outline-none"
            >
              {editIndex === null ? "Add Note" : "Save Changes"}
            </button>
          </form>
          <div className="p-0 sm:p-2 lg:p-8">
            <h2 className="text-2xl font-semibold">Recent notes:</h2>
            <input
              type="text"
              placeholder="Search notes..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
              }}
              className="mt-4 w-full rounded-lg border border-gray-300 bg-white px-4 py-3 outline-none focus:border-blue-300 focus:ring-2 focus:ring-blue-100"
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 mt-5">
              {tasks.length === 0 ? (
                <p className="text-gray-500">
                  No notes yet. Create your first note.
                </p>
              ) : filteredTasks.length === 0 ? (
                <p className="text-gray-500">No matching notes found.</p>
              ) : (
                filteredTasks.map(function (elem, idx) {
                  return (
                    <div
                      key={idx}
                      className={`flex justify-between flex-col items-start relative min-h-52 w-full rounded-2xl p-4 text-black border shadow-sm transition ${
                        editIndex === idx
                          ? "bg-blue-50 border-blue-400 shadow-md"
                          : "bg-white border-gray-200 hover:shadow-md"
                      }`}
                    >
                      <div>
                        {editIndex === idx && (
                          <p className="mb-2 text-xs font-bold text-blue-600">
                            EDITING
                          </p>
                        )}

                        <h3 className="leading-tight text-lg sm:text-xl font-bold wrap-break-word">
                          {elem.title}
                        </h3>
                        <p className="mt-4 leading-tight font-medium wrap-break-word whitespace-pre-wrap">
                          {elem.details}
                        </p>
                        <p className="mt-3 text-xs text-gray-500">
                          {new Date(elem.date).toLocaleDateString("en-GB", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          })}{" "}
                          •{" "}
                          {new Date(elem.date).toLocaleTimeString("en-US", {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </p>
                      </div>
                      <div className="flex w-full gap-4 items-center">
                        <button
                          type="button"
                          onClick={() => {
                            setTitle(elem.title);
                            setDetails(elem.details);
                            setEditIndex(idx);
                          }}
                          className="w-1/2 cursor-pointer active:scale-95 bg-black hover:bg-gray-800 py-2 text-xs rounded-lg font-bold text-white transition"
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            deleteNote(idx);
                          }}
                          className="w-1/2 cursor-pointer active:scale-95 bg-black hover:bg-gray-800 py-2 text-xs rounded-lg font-bold text-white transition"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
