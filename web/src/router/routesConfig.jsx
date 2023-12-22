import { Routes, Route } from 'react-router-dom';
import Home from "../components/Home";
import Loginsignup from '../components/Loginsignup';
import Error from '../components/Error';
import Search from '../components/Search';
import Upload from '../components/Upload';


const AppRoutes = () => {
    return (
        <Routes>
            <Route path='/' exact element={<Home/>}/>
            <Route path='/search' exact element={<Search/>}/>
            <Route path='/loginsignup' exact element={<Loginsignup/>}/>
            <Route path='/upload' exact element={<Upload/>}/>
            <Route path= '*' element={<Error/>}/>
        </Routes>
    );
}
 
export default AppRoutes;
