import { ResultError } from "../types/result";
import * as gherkinUtils from "./utils/gherkin";

export const name = "keywords-in-logical-order";

export function run(feature) {
    if (!feature) {
        return [];
    }
    let errors: ResultError[] = [];
    feature.children.forEach((child) => {
        const node = child.background || child.scenario;
        const keywordList = ["given", "when", "then"];
        let maxKeywordPosition = 0;
        node.steps.forEach((step) => {
            const keyword = gherkinUtils.getLanguageInsitiveKeyword(
                step,
                feature.language
            );
            let keywordPosition = keywordList.indexOf(keyword);
            if (keywordPosition === -1) {
                //   not found
                return;
            }
            if (keywordPosition < maxKeywordPosition) {
                let maxKeyword = keywordList[maxKeywordPosition];
                errors.push(createError(step, maxKeyword));
            }
            maxKeywordPosition =
                Math.max(maxKeywordPosition, keywordPosition) || keywordPosition;
        });
    });
    return errors;
}

function createError(step, maxKeyword) {
    return {
        message: `Step "${step.keyword}${step.text}" should not appear after step using keyword ${maxKeyword}`,
        rule: name,
        line: step.location.line,
    };
}
