import axios from 'axios'

const selectAPI = () => {
  if (process.env.NEXT_PUBLIC_IS_PRODUCTION === 'true') {
    return process.env.NEXT_PUBLIC_PROD_URL_API
  }

  if (process.env.NEXT_PUBLIC_DOCKER_UP === 'true') {
    return process.env.NEXT_PUBLIC_API_URL_DOCKER
  }

  return process.env.NEXT_PUBLIC_API_URL
}

const api = axios.create({
  baseURL: selectAPI(),
})

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status
    const message =
      error.response?.data?.message ||
      error.response?.data?.error ||
      error.message ||
      'Erro desconhecido'

    console.log('❌ Erro na requisição:', { status, message })

    // repassa o erro formatado
    return Promise.reject({ status, message })
  },
)

export { api }
