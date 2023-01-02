export const isValidUrl = (url: string) => {
  try {
    const newUrl = new URL(url)

    return newUrl.protocol === 'http:' || newUrl.protocol === 'https:'
  } catch (error) {
    return false
  }
}

export const transformURL = (url: string) => {
  return new URL(url).href
}
