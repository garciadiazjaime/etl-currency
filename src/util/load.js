import request from 'request-promise-native'

const load = (props, data) => {
  const options = {
    method: 'POST',
    uri: `${props.apiUrl}`,
    body: {
      data
    },
    json: true
  }
  return request(options)
};

export default load
