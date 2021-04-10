// import firebase from './firebase';
import { useState, useEffect } from 'react';
import RecommendationsList from './RecommendationsList';
import Footer from './Footer';
import './App.scss';

function App() {
  // setting up our method to set state. Has to be an empty array because of the .map method in our code below - it can map through an empty array and return nothing, but if it was a different data type, that would cause .map to not function!
  const [list, setList] = useState([]);
  // this will for the text input
  const [userInput, setUserInput] = useState('');
  // this is for the dropdown
  const [mediaType, setMediaType] = useState('');
  // this handles the change of the user text input
  const handleTextChange = (event) => {
    setUserInput(event.target.value);
  }
  const handleSelectChange = (event) => {
    setMediaType(event.target.value);
  }
  const formSubmit = (event) => {
    event.preventDefault();
    const url = new URL(`https://proxy.hackeryou.com`)
        url.search = new URLSearchParams({
            reqUrl : `https://tastedive.com/api/similar`,
            'params[q]' : userInput,
            'params[type]' : mediaType,
            'params[k]' : `407899-PatrickM-CM8VF4NQ`,
            'params[info]' : 1,
            'params[limit]' : 15
        });
        fetch(url)
            .then( res => res.json())
            // this set method will completely replace the useState array with our array of results
            .then( apiJson => {
            // this statement handles any possible error handling in case something is not found.
              if (apiJson.Similar.Results.length === 0) {
                console.log('nothing found!');
              } else {
                setList(apiJson.Similar.Results);
              }
            }).catch(()=>{
              console.log('fetch error');
            })
  }
 
  return (
    <div className="App">
      {/* form to add new book to list */}
      <form action="submit">
        <label htmlFor="media">Enter the name of what you would like to search for</label>
        <input 
          type="text" 
          id="media"
          onChange={ handleTextChange }
          value={ userInput }
          required="required"
          />
          <select 
            name="mediaType" 
            id="mediaType"
            onChange={ handleSelectChange }
            value={ mediaType }>
            <option value="">Select Media Type</option>
            <option value="band">Music</option>
            <option value="movie">Movie</option>
            <option value="show">TV Show</option>
            <option value="podcast">Podcast</option>
            <option value="book">Book</option>
            <option value="game">Game</option>
          </select>
          <button onClick={ formSubmit }>Submit</button>
      </form>
      <ul>
        {/* send results from API call as props to list component */}
        {

          list.map( (listItem, index) => {
            return(
              <RecommendationsList
                key={index}
                name={listItem.Name}
                type={listItem.Type}
              />
            )
          })
          
        }
      </ul>

      <Footer />
    </div>
  );
}
export default App;