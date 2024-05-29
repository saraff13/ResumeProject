interface RequestObject {
    [key: string]: string | null | undefined;
}

export const validateRequest = (req: RequestObject): string[] => {
    const errorArray = [];
    for (const [key, value] of Object.entries(req)) {
        if (key?.toString() === 'name') {
            if (!value || !value?.includes(' ')) {
                errorArray.push('Name must contain both first name and last name separated by a space');
            }
        } else if (!value) {
            errorArray.push(`${key} cannot be empty`);
        }
    }
    return errorArray;
};

export const secret_key = 'secret_key';