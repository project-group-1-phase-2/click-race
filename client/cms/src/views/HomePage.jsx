import { useState } from "react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { themeMode } from "../context/ThemeMode";
import dinoA from "../assets/DinoSprites_tard.gif"
import dinoB from "../assets/DinoSprites_vita.gif"
export default function HomePage() {
  const [countPlayer1, setCountPlayer1] = useState(0);
  const [countPlayer2, setCountPlayer2] = useState(0);

  const { currentTheme, theme } = useContext(themeMode);
  function handleAddPlayer1() {
    setCountPlayer1(countPlayer1 + 1);
  }

  function handleAddPlayer2() {
    setCountPlayer2(countPlayer2 + 1);
  }

  

  return (
    <div className="text-center" data-theme={theme[currentTheme].dataTheme}>
      <h1 className="text-4xl font-bold mb-4">CLICKY Dino</h1>
      <p className="mb-4">🛈 Click on your enemy's button to reduce his/her score by 1 point!</p>
      {/* Scores and Player Names */}
      <div className="grid grid-cols-2 gap-10 mb-4">
        {/* Player 1 */}
        <div>
          <p className="text-6xl font-bold">{countPlayer1}</p>
          <p className="text-2xl text-green-700 font-bold">Superman</p>
        </div>
        {/* Player 2 */}
        <div>
          <p className="text-6xl font-bold">{countPlayer2}</p>
          <p className="text-2xl text-green-700 font-bold">Batman</p>
        </div>
      </div>
      {/* Timer */}
      <div className="text-4xl mb-4">3</div>
      {/* Characters and Buttons */}
      <div className="flex items-center justify-center space-x-8 mb-4">
        {/* Character 1 */}
        <div className="flex flex-col items-center">
          <img src={dinoA} alt="Superman Dino" className="w-24 h-24 mb-4" />
          <button onClick={handleAddPlayer1} className="bg-red-500 rounded-full w-20 h-20" />
        </div>
        {/* Character 2 */}
        <div className="flex flex-col items-center">
          <img src={dinoB} alt="Batman Dino" className="w-24 h-24 mb-4" />
          <button onClick={handleAddPlayer2} className="bg-red-500 rounded-full w-20 h-20" />
        </div>
      </div>
      {/* Room ID and Player Selection */}
      <div className="mb-4">
        <label htmlFor="room-id" className="block mb-2">
          Room ID:
        </label>
        <input id="room-id" type="text" placeholder="Enter Room ID" className="border-2 border-black p-2" />
      </div>
      {/* Player Status */}
      <div className="flex justify-center space-x-4">
        {/* Player 1 */}
        <div className="flex items-center space-x-2">
          <input type="radio" id="superman" name="player" className="w-4 h-4" />
          <label htmlFor="superman" className="text-lg">
            Superman(Player 1)
          </label>
        </div>
        {/* Player 2 */}
        <div className="flex items-center space-x-2">
          <input type="radio" id="batman" name="player" className="w-4 h-4" />
          <label htmlFor="batman" className="text-lg">
            Batman(Player 2)
          </label>
        </div>
      </div>
    </div>
  );
}
