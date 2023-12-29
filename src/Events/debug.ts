import log from '../BaseClient/ClientHelperModules/logError.js';
import DataBase from '../BaseClient/DataBase.js';

const debugEnabled = process.argv.includes('--debug');

export default (message: string) => {
 if (message.includes('Heartbeat')) {
  DataBase.stats
   .updateMany({
    data: {
     heartbeat: message.split(' ').at(-1)?.replace(/\D/g, ''),
    },
   })
   .then();

  log(message);
  return;
 }

 if (!debugEnabled) {
  log(message);
  return;
 }

 log(message, true);
};
