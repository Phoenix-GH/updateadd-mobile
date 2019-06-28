// @flow
import logo from '../images/logo.png'
import improve_contacts from '../images/improve_contacts.png'
import select_country from '../images/select_country.png'
import import_contact from '../images/import_contact.png'

export default {
  home: {
    greetings: 'Greetings',
    niceToSeeYou: (name: string) => `Nice to see you ${name}`,
    replaceName: 'Click to replace name',
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
}
