import chalk from "chalk";
import { Result } from "../types/result";

const style = {
    gray: function (text) {
        return chalk.gray(text);
    },
    underline: function (text) {
        return chalk.underline(text);
    },
};

function stylizeFilePath(filePath) {
    return style.underline(filePath);
}

function stylizeError(error, maxLineLength, maxMessageLength, addColors) {
    const indent = "  "; // indent 2 spaces so it looks pretty
    const errorLinePadded = error.line.toString().padEnd(maxLineLength);
    const errorLineStylized = addColors ? style.gray(errorLinePadded) : errorLinePadded;
    const errorRuleStylized = addColors ? style.gray(error.rule) : error.rule;
    return indent + errorLineStylized + indent + chalk.red("error") + indent + error.message.padEnd(maxMessageLength)
        + indent + errorRuleStylized;
}

function getMaxLineLength(result: Result): number {
    let length = 0;
    result.errors?.forEach(function (error) {
        const errorLength = error.line?.toString().length || 0;
        if (errorLength > length) {
            length = errorLength;
        }
    });
    return length;
}

function getMaxMessageLength(result: Result, maxLineLength: number, consoleWidth: number): number {
    let length = 0;
    result.errors?.forEach(function (error) {
        const errorStr = error.message.toString();
        // Get the length of the formatted error message when no extra padding is applied
        // If the formatted message is longer than the console width, we will ignore its length
        const expandedErrorStrLength = stylizeError(error, maxLineLength, 0, false).length;
        if (errorStr.length > length && expandedErrorStrLength < consoleWidth) {
            length = errorStr.length;
        }
    });
    return length;
}

export function printResults(results: Result[]) {
    // If the console is tty, get its width and use it to ensure we don't try to write messages longer
    // than the console width when possible
    let consoleWidth = Infinity;
    if (process.stdout.isTTY) {
        consoleWidth = process.stdout.columns;
    }
    const messages: string[] = [];
    results.forEach(function (result) {
        if (result.errors?.length) {
            const maxLineLength = getMaxLineLength(result);
            const maxMessageLength = getMaxMessageLength(result, maxLineLength, consoleWidth);
            messages.push(stylizeFilePath(result.filePath));
            result.errors.forEach(function (error) {
                messages.push((stylizeError(error, maxLineLength, maxMessageLength, true)));
            });
            messages.push("\n");
        }
    });
    process.stdout.write(messages.join("\n"));
}
