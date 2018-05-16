import request from 'request-promise-native';
import readFile from './readFile';

function extract(props) {
  if (!props || !props.sourceUrl || !props.file) {
    throw (new Error('invalid parameters'));
  }

  return props.isProduction ? request(props.sourceUrl) : readFile(props.file);
}

export default extract;
