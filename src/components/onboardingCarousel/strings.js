import logo from '../../images/logo.png'
import improve_contacts from '../../images/improve_contacts.png'
import select_country from '../../images/select_country.png'
import import_contact from '../../images/import_contact.png'

const carouselData = [
  {
    id: 0,
    image: logo,
    title: 'Welcome to UADD',
    descriptions: [
      'Create & share personalized business cards with anyone.',
      'Our technology pushes updates to anyone with your card.',
    ],
  },
  {
    id: 1,
    image: import_contact,
    title: 'Import Contacts',
    descriptions: [
      'Keep all of your contacts safely synced and updated in the cloud.',
    ],
  },
  {
    id: 2,
    image: improve_contacts,
    title: 'Improve your contacts',
    descriptions: [
      'Clean up your contacts by merging duplicates.',
      'Stay updated with your network\'s latest business and contact info.',
    ],
  },
  {
    id: 3,
    image: select_country,
    title: 'Select your Country',
    descriptions: [
      'This will ensure phone numbers & other settings are formatted correctly.',
    ],
  },
]

export default carouselData
