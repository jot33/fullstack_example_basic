import React from "react";
import { Link } from 'react-router-dom'
import { AiOutlineHome } from 'react-icons/ai'
import { MdPostAdd } from 'react-icons/md'

function Nav() {
  return(
    <nav>
      <Link to="/"><AiOutlineHome /><span className="navigation">Home</span></Link>
      <Link to="/add-exercise"><MdPostAdd /><span className="navigation">Add Exericise</span></Link>
    </nav>
  );
}

export default Nav;