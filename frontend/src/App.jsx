import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { SessionProvider } from './context/SessionContext';
import GoogleLogin from './components/GoogleLogin';
import SessionInfo from './components/SessionInfo';
import LandingPage from './pages/LandingPage.jsx';
import ExplorePage from "./pages/ExplorePage.jsx";
import HomePage from "./pages/HomePage.jsx";
import ErrorPage from './pages/ErrorPage.jsx';
import ProfilePage from './pages/ProfilePage.jsx';
import CartPage from "./pages/CartPage.jsx";
import AddPage from "./pages/AddPage.jsx";
import RefreshHandler from './utils/RefreshHandler.jsx';
import BottomNavBar from './components/BottomNavBar.jsx';
import PrivateRoute from './utils/PrivateRoute';
import Orders from './pages/Orders.jsx';
import Wishlist from './pages/Wishlist.jsx';
import Products from './pages/Products.jsx';

// Import category pages
import ElectronicsPage from './pages/explore/ElectronicsPage.jsx';
import StudyPage from './pages/explore/StudyPage.jsx';
import FashionPage from './pages/explore/FashionPage.jsx';
import VehiclesPage from './pages/explore/VehiclesPage.jsx';
import GadgetsPage from './pages/explore/GadgetsPage.jsx';
import BeautyPage from './pages/explore/BeautyPage.jsx';
import FoodPage from './pages/explore/FoodPage.jsx';

import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { indigo } from '@mui/material/colors';
const getTheme = (mode) =>
    createTheme({
        palette: {
            mode,
            primary: {
                main: mode === 'light' ? '#0091ea' : '#039be5', // Button color
            },
            secondary: indigo,
            background: {
                default: mode === 'light' ? '#f4f6f8' : '#121212',
                paper: mode === 'light' ? '#ffffff' : '#1e1e1e',
            },
        },
    });

// To fix authentication and /auth
const AppContent = ({ isAuthenticated, setIsAuthenticated, mode, setMode }) => {
    const location = useLocation();
    const theme = getTheme(mode);    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            {/* <SessionInfo />
            <RefreshHandler setIsAuthenticated={setIsAuthenticated||true} /> */}
            <Routes>
                    {/* testing purpose added by yisihth remove this after seeing*/}
                <Route path="/orders"element={<Orders/>}></Route>
                <Route path="/wishlist" element={<Wishlist/>}/>
                <Route path="/cart" element={<CartPage />} />
                <Route path="/products"element={<Products/>}/>
                <Route path="/add" element={<AddPage />} />

                <Route path="/" element={<LandingPage isAuthenticated={isAuthenticated||true} />} />
                <Route path="/auth" element={<GoogleLogin setIsAuthenticated={setIsAuthenticated} />} />

                <Route element={<PrivateRoute isAuthenticated={isAuthenticated||true} />}>
                    <Route path="/home" element={<HomePage />} />
                    <Route path="/explore" element={<ExplorePage />} />
                    {/* Category routes */}
                    <Route path="/explore/electronics" element={<ElectronicsPage />} />
                    <Route path="/explore/study" element={<StudyPage />} />
                    <Route path="/explore/fashion" element={<FashionPage />} />
                    <Route path="/explore/vehicles" element={<VehiclesPage />} />
                    <Route path="/explore/gadgets" element={<GadgetsPage />} />
                    <Route path="/explore/beauty" element={<BeautyPage />} />
                    <Route path="/explore/food" element={<FoodPage />} />
                    <Route path="/cart" element={<CartPage />} />
                    <Route path="/profile" element={<ProfilePage mode={mode} setMode={setMode} />} />
                </Route>
                <Route path="*" element={<ErrorPage />} />
            </Routes>
            {location.pathname !== '/auth' && location.pathname !== "/" && <BottomNavBar />}
        </ThemeProvider>
    );
};

const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [mode, setMode] = useState(() => localStorage.getItem('themeMode') || 'light');

    useEffect(() => {
        localStorage.setItem('themeMode', mode);
    }, [mode]);

    return (
        <SessionProvider>
            <BrowserRouter>
                <AppContent
                    isAuthenticated={isAuthenticated}
                    setIsAuthenticated={setIsAuthenticated}
                    mode={mode}
                    setMode={setMode}
                />
            </BrowserRouter>
        </SessionProvider>
    );
};


export default App;

// If you want to disable /auth temporarily for testing, un-comment below code and comment above code, and at pr reverse the changes
// import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
// import { useEffect, useState } from 'react';
// import LandingPage from './pages/LandingPage.jsx';
// import ExplorePage from "./pages/ExplorePage.jsx";
// import HomePage from "./pages/HomePage.jsx";
// import ErrorPage from './pages/ErrorPage.jsx';
// import ProfilePage from './pages/ProfilePage.jsx';
// import CartPage from "./pages/CartPage.jsx";
// import AddPage from "./pages/AddPage.jsx";
// import BottomNavBar from './components/BottomNavBar.jsx';
//
// import { ThemeProvider, createTheme } from '@mui/material/styles';
// import CssBaseline from '@mui/material/CssBaseline';
// import { indigo } from '@mui/material/colors';
//
// const getTheme = (mode) =>
//     createTheme({
//         palette: {
//             mode,
//             primary: {
//                 main: mode === 'light' ? '#0091ea' : '#039be5', // Button color
//             },
//             secondary: indigo,
//             background: {
//                 default: mode === 'light' ? '#f4f6f8' : '#121212',
//                 paper: mode === 'light' ? '#ffffff' : '#1e1e1e',
//             },
//         },
//     });
//
// // To fix authentication and /auth
// const AppContent = ({  mode, setMode }) => {
//     const location = useLocation();
//     const theme = getTheme(mode);
//
//     return (
//         <ThemeProvider theme={theme}>
//             <CssBaseline />
//             <Routes>
//                 <Route path="/" element={<LandingPage />} />
//
//                 <Route path="/home" element={<HomePage />} />
//                 <Route path="/explore" element={<ExplorePage />} />
//                 <Route path="/add" element={<AddPage />} />
//                 <Route path="/cart" element={<CartPage />} />
//                 <Route path="/profile" element={<ProfilePage mode={mode} setMode={setMode} />} />
//
//                 <Route path="*" element={<ErrorPage />} />
//             </Routes>
//             {location.pathname !== '/auth' && location.pathname !== "/" && <BottomNavBar />}
//         </ThemeProvider>
//     );
// };
//
// const App = () => {
//     const [mode, setMode] = useState(() => localStorage.getItem('themeMode') || 'light');
//
//     useEffect(() => {
//         localStorage.setItem('themeMode', mode);
//     }, [mode]);
//
//     return (
//         <BrowserRouter>
//             <AppContent
//                 mode={mode}
//                 setMode={setMode}
//             />
//         </BrowserRouter>
//     );
// };
//
// export default App;