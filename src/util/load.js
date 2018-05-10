import request from 'request-promise-native';

const load = (props, data) => {
  const options = {
    method: 'POST',
    uri: `${props.apiUrl}`,
    body: {
      data,
    },
    json: true,
  };
  return props.isProduction ? request(options) : data;
};

export default load;
