// libraries
// import Raven from 'raven-js';

const init = () => {
  // Raven.config('https://37a76e998b354dd980a062691fe3b0a7@sentry.io/1358495', {
  //   release: '1-0-0',
  //   environment: 'development-test'
  // }).install();
};

const log = error => {
  console.log(error);
  // Raven.captureException(error)
};

export default {
  init,
  log
};
