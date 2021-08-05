export type ResultError = {
    line: number | string | undefined | null;
    message: string;
    rule: string;
};
export type Result = {
    errors: null | ResultError[];
    filePath: string;
};
export type FatalError = { data: any; };
