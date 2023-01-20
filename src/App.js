import axios from "axios";
import React, { useEffect, useState } from "react";
import User from "./components/User";
import "./style/Users.css";
import "./style/Nav.css";
import "./style/Title.css";

const App = () => {
  const [data, setData] = useState([]);
  const [filterGender, setFilterGender] = useState(["male", "female"]);
  const [sortRegisteredValue, setSortRegisteredValue] = useState();
  const [rangeValue, setRangeValue] = useState(10);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    axios
      .get("https://randomuser.me/api/0.8/?results=" + rangeValue)
      .then((response) => {
        setData(response.data.results);
      });
  }, [rangeValue]);

  const handleFilterGender = ({ target }) => {
    if (target.value === "male") {
      setFilterGender(["male", ""]);
      console.log(filterGender[0]);
    } else if (target.value === "female") {
      setFilterGender(["", "female"]);
    } else if (target.value === "default") {
      setFilterGender(["male", "female"]);
    }
  };

  const handleSort = ({ target }) => {
    setSortRegisteredValue(target.value);
  };

  const handleChangeRange = ({ target }) => {
    setRangeValue(target.value);
  };

  const handleSearch = (event) => {
    if (event.key === "Enter") {
      setSearchValue(event.target.value);
    }
  };

  return (
    <div>
      <div className="title">
        <h1>React App - Random users data API</h1>
      </div>
      <div className="search-bar">
        <input type="text" placeholder="Search" onKeyDown={handleSearch} />
      </div>
      <div className="nav">
        <nav>
          <select name="gender" id="gender-select">
            <option value="default" onClick={handleFilterGender}>
              gender
            </option>
            <option value="male" onClick={handleFilterGender}>
              Male
            </option>
            <option value="female" onClick={handleFilterGender}>
              Female
            </option>
          </select>
          <select name="trier" id="trier-registered">
            <option value="default" onClick={handleSort}>
              trier par numero de registre
            </option>
            <option value="croissant" onClick={handleSort}>
              trier par ordre croissant
            </option>
            <option value="decroissant" onClick={handleSort}>
              trier par ordre décroissant
            </option>
          </select>
          <div className="input-range">
            <input
              type="range"
              name="input-range"
              id="input-range"
              min="1"
              max="50"
              onChange={handleChangeRange}
            />
            <p>{rangeValue}</p>
          </div>
        </nav>
      </div>
      <div className="users-data">
        {data
          .sort(
            sortRegisteredValue === "default"
              ? () => Math.random(data) - 0.5
              : sortRegisteredValue === "croissant"
              ? (a, b) => a.user.registered - b.user.registered
              : sortRegisteredValue === "decroissant"
              ? (a, b) => b.user.registered - a.user.registered
              : undefined
          )
          .filter(
            (userData) =>
              userData.user.gender === filterGender[0] ||
              userData.user.gender === filterGender[1]
          )
          .filter((userData) => {
            let name = userData.user.name.first + " " + userData.user.name.last;
            let email = userData.user.email;
            let username = userData.user.username;
            let city = userData.user.location.city;
            let state = userData.user.location.state;
            let password = userData.user.password;
            let street = userData.user.location.street;
            let phone = userData.user.phone;
            let registered = userData.user.registered.toString();
            return (
              name.toLowerCase().includes(searchValue.toLowerCase()) ||
              email.toLowerCase().includes(searchValue.toLowerCase()) ||
              username.toLowerCase().includes(searchValue.toLowerCase()) ||
              city.toLowerCase().includes(searchValue.toLowerCase()) ||
              state.toLowerCase().includes(searchValue.toLowerCase()) ||
              password.toLowerCase().includes(searchValue.toLowerCase()) ||
              street.includes(searchValue) ||
              phone.includes(searchValue) ||
              registered.includes(searchValue)
            );
          })
          .map((userData, index) => (
            <User userData={userData} index={index} />
          ))}
      </div>
    </div>
  );
};

export default App;
