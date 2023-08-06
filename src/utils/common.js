/**
 * Случайным образом перемешивает элементы массива.
 *
 * @param {Array} arr - Массив для перемешивания.
 * @returns {Array} - Новый массив с элементами, перемешанные случайным образом.
 */
export const shuffle = (arr) => [...arr].sort(() => 0.5 - Math.random());


/**
 * Создает строку URL-адреса с параметрами запроса на основе базового URL-адреса и объекта параметров.
 *
 * @param {string} url - Базовый URL, к которому будут добавлены параметры запроса.
 * @param {Object} params - Объект, представляющий параметры запроса.
 * @returns {string} - Строка URL с добавленными параметрами запроса.
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
 * Вычисляет сумму всех элементов в массиве.
 *
 * @param {Array} arr - Массив чисел, для которых будет вычислена сумма.
 * @returns {number} - Сумма всех элементов массива.
 */
export const sumBy = (arr) => arr.reduce((prev, cur) => prev + cur, 0);

