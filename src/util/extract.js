import request from 'request-promise-native';
import readFile from './readFile';

function extract(props) {
  return props.isProduction ? request(props.sourceUrl) : readFile(props.file);
}

export default extract;
