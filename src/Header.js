import logo from './assets/deliciousCodeLogo.png'
import tasteDive from './assets/1200px-TasteDive_Logo.png'

const Header = () => {
    return(
        <header>
            
            <h1>Delicious Code</h1>
            <div className="tasteDiveLogo">
                <p>Powered by </p>
                <a href="https://tastedive.com/read/api"><img src={tasteDive} alt="tastedive logo"/></a>
            </div>
            
        </header>
    )
}

export default Header;