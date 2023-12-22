import { Link } from 'react-router-dom';
import Search from './Search';
import './styles/style.css';

export default function Navigation() {

    return (
        <div className="navigations">
            <div className="nav-menus">
                <Link to={'/'} className='nav-item dxc icon'>Doxcollege</Link>
                <Link to={'/login'} className='nav-item'> <strong>Login</strong> </Link>
                <Link to={'/signup'} className='nav-item'> <strong>Signup</strong> </Link>
                <Link to={'/upload'} className='nav-item'> <strong>Upload</strong> </Link>
            </div>
            <Search />
        </div>
    );
}

