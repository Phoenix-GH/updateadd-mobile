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
  [FieldNames.email]: yup.string().required(),
  [FieldNames.password]: yup.string().required(),
})

type FormProps = {|
  onSubmit: () => void,
|}

export default function LoginForm(props: FormProps) {
  const { onSubmit } = props
  const formal: Formal = useFormal({}, {
    schema,
    onSubmit,
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
        errorText={Strings.errors.email}
      />

      <Field
        {...formal.getFieldProps(FieldNames.password)}
        secureTextEntry
        textContentType="password"
        placeholder={Strings.password}
        autoCapitalize="none"
        label={Strings.password}
        error={passwordError}
        errorText={Strings.errors.passwordValid}
      />

      <SubmitButton label={Strings.login} {...formal.getSubmitButtonProps()} disabled={false} />
    </View>
  )
}
