import React, { useEffect, useState } from 'react'
import axios from 'axios'

const useFetch = ({ url, method, payload }) => {
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [data, setData] = useState(null)
  const token = localStorage.getItem('token')

  useEffect(() => {
    setIsLoading(true)
    axios({
      url: url,
      method: method || 'GET',
      headers: {
        Authorization: token ? 'Bearer ' + token : undefined,
      },
      data: payload || undefined,
    })
      .then((response) => {
        if (!response.ok) {
          setIsLoading(false)
          setError(null)
          setData(response.data)
        } else {
          setIsLoading(false)
          setData(null)
          setError(response.data?.message)
        }
      })
      .catch((response) => {
        setIsLoading(false)
        setData(null)
        setError(response.data?.message)
      })
  }, [url, method, payload])

  return [isLoading, data, error]
}

export default useFetch
