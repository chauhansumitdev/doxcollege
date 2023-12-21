import { Link } from 'react-router-dom';

const Header = () => {

    return (
        <>
        <div className="title">
            <h3>DoxCollege</h3>
        </div>
        <div className="inputField">
        <Link to={'/'}> <strong>Home</strong> </Link>
        <Link to={'/search'}> <strong>Search</strong> </Link>
        <Link to={'/loginsignup'}> <strong>Login/Signup</strong> </Link>
        <Link to={'/upload'}> <strong>Upload</strong> </Link>
        </div>
        </>
    );
}
 
export default Header;

