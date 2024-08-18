import { ScrapeInstructions } from "./content_script";

export interface ScrapeInstrApiResponse {
    data: {
        instructions: ScrapeInstructions,
        job_board: string
        path_url: string,
        id: string,
        root_url:string
    }[]
    ts: number
}