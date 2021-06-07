import { useState } from "react";
import { nanoid } from "nanoid";
import NoteList from "./components/NoteList";

function App() {
  const [notes, setNotes] = useState([
    {
      id: nanoid(),
      text: "Une note comme ça",
      date: "10/06/21",
    },
    {
      id: nanoid(),
      text: "Si tu n'existais pas ...",
      date: "12/06/21",
    },
    {
      id: nanoid(),
      text: "Encore une fois!",
      date: "13/06/21",
    },
    {
      id: nanoid(),
      text: "Ceci est inacceptable",
      date: "14/06/21",
    },
  ]);
  return (
    <div className="container">
      <NoteList />
    </div>
  );
}

export default App;
