/**
 * Shuffles the elements of an array randomly using the Fisher-Yates algorithm.
 *
 * @param {Array} arr - The array to be shuffled.
 * @returns {Array} - A new array with the elements shuffled randomly.
 */
export const shuffle = (arr) => [...arr].sort(() => 0.5 - Math.random());


/**
 * Builds a URL string with query parameters based on a base URL and an object of parameters.
 *
 * @param {string} url - The base URL to which the query parameters will be added.
 * @param {Object} params - An object representing the query parameters.
 * @returns {string} - The URL string with the appended query parameters.
 */
export const buildUrl = (url, params) => {
  let urlWithParams = url;

  Object.entries(params).forEach(([key, value], i) => {
    const sign = !i ? "?" : "&";
    urlWithParams += `${sign}${key}=${value}`;
  });

  return urlWithParams;
};

/**
 * Calculates the sum of all elements in an array of numbers.
 *
 * @param {Array} arr - The array of numbers for which the sum will be calculated.
 * @returns {number} - The sum of all elements in the array.
 */
export const sumBy = (arr) => arr.reduce((prev, cur) => prev + cur, 0);

