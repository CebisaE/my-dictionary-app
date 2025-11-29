import React, { useState } from "react";
import axios from "axios";
import Results from "./Results";
import Photos from "./Photos";
import "./Dictionary.css";
import "./Photos.css";

export default function Dictionary(props) {
  let [keyword, setKeyword] = useState(props.defaultKeyword);
  let [results, setResults] = useState(null);
  let [loaded, setLoaded] = useState(false);
  let [photos, setPhotos] = useState(null);

  // Handle dictionary API response
  function handleDictionResponse(response) {
    setResults(response.data[0]);
  }

  // Handle Pexels API response
  function handlePexelsResponse(response) {
    setPhotos(response.data.photos);
  }

  // Search function
  function search() {
    if (!keyword.trim()) {
      alert("Please enter a word to search.");
      return;
    }

    // Dictionary API
    let apiUrl = `https://api.dictionaryapi.dev/api/v2/entries/en_US/${keyword}`;
    axios
      .get(apiUrl)
      .then(handleDictionResponse)
      .catch(function (error) {
        console.error("Dictionary API error:", error);
        setResults(null);
        alert(`No results found for "${keyword}".`);
      });

    // Pexels API
    let pexelsApiKey =
      "tLEe9wEQRMZ1SVVWvmneKucRWadhbASn1T9PaP8iyXg9cTYxuh7eVars";
    let pexelsApiUrl = `https://api.pexels.com/v1/search?query=${keyword}&per_page=9`;
    let headers = { Authorization: `${pexelsApiKey}` };

    axios
      .get(pexelsApiUrl, { headers })
      .then(handlePexelsResponse)
      .catch(function (error) {
        console.error("Pexels API error:", error);
        setPhotos(null);
      });
  }

  // Form submit
  function handleSubmit(event) {
    event.preventDefault();
    search();
  }

  // Input change
  function handleKeywordChange(event) {
    setKeyword(event.target.value);
  }

  // Initial load
  function load() {
    setLoaded(true);
    search();
  }

  if (loaded) {
    return (
      <div className="Dictionary">
        <section>
          <h1>What word do you want to look up?</h1>
          <form onSubmit={handleSubmit}>
            <input
              type="search"
              onChange={handleKeywordChange}
              defaultValue={props.defaultKeyword}
            />
          </form>
          <div className="hint">
            suggested words: sunset, wine, yoga, plant...
          </div>
        </section>

        {/* Results section */}
        {results ? <Results results={results} /> : null}

        {/* Photos section */}
        {photos ? <Photos photos={photos} /> : null}
      </div>
    );
  } else {
    load();
    return "Loading...";
  }
}
