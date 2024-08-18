"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useAuth = exports.AuthProvider = void 0;
const react_1 = require("react");
const AuthContext = (0, react_1.createContext)(null);
const AuthProvider = ({ children }) => {
    const [user, setUser] = (0, react_1.useState)(null);
    const login = (user) => {
        setUser(user);
    };
    const logout = () => {
        setUser(null);
    };
    return (<AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>);
};
exports.AuthProvider = AuthProvider;
const useAuth = () => {
    return (0, react_1.useContext)(AuthContext);
};
exports.useAuth = useAuth;
