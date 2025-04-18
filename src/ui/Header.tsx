import React from "react";
import { Link } from "react-router-dom";
import SearchOrder from "../features/order/searchOrder";
import Username from "../features/user/Username";

const Header = () => {
  return (
    <header className="bg-yellow-500 uppercase">
      <Link className="tracking-widest" to="/">
        FastPizza.com
      </Link>
      <SearchOrder />
      <Username />
    </header>
  );
};

export default Header;
