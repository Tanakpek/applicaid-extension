"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const codes_1 = require("./codes");
const BACKEND_URL = 'https://127.0.0.1:3000/';
const FE_ORIGIN = 'https://127.0.0.1:5173/';
const ORIGINS = ['https://www.linkedin.com'];
let throttle = false;
let token = null;
let all_instructions = {};
const fetchA = async (url, options) => {
    token = await chrome.cookies.get({ url: FE_ORIGIN, name: 'token' }, (cookie) => {
        if (cookie) {
            return cookie.value;
        }
        return null;
    });
    options.headers['Authorization'] = `Bearer ${token}`;
    return await fetch(url, options);
};
chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: true });
chrome.tabs.onUpdated.addListener(async (tabId, info, tab) => {
    if (!tab.url)
        return;
    const url = new URL(tab.url);
    if (tab.url.includes(FE_ORIGIN)) {
        chrome.cookies.get({ url: FE_ORIGIN, name: 'token' }, function (cookie) {
            if (cookie) {
                console.log(cookie.value);
            }
            else {
                console.log('Can\'t get cookie! Check the name!');
            }
        });
        console.log('change');
    }
    if (!ORIGINS.includes(url.origin)) {
        await chrome.sidePanel.setOptions({
            tabId,
            enabled: false
        });
    }
    else {
        await chrome.sidePanel.setOptions({
            tabId,
            path: 'index.html',
            enabled: true
        });
    }
});
let t = null;
chrome.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
    let caller = null;
    if (message.type === 'auth') {
        if (!token) {
            await chrome.tabs.create({ url: `${FE_ORIGIN}auth` });
        }
    }
    else if (message.type === 'applicaid_logout') {
        token = null;
    }
    return true;
});
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === 'get_tab') {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            const full_url = tabs[0].url;
            if (true) {
                fetchA(`${BACKEND_URL}scrape_instructions/`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                })
                    .then((response) => {
                    return response.json().then((scrape_instruction_data) => {
                        const origin = new URL(full_url).origin;
                        all_instructions = (0, codes_1.setInstructions)(scrape_instruction_data);
                        const scrape_instructions = (0, codes_1.findScrapeInstructions)(scrape_instruction_data, all_instructions, origin, full_url);
                        sendResponse({
                            data: scrape_instructions ? scrape_instructions : null,
                            origin,
                            full_url,
                            scrape: scrape_instructions ? true : false
                        });
                        return chrome.storage.local.set({ 'applicaid_scrape_instructions': scrape_instruction_data }).then(() => {
                            console.log('saved');
                            return true;
                        });
                    }).catch((err) => {
                        console.log('error while parsing scrape instructions from api');
                        console.log(err);
                        sendResponse({
                            data: null,
                            origin,
                            full_url,
                            scrape: false
                        });
                    });
                });
            }
            else {
                fetchA(`${BACKEND_URL}scraping`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                })
                    .then((response) => {
                    response.json().then((scrape_instruction_data) => {
                        console.log(scrape_instruction_data);
                        sendResponse({
                            data: scrape_instruction_data,
                            origin: new URL(full_url).origin,
                            full_url
                        });
                        return chrome.storage.local.set({ 'applicaid_scrape_instructions': scrape_instruction_data }).then(() => {
                            console.log('saved');
                            return true;
                        });
                    });
                });
            }
        });
    }
    if (message.type === 'scraped_page') {
        console.log('scraped');
        console.log('this');
    }
    return true;
});
