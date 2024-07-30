export type ScrapeHTMLElement = 'div' | 'p' | 'span' | 'a' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'button' | 'input' | 'label' | 'select' | 'option' | 'ul' | 'li' | 'ol' | 'table' | 'tr' | 'td' | 'th' | 'tfoot' | 'nav' | 'header' | 'footer' | 'section' | 'article' | 'aside' |  'br' | 'hr'  | 'details' | 'summary' |  'article' | 'aside' | 'details' | 'figcaption' | 'figure' | 'footer' | 'header' | 'section' 

export type ScrapeOperation = 'extract' | 'iterate' | 'select'

export type SelectValueTypes = 'class' | 'id'

export const ContentMaps: { [K in ScrapeHTMLElement]?: string } = {

}

interface Generic {
    op: ScrapeOperation
}

export interface Select extends Generic {
    op: "select"
    values?: ['r',  SelectValueTypes, RegExp] | [SelectValueTypes, string]
    expected: ScrapeHTMLElement
    cur: ScrapeOp[]
}

export interface Extract extends Generic {
    op: "extract"
}

export interface Iterate extends Generic {
    op: "iterate"
    values: [SelectValueTypes[], (string | RegExp)[]][]
    expected?: ScrapeHTMLElement
    cur: ScrapeOp[]
}

export type ScrapeOp = Select | Extract | Iterate