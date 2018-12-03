// @flow

const getUserStore = (store: StoreState): UserStoreState => store.user

const getUser = (store: StoreState): ?UserType => getUserStore(store).user

const getPending = (store: StoreState): boolean => getUserStore(store).pending

export default {
  getUser,
  getPending,
}
