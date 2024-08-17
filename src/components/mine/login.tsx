import { useAuth } from "@/lib/auth-provider";
import { getProfile } from "@/lib/requests";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { google_oauth_url } from "@/config";

function LoginView() {
    const [count, setCount] = useState(0)
    const { user, login, logout } = useAuth()
    const handleClick = async () => {
        // Handle click
        if (!user) {
            await chrome.runtime.sendMessage({ type: 'auth' });
        }
        else {

        }
        //await chrome.runtime.sendMessage({ type: 'auth' });
    };

    useEffect(() => {
        getProfile().then((data) => {
            if (data) {
                login(data)
            } else {
                chrome.runtime.sendMessage({ type: 'applicaid_logout' });
            }
        })
    }, []);

    return (
        <div>
            <h1>Applicaid</h1>
            <Button onClick={handleClick}>Login</Button>
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
        </div>
    )
}

export default LoginView
