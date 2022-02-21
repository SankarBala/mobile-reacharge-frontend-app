// Activity pages
import History from "./pages/History";
import Recharge from "./pages/Recharge";
import Profile from "./pages/Profile";
import LoadWallet from "./pages/LoadWallet";

// // Authentication pages
import Login from "./auth/Login";
import Register from "./auth/Register";
import Forget from "./auth/Forget";
import OTPSubmit from "./auth/OTPSubmit";
import NewPassword from "./auth/NewPassword";   


// Export routes
const routes = [
    { name: 'Recharge', component: Recharge },
    { name: 'History', component: History },
    { name: 'Profile', component: Profile },
    { name: 'Login', component: Login },
    { name: 'Register', component: Register },
    { name: 'Load Wallet', component: LoadWallet },
    { name: 'Forget', component: Forget },
    { name: 'OTP Submit', component: OTPSubmit },
    { name: 'New Password', component: NewPassword }
];


export default routes;