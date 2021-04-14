import { Link } from 'react-scroll';


const Form = (props) => {
    return(
        <form action="submit">
            <label htmlFor="media">Enter Your Favourite</label>
            <input 
                type="text" 
                id="media"
                onChange={ event => props.inputChange(event.target.value) }
                required="true"
                />
            <select 
                name="mediaType" 
                id="mediaType"
                onChange={ event => props.dropDownChange(event.target.value) }
                >
                <option value="">Select Media Type</option>
                <option value="band">Music</option>
                <option value="movie">Movie</option>
                <option value="show">TV Show</option>
                <option value="podcast">Podcast</option>
                <option value="book">Book</option>
                <option value="game">Game</option>
            </select>
            <Link to="recommendations" spy={true} smooth={true}><button className="submit" onClick={ event => props.submitForm(event) }>Submit</button></Link>
        </form>
    )
}

export default Form;