import logo from './assets/deliciousCodeTransparent.svg'
import tasteDive from './assets/1200px-TasteDive_Logo.png'

const Header = () => {
    return(
        <header>
            <div className="wrapper">
                <div className="logo">
                    <img src={logo} alt="Delicious Code logo"/>
                    <h1>Delicious Code</h1>
                </div>
            
                <div className="tasteDiveLogo">
                    <p>Powered by </p>
                    <a href="https://tastedive.com/read/api" target="_blank" rel="noreferrer"><img src={tasteDive} alt="tastedive logo"/></a>
                </div>
            </div>
            
            
        </header>
    )
}

export default Header;