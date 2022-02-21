// Activity pages
import History from "./pages/History";
import Recharge from "./pages/Recharge";
import Profile from "./pages/Profile";
import LoadWallet from "./pages/LoadWallet";

// // Authentication pages
import Login from "./auth/Login";
import Register from "./auth/Register";


// Export routes
const routes = [
    { name: 'Recharge', component: Recharge },
    { name: 'History', component: History },
    { name: 'Profile', component: Profile },
    { name: 'Login', component: Login },
    { name: 'Register', component: Register },
    { name: 'LoadWallet', component: LoadWallet },
];


export default routes;