// @flow

export function parseErrorString(errors: string): {[string]: string} {
  const results = {}
  errors.split(',').forEach((e: string) => {
    const parts = e.split('-')
    results[parts[0].trim()] = parts[1].trim()
  })
  return results
}

export default {
  parseErrorString,
}
