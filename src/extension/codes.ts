import { ScrapeInstructions } from "./content_script";
import { ScrapeInstrApiResponse } from "./types";

export const findScrapeInstructions = (api_response: ScrapeInstrApiResponse, all_instructions: {[key:string] : [RegExp, ScrapeInstructions][]}, origin:string, full_url:string) => {
    const group = all_instructions[origin]
    if(!group) return false
    for(const pattern of group){
        if (pattern[0].test(full_url)){
            return pattern[1]
        }
    }
    return false
}

export const setInstructions = (api_response: ScrapeInstrApiResponse) => {
    const newMap: { [key: string]: [RegExp, ScrapeInstructions][] } = {}
    for(const job_board_instructions of api_response.data){
        if (newMap[job_board_instructions.root_url]){
            newMap[job_board_instructions.root_url].push([RegExp(job_board_instructions.path_url), job_board_instructions.instructions])
        }
        else{
            newMap[job_board_instructions.root_url] = [[RegExp(job_board_instructions.path_url), job_board_instructions.instructions]]
        }
        
    }
    return newMap
}

export type scrapeInterprocessResponse = {
    data: null | ScrapeInstructions,
    origin,
    full_url,
    scrape: boolean
}