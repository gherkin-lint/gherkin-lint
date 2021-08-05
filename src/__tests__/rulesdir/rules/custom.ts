export const name = "custom";
export const availableConfigs = [];

export function run() {
    return [
        {
            message: "Custom error",
            rule: name,
            line: 123,
        },
    ];
}
