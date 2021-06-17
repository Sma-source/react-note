import React from "react";

const Popup = ({ trigger, setTrigger, children, id, handleDeleteNote }) => {
  return trigger ? (
    <div className="popup">
      <div className="popup-inner">
        {children}
        <div className="btn-contain">
          <button className="close-btn" onClick={() => handleDeleteNote(id)}>
            Oui
          </button>
          <button className="close-btn" onClick={() => setTrigger(false)}>
            Non
          </button>
        </div>
      </div>
    </div>
  ) : (
    ""
  );
};

export default Popup;
