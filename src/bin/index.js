#!/usr/bin/env node

import program from 'commander';
import projectInfo from '../../package.json';

program
	.version(projectInfo.version)
	.description('Discover registered dependencies that are not used in your code.')
	.action(() => {

	});
