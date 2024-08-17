
export type ScrapeHTMLElement = 'div' | 'p' | 'span' | 'a' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' |
 'button' | 'input' | 'label' | 'select' | 'option' |
  'ul' | 'li' | 'ol' | 'table' | 'tr' | 'td' | 'th' |
   'tfoot' | 'nav' | 'header' | 'footer' | 'section' |
    'article' | 'aside' |  'br' | 'hr'  | 'details' |
     'summary' |  'article' | 'aside' | 'details' |
      'figcaption' | 'figure' | 'footer' | 'header' |
    'section' |"input[type='text']" | "input[type='button']" |
     "input[type='submit']" | "input[type='reset']" | "textarea"


export type ScrapeOperation = 'extract' | 'iterate' | 'select'
export type SelectValueTypes = 'class' | 'id'

export const ContentMaps: { [K in ScrapeHTMLElement]?: string } = {
    "p": "textContent",
  "div": "textContent",
  "span": "textContent",
  "li": "textContent",
  "td": "textContent",
  "th": "textContent",
  "a": "textContent",
  "h1": "textContent",
  "h2": "textContent",
  "h3": "textContent",
  "h4": "textContent",
  "h5": "textContent",
  "h6": "textContent",
  "input[type='text']": "value",
  "textarea": "value",
  "select": "options[selectedIndex].text",
  "button": "textContent",
  "input[type='button']": "value",
  "input[type='submit']": "value",
  "input[type='reset']": "value",
  "label": "textContent",
}

interface Generic {
    op: ScrapeOperation
}

export interface Selects extends Generic {
    op: "select"
    values?: ['r',  SelectValueTypes, RegExp] | [SelectValueTypes, string]
    expected: ScrapeHTMLElement
    cur: ScrapeOp[]
}

export interface Extracts extends Generic {
    op: "extract"
}

export interface Iterates extends Generic {
    op: "iterate"
    values: [SelectValueTypes[], (string | RegExp)[]][]
    expected?: ScrapeHTMLElement
    cur: ScrapeOp[]
}

export type ScrapeOp = Selects | Extracts | Iterates
export type ScrapeInstructions = ScrapeOp[]

export class GenericScraper {
    public instructions : ScrapeInstructions
    public regexp
    constructor(regexp:string, instructions: ScrapeInstructions) {
        this.instructions = instructions
        this.regexp = RegExp(regexp, 'g')
        console.log('created')
    }
    public scrape(): string | string[] | object | object[] {
        console.log('scraped')
        return {}
    }
}