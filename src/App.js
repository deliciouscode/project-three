// import firebase from './firebase';
import { useState, useEffect } from 'react';
import RecommendationsList from './RecommendationsList';
import './App.css';

function App() {

  // setting up our method to set state. Has to be an empty array because of the .map method in our code below - it can map through an empty array and return nothing, but if it was a different data type, that would cause .map to not function!
  const [list, setList] = useState([]);
  // because you only want to call the API once when the component renders, call the useEffect function with an empty dependency array at the end.
  useEffect( () => {
    const url = new URL(`https://proxy.hackeryou.com`)
        url.search = new URLSearchParams({
            reqUrl : `https://tastedive.com/api/similar`,
            'params[q]' : `book:trainspotting`,
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
            })
      }, []);


  return (
    <div className="App">
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
    </div>
  );
}

export default App;
