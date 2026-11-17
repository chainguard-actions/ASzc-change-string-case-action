// Self-contained implementation (no third-party runtime dependencies).
// The previously required '@actions/github' was never used, and the small
// subset of '@actions/core' needed here is implemented below, so none of the
// vendored node_modules (and their known-vulnerable transitive dependencies
// such as undici / @octokit) are loaded at runtime.
const fs = require('fs');
const os = require('os');
const crypto = require('crypto');

function toCommandValue(input) {
    if (input === null || input === undefined) {
        return '';
    } else if (typeof input === 'string' || input instanceof String) {
        return input;
    }
    return JSON.stringify(input);
}

function escapeData(s) {
    return toCommandValue(s)
        .replace(/%/g, '%25')
        .replace(/\r/g, '%0D')
        .replace(/\n/g, '%0A');
}

function escapeProperty(s) {
    return toCommandValue(s)
        .replace(/%/g, '%25')
        .replace(/\r/g, '%0D')
        .replace(/\n/g, '%0A')
        .replace(/:/g, '%3A')
        .replace(/,/g, '%2C');
}

const core = {
    getInput(name) {
        const val = process.env[`INPUT_${name.replace(/ /g, '_').toUpperCase()}`] || '';
        return val.trim();
    },
    setOutput(name, value) {
        const filePath = process.env['GITHUB_OUTPUT'] || '';
        if (filePath) {
            const delimiter = `ghadelimiter_${crypto.randomUUID()}`;
            const convertedValue = toCommandValue(value);
            if (name.includes(delimiter)) {
                throw new Error(`Unexpected input: name should not contain the delimiter "${delimiter}"`);
            }
            if (convertedValue.includes(delimiter)) {
                throw new Error(`Unexpected input: value should not contain the delimiter "${delimiter}"`);
            }
            if (!fs.existsSync(filePath)) {
                throw new Error(`Missing file at path: ${filePath}`);
            }
            fs.appendFileSync(
                filePath,
                `${name}<<${delimiter}${os.EOL}${convertedValue}${os.EOL}${delimiter}${os.EOL}`,
                { encoding: 'utf8' }
            );
            return;
        }
        process.stdout.write(os.EOL);
        process.stdout.write(`::set-output name=${escapeProperty(name)}::${escapeData(value)}${os.EOL}`);
    },
    setFailed(message) {
        process.exitCode = 1;
        process.stdout.write(`::error::${escapeData(message)}${os.EOL}`);
    },
};

try {
    const inputStr = core.getInput('string');
    console.log(`Manipulating string: ${inputStr}`);

    const lowercase = inputStr.toLowerCase();
    console.log(`lowercase: ${lowercase}`);
    core.setOutput("lowercase", lowercase);

    const uppercase = inputStr.toUpperCase();
    console.log(`uppercase: ${uppercase}`);
    core.setOutput("uppercase", uppercase);

    const capitalized = inputStr.charAt(0).toUpperCase() + inputStr.slice(1).toLowerCase();
    console.log(`capitalized: ${capitalized}`);
    core.setOutput("capitalized", capitalized);
} catch (error) {
    core.setFailed(error.message);
}
