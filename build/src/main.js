"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const client_1 = __importDefault(require("react-dom/client"));
const App_tsx_1 = __importDefault(require("./App.tsx"));
require("./index.css");
const auth_provider_tsx_1 = require("./lib/auth-provider.tsx");
client_1.default.createRoot(document.getElementById('root')).render(<auth_provider_tsx_1.AuthProvider>
    <react_1.default.StrictMode>
      <App_tsx_1.default />
    </react_1.default.StrictMode>
  </auth_provider_tsx_1.AuthProvider>);
