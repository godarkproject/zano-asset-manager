import ZanoHub from "../../assets/ca_manager.svg";

import { Link } from "react-router-dom";

// go
import { DisconnectWallet } from "../../../wailsjs/go/main/App";

export const Navbar = () => {
  return (
    <div
      className="navbar bg-base-100 px-5 text-base-content sticky top-0 z-30 flex justify-center bg-opacity-90 backdrop-blur transition-shadow duration-100 [transform:translate3d(0,0,0)] 
    shadow-sm"
    >
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
        </div>
        <a className="">
          <img src={ZanoHub} width={65} alt="ZanoHub logo" />
        </a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="grid grid-cols-3 gap-1 menu menu-horizontal px-1">
          <li>
            <Link to={"/"}>Assets</Link>
          </li>
          <li>
            <Link to={"/manage"}>Manage</Link>
          </li>
          <li>
            <Link to={"/airdrop"}>Airdrop</Link>
          </li>
        </ul>
      </div>
      <div className="navbar-end">
        <a
          className="btn btn-primary"
          onClick={() => {
            DisconnectWallet();
          }}
        >
          Disconnect wallet
        </a>
      </div>
    </div>
  );
};
