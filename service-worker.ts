

//CONFIG
const BACKEND_URL = 'https://127.0.0.1:3000/'
const FE_ORIGIN = 'https://127.0.0.1:5173/'
const ORIGINS = ['https://www.linkedin.com']



const fetchA = async (url: string, options: any) => {
    const token = await chrome.cookies.get({ url: FE_ORIGIN, name: 'token' }, (cookie) => {
        if (cookie) {
            return cookie.value
        }
        return null
    })
    options.headers['Authorization'] = `Bearer ${token}`
    return await fetch(url, options)
}

let throttle:boolean = false
//chrome.sidePanel.open({path: 'index.html', width: 500, height: 500})
let token = null

chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: true })
chrome.tabs.onUpdated.addListener(async (tabId, info, tab) => {
    if (!tab.url) return;
    const url = new URL(tab.url);
    
    if (tab.url.includes(FE_ORIGIN)) {
        chrome.cookies.get({ url: FE_ORIGIN, name: 'token' },
            function (cookie) {
                if (cookie) {
                    console.log(cookie.value);
                }
                else {
                    console.log('Can\'t get cookie! Check the name!');
                }
        });
        console.log('change')
    }
    // Enables the side panel on google.com
    if (!ORIGINS.includes(url.origin)) {
        await chrome.sidePanel.setOptions({
            tabId,
            enabled: false
        });
    }
    else{
        if(throttle) return
        await chrome.sidePanel.setOptions({
            tabId,
            path: 'index.html',
            enabled: true
        });
        throttle = true
        setTimeout(() => {
            throttle = false
        }, 1000)
    } 
})
let t: any = null
chrome.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
    let caller = null
    console.log(message)
    if(message.type === 'auth'){
        if(!token){
            await chrome.tabs.create({ url: `${FE_ORIGIN}auth` })
        }
        
    }
    if(message.type === 'applicaid_logout'){
        token = null
    }
    
})




