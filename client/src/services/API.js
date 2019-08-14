function checkStatus (response) {
  if (response && response.error) {
    throw response.error
  }

  return response
}

function parseJSON (response) {
  const contentType = response.headers.get('content-type')

  if (contentType && contentType.includes('application/json')) {
    return response.json()
  }
}

export default function FetchService (url, options) {
  return window.fetch(url, options).then(parseJSON).then(checkStatus).catch(error => console.error(error))
}

export function checkIban (iban) {
  return FetchService('http://localhost:3050', {
    method: 'post',
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({iban: iban})
  })
}
