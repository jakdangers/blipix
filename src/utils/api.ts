import axios from 'axios'

const axiosInstance = axios.create({
  // baseURL: 'http://34.22.78.26:3000',
  baseURL: 'http://localhost:3000',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
})

axiosInstance.interceptors.request.use(
  async (config) => {
    // const userAuthContext = await getAsyncStorageUserAuthContext()
    const modifiedConfig = { ...config }
    // if (userAuthContext) {
    //   modifiedConfig.headers.Authorization = `Bearer ${userAuthContext.userToken}`
    // }
    return modifiedConfig
  },
  (error) => Promise.reject(error)
)

export default axiosInstance
