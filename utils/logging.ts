export const logger = (message: string) => (process.env.NODE_ENV === "development") && console.log(message)
