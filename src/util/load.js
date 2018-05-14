import request from 'request-promise-native';

function load(props, data) {
  if (!props || !props.apiUrl) {
    throw (new Error('invalid parameters'));
  }

  const options = {
    method: 'POST',
    uri: `${props.apiUrl}`,
    body: {
      data,
    },
    json: true,
  };

  return props.isProduction ? request(options) : data;
}

export default load;
