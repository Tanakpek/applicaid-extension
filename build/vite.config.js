"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importStar(require("path"));
const plugin_react_1 = __importDefault(require("@vitejs/plugin-react"));
const vite_1 = require("vite");
const vite_plugin_node_polyfills_1 = require("vite-plugin-node-polyfills");
const plugin_commonjs_1 = __importDefault(require("@rollup/plugin-commonjs"));
exports.default = (0, vite_1.defineConfig)({
    build: {
        commonjsOptions: { transformMixedEsModules: true },
        rollupOptions: {
            input: {
                service_worker: (0, path_1.resolve)(__dirname, 'src/extension/service_worker.ts'),
                content_script: (0, path_1.resolve)(__dirname, 'src/extension/content_script.ts'),
                sidebar: (0, path_1.resolve)(__dirname, 'index.html'),
            },
            output: {
                entryFileNames: '[name].js',
                chunkFileNames: 'c[name]-[hash].js',
                assetFileNames: 'assets/[name]-[hash][extname]',
            },
        },
        outDir: 'dist',
    },
    plugins: [
        (0, plugin_commonjs_1.default)(),
        (0, vite_plugin_node_polyfills_1.nodePolyfills)(),
        (0, plugin_react_1.default)(),
    ],
    server: {
        port: 6000
    },
    resolve: {
        alias: {
            "@": path_1.default.resolve(__dirname, "./src"),
        },
    },
});
