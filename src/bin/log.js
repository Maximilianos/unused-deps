/**
 * Log the given packages to
 * the console.
 *
 * @param message
 * @returns {Function}
 */
export default function logPackages(message) {
	return function (packages) {
		console.log('===>', packages.length, message, '\n', JSON.stringify(packages, null, 2));
		return packages;
	};
}
