import music from './assets/music.svg'
import show from './assets/show.svg'
import podcast from './assets/podcast.svg'
import book from './assets/book.svg'
import movie from './assets/movie.svg'
import game from './assets/game.svg'
import firebase from './firebase';

const SavedList = (props) => {
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
        if (item.name.notviewed) {
            properties.notviewed = false;
        } else {
            properties.notviewed = true;
        }
        // update the database with the new value of the viewed vaue
        dbRef.update(properties);
        }


    let image;
    if (props.name.type === 'music') {
        image = music;
    } else if (props.name.type === 'show') {
        image = show;
    } else if (props.name.type === 'podcast') {
        image = podcast;
    } else if (props.name.type === 'book') {
        image = book;
    } else if (props.name.type === 'movie') {
        image = movie;
    } else if (props.name.type === 'game') {
        image = game;
    }

    return(
        <li key={props.key}><img src={image} alt={props.type} />
            {/* added ternary operator to denote if a user has viewed the saved item or not */}
            {props.name.notviewed ? <em>{props.name.title}</em>  : <strong>{props.name.title} has been viewed.</strong>} <input type="checkbox" onClick={ () => { handleViewed(props) } } />
            <button onClick={ () => { handleRemove(props.key) } }>Remove</button>
        </li>

    )

}



export default SavedList;