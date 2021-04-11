import firebase from './firebase';
import music from './assets/music.svg'
import show from './assets/show.svg'
import podcast from './assets/podcast.svg'
import book from './assets/book.svg'
import movie from './assets/movie.svg'
import game from './assets/game.svg'
// you need to have props in your parameter in order to pass info from the props object in your App.js to your component.
const RecommendationsList = ( props ) => {

    const handleClick = (e) => {
        e.preventDefault();
        const dbRef = firebase.database().ref();
        const properties = {
            title : props.name,
            type : props.type,
            notviewed : true
        }
        dbRef.push(properties);
        
      }

    let image;
    if (props.type === 'music') {
        image = music;
    } else if (props.type === 'show') {
        image = show;
    } else if (props.type === 'podcast') {
        image = podcast;
    } else if (props.type === 'book') {
        image = book;
    } else if (props.type === 'movie') {
        image = movie;
    } else if (props.type === 'game') {
        image = game;
    }

    return(
            <li> 
                <img src={image} alt={props.type}/>{props.name} 
                <button onClick={ handleClick }>Save to List</button></li> 
    )
}

export default RecommendationsList;