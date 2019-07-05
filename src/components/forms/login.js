// @flow
import React from 'react'
import { View } from 'react-native'

import useFormal from '@kevinwolf/formal-native'
import type { Formal } from '@kevinwolf/formal-native'
import * as yup from 'yup'

import Field from '../field'
import SubmitButton from '../buttons/submit'

import { Strings } from '../../constants'

import styles from './styles'

const FieldNames = {
  email: 'email',
  password: 'password',
}

const schema = yup.object().shape({
  [FieldNames.email]: yup.string().required(Strings.errors.email),
  [FieldNames.password]: yup.string().required(Strings.errors.passwordValid),
})

type LoginFormProps = {|
  error: ?ErrorResponseType,
  navigation: NavigationScreenProp<*>,
  loginUser: (values: UserLoginPayload) => void,
  setLoginError: (error: ?ErrorResponseType) => void,
|}

export default function LoginForm(props: LoginFormProps) {
  const { error } = props

  const formal: Formal = useFormal({}, {
    schema,
    onSubmit: (values) => {
      const payload: UserLoginPayload = {
        email: values.email,
        password: values.password,
      }
      props.setLoginError(null)
      props.loginUser(payload)
    },
  })

  const errors = {}
  if (error) {
    const { data } = error.response
    errors.email = data.error
  }

  const emailError: boolean = !!formal.errors.email || !!errors.email
  const passwordError: boolean = !!formal.errors.password

  return (
    <View style={styles.formContainer}>
      <Field
        {...formal.getFieldProps(FieldNames.email)}
        textContentType="emailAddress"
        placeholder={Strings.emailAddress}
        autoCapitalize="none"
        label={Strings.email}
        error={emailError}
        errorText={errors.email ? errors.email : formal.errors.email}
      />

      <Field
        {...formal.getFieldProps(FieldNames.password)}
        secureTextEntry
        textContentType="password"
        placeholder={Strings.password}
        autoCapitalize="none"
        label={Strings.password}
        error={passwordError}
        errorText={formal.errors.password}
      />

      <SubmitButton label={Strings.login} {...formal.getSubmitButtonProps()} disabled={false} />
    </View>
  )
}
