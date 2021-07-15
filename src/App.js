import { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import NoteList from "./components/NoteList";
import Search from "./components/Search";
import Header from "./components/Header";

function App() {
  const [notes, setNotes] = useState([]);

  const [searchText, setSearchText] = useState("");

  const [darkMode, setDarkMode] = useState(false);

  const [lat, setLat] = useState([]);

  const [long, setLong] = useState([]);

  const [status, setStatus] = useState(null);

  const [data, setData] = useState([]);

  // const getLocation = () => {
  //   if (!navigator.geolocation) {
  //     setStatus("Geolocation is not supported by your browser");
  //   } else {
  //     setStatus("Locating...");
  //     navigator.geolocation.getCurrentPosition(
  //       (position) => {
  //         setStatus(null);
  //         localStorage.setItem("location-allowed", true);
  //         setLat(position.coords.latitude);
  //         setLong(position.coords.longitude);
  //       },

  //       () => {
  //         setStatus("Unable to retrieve your location");
  //         localStorage.removeItem("location-allowed");
  //       }
  //     );
  //   }
  // };

  const getWeather = async (lat, long) => {
    let a = await fetch(
      `${process.env.REACT_APP_BASE_URL}/weather?lat=${lat}&lon=${long}&units=metric&APPID=${process.env.REACT_APP_API_KEY}`
    );
    let b = await a.json();
    console.log(b);
    setData(b);
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setLat(position.coords.latitude);
      setLong(position.coords.longitude);
      getWeather(position.coords.latitude, position.coords.longitude);
    });
  }, []);

  // useEffect(() => {
  //   const fetchData = (lat,long) => {
  //     fetch(
  //       `${process.env.REACT_APP_BASE_URL}/weather?lat=${lat}&lon=${long}&units=metric&APPID=${process.env.REACT_APP_API_KEY}`
  //     )
  //       .then((res) => res.json())
  //       .then((result) => {
  //         setData(result);
  //         console.log(result);
  //       });
  //   };
  //   fetchData()
  // }, [])

  useEffect(() => {
    const savedNotes = JSON.parse(localStorage.getItem("react-notes-app-data"));

    if (savedNotes) {
      setNotes(savedNotes);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("react-notes-app-data", JSON.stringify(notes));
  }, [notes]);

  const addNote = (text) => {
    const date = new Date();
    const newNote = {
      id: nanoid(),
      text: text,
      date: date.toLocaleDateString("fr-FR"),
    };
    const newNotes = [...notes, newNote];

    setNotes(newNotes);
  };

  const deleteNote = (id) => {
    const newNotes = notes.filter((note) => note.id !== id);
    setNotes(newNotes);
  };
  return (
    <div className={`${darkMode && "dark-mode"}`}>
      {/* <button onClick={handleClick}>Get Location</button> */}
      <h1>Coordinates</h1>
      <p>{status}</p>
      {lat && <p>Latitude: {lat}</p>}
      {long && <p>Longitude: {long}</p>}

      {typeof data.main != "undefined" ? (
        <div>
          <div className="location-box">
            <div className="location">
              {data.name}, {data.sys.country}
            </div>
          </div>
          <img
            src={`https://openweathermap.org/img/w/${data.weather[0].icon}.png`}
            alt="weather icon"
          />
          <div className="weather-box">
            <div className="temp">{Math.round(data.main.temp)}°c </div>
            <div className="weather">{data.weather[0].main} </div>
            <div className="weather">{data.weather[0].description} </div>
          </div>
        </div>
      ) : (
        ""
      )}
      <div className="container">
        <Header handleToggleDarkMode={setDarkMode} />
        <Search handleSearchNote={setSearchText} />
        <NoteList
          notes={notes.filter((note) =>
            note.text.toLocaleLowerCase().includes(searchText)
          )}
          handleAddNote={addNote}
          handleDeleteNote={deleteNote}
        />
      </div>
    </div>
  );
}

export default App;
