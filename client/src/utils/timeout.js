function fetchTimeout(url, options, timeout = 15000) {
  return Promise.race([
    fetch(url, options),
    new Promise((resolve, reject) => setTimeout(() => reject(new Error('Request timed out.')), timeout))
  ]);
}

export default fetchTimeout;