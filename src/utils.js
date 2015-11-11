/**
 * Returns Array reduce callback
 * to aggregate all substrings
 * matching the given regex
 *
 * @param regex
 * @returns {Function}
 */
export function match(regex) {
	return function (all, string) {
		var matches = string.match(regex);
		return matches ? all.concat(matches) : all;
	};
}


/**
 * Returns Array map callback
 * to remove all substrings
 * matching the given regex
 *
 * @param regex
 * @returns {Function}
 */
export function trim(regex) {
	return function (string) {
		return string.replace(regex, '');
	};
}


/**
 * Returns Array filter callback
 * to remove all array elements
 * in the given exclusions
 * array
 *
 * @param excluded
 * @returns {Function}
 */
export function exclude(excluded) {
	return function (item) {
		return 0 > excluded.indexOf(item);
	}
}


/**
 * Array filter callback to
 * remove all duplicate
 * array elements
 *
 * @param item
 * @param index
 * @param arr
 * @returns {boolean}
 */
export function unique(item, index, arr) {
	return arr.indexOf(item) === index;
}


/**
 * Array sort callback to
 * sort string array items
 * alphabetically A -> Z
 *
 * @param a
 * @param b
 * @returns {number}
 */
export function alphabetically(a, b) {
	if (a < b) return -1;
	if (a > b) return 1;
	return 0;
}
