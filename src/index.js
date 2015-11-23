import readGlob from 'read-glob-promise';
import {match, trim, exclude, unique, alphabetically} from './utils';


/**
 * Gather the package names of
 * the dependencies registered
 * in your package.json
 *
 * @param projectConfig
 * @param locations
 * @returns {Array}
 */
export function getRegisteredDependencies(projectConfig, locations) {
	return locations.reduce(
		(packages, key) => projectConfig[key]
			? packages.concat(Object.keys(projectConfig[key]))
			: packages
		, []);
}


/**
 * Gather the package names of
 * the dependencies used in the
 * given codebase
 *
 * @param glob
 * @param matchRegex
 * @param trimRegex
 * @returns {*}
 */
export function getUsedDependencies(glob, matchRegex, trimRegex) {
	return readGlob(glob, 'utf8')
		.then(contents =>
			contents
				.reduce(match(matchRegex), [])
				.filter(unique)
				.map(trim(trimRegex))
				.sort(alphabetically)
		);
}


/**
 * Approximately return packages that are
 * registered in your package json but
 * not used in your code
 *
 * @param usedPackages
 * @param locations
 * @param excluded
 * @param projectConfig
 * @returns {*}
 */
export function getUnusedDependencies(usedPackages, {
	// the package.json keys to use to determine
	// registered dependencies
	locations = ['dependencies', 'devDependencies'],

	// any packages you would want to exclude
	// from the final list
	excluded = [],

	// package json
	projectConfig = require('./package.json')
} = {}) {
	return getRegisteredDependencies(projectConfig, locations)
		.filter(exclude(usedPackages))
		.filter(exclude(excluded));
}


/**
 * Approximately list packages that are
 * registered in your package json but
 * not used in your code
 *
 * @param glob - the files to read to determine actual used packages
 * @param matchRegex -
 * @param trimRegex -
 * @param locations -
 * @param excluded -
 * @param projectConfig -
 */
export default function unusedDependencies(glob, {
	// the regex to use to extract all the explicit
	// dependency uses from the codebase
	matchRegex = (/require\(('|")[a-z0-9\-_\\/]+('|")\)/gi),

	// the regex to use to trim the
	// matched strings
	trimRegex = (/(require\()|('|")|\)/gi),

	// the package.json keys to use to determine
	// registered dependencies
	locations = ['dependencies', 'devDependencies'],

	// any packages you would want to exclude
	// from the final list
	excluded = [],

	// package json
	projectConfig = require('./package.json')
} = {}) {
	getUsedDependencies(glob, matchRegex, trimRegex)
		.then(log('used packages:'))
		.then(usedDependencies => getUnusedDependencies(usedDependencies, {locations, excluded, projectConfig}))
		.then(log('registered but not explicitly used packages:'))
		.catch(err => console.error(err));
}
