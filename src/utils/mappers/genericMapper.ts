/**
 * Maps over an array and returns an array of the mapped values.
 *
 * @param data - The array of data to map over.
 * @param mapper - A function that transforms each item.
 * @returns An array of transformed items.
 */
export function mapArray<T, U>(data: T[], mapper: (item: T, index: number) => U): U[] {
    return data.map(mapper);
}

/**
 * Maps over an object’s values and returns an array of the mapped values.
 *
 * @param data - An object with string keys and values of type T.
 * @param mapper - A function that transforms each key/value pair.
 * @returns An array of transformed items.
 */
export function mapObject<T, U>(data: Record<string, T>, mapper: (key: string, value: T) => U): U[] {
    return Object.entries(data).map(([key, value]) => mapper(key, value));
}

/**
 * Maps multiple entities at once.
 *
 * @param entityMapping - An object where each key has:
 *   - data: the raw entity data
 *   - mapper: a function that maps the raw data to either a single item or an array of items.
 * @returns A flattened array containing the mapped items from all entities.
 */
export function mapMultipleEntities<M extends Record<string, unknown>, U>(
    entityMapping: {
        [K in keyof M]: { data: M[K]; mapper: (data: M[K]) => U | U[] }
    }
): U[] {
    return Object.values(entityMapping).flatMap(({data, mapper}) => {
        const mapped = mapper(data);
        return Array.isArray(mapped) ? mapped : [mapped];
    });
}
