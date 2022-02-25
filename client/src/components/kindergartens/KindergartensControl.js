import React, { useState } from "react";
import axios from "axios";
import { URL } from "../../services/Api";

function KindergartensControl() {
  const [test, setTest] = useState({});

  const submitForm = async (e) => {
    e.preventDefault();
    for (let index = 0; index < e.target.length - 1; index++) {
      setTest((test[e.target[index].name] = e.target[index].value));
    }
    console.log(test);
    document.newKindergarten.reset();
    await axios.post(`${URL}kindergartens/newkindergartens`, test);
  };

  let formStyle = {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
  };
  return (
    <div>
      <form onSubmit={submitForm} style={formStyle} name="newKindergarten">
        <h3>הוספת גן ילדים</h3>
        <label>
          Phone Number
          <input
            type="tel"
            name="phone"
            pattern="[0][0-9]{9}"
            required
            placeholder="phone number..."
          ></input>
        </label>
        <label>
          Name
          <input name="name" type="text" required></input>
        </label>
        <label>
          City
          <input name="city" type="text" required></input>
        </label>
        <label>
          Street
          <input name="street" type="text" required></input>
        </label>
        <label>
          Apartment Number
          <input name="apartmentNumber" type="number" min={1} required></input>
        </label>
        <button type="submit">submit</button>
      </form>
    </div>
  );
}

export default KindergartensControl;
