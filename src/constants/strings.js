import logo from '../images/logo.png'
import improve_contacts from '../images/improve_contacts.png'
import select_country from '../images/select_country.png'
import import_contact from '../images/import_contact.png'

export default {
  signUp: 'Sign Up',
  login: 'Log In',
  email: 'Email',
  emailAddress: 'Email Address',
  phoneNumber: 'Phone Number',
  password: 'Password',
  confirmPassword: 'Confirm Password',
  forgotPassword: 'Forgot Password?',
  signUpPrompt: 'Don\'t have an account? Sign up',
  loginPrompt: 'Already have an account? Log in',
  consent: 'I am 13 years of age or older and I have read the Terms of Service',
  disclaimer: 'By tapping Sign Up, you understand and agree to UADD\'s Terms of Service and Privacy Policy.',
  errors: {
    email: 'Please enter a valid email address',
    phoneNumber: 'Please enter a valid phone number',
    password: 'Password must contain at least 8 characters',
    passwordValid: 'Password enter a valid password',
    confirmPassword: 'Passwords do not match',
  },
  carouselData: [
    {
      id: 0,
      image: logo,
      title: 'Welcome to UADD',
      descriptions: [
        {
          id: 0,
          text: 'Create & share personalized business cards with anyone.',
        },
        {
          id: 1,
          text: 'Our technology pushes updates to anyone with your card.',
        },
      ],
    },
    {
      id: 1,
      image: import_contact,
      title: 'Import Contacts',
      descriptions: [
        {
          id: 0,
          text: 'Keep all of your contacts safely synced and updated in the cloud.',
        },
      ],
    },
    {
      id: 2,
      image: improve_contacts,
      title: 'Improve your contacts',
      descriptions: [
        {
          id: 0,
          text: 'Clean up your contacts by merging duplicates.',
        },
        {
          id: 1,
          text: 'Stay updated with your network\'s latest business and contact info.',
        },
      ],
    },
    {
      id: 3,
      image: select_country,
      title: 'Select your Country',
      descriptions: [
        {
          id: 0,
          text: 'This will ensure phone numbers & other settings are formatted correctly.',
        },
      ],
    },
  ],
  welcomeAlerts: {
    title: 'Wecome!',
    text: 'UADD allows you to update, add, and manage your contacts. To use UADD, please allow access to your contacts.',
  },
  contactAlerts: {
    title: '"UADD" Would Like to Access Your Contacts',
    text: 'UADD requires access to your contacts to update, add, and manage your contacts.',
  },
  onboardingButtonTitles: [
    'Next',
    'Select Your Country',
  ],
  countryPickerTranslationLanguage: 'eng',
  continueText: 'Continue',
  dontAllow: 'Don\'t allow',
  ok: 'OK',
  createCardTitle: 'Create your first card now!',
  cancel: 'Cancel',
  createCard: 'CREATE YOUR CARD',
  done: 'Done',
  firstName: 'First Name',
  lastName: 'Last Name',
  social: 'Social',
  contactInfo: 'Contact Information',
  addEmail: 'Add Email',
  phone: 'Phone',
  url: 'URL',
  address: 'Address',
  company: 'Company',
  companyName: 'Company Name',
  jobTitle: 'Job Title',
  notes: 'Notes',
  cardAppearance: 'Card Appearance',
  selectBackground: 'Select Background',
  placeholders: {
    social: 'Add Social & Instant Message Account',
    notes: 'Include notes here',
    companyName: 'Business name',
    jobTitle: 'Job title',
    firstName: 'First name',
    lastName: 'Last name',
    email: 'Add Email',
    phone: 'Phone',
    url: 'URL',
    address: 'Address',
  },
  labels: {
    social: {
      whatsapp: 'Whatsapp',
      facebookMessenger: 'Facebook Messenger',
      flickr: 'Flickr',
      linkedin: 'Linkedin',
      myspace: 'Myspace',
      sinaWeibo: 'Sina Weibo',
      skype: 'Skype',
    },
    address: {
      home: 'Home',
      work: 'Work',
      other: 'Other',
    },
    phone: {
      home: 'Home',
      work: 'Work',
      iPhone: 'iPhone',
      mobile: 'Mobile',
      main: 'Main',
      homeFax: 'Home Fax',
      workFax: 'Work Fax',
      pager: 'Pager',
      other: 'Other',
    },
    email: {
      home: 'Home',
      work: 'Work',
      iPhone: 'iCloud',
      other: 'Other',
    },
    url: {
      url: 'URL',
    },
    customLabel: 'Add Custom Label',
  },
  userNamePlaceholder: 'First and Last Name',
  jobPlaceholder: 'Job Title & Company',
}
