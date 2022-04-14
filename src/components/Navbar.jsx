import React from "react";

const NavBar = ({ toggle }) => {
  return (
    <div>
      <div className="header text-center pt-4">
        <h3>Notes Keeper</h3>
        <button className="btn btn-primary mt-2" onClick={() => toggle()}>
          Add Note
        </button>
      </div>
    </div>
  );
};

export default NavBar;
