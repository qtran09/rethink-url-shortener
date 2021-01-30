import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import axios from 'axios';

function App() {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");

  const retrieveURL = async (e) => {
    e.preventDefault();
    const URL = { url: url };
    const shortURL = await axios.post("http://localhost:8000/encoder/", URL);
    console.log("Short URL: " + JSON.stringify(shortURL.data._id));
    setShortUrl("http://localhost:8000/" + shortURL.data._id);
  };
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />

        <form onSubmit={retrieveURL}>
          <label htmlFor='shortenInput'>URL to shorten: </label>
          <input id='shortenInput' type='text' onChange={(e) => setUrl(e.target.value)} />
          <br />
          <input type='submit' />
        </form>
        {shortUrl ? (
          <a
            className="App-link"
            href={shortUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            {shortUrl}
          </a>)
          : <></>
        }
      </header>
    </div>
  );
}

export default App;
