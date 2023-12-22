import { Routes, Route } from 'react-router-dom';
import Documents from "../components/Documents";
import Loginsignup from '../components/Loginsignup';
import Error from '../components/Error';
import Upload from '../components/Upload';


const AppRoutes = () => {
    return (
        <Routes>
            <Route path='/' exact element={<Documents />} />
            <Route path='/loginsignup' exact element={<Loginsignup />} />
            <Route path='/upload' exact element={<Upload />} />
            <Route path='*' element={<Error />} />
        </Routes>
    );
}

export default AppRoutes;
