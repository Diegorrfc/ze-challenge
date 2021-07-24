module.exports = {
  packageManager: 'npm',
  reporters: ['html', 'clear-text', 'progress'],
  timeoutMS: 10000,
  concurrency: 2,
  testRunner: 'jest',
  jest: {
    projectType: 'custom',
    config: require('./jest.config.js'),
    enableFindRelatedTests: true
  },
  coverageAnalysis: 'off',
  tsconfigFile: 'tsconfig.json',
  mutate: [
    'src/**/*.ts',
    '!src/**/*.spec.ts',
    '!src/infra/mongodb/helpers/log-schema.ts',
    '!src/infra/mongodb/helpers/partner-schema.ts',
    '!src/main/server.ts',
    '!src/main/config/db-connection.ts',
    '!src/main/start-app-with-cluster.ts'
  ]
}
