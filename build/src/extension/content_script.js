"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GenericScraper = exports.ContentMaps = void 0;
exports.ContentMaps = {
    "P": "textContent",
    "DIV": "textContent",
    "SPAN": "textContent",
    "LI": "textContent",
    "TD": "textContent",
    "TH": "textContent",
    "A": "textContent",
    "H1": "textContent",
    "H2": "textContent",
    "H3": "textContent",
    "H4": "textContent",
    "H5": "textContent",
    "H6": "textContent",
    "INPUT[TYPE='TEXT']": "value",
    "TEXTAREA": "value",
    "SELECT": "options[selectedIndex].text",
    "BUTTON": "textContent",
    "INPUT[TYPE='BUTTON']": "value",
    "INPUT[TYPE='SUBMIT']": "value",
    "INPUT[TYPE='RESET']": "value",
    "LABEL": "textContent",
    "STRONG": "textContent"
};
const TypedMap = exports.ContentMaps;
class GenericScraper {
    constructor(instructions) {
        this.instructions = instructions;
    }
    extract(element, value, info_type = 'description') {
        value[info_type] += element[TypedMap[element.tagName]] + '\n';
    }
    scrape(element, operation, value) {
        var _a, _b;
        if (operation.op === 'extract') {
            this.extract(element, value, operation.key);
        }
        else if (operation.op === 'select') {
            if (((_a = operation.values) === null || _a === void 0 ? void 0 : _a.length) === 2) {
                let select_string = '';
                select_string = operation.values[0] === 'id' ? `#${operation.values[1]}` : `.${operation.values[1]}`;
                select_string = operation.expected ? `${operation.expected.toLowerCase()}${select_string}` : select_string;
                let elements = element.querySelectorAll(select_string);
                const selected = operation.idx ? elements[operation.idx] : elements.length > 0 ? elements[0] : null;
                if (selected) {
                    this.scrape(selected, operation.cur[0], value);
                }
            }
            else { }
        }
        else if (operation.op === 'iterate') {
            if (operation.values.length === 2) {
                const selectors = (_b = operation.values) === null || _b === void 0 ? void 0 : _b.map((value) => { var _a; return ((_a = operation.expected) === null || _a === void 0 ? void 0 : _a.toLowerCase()) || '' + (value[0] === 'id' ? `#${value[1]}` : `.${value[1]}`); }).join(',');
                let elements = element.querySelectorAll(selectors);
                elements.forEach((element, idx) => {
                    for (const op of operation.cur) {
                        this.scrape(element, op, value);
                    }
                });
            }
            else { }
        }
    }
}
exports.GenericScraper = GenericScraper;
const run = async () => {
    const doc_body = document.body;
    chrome.runtime.sendMessage({ type: 'get_tab' }, (tab) => {
        const resp = { recruiter: '', description: '', job_title: '', company: '' };
        const scraper = new GenericScraper(tab.data);
        scraper.scrape(doc_body, tab.data[0], resp);
        chrome.runtime.sendMessage({ type: 'scraped_page', resp }, (response) => {
        });
    });
};
run();
