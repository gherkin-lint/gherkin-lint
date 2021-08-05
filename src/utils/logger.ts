import chalk from "chalk";

export function boldError(msg: string) {
    console.error(chalk.bold(msg));
}

export function error(msg: string) {
    console.error(chalk.red(msg));
}
