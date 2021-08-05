export const name = "another-custom";
export const availableConfigs = [];

export function run() {
    return [
        {
            message: "Another custom error",
            rule: name,
            line: 456,
        },
    ];
}
