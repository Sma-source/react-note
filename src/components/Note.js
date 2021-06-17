import React, { useState } from "react";
import { MdDeleteForever } from "react-icons/md";
import Popup from "./Popup";

const Note = ({ id, text, date, handleDeleteNote }) => {
  const [btnPop, setBtnPop] = useState(false);
  return (
    <div className="note">
      <span>{text}</span>
      <div className="note-footer">
        <small>{date} </small>

        {/* <MdDeleteForever
          onClick={() => handleDeleteNote(id)}
          className="delete-icon"
          size="1.3em"
        /> */}
        <MdDeleteForever
          onClick={() => setBtnPop(true)}
          className="delete-icon"
          size="1.3em"
        />
        <Popup
          trigger={btnPop}
          setTrigger={setBtnPop}
          handleDeleteNote={handleDeleteNote}
          id={id}
        >
          <h3>Voulez vous vraiment supprimer cette note ?</h3>
        </Popup>
      </div>
    </div>
  );
};

export default Note;
