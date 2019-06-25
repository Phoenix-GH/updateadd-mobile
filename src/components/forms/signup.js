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

import styles from './styles'

const FieldNames = {
  email: 'email',
  phoneNumber: 'phoneNumber',
  password: 'password',
  confirmPassword: 'confirmPassword',
  consent: 'consent',
}

const schema = yup.object().shape({
  [FieldNames.email]: yup.string().required(),
  [FieldNames.phoneNumber]: yup.string().required(),
  [FieldNames.password]: yup.string().min(8).required(),
  [FieldNames.confirmPassword]: yup.string().oneOf([yup.ref('password'), null], Strings.errors.confirmPassword).required(),
  [FieldNames.consent]: yup.boolean().required().oneOf([true]),
})

type FormProps = {|
  onSubmit: () => void,
|}

export default function SignUpForm(props: FormProps) {
  const { onSubmit } = props
  const formal: Formal = useFormal({}, {
    schema,
    onSubmit,
  })

  const emailError: boolean = !!formal.errors.email
  const phoneNumberError: boolean = !!formal.errors.phoneNumber
  const passwordError: boolean = !!formal.errors.password
  const confirmPasswordError: boolean = !!formal.errors.confirmPassword
  const consentError: boolean = !!formal.errors.consent

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
        {...formal.getFieldProps(FieldNames.phoneNumber)}
        textContentType="telephoneNumber"
        placeholder={Strings.phoneNumber}
        autoCapitalize="none"
        label={Strings.phoneNumber}
        error={phoneNumberError}
        errorText={Strings.errors.phoneNumber}
      />

      <Field
        {...formal.getFieldProps(FieldNames.password)}
        secureTextEntry
        textContentType="password"
        placeholder={Strings.password}
        autoCapitalize="none"
        label={Strings.password}
        error={passwordError}
        errorText={Strings.errors.password}
      />

      <Field
        {...formal.getFieldProps(FieldNames.confirmPassword)}
        secureTextEntry
        textContentType="password"
        placeholder={Strings.confirmPassword}
        autoCapitalize="none"
        label={Strings.confirmPassword}
        error={confirmPasswordError}
        errorText={Strings.errors.confirmPassword}
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
