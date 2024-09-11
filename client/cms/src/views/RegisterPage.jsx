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
      // console.log("OKKKK");
      const { data } = await axios.post("http://localhost:3000/register", body);
      console.log(data);
      localStorage.setItem("username", data.user.username);
      localStorage.setItem("access_token", data.access_token);

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
      console.log(error);
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
      <div className="flex flex-wrap justify-center ">
        <div className="bg-white bg-opacity-50 shadow-lg rounded-lg p-8 max-w-md absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <form onSubmit={handleRegister} className="flex flex-col items-center justify-center space-y-4">
            <div className="mb-4">
              <label htmlFor="username" className="block text-sm font-medium text-gray-700 text-center">
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="input username"
                onChange={(e)=> setUsername(e.target.value)}
              />
            </div>
            <button type="submit" id="button" className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              Daftar
            </button>
          </form>
        </div>
        <img src="https://static.vecteezy.com/system/resources/thumbnails/022/606/654/small_2x/speeding-through-the-race-track-generative-ai-photo.jpg" className="w-full h-full" alt="" />
      </div>
    </>
  );
}
