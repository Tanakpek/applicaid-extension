"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const auth_provider_1 = require("@/lib/auth-provider");
const requests_1 = require("@/lib/requests");
const react_1 = require("react");
const button_1 = require("../ui/button");
function LoginView() {
    const [count, setCount] = (0, react_1.useState)(0);
    const { user, login, logout } = (0, auth_provider_1.useAuth)();
    const handleClick = async () => {
        if (!user) {
            await chrome.runtime.sendMessage({ type: 'auth' });
        }
        else {
        }
    };
    (0, react_1.useEffect)(() => {
        (0, requests_1.getProfile)().then((data) => {
            if (data) {
                login(data);
            }
            else {
                chrome.runtime.sendMessage({ type: 'applicaid_logout' });
            }
        });
    }, []);
    return (<div>
            <h1>Applicaid</h1>
            <button_1.Button onClick={handleClick}>Login</button_1.Button>
            <div className="card">
                <button onClick={() => setCount((count) => count + 1)}>
                    count is {count}
                </button>
                <p>
                    Edit <code>src/App.tsx</code> and save to test HMR
                </p>
            </div>
            <p className="read-the-docs">
                Click on the Vite and React logos to learn more
            </p>
        </div>);
}
exports.default = LoginView;
