// @flow

const getUserStore = (store: StoreState): UserStoreState => store.user

const getUser = (store: StoreState): ?UserType => getUserStore(store).user

const getLoginError = (store: StoreState): ?ErrorResponseType => getUserStore(store).loginError

const getSignUpError = (store: StoreState): ?ErrorResponseType => getUserStore(store).signUpError

const getLoginPending = (store: StoreState): boolean => getUserStore(store).loginPending

const getSignUpPending = (store: StoreState): boolean => getUserStore(store).signUpPending

export default {
  getUser,
  getLoginError,
  getSignUpError,
  getLoginPending,
  getSignUpPending,
}
