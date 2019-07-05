// @flow
import React from 'react'
import { Text, View } from 'react-native'

import useFormal from '@kevinwolf/formal-native'
import type { Formal } from '@kevinwolf/formal-native'
import * as yup from 'yup'


import Field from '../field'
import CheckBoxField from '../checkbox'
import SubmitButton from '../buttons/submit'

import { Strings } from '../../constants'

import { parseErrorString } from '../../helpers'

import styles from './styles'

const FieldNames = {
  email: 'email',
  phone: 'phone',
  password: 'password',
  confirmPassword: 'confirmPassword',
  consent: 'consent',
}

const schema = yup.object().shape({
  [FieldNames.email]: yup.string().required(Strings.errors.email),
  [FieldNames.phone]: yup.string().required(Strings.errors.phoneNumber),
  [FieldNames.password]: yup.string().min(8).required(Strings.errors.password),
  [FieldNames.confirmPassword]: yup.string().oneOf([yup.ref('password'), null], Strings.errors.confirmPassword).required(),
  [FieldNames.consent]: yup.boolean().required().oneOf([true]),
})

type SignUpFormProps = {|
  error: ?ErrorResponseType,
  signUpUser: (values: UserSignUpPayload) => void,
|}

export default function SignUpForm(props: SignUpFormProps) {
  const { error } = props

  const formal: Formal = useFormal({}, {
    schema,
    onSubmit: (values) => {
      const payload: UserSignUpPayload = {
        email: values.email,
        password: values.password,
        phone: values.phone,
      }
      props.signUpUser(payload)
    },
  })

  let errors = {}
  if (error) {
    const { data } = error.response
    errors = parseErrorString(data.error)
  }

  const emailError: boolean = !!formal.errors.email || !!errors.email
  const phoneNumberError: boolean = !!formal.errors.phone || !!errors.phone
  const passwordError: boolean = !!formal.errors.password
  const confirmPasswordError: boolean = !!formal.errors.confirmPassword
  const consentError: boolean = !!formal.errors.consent

  return (
    <View style={styles.formContainer}>
      <Field
        onChangeText={(value: string) => formal.change(FieldNames.email, value)}
        textContentType="emailAddress"
        placeholder={Strings.emailAddress}
        autoCapitalize="none"
        label={Strings.email}
        error={emailError}
        errorText={errors.email ? errors.email : formal.errors.email}
      />

      <Field
        onChangeText={(value: string) => formal.change(FieldNames.phone, value)}
        textContentType="telephoneNumber"
        placeholder={Strings.phoneNumber}
        autoCapitalize="none"
        label={Strings.phoneNumber}
        error={phoneNumberError}
        errorText={errors.phone ? errors.phone : formal.errors.phone}
      />

      <Field
        onChangeText={(value: string) => formal.change(FieldNames.password, value)}
        secureTextEntry
        textContentType="password"
        placeholder={Strings.password}
        autoCapitalize="none"
        label={Strings.password}
        error={passwordError}
        errorText={formal.errors.password}
      />

      <Field
        onChangeText={(value: string) => formal.change(FieldNames.confirmPassword, value)}
        secureTextEntry
        textContentType="password"
        placeholder={Strings.confirmPassword}
        autoCapitalize="none"
        label={Strings.confirmPassword}
        error={confirmPasswordError}
        errorText={formal.errors.confirmPassword}
      />

      <CheckBoxField
        error={consentError}
        title={Strings.consent}
        checked={Boolean(formal.values.consent)}
        onPress={() => formal.change('consent', !formal.values.consent)}
      />

      <Text style={styles.disclaimer}>{Strings.disclaimer}</Text>

      <SubmitButton label={Strings.signUp} {...formal.getSubmitButtonProps()} disabled={false} />
    </View>
  )
}
