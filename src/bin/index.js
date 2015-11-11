#!/usr/bin/env node

import program from 'commander';
import projectInfo from '../../package.json';

program
	.version(projectInfo.version)
	.description()

program
	.command('');
