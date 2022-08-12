import React from "react";
import Nav from "./Nav";
import { Link } from "react-router-dom";
import { GiWeightLiftingUp } from "react-icons/gi";

function Header() {
  return(
    <>
      <h1 className="main-header"><Link to="/" className="header-link"><GiWeightLiftingUp/> Exercise Bro <GiWeightLiftingUp/></Link></h1>
      <p>Do you even log your exercise bro?</p>
      <Nav/>
    </>
  );
}

export default Header;