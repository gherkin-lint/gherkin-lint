import { Feature } from "./cucumber";

export type File = {
    lines: string[];
    relativePath: string;
};

export interface RuleParams<T> {
    feature?: Feature;
    file: File;
    config?: T;
}
