export const name = "another-custom-list";
export const availableConfigs = {
    "element": [],
};

export function run() {
    return [
        {
            message: "Another custom-list error",
            rule: name,
            line: 109,
        },
    ];
}
