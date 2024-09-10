import { useState } from "react";
import { Link } from "react-router-dom";

export default function HomePage({ socket }) {
  const [count, setCount] = useState(0);

  function handleAdd() {
    setCount(count + 1);
  }

  function handleMin() {
    setCount(count - 1);
  }

  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center min-h-screen">
      <h1 className="text-3xl font-semibold text-center text-accent-focus">Realtime Counter</h1>
      <div className="divider px-10 mb-10"></div>
      <button className="btn btn-accent" onClick={handleAdd}>
        Increase
      </button>
      <span className="my-4 text-4xl">{count}</span>
      <button className="btn btn-error" onClick={handleMin}>
        Decrease
      </button>
      <div className="divider px-10 mt-10">OR</div>
      <Link to="/login" className="btn btn-neutral mt-5 w-1/5">
        Login
      </Link>
    </div>
  );
}
