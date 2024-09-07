export function parsePagination(limit: string | undefined, offset: string | undefined) {
    const parsedLimit = parseInt(limit || '25', 10);
    const parsedOffset = parseInt(offset || '0', 10);

    if (isNaN(parsedLimit) || isNaN(parsedOffset)) {
        throw new Error('Limit and offset must be valid integers');
    }

    if (parsedLimit < 0 || parsedOffset < 0) {
        throw new Error('Limit and offset must be non-negative integers');
    }

    return { limit: parsedLimit, offset: parsedOffset };
}
