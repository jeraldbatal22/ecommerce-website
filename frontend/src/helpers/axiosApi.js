import axios from 'axios'

const url = 'http://localhost:7000/api/'

export const getRequest = (endpoint, token = false) => {
  let header = {}
  if (token === true) {
    console.log('asdsad')
  }

  const result = axios.get(`${url}${endpoint}`, { headers: header }).then((res) => {
    return res.data
  }).catch((err) => {
    console.log(err)
  })
  return result
}

export const postRequest = (endpoint, data = {}, token = false) => {
  let header = {}
  if (token === true) {
    console.log('adasd')
  }

  const result = axios.post(`${url}${endpoint}`, data, { headers: header }).then((res) => {
    return res.data
  }).catch((err) => {
    console.log(err)
  })
  return result
}