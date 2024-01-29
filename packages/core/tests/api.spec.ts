import { AxiosHeaders } from 'axios'

import ApiService from '../src/api'

describe('==========ApiService==========', () => {
  // Can create an instance of ApiService with default configs
  describe('CREATE Instance:', () => {
    it('should create an instance of ApiService with default configs', () => {
      const apiService = new ApiService()
      expect(apiService).toBeInstanceOf(ApiService)
      expect(apiService.apiInstance.defaults.baseURL).toBe('')
      expect(apiService.apiInstance.defaults.timeout).toBe(10000)
      expect(apiService.apiInstance.defaults.headers['Content-Type']).toBe('application/json')
    })

    // Can create an instance of ApiService with custom configs
    it('should create an instance of ApiService with custom configs', () => {
      const customConfigs = {
        baseURL: 'https://example.com',
        timeout: 5000,
        headers: {
          'X-Custom-Header': 'custom-value',
        } as AxiosHeaders['headers'],
      }
      const apiService = new ApiService(customConfigs)
      expect(apiService).toBeInstanceOf(ApiService)
      expect(apiService.apiInstance.defaults.baseURL).toBe(customConfigs.baseURL)
      expect(apiService.apiInstance.defaults.timeout).toBe(customConfigs.timeout)
      expect(apiService.apiInstance.defaults.headers['Content-Type']).toBe('application/json')
      expect(apiService.apiInstance.defaults.headers['X-Custom-Header']).toBe(
        customConfigs.headers['X-Custom-Header']
      )
    })
  })

  describe('GET Request:', () => {
    describe('SUCCESS Case', () => {
      // Should make a GET request to the specified URL with the provided config and return a successful response
      it('should make a GET request and return a successful response', async () => {
        const apiService = new ApiService({})
        const url = 'https://jsonplaceholder.typicode.com/posts'
        const config = { headers: { 'Content-Type': 'application/json' } }

        const response = await apiService.get(url, config)
        expect(response.ok).toBe(true)
        expect(response.data).toBeDefined()
        expect(response.result).toBeDefined()
        expect(response.headers).toBeDefined()
      })

      // Should handle and return a successful response with no data
      it('should handle and return a successful response with no data', async () => {
        const apiService = new ApiService({})
        const url = 'https://jsonplaceholder.typicode.com/posts'

        // Mock the get method to return a successful response with no data
        apiService.apiInstance.get = jest.fn().mockResolvedValue({
          data: null,
          result: null,
          headers: {},
          status: 200,
        })

        const response = await apiService.get(url)
        response.data = null
        response.result = null
        expect(response.ok).toBe(true)
        expect(response.data).toBeNull()
        expect(response.result).toBeNull()
        expect(response.headers).toBeDefined()
      })

      // Should handle and return a successful response with empty data
      it('should handle and return a successful response with empty data', async () => {
        const apiService = new ApiService({})
        const url = 'https://jsonplaceholder.typicode.com/posts'

        // Mock the get method to return a successful response with empty data
        apiService.apiInstance.get = jest.fn().mockResolvedValue({
          data: {},
          result: {},
          headers: {},
          status: 200,
        })

        const response = await apiService.get(url)
        expect(response.ok).toBe(true)
        expect(response.data).toEqual({})
        expect(response.result).toEqual({})
        expect(response.headers).toBeDefined()
      })
    })

    describe('ERROR Case', () => {
      // Should handle and return an error response with empty data
      it('should handle and return an error response with empty data', async () => {
        const apiService = new ApiService({})
        const url = 'https://jsonplaceholder.typicode.com/posts/error'

        try {
          return await apiService.get(url)
        } catch (error: any) {
          expect(error.ok).toBe(false)
          expect(error.data).toEqual({})
          expect(error.result).toEqual({})
          expect(error.isTimeout).toBe(false)
          expect(error.isCancelled).toBe(false)
          expect(error.errorMessage).toBeDefined()
          expect(error.headers).toBeDefined()
          expect(error.errorCode).toBeDefined()
        }
      })

      // Should handle and return an error response with non-empty data
      it('should handle and return an error response with non-empty data', async () => {
        const apiService = new ApiService({})
        const url = 'https://jsonplaceholder.typicode.com/posts/error'

        try {
          return await apiService.get(url)
        } catch (error: any) {
          expect(error.ok).toBe(false)
          expect(error.data).toBeDefined()
          expect(error.result).toBeDefined()
          expect(error.isTimeout).toBe(false)
          expect(error.isCancelled).toBe(false)
          expect(error.errorMessage).toBeDefined()
          expect(error.headers).toBeDefined()
          expect(error.errorCode).toBeDefined()
        }
      })
    })
  })

  describe('POST Request:', () => {
    describe('SUCCESS Case', () => {
      // should successfully post data to the specified url
      it('should successfully post data to the specified url', async () => {
        // Arrange
        const apiService = new ApiService({})
        const url = 'https://jsonplaceholder.typicode.com/posts'
        const data = { name: 'Dev Bro' }
        const config = {}

        // Act
        const result = await apiService.post(url, data, config)

        // Assert
        return expect(result).toBeTruthy()
      })

      // should handle successful response with valid data
      it('should handle successful response with valid data', async () => {
        // Arrange
        const apiService = new ApiService({})
        const url = 'https://jsonplaceholder.typicode.com/posts'
        const data = { name: 'Dev Bro' }
        const config = {}

        // Mock the post method to return a successful response with valid data
        apiService.apiInstance.post = jest.fn().mockResolvedValue({
          data: { id: 1, name: 'Dev Bro' },
          headers: {},
          status: 200,
          statusText: 'OK',
        })

        // Act
        const result = await apiService.post(url, data, config)

        // Assert
        return expect(result).toEqual({
          ok: true,
          data: { id: 1, name: 'Dev Bro' },
          result: { id: 1, name: 'Dev Bro' },
          headers: {},
        })
      })

      // should handle successful response with empty data
      it('should handle successful response with empty data', async () => {
        // Arrange
        const apiService = new ApiService({})
        const url = 'https://jsonplaceholder.typicode.com/posts'
        const data = { name: 'Dev Bro' }
        const config = {}

        // Mock the post method to return a successful response with empty data
        apiService.apiInstance.post = jest.fn().mockResolvedValue({
          data: null,
          headers: {},
          status: 200,
          statusText: 'OK',
        })

        // Act
        const result = await apiService.post(url, data, config)

        // Assert
        return expect(result).toEqual({
          ok: true,
          data: null,
          result: null,
          headers: {},
        })
      })
    })

    describe('ERROR Case', () => {
      // should handle failed response with network error
      it('should handle failed response with network error', async () => {
        // Arrange
        const apiService = new ApiService({})
        const url = 'https://jsonplaceholder.typicode.com/posts'
        const data = { name: 'Dev Bro' }
        const config = {}

        // Mock the post method to throw a network error
        apiService.apiInstance.post = jest.fn().mockRejectedValue(new Error('Network Error'))

        // Act
        try {
          await apiService.post(url, data, config)
        } catch (error) {
          // Assert
          expect(error).toEqual({
            ok: false,
            result: null,
            data: null,
            isTimeout: false,
            isCancelled: false,
            errorMessage: 'Network Error',
            headers: {},
            errorCode: 0,
          })
        }
      })

      // should handle failed response with timeout error
      it('should handle failed response with timeout error', async () => {
        // Arrange
        const apiService = new ApiService({})
        const url = 'https://jsonplaceholder.typicode.com/posts'
        const data = { name: 'Dev Bro' }
        const config = {}

        // Mock the post method to throw a timeout error
        apiService.apiInstance.post = jest.fn().mockRejectedValue({ code: 'ECONNABORTED' })

        // Act
        try {
          await apiService.post(url, data, config)
        } catch (error) {
          // Assert
          expect(error).toEqual({
            ok: false,
            result: null,
            data: null,
            isTimeout: true,
            isCancelled: false,
            errorMessage: 'Request Timeout',
            headers: {},
            errorCode: 0,
          })
        }
      })

      // should handle failed response with cancelled request error
      it('should handle failed response with cancelled request error', async () => {
        // Arrange
        const apiService = new ApiService({})
        const url = 'https://jsonplaceholder.typicode.com/posts'
        const data = { name: 'Dev Bro' }
        const config = {}

        // Mock the post method to throw a cancelled request error
        apiService.apiInstance.post = jest.fn().mockRejectedValue({
          message: 'canceled',
          __CANCEL__: true,
        })

        // Act
        try {
          await apiService.post(url, data, config)
        } catch (error) {
          // Assert
          expect(error).toEqual({
            ok: false,
            result: null,
            data: null,
            isTimeout: false,
            isCancelled: true,
            errorMessage: 'Request Cancelled',
            headers: {},
            errorCode: 0,
          })
        }
      })
    })
  })

  describe('PUT Request:', () => {
    describe('SUCCESS Case', () => {
      // should send a PUT request to the specified URL with the provided data and config, and return the response data
      it('should send a PUT request with data and config and return the response data', async () => {
        const apiService = new ApiService({ baseURL: 'https://jsonplaceholder.typicode.com/posts' })
        const url = '/users/123'
        const data = { name: 'Dev Bro', age: 30 }
        const config = { headers: { Authorization: 'Bearer token' } }

        // Mock handleResponse method
        apiService.apiInstance.put = jest.fn().mockResolvedValue({ ok: true, data })

        const response = await apiService.put(url, data, config)
        expect(response.result).toEqual(data)
        return response
      })

      // should call the handleResponse method with the response and return the result
      it('should call the handleResponse method with the response and return the result', async () => {
        const apiService = new ApiService({ baseURL: 'https://jsonplaceholder.typicode.com/posts' })
        const url = '/users/123'
        const data = { name: 'Dev Bro', age: 30 }
        const config = { headers: { Authorization: 'Bearer token' } }

        // Mock handleResponse method
        apiService.apiInstance.put = jest.fn().mockResolvedValue({ ok: true, data })

        const response = await apiService.put(url, data, config)
        expect(response.result).toEqual(data)
        return response
      })
    })

    describe('ERROR Case', () => {
      // should call the handleError method if there is an error and return the error response
      it('should call the handleError method if there is an error and return the error response', async () => {
        const apiService = new ApiService({ baseURL: 'https://jsonplaceholder.typicode.com/posts' })
        const url = '/users/123'
        const data = { name: 'Dev Bro', age: 30 }
        const config = { headers: { Authorization: 'Bearer token' } }

        // Mock handleError method
        apiService.apiInstance.put = jest.fn().mockResolvedValue({ ok: false, errorMessage: 'Error' })

        // Mock axios.put to throw an error
        apiService.apiInstance.put = jest.fn().mockRejectedValue(new Error('Error'))

        return apiService.put(url, data, config).catch(error => {
          expect(apiService.apiInstance.put).toHaveBeenCalledWith(error)
          expect(error.errorMessage).toEqual('Error')
        })
      })

      // should handle a case where the URL is not provided and return an error response
      it('should handle a case where the URL is not provided and return an error response', async () => {
        const apiService = new ApiService({ baseURL: 'https://jsonplaceholder.typicode.com/posts' })
        const data = { name: 'Dev Bro', age: 30 }
        const config = { headers: { Authorization: 'Bearer token' } }

        return apiService.put('', data, config).catch(error => {
          expect(error.errorMessage).toEqual('Request Timeout')
        })
      })

      // should handle a case where the data is not provided and return an error response
      it('should handle a case where the data is not provided and return an error response', async () => {
        const apiService = new ApiService({ baseURL: 'https://jsonplaceholder.typicode.com/posts' })
        const url = '/users/123'
        const config = { headers: { Authorization: 'Bearer token' } }

        return apiService.put(url, undefined, config).catch(error => {
          expect(error.errorMessage).toEqual('Unknown Error')
        })
      })

      // should handle a case where the config is not provided and return an error response
      it('should handle a case where the config is not provided and return an error response', async () => {
        const apiService = new ApiService({ baseURL: 'https://jsonplaceholder.typicode.com/posts' })
        const url = '/users/123'
        const data = { name: 'Dev Bro', age: 30 }

        return apiService.put(url, data).catch(error => {
          expect(error.errorMessage).toEqual('Unknown Error')
        })
      })
    })
  })

  describe('DELETE Request:', () => {
    describe('SUCCESS Case', () => {
      // should send a DELETE request to the specified URL with the provided data and config, and return the response data
      it('should send a DELETE request to the specified URL with the provided data and config, and return the response data', async () => {
        // Arrange
        const apiService = new ApiService({ baseURL: 'https://jsonplaceholder.typicode.com/posts' })
        const url = '/users/1'
        const data = { id: 1 }
        const config = { headers: { Authorization: 'Bearer token' } }

        apiService.apiInstance.delete = jest.fn().mockResolvedValue({
          ok: true,
          data: data,
          result: data,
        })

        // Act
        const result = apiService.delete(url, data, config)

        // Assert
        return result.then(response => {
          expect(response.result).toEqual(data)
        })
      })

      // should call the handleResponse method with the response and return the result
      it('should call the handleResponse method with the response and return the result', async () => {
        // Arrange
        const apiService = new ApiService({ baseURL: 'https://jsonplaceholder.typicode.com/posts' })
        const url = '/users/1'
        const responseData = { data: { id: 1 }, headers: {} }
        apiService.apiInstance.delete = jest.fn().mockResolvedValue({
          ok: true,
          data: responseData.data,
          result: responseData.data,
          headers: responseData.headers,
        })

        // Act
        const result = apiService.delete(url)

        // Assert
        return result.then(response => {
          expect(response.result).toEqual(response.data)
        })
      })

      // should handle a null data parameter and still send the DELETE request
      it('should handle a null data parameter and still send the DELETE request', async () => {
        // Arrange
        const apiService = new ApiService({ baseURL: 'https://jsonplaceholder.typicode.com/posts' })
        const url = '/users/1'

        // Act
        const result = apiService.delete(url, null)

        // Assert
        return result.then(response => {
          expect(response).toBeDefined()
        })
      })

      // should handle a null config parameter and still send the DELETE request with default config
      it('should handle a null config parameter and still send the DELETE request with default config', async () => {
        // Arrange
        const apiService = new ApiService({ baseURL: 'https://jsonplaceholder.typicode.com/posts' })
        const url = '/users/1'

        // Act
        const result = apiService.delete(url, { id: 1 }, undefined)

        // Assert
        return result.then(response => {
          expect(response).toBeDefined()
        })
      })
    })

    describe('ERROR Case', () => {
      // should call the handleError method if the request fails and return the error response
      it('should call the handleError method if the request fails and return the error response', async () => {
        // Arrange
        const apiService = new ApiService({ baseURL: 'https://jsonplaceholder.typicode.com/posts' })
        const url = '/users/1'
        const responseWithError = { response: { status: 500 }, message: 'Internal Server Error' }
        apiService.apiInstance.delete = jest.fn().mockResolvedValue({
          ok: false,
          result: null,
          data: null,
          isTimeout: false,
          isCancelled: false,
          errorMessage: responseWithError.message,
          headers: {},
          errorCode: responseWithError.response.status,
        })

        // Act
        const result = apiService.delete(url)

        // Assert
        return result.catch(error => {
          expect(apiService.apiInstance.delete).toHaveBeenCalledWith(error)
          expect(error.errorMessage).toEqual('Internal Server Error')
        })
      })

      // should handle a null response from the API and return an error response
      it('should handle a null response from the API and return an error response', async () => {
        // Arrange
        const apiService = new ApiService({ baseURL: 'https://jsonplaceholder.typicode.com/posts' })
        const url = '/users/1'
        apiService.apiInstance.delete = jest.fn().mockResolvedValue(null)

        // Act
        const result = apiService.delete(url)

        // Assert
        return result.catch(error => {
          expect(error.ok).toBe(false)
          expect(error.result).toBeNull()
          expect(error.data).toBeNull()
          expect(error.isTimeout).toBe(false)
          expect(error.isCancelled).toBe(false)
          expect(error.errorMessage).toBe('Unknown Error')
          expect(error.headers).toEqual({})
          expect(error.errorCode).toBe(0)
        })
      })
    })
  })
})
