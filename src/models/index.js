// @flow

export const models = {

}

export const ModelResponseTypes = {

}

export function modelMapper(modelType: string, data: Object) {
  const modelClass = null
  switch (modelType) {
    default: break
  }

  // if (modelClass) {
  //   if (_.isArray(data.data)) {
  //     const hydrated = []
  // if (data.data.length) {
  //   for (const data in data.data) {
  //     if (data) {
  //       hydrated.push(new modelClass(data))
  //     }
  //   }
  // }
  //     return {
  //       data: hydrated,
  //       meta: data.meta,
  //     }
  //   }
  //   data = { data: new modelClass((data && data.data) || data) }
  // } else if (modelType !== ModelResponseTypes.Undefined) {
  //   console.error('Response was read without a valid Response Type', data)
  // }
  return data
}
