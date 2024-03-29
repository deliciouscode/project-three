import firebase from './firebase';
import { useState, useEffect } from 'react';
import Header from './Header';
import SavedList from './SavedList';
import Form from './Form';
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
  // set saved list state for firebase
  const [savedList, setSavedList] = useState([]);
  // create state to check if user submit search or not, set default as false 
  const [userSearch, setUserSearch] = useState(false);


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
  // this function gathers the input from the text box and the dropdown menu and sends them to the API in order to set the state in the RecommendationsList component
  const formSubmit = (event) => {
    event.preventDefault();
    setUserSearch(true);
    
    const url = new URL(`https://proxy.hackeryou.com`)
        url.search = new URLSearchParams({
            reqUrl : `https://tastedive.com/api/similar`,
            'params[q]' : userInput,
            'params[type]' : mediaType,
            'params[k]' : `407899-PatrickM-CM8VF4NQ`,
            'params[info]' : 0,
            'params[limit]' : 15
        });

    fetch(url)
        .then( res => res.json())
        // this set method will completely replace the useState array with our array of results
        .then( apiJson => {
          setList(apiJson.Similar.Results);
        });
  }

  // this function takes the user selection from the recommendations list and adds it to the DB in firebase as part of the user's watchlist.
  const addToSaved = (props) => {
    const dbRef = firebase.database().ref();
    const properties = {
        title : props.name,
        type : props.type,
        notviewed : true
    }
    dbRef.push(properties);
    removeRecommendation(props);
  }

  // this function takes the individual recommendation that was added to the SavedList and compares it to all items in the array that have been pulled from the API. Then, it compares the name within the object in the array, and if the saved item name is equal to the recommendation generated by the API, it removes the recommendation from the list.
  const removeRecommendation = (recommendation) => {
    // We cannot directly mutate state array, so we need to create a copy of the stateful list, filter through that copy, and then pass the new new copy to our setList function.
    const listCopy = [...list];
    const newList = listCopy.filter( (item) => {
      return item.Name !== recommendation.name;
    })
    setList(newList);
  }

  return (
    <div className="App">
      <Header />

      <main className="wrapper">
        <section id="watchList">
          <h2>Watchlist</h2>
          <p>Use the text box below to enter the name of something you like, use the dropdown menu to select which type of media you're looking for, and then press Submit to receive a list of recommendations based on what you like!</p>
          
          {/* list of items saved by the user */}
          {
            savedList.length !==0
            ? <div className="carousel">
              <ul className="watchList">
                {
                  savedList.map( (item) => {
                    return (
                      <SavedList 
                        key={item.key} 
                        id={item.key}
                        data={item.name}/>
                    )
                  }) 
                }
              </ul>
              
            </div>
            : <p className="emptyWatchlist"> Nothing on Watchlist.</p>
          }

          
        </section>

        {/* form to search for recommendations list */}

        <Form 
          inputChange={setUserInput}
          dropDownChange={setMediaType}
          submitForm={formSubmit}
          />
        
        <section id="recommendations">
          <h2>Recommendations</h2>
          <ul className="recommendationsList">
            {/* send results from API call as props to list component */}
            { userSearch === false
              ? <p>Search for recomendations from your favourite.</p>
              : userSearch === true && list.length !== 0
                ?list.map( (listItem, index) => {
                  return(
                    <RecommendationsList
                      key={index}
                      name={listItem.Name}
                      type={listItem.Type}
                      addToSaved={addToSaved}
                    />
                  )
                }) 
              : <p>Results not found! Please enter new search with more specificity.</p>
            }
          </ul>
        </section>
      </main>

      <Footer />
    </div>
  );
}
export default App;
