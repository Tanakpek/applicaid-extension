import { scrapeInterprocessResponse } from "./codes"


export type ScrapeHTMLElement = 'DIV' | 'P' | 'SPAN' | 'A' | 'H1' | 'H2' | 'H3' | 'H4' | 'H5' | 'H6' |
    'BUTTON' | 'INPUT' | 'LABEL' | 'SELECT' | 'OPTION' |
    'UL' | 'LI' | 'OL' | 'TABLE' | 'TR' | 'TD' | 'TH' |
    'TFOOT' | 'NAV' | 'HEADER' | 'FOOTER' | 'SECTION' |
    'ARTICLE' | 'ASIDE' | 'BR' | 'HR' | 'DETAILS' |
    'SUMMARY' | 'ARTICLE' | 'ASIDE' | 'DETAILS' |
    'FIGCAPTION' | 'FIGURE' | 'FOOTER' | 'HEADER' |
    'SECTION' | "INPUT[TYPE='TEXT']" | "INPUT[TYPE='BUTTON']" |
    "INPUT[TYPE='SUBMIT']" | "INPUT[TYPE='RESET']" | "TEXTAREA" | "STRONG"
export type ScrapeOperation = 'extract' | 'iterate' | 'select'
export type SelectValueTypes = 'class' | 'id'
export const ContentMaps: { [K in ScrapeHTMLElement]?: string } = {
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
}
type CurrentKeys = keyof typeof ContentMaps
const TypedMap = ContentMaps as { [K in CurrentKeys]: string }

interface Generic {
    op: ScrapeOperation
}
export interface Selects extends Generic {
    op: "select"
    values?: ['r', SelectValueTypes, RegExp] | [SelectValueTypes, string]
    expected?: ScrapeHTMLElement
    idx?: number
    cur: [ScrapeOp]
}
export interface Extracts extends Generic {
    op: "extract"
    key: 'recruiter' | 'description' | 'job_title' | 'company' 
}
export interface Iterates extends Generic {
    op: "iterate"
    values: [SelectValueTypes, string][]
    expected?: ScrapeHTMLElement
    cur: ScrapeOp[]
}
export type ScrapeOp = Selects | Extracts | Iterates
export type ScrapeInstructions = ScrapeOp[]
interface ScrapeValue {
    recruiter: string,
    description: string,
    job_title: string,
    company: string,
}

export class GenericScraper {
    public instructions: ScrapeInstructions
    public regexp
    constructor(instructions: ScrapeInstructions) {
        this.instructions = instructions
    }
    public extract(element: Element, value: ScrapeValue, info_type:string = 'description'): void  {
        value[info_type] += element[TypedMap[element.tagName]] + '\n'
    }
    public scrape(element: Element, operation: ScrapeOp, value: ScrapeValue): void{
// EXTRACT
        if(operation.op === 'extract') {
            this.extract(element, value, operation.key)
        }
// SELECT
        else if(operation.op === 'select') {
            if(operation.values?.length === 2) {
                let select_string = ''
                select_string = operation.values[0] === 'id' ? `#${operation.values[1]}` : `.${operation.values[1]}`
                select_string = operation.expected ? `${operation.expected.toLowerCase()}${select_string}` : select_string
                let elements:NodeList | (Node | Element)[]   = (element as Element).querySelectorAll(select_string)
                const selected  = operation.idx ? elements[operation.idx] : elements.length > 0 ? elements[0] : null
                if(selected) {
                    this.scrape(selected as Element, operation.cur[0], value)
                } 
            } else { } // im gonna skip regex for no
        }
// ITERATE
        else if (operation.op === 'iterate') {
            if (operation.values.length === 2) {
                const selectors = operation.values?.map((value) => { return operation.expected?.toLowerCase() || '' + (value[0] === 'id' ? `#${value[1]}` : `.${value[1]}`)}).join(',')
                let elements: NodeList | (Node | Element)[] = (element as Element).querySelectorAll(selectors)
                elements.forEach((element, idx) => {
                    for(const op of operation.cur) {
                        this.scrape(element as Element, op, value)
                    }
                })
            } else { } // im gonna skip regex for no
        }
    }
}

const run = async () => {
    try{
        const doc_body = document.body
        chrome.runtime.sendMessage({ type: 'get_tab' }, (tab: scrapeInterprocessResponse) => {
            const resp: ScrapeValue = { recruiter: '', description: '', job_title: '', company: '' }
            const scraper = new GenericScraper(tab.data)
            // scraper.scrape(doc_body, tab.data[0], resp)
            console.log(tab.data)
            chrome.runtime.sendMessage({ type: 'scraped_page', resp }, (response) => {
            })
        })
    }catch(e) {
        console.log(e)
    }
    
}
run()