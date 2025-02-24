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
 * Makes the first letter capital
 * @param param
 * @returns
 */
export const capitalizeFirstLetter = (param: string) => {
    return param.charAt(0).toUpperCase() + param.slice(1);
};

/**
 * Makes the first letter non-capital
 * @param param
 * @returns
 */
export const unCapitalizeFirstLetter = (param: string) => {
    return param.charAt(0).toLowerCase() + param.slice(1);
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