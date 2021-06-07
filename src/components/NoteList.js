import React from "react";
import Note from "./Note";

const NoteList = ({ notes }) => {
  return (
    <div className="notes-list">
      <Note />
    </div>
  );
};

export default NoteList;
