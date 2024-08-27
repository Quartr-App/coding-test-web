import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios"

class APIClient {
  private readonly instance: AxiosInstance

  constructor(baseURL: string) {
    this.instance = axios.create({
      baseURL,
      timeout: 10000,
      headers: {
        "Content-Type": "application/json"
      }
    })

    this.setupInterceptors()
  }

  private setupInterceptors(): void {
    this.instance.interceptors.response.use(
      (response: AxiosResponse): AxiosResponse => response,
      (error: AxiosError): Promise<never> => {
        let errorMessage = "An unknown error occurred"
        if (error.response) {
          const data = error.response.data as { message?: string }
          if (data && typeof data.message === "string") {
            errorMessage = data.message
          } else if (typeof data === "string") {
            errorMessage = data
          } else {
            errorMessage = `Server error: ${error.response.status}`
          }
        } else if (error.request) {
          errorMessage = "No response received from the server"
        } else {
          errorMessage = error.message || errorMessage
        }
        console.error("Error in API call:", errorMessage)
        return Promise.reject(new Error(errorMessage))
      }
    )
  }

  private async request<T>(method: "get" | "post" | "put" | "delete", url: string, config?: AxiosRequestConfig, data?: unknown): Promise<T> {
    try {
      const response: AxiosResponse<T> = await this.instance.request({
        method,
        url,
        ...config,
        data
      })
      return response.data
    } catch (error) {
      console.error("Caught error in request method:", error)
      throw error
    }
  }

  public async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return this.request<T>("get", url, config)
  }

  public async post<T>(url: string, data: unknown = {}, config: AxiosRequestConfig = {}): Promise<T> {
    const response: AxiosResponse<T> = await this.instance.post<T>(url, data, config)
    return response.data
  }

  public async put<T>(url: string, data: unknown = {}, config: AxiosRequestConfig = {}): Promise<T> {
    const response: AxiosResponse<T> = await this.instance.put<T>(url, data, config)
    return response.data
  }

  public async delete<T>(url: string, config: AxiosRequestConfig = {}): Promise<T> {
    const response: AxiosResponse<T> = await this.instance.delete<T>(url, config)
    return response.data
  }
}

const apiClient = new APIClient("/api")

export default apiClient
