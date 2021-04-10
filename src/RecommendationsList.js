import firebase from './firebase';
// you need to have props in your parameter in order to pass info from the props object in your App.js to your component.
const RecommendationsList = ( props ) => {

    const handleClick = (e) => {
        e.preventDefault();
        const dbRef = firebase.database().ref();
        const properties = {
            title : props.name,
            type : props.type,
            viewed : false
        }
        dbRef.push(properties);
        // dbRef.push(props.name);
      }


    return(
            <li>{props.type} - {props.name} <button onClick={ handleClick }>Add book</button></li> 
    )
}

export default RecommendationsList;