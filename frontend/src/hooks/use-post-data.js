import React, { useEffect, useState } from 'react'
import axios from 'axios'

const usePostData = () => {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [data, setData] = useState(null)
  const token = localStorage.getItem('token')

  const postData = async ({ url, method, payload }) => {
    setLoading(true)
    try {
      const response = await axios({
        url: url,
        method: method || 'GET',
        headers: {
          Authorization: token ? 'Bearer ' + token : undefined,
        },
        data: payload || undefined,
      })
      setData(response.data)
    } catch (err) {
      setError(err.response.data.msg)
    } finally {
      setLoading(false)
    }
  }

  return [postData, { data, error, loading }]
}

export default usePostData
