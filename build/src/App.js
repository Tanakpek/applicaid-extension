"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
require("./App.css");
const auth_provider_1 = require("./lib/auth-provider");
const requests_1 = require("./lib/requests");
const login_1 = __importDefault(require("./components/mine/login"));
const generate_1 = require("./components/mine/generate");
const regexp = "^https:\/\/www\.linkedin\.com\/jobs\/collections\/recommended\/\?currentJobId=\d+(&[a-zA-Z0-9_=%-]+)*$";
function App() {
    const { user, login, logout } = (0, auth_provider_1.useAuth)();
    const handleClick = async () => {
        if (!user) {
            (0, requests_1.getProfile)().then(async (data) => {
                console.log(data);
                if (data) {
                    login(data);
                }
                else {
                    chrome.runtime.sendMessage({ type: 'applicaid_logout' });
                    logout(user);
                    await chrome.runtime.sendMessage({ type: 'auth' });
                }
            });
        }
        else {
        }
    };
    (0, react_1.useEffect)(() => {
        (0, requests_1.getProfile)().then((data) => {
            console.log(data);
            if (data) {
                login(data);
            }
            else {
                chrome.runtime.sendMessage({ type: 'applicaid_logout' });
                logout(user);
            }
        });
    }, []);
    return (<div className='w-full'>
      
      <button onClick={console.log}> scrape </button>
      {user &&
            <div className='w-full'>
          {user.name}
          <generate_1.TabsDemo></generate_1.TabsDemo>
         
         </div>}
      {!user && <login_1.default />}
    </div>);
}
exports.default = App;
