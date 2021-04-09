
// you need to have props in your parameter in order to pass info from the props object in your App.js to your component.
const RecommendationsList = ( props ) => {

    return(
            <li>{props.type} - {props.name}</li>
    )
}

export default RecommendationsList;