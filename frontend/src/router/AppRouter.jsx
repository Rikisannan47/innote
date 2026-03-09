import { BrowserRouter, Routes, Route} from 'react-router-dom';
import Login from '../modules/auth/LoginView';
import UpsellFormView from "../modules/Upsell/Formulario/UpsellFormView";
import RequireAuth from '../modules/auth/RequireAuth';

const AsesorHome = () => <h1>Vista Asesor</h1>;
const AdminHome = () => <h1>Vista Admin</h1>;

const AppRouter = () => {
    return (
        <BrowserRouter>
        <Routes>

            {/* Público*/}
            <Route path="/login" element={<Login/>}/>
            {/* FORMULARIO UPSELL */}
            <Route path='/innote' element={<UpsellFormView/>}/>
            {/* Asesor*/}
            <Route path="/asesor"
                    element={
                        <RequireAuth role="asesor">
                            <AsesorHome />
                                </RequireAuth>
                }
            />

            {/* Admin*/}
            <Route
                path="/admin"
                element={
                    <RequireAuth role="admin">
                        <AdminHome/>
                            </RequireAuth>
                }
            />

        </Routes>
        </BrowserRouter>
    );
};

export default AppRouter;