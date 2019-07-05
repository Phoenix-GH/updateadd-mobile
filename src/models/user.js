// @flow

import BaseModel from './base'

type UserDataType = {
  id: ?string,
  email: ?string,
  first_name: ?string,
  last_name: ?string,
  phone: ?string,
  country: ?string,
  language: ?string,
  token: ?string,
  first_name_first: boolean,
  sort_by_family_name: boolean,
}

export default class User extends BaseModel {
  _email: string

  _firstName: string

  _lastName: string

  _phone: string

  _country: string

  _language: string

  _token: string

  _firstNameFirst: boolean

  _sortByFamilyName: boolean

  constructor(data?: UserDataType = {
    id: null,
    email: null,
    first_name: null,
    last_name: null,
    phone: null,
    country: null,
    language: null,
    token: null,
    first_name_first: true,
    sort_by_family_name: true,
  }) {
    super(data)
    if (data) {
      this.email = data.email || ''
      this.firstName = data.first_name || ''
      this.lastName = data.last_name || ''
      this.phone = data.phone || ''
      this.country = data.country || ''
      this.language = data.language || ''
      this.token = data.token || ''
      this.firstNameFirst = data.first_name_first || true
      this.sortByFamilyName = data.sort_by_family_name || true
    }
  }

  set email(value: ?string) {
    this._email = value || ''
  }

  get email(): string {
    return this._email
  }

  set firstName(value: ?string) {
    this._firstName = value || ''
  }

  get firstName(): string {
    return this._firstName
  }

  set lastName(value: ?string) {
    this._lastName = value || ''
  }

  get lastName(): string {
    return this._lastName
  }

  set phone(value: ?string) {
    this._phone = value || ''
  }

  get phone(): string {
    return this._phone
  }

  set country(value: ?string) {
    this._country = value || ''
  }

  get country(): string {
    return this._country
  }

  set language(value: ?string) {
    this._language = value || ''
  }

  get language(): string {
    return this._language
  }

  set token(value: ?string) {
    this._token = value || ''
  }

  get token(): string {
    return this._token
  }

  set firstNameFirst(value: boolean) {
    this._firstNameFirst = value || ''
  }

  get firstNameFirst(): boolean {
    return this._firstNameFirst
  }

  set sortByFamilyName(value: boolean) {
    this._sortByFamilyName = value || ''
  }

  get sortByFamilyName(): boolean {
    return this._sortByFamilyName
  }
}
