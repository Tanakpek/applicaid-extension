
const run = async () => {
    const doc_body = document.body.querySelector('.application-outlet')
    console.log('sending')
    chrome.runtime.sendMessage({ type: 'get_tab' }, (tab) => {
        console.log(tab)
        chrome.runtime.sendMessage({ type: 'scraped_page', data: doc_body.innerHTML}, (response) => {
            console.log(response)
        })
    })
}
run()