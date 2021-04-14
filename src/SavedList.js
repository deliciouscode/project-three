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
        const dbRef = firebase.database().ref(item);
        // create an empty object to update the viewed property
        const properties = {};
        // conditional to toggle the database viewed value between true and false 
        if (props.data.notviewed) {
            properties.notviewed = false;
        } else {
            properties.notviewed = true;
        }
        // update the database with the new value of the viewed vaue
        dbRef.update(properties);
        }


    let image;
    if (props.data.type === 'music') {
        image = music;
    } else if (props.data.type === 'show') {
        image = show;
    } else if (props.data.type === 'podcast') {
        image = podcast;
    } else if (props.data.type === 'book') {
        image = book;
    } else if (props.data.type === 'movie') {
        image = movie;
    } else if (props.data.type === 'game') {
        image = game;
    }

    return(
        <li>
            <div className="savedMedia">
                <img src={image} alt={props.data.title} aria-label={props.data.type}/>
                {/* added ternary operator to denote if a user has viewed the saved item or not */}
                {props.data.notviewed
                ? <p>{props.data.title}</p> 
                : <p>{props.data.title} has been viewed.</p>}
            </div>
            
            
            <div className="userInteraction">
                <label htmlFor="viewed">Viewed </label>
                
                    <input id="viewed" type="checkbox" checked={props.data.notviewed ? "" : true} onClick={ () => { handleViewed(props.id) } } />
                
                
                <button onClick={ () => { handleRemove(props.id) } }>Remove</button>
            </div>
        </li>

    )

}

export default SavedList;