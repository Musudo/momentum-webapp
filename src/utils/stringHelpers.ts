type PatternReplacementPair = {
    pattern: string;
    replacement: string;
};

/**
 *
 * @param value
 * @returns
 */
export const getFirstLetter = (value: string): string => value.slice(0, 1);

/**
 *
 * @param str
 * @returns
 */
export const kebabize = (str: string) =>
    str.replace(
        /[A-Z]+(?![a-z])|[A-Z]/g,
        ($, ofs) => (ofs ? "-" : "") + $.toLowerCase()
    );

/**
 *
 * @param input
 * @param replacements
 * @returns
 */
export const replacePatterns = (
    input: string,
    replacements: PatternReplacementPair[]
): string => {
    let result = input;
    replacements.forEach(({pattern, replacement}) => {
        result = result.replace(pattern, replacement);
    });
    return result;
};

/**
 * Removes all whitespaces, makes everything lower case and removes give substring to normalize given string
 * @param str string to normalize
 * @param partToRemove substring which will be removed
 */
export const normalizeString = (str: string, partToRemove: string = "") => {
    const partToRemoveRegex = new RegExp(partToRemove + '$', 'i');
    return str
        .replace(/\s+/g, '') // remove all whitespace
        .toLowerCase()
        .replace(partToRemoveRegex, '');
}

/**
 * Makes the first letter capital
 * @param str string to capitalize
 * @returns
 */
export const capitalizeFirstLetter = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
};

/**
 * Makes the first letter non-capital
 * @param str string to uncapitalize
 * @returns
 */
export const unCapitalizeFirstLetter = (str: string) => {
    return str.charAt(0).toLowerCase() + str.slice(1);
};

/**
 *
 * @param address
 */
export const formatAddress = (address: any): string => {
    const {countryCode, city, postalCode, street, buildingNumber, postbox = ""} = address;
    let formattedAddress = `${countryCode}, ${city} ${postalCode}, ${street} ${buildingNumber}`;

    if (postbox) {
        formattedAddress += ` ${postbox}`;
    }

    return formattedAddress;
};