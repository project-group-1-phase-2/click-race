import axios from "axios";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Toastify from "toastify-js";

export default function Register() {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  async function handleRegister(e) {
    e.preventDefault();
    try {
      const body = { username };

      const { data } = await axios.post("http://localhost:3000/register", body);
      localStorage.setItem("username", data.username);

      Toastify({
        text: `Succedd Register`,
        duration: 3000,
        newWindow: true,
        close: true,
        gravity: "bottom", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: "#008000",
        },
        onClick: function () {}, // Callback after click
      }).showToast();
      navigate("/");
    } catch (error) {
      Toastify({
        text: error.response.data.message,
        duration: 3000,
        newWindow: true,
        close: true,
        gravity: "bottom", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: "#FF0000",
        },
        onClick: function () {}, // Callback after click
      }).showToast();
    }
  }

  return (
    <>
      <div className="relative flex flex-col justify-center w-screen min-h-screen overflow-hidden bg-base-200">
        <div className="w-full p-6 m-auto rounded-lg shadow-md lg:max-w-lg bg-base-100">
          <h1 className="text-3xl font-semibold text-center text-accent-focus">Log In</h1>

          <form className="space-y-4 mt-5" onSubmit={handleRegister}>
            <div>
              <label className="label justify-center">
                <span className="text-base label-text">Username</span>
              </label>
              <input type="text" placeholder="Enter username" className="w-full input input-bordered input-accent" required onChange={(e) => setUsername(e.target.value)} />
            </div>
            <div>
              <button type="submit" className="btn btn-accent w-full mt-5">
                Log In
              </button>
            </div>
            <div className="divider px-10 mt-10">OR</div>
            <Link to="/" className="btn btn-neutral mt-5 w-full">
              Use Counter
            </Link>
          </form>
        </div>
      </div>
    </>
  );
}
