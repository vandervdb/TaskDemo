import { consoleTransport, logger as loggerFactory } from 'react-native-logs';

export type LogLevel = 'debug' | 'info' | 'warn' | 'error';

const defaultLog = loggerFactory.createLogger({
  levels: {
    debug: 0,
    info: 1,
    warn: 2,
    error: 3,
  },
  severity: __DEV__ ? 'debug' : 'warn',
  transport: consoleTransport,
  transportOptions: {},
  enabledExtensions: ['TASK_DEMO'],
  async: true,
  dateFormat: 'time',
  printLevel: true,
  printDate: false,
  fixedExtLvlLength: false,
  enabled: true,
});

const log = defaultLog.extend('TASK_DEMO');

export default log;
