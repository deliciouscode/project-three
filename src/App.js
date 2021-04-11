import firebase from './firebase';
import { useState, useEffect } from 'react';
import Header from './Header';
import RecommendationsList from './RecommendationsList';
import SavedList from './SavedList';
import Footer from './Footer';
import './App.scss';

function App() {
  // setting up our method to set state. Has to be an empty array because of the .map method in our code below - it can map through an empty array and return nothing, but if it was a different data type, that would cause .map to not function!
  const [list, setList] = useState([]);
  // this will for the text input
  const [userInput, setUserInput] = useState('');
  // this is for the dropdown
  const [mediaType, setMediaType] = useState('');
  // set saved list state for firebase
  const [savedList, setSavedList] = useState([]);


  // this useEffect is added for establishing a connection to the firebase database anytime the user opens the app or makes changes to the database
  useEffect( () => {
    // establish connection to firebase DB
    const dbRef = firebase.database().ref();
    // add event listener for any time firebase DB changes.
    dbRef.on('value', (res) => {
      // create new variable to store the new state that we want to introduce to our app
      const newState = [];
      // use res.val to store the response from your DB in a useful object chunk
      const data = res.val();
      // iterate using for in loop to get items into array, and to have unique key value assigned to each one
      for (let key in data) {
        newState.push({
          key : key,
          name : data[key],
        })
      }
      // call this function to update out component's state to be the new value
      setSavedList(newState);
    })
  }, [])
  
  // this function handles removing saved items from the database
  const handleRemove = (itemId) => {
    const dbRef = firebase.database().ref();
    dbRef.child(itemId).remove();
  }

  // this function handles changing the status of a saved item from viewed to not yet viewed
  const handleViewed = (item) => {
    // establish firebase connection specific to the item referred to by the user
    const dbRef = firebase.database().ref(`${item.key}`);
    // create an empty object to update the viewed property
    const properties = {};
    // conditional to toggle the database viewed value between true and false 
    if (item.name.viewed) {
      properties.viewed = false;
    } else {
      properties.viewed = true;
    }
    // update the database with the new value of the viewed vaue
    dbRef.update(properties);
  }


  // this handles the change of the user text input
  const handleTextChange = (event) => {
    setUserInput(event.target.value);
  }

  // this handles the change of the dropdown menu
  const handleSelectChange = (event) => {
    setMediaType(event.target.value);
  }

  // this function gathers the input from the text box and the dropdown menu and sends them to the API in order to set the state in the RecommendationsList component
  const formSubmit = (event) => {
    event.preventDefault();
    setList([]);
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
          setList(apiJson.Similar.Results);
        });
  }

  // useEffect 

  return (
    <div className="App">
      <Header />
      <h2>Watchlist</h2>

      {/* list of items saved by the user */}
      <ul className="watchList">
        {
          savedList.map( (item) => {
            return (
              <SavedList
                name={item.name}
                type={item.type}
              />
              // <li key={item.key}><img src="" alt=""/>
              //   {/* added ternary operator to denote if a user has viewed the saved item or not */}
              //   {item.name.notviewed ? <em>{item.name.title}</em>  : <strong>{item.name.title} has been viewed.</strong>} <input type="checkbox" onClick={ () => { handleViewed(item) } } />
              //   <button onClick={ () => { handleRemove(item.key) } }>Remove</button>
              // </li>
            )
          }) 
        }
      </ul>


      {/* form to search for recommendations list */}

      <h2>Recommendations</h2>
      <ul>
        {/* send results from API call as props to list component */}
        { list.length !== 0 ?
          list.map( (listItem, index) => {
            return(
              <RecommendationsList
                key={index}
                name={listItem.Name}
                type={listItem.Type}
              />
            )
          }) : <p>Please enter a new search.</p>
        }
      </ul>

      <Footer />
    </div>
  );
}
export default App;