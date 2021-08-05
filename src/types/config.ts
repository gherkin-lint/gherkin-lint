export type ConfigType = {
    indentation: string;
    "name-length": Array<string | {
        Feature: number;
    }>;
    "new-line-at-eof": string[];
    "no-background-only-scenario": string;
    "no-dupe-feature-names": string;
    "no-dupe-scenario-names": string | string[];
    "no-duplicate-tags": string;
    "no-empty-background": string;
    "no-empty-file": string;
    "no-files-without-scenarios": string;
    "no-homogenous-tags": string;
    "no-multiple-empty-lines": string;
    "no-partially-commented-tag-lines": string;
    "no-restricted-tags": Array<string | {
        tags: string[];
    }>;
    "no-scenario-outlines-without-examples": string;
    "no-superfluous-tags": string;
    "no-trailing-spaces": string;
    "no-unnamed-features": string;
    "no-unnamed-scenarios": string;
    "no-unused-variables": string;
    "one-space-between-tags": string;
    "scenario-size": Array<string | {
        "steps-length": {
            Background: number;
            Scenario: number;
        };
    }>;
    "use-and": string;
};
export type RulesKey = keyof ConfigType;
export type Rules = Partial<{
    [K in RulesKey]: ConfigType[K];
}>;
export type RulesLoaded = Partial<{
    name: keyof Rules;
    run: Function;
    lint?: Function;
    availableConfigs: ConfigType[keyof Rules];
}>;
