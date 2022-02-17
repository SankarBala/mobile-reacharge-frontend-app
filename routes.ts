// Activity pages
import Index from "./pages/Index";
import History from "./pages/History";
import Check from "./pages/Check";
import Recharge from "./pages/Recharge";
import Profile from "./pages/Profile";

// Authentication pages
import Login from "./auth/Login";
import Register from "./auth/Register";


// Export routes
const routes = [
    { name: 'Recharge', component: Recharge },
    { name: 'History', component: History },
    { name: 'Check', component: Check },
    { name: 'Profile', component: Profile },
    { name: 'Login', component: Login },
    { name: 'Register', component: Register },


];


export default routes;