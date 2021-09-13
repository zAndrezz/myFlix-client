import React, {useState} from "react";
import PropTypes from 'prop-types';

export function RegistrationView(props) {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [birthDate, setBirthDate] = useState('');
    

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(username, password, email, birthDate);
        props.SignIn(username);
      }

      return (
        <form>
          <label>
            Username:
            <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
          </label>
          <label>
            Password:
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
          </label>
          <label>
            email:
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} />
          </label>
          <label>
            birth date:
            <input type="date" value={birthDate} onChange={e => setBirthDate(e.target.value)} />
          </label>
          <button type="submit" onClick={handleSubmit}>Submit</button>
        </form>
      );
    }

    RegistrationView.propTypes = {
        SignIn: PropTypes.func.isRequired
      };

/*
      "Username": "username string",
      "Password": "password example",
      "Email": "domidomiddomi@mail.com",
      "Birthday": "1990/01/01" (date format),
      "FavMovies" : []
      */