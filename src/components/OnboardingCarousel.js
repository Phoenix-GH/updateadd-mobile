import React from 'react';
import {
  Text,
  View,
  Dimensions,
  Image,
} from 'react-native'
import PropTypes from 'prop-types'
import Carousel, { Pagination } from 'react-native-snap-carousel'
import styled from 'styled-components'
import logo from '../images/logo.png'
import improve_contacts from '../images/improve_contacts.png'
import select_country from '../images/select_country.png'
import import_contact from '../images/import_contact.png'

const { width } = Dimensions.get('window');

const ThemeImage = styled(Image)`
  width: 257px;
  height: 257px;
  top: 17.72%;
  position: absolute;
`

const CarouselCard = styled(View)`
  width: ${width};
  flex: 1;
  align-items: center;
  justify-content: center;
`

const Title = styled(Text)`
  font-size: 24px;
  line-height: 27px;
  font-weight: 700;
  text-align: center;
  text-transform: uppercase;
  margin-top: 387px;
  color: ${props => props.theme.darkGray};
  font-family: Gotham;
`

const DescriptionBox = styled(View)`
  margin-top: 41px;
  margin: 41px 31px 0 32px;
  height: 17.46%;
  display: flex;
  justify-content: space-between;
`

const Description = styled(Text)`
  font-size: 16px;
  color: ${props => props.theme.lightGray};
  text-align: center;
  font-family: Gotham;
  line-height: 22px;
`


class OnboardingCarousel extends React.Component<any> {
  _carousel = null

  static propTypes = {
    activeIndex: PropTypes.number,
    setIndex: PropTypes.func.isRequired,
  }

  static defaultProps = {
    activeIndex: 0,
  }

  componentDidUpdate() {
    const { activeIndex } = this.props
    if (this._carousel) {
      this._carousel.snapToItem(activeIndex)
    }
  }

  renderItem = ({ index } : { index: number }) => {
    switch (index) {
      case 0:
        return (
          <CarouselCard>
            <ThemeImage
              source={logo}
              resizeMode="center"
            />
            <Title>Welcome to UADD</Title>
            <DescriptionBox>
              <Description>
                Create & share personalized business cards with anyone.
              </Description>
              <Description>
                Our technology pushes updates to anyone with your card.
              </Description>
            </DescriptionBox>
          </CarouselCard>
        );
      case 1:
        return (
          <CarouselCard>
            <ThemeImage
              source={import_contact}
              resizeMode="contain"
            />
            <Title>Import Contacts</Title>
            <DescriptionBox>
              <Description>
                Keep all of your contacts safely synced and updated in the cloud.
              </Description>
            </DescriptionBox>
          </CarouselCard>
        );
      case 2:
        return (
          <CarouselCard>
            <ThemeImage
              source={improve_contacts}
              resizeMode="contain"
            />
            <Title>Improve your contacts</Title>
            <DescriptionBox>
              <Description>
                Clean up your contacts by merging duplicates.
              </Description>
              <Description>
                Stay updated with your network's latest business and contact info.
              </Description>
            </DescriptionBox>
          </CarouselCard>
        );
      case 3:
        return (
          <CarouselCard>
            <ThemeImage
              source={select_country}
              resizeMode="contain"
            />
            <Title>Select your Country</Title>
            <DescriptionBox>
              <Description>
                This will ensure phone numbers & other settings are formatted correctly.
              </Description>
            </DescriptionBox>
          </CarouselCard>
        );
      default:
        return null
    }
  }

  render() {
    const { activeIndex, setIndex } = this.props

    return (
      <View style={{ flex: 1 }}>
        <Carousel
          ref={(c) => { this._carousel = c; }}
          sliderWidth={width}
          itemWidth={width}
          data={['one', 'two', 'three', 'four']}
          slideStyle={{ width }}
          renderItem={this.renderItem}
          onSnapToItem={index => setIndex(index)}
        />
        <Pagination
          dotsLength={4}
          activeDotIndex={activeIndex}
          containerStyle={{ backgroundColor: '#fff' }}
          dotStyle={{
            width: 7,
            height: 7,
            borderRadius: 3.5,
            marginHorizontal: 0,
            backgroundColor: 'rgba(0, 0, 0, 1)',
          }}
          inactiveDotStyle={
            {
            }
          }
          inactiveDotOpacity={0.32}
          inactiveDotScale={1}
        />
      </View>
    );
  }
}

export default OnboardingCarousel;
