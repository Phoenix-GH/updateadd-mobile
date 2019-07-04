// @flow
import React from 'react'
import { View } from 'react-native'

import useFormal from '@kevinwolf/formal-native'
import type { Formal } from '@kevinwolf/formal-native'
import * as yup from 'yup'

import Field from '../field'
import SubmitButton from '../buttons/submit'

import { Strings, Roots } from '../../constants'

import ApiService from '../../helpers/ApiServices'

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
  navigation: NavigationScreenProp<*>,
|}

export default function LoginForm(props: LoginFormProps) {
  const formal: Formal = useFormal({}, {
    schema,
    onSubmit: (values) => {
      const payload: UserLoginPayload = {
        email: values.email,
        password: values.password,
      }

      ApiService.loginUser(payload)
        .then(() => {
          props.navigation.navigate(Roots.DebugContacts)
        })
        .catch((error) => {
          const { data } = error.response
          formal.setErrors({ email: data.error })
        })
    },
  })

  const emailError: boolean = !!formal.errors.email
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
        errorText={formal.errors.email}
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
