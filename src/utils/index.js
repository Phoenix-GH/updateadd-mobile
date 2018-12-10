// @flow

import { Sentry, SentrySeverity } from 'react-native-sentry'

/** Replaces all instances of an object with a string 'NULL', this allows Sentry
    to pass the store info across the JS bridge on iOS */
export const replaceNull = (store: Object) => {
  if (store instanceof Array) {
    return store.map(o => replaceNull(o))
  }
  if (store instanceof Object) {
    const result = {}
    Object.keys(store).forEach((key) => {
      result[key] = replaceNull(store[key])
    })
    return result
  }
  if (store === null) {
    return 'NULL'
  }
  return store
}

const SentryUtil = {
  configure: (dsn: string) => {
    Sentry.config(dsn).install();
  },

  setExtraContext: (store: Object) => {
    const content = replaceNull({ store: store.getState() })
    SentryUtil.execute(Sentry.setExtraContext, content);
  },

  setTagsContext: (tag: string, ctx: string | number) => {
    const content = {
      [tag]: ctx,
    }
    SentryUtil.execute(Sentry.setTagsContext, content);
  },

  setUserContext: (ctx: Object) => {
    SentryUtil.execute(Sentry.setUserContext, ctx);
  },

  captureMessage: (msg: string) => {
    SentryUtil.execute(Sentry.captureMessage, msg, { level: SentrySeverity.Error });
  },

  setVersion: (version: string) => {
    SentryUtil.execute(Sentry.setVersion, version)
  },

  execute: (fun: any, content: any, logLevel: any) => {
    if (!__DEV__) {
      fun(content, logLevel)
    }
  },
}

export default SentryUtil
