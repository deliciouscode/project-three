
import music from './assets/music.svg'
import show from './assets/show.svg'
import podcast from './assets/podcast.svg'
import book from './assets/book.svg'
import movie from './assets/movie.svg'
import game from './assets/game.svg'

const RecommendationsList = ( props ) => {
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
                <img src={image} alt={props.type} aria-label={props.type}/>{props.name} 
                <button onClick={ () => props.addToSaved(props) }>Save to List</button></li> 
    )
}

export default RecommendationsList;