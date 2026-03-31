module.exports = {
  default: {
    require: ['step-definitions/**/*.js'],
    format: ['html:cucumber-report.html'],
    formatOptions: { snippetInterface: 'async-await' },
    paths: ['features/**/*.feature'],
    dryRun: false,
    failFast: false,
    snippets: true,
    source: true,
    strict: false,
    timeout: 60000,
    ignoreUndefinedDefinitions: false,
  },
};