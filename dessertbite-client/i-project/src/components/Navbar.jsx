import { Link, useNavigate } from "react-router-dom";

export default function Nav() {
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.clear();
    navigate("/login");
  }

  return (
    <>
      <nav className="bg-[#E1ACAC] shadow p-4 flex justify-between items-center">
        <Link to="/home" className="text-xl font-bold text-white">
          Hi dessert lovers!
        </Link>
        <div className="flex items-center space-x-4">
          <Link
            to="/myCollection"
            className="text-white hover:text-black flex items-center"
          >
            <svg
              className="w-6 h-6 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 7v10c0 1.104.897 2 2 2h14c1.104 0 2-.896 2-2V7c0-1.104-.896-2-2-2H5c-1.103 0-2 .896-2 2z"
              ></path>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 7V5c0-1.104.897-2 2-2h14c1.104 0 2 .896 2 2v2"
              ></path>
            </svg>
            My Collection
          </Link>
          <Link
            to="/recommandation"
            className="text-white hover:text-black flex items-center"
          >
            <svg
              className="w-6 h-6 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 7v10c0 1.104.897 2 2 2h14c1.104 0 2-.896 2-2V7c0-1.104-.896-2-2-2H5c-1.103 0-2 .896-2 2z"
              ></path>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 7V5c0-1.104.897-2 2-2h14c1.104 0 2 .896 2 2v2"
              ></path>
            </svg>
            Dessert Reccomendation
          </Link>
          <Link
            to="/nutrition"
            className="text-white hover:text-black flex items-center"
          >
            <svg
              className="w-6 h-6 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 7v10c0 1.104.897 2 2 2h14c1.104 0 2-.896 2-2V7c0-1.104-.896-2-2-2H5c-1.103 0-2 .896-2 2z"
              ></path>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 7V5c0-1.104.897-2 2-2h14c1.104 0 2 .896 2 2v2"
              ></path>
            </svg>
            Dessert Info
          </Link>
          <a
            onClick={handleLogout}
            className="px-4 py-2 text-white cursor-pointer"
          >
            <span className="text-white hover:text-black">Log Out</span>
          </a>
        </div>
      </nav>
    </>
  );
}
