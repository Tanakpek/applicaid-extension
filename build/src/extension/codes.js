"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setInstructions = exports.findScrapeInstructions = void 0;
const findScrapeInstructions = (api_response, all_instructions, origin, full_url) => {
    const group = all_instructions[origin];
    if (!group)
        return false;
    for (const pattern of group) {
        if (pattern[0].test(full_url)) {
            return pattern[1];
        }
    }
    return false;
};
exports.findScrapeInstructions = findScrapeInstructions;
const setInstructions = (api_response) => {
    const newMap = {};
    for (const job_board_instructions of api_response.data) {
        if (newMap[job_board_instructions.root_url]) {
            newMap[job_board_instructions.root_url].push([RegExp(job_board_instructions.path_url), job_board_instructions.instructions]);
        }
        else {
            newMap[job_board_instructions.root_url] = [[RegExp(job_board_instructions.path_url), job_board_instructions.instructions]];
        }
    }
    return newMap;
};
exports.setInstructions = setInstructions;
