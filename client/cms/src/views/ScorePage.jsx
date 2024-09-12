import { useContext } from "react";
import { themeMode } from "../context/ThemeMode";

export default function ScorePage() {
  const { currentTheme, theme } = useContext(themeMode);

  return (
    <>


<div className="h-screen w-screen" data-theme={theme[currentTheme]?.dataTheme}>
      <div
        className="overflow-x-auto flex flex-wrap justify-center mx-4 my-4 "
      >
        <table className="table-auto w-3/4 text-center border-2">
          {/* head */}
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="px-4 py-2">No</th>
              <th className="px-4 py-2">Nama</th>
              <th className="px-4 py-2">Score</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            <tr className="bg-gray-200 hover:bg-gray-300">
              <th className="px-4 py-2">1</th>
              <td className="px-4 py-2">Cy Ganderton</td>
              <td className="px-4 py-2">Spesialis Kontrol Kualitas</td>
            </tr>
            {/* row 2 */}
            <tr className="hover:bg-gray-300">
              <th className="px-4 py-2">2</th>
              <td className="px-4 py-2">Hart Hagerty</td>
              <td className="px-4 py-2">Teknisi Dukungan Desktop</td>
            </tr>
            {/* row 3 */}
            <tr className="hover:bg-gray-300">
              <th className="px-4 py-2">3</th>
              <td className="px-4 py-2">Brice Swyre</td>
              <td className="px-4 py-2">Akuntan Pajak</td>
            </tr>
          </tbody>
        </table>
      </div>
      </div>
    </>
  );
}
