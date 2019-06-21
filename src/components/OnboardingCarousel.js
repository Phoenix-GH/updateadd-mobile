import React from 'react';
import { Text, View, Dimensions, Image } from 'react-native';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import styled from 'styled-components';
import logo from '../images/logo.png'

const { width } = Dimensions.get('window');

const ThemeImage = styled(Image)`
  width: 257px;
  margin-top: 17.72%;
`;

const CarouselCard = styled(View)`
  width: ${width};
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const Title = styled(Text)`
  font-size: 24px;
  line-height: 27px;
  text-align: center;
  text-transform: uppercase;
  margin-top: 111.67px;
  color: ${props => props.theme.darkGray};
`

const DescriptionBox = styled(View)`
  margin-top: 41px;
  margin: 41px 31px 0 32px;
  height: 17.46%;
  display: flex;
  justify-content: space-between;
`;

const Description = styled(Text)`
  font-size: 16px;
  color: ${props => props.theme.lightGray};
  text-align: center;
`;

class OnboardingCarousel extends React.Component {
  state = {
    activeIndex: 0,
  };

  renderItem = ({ index }) => {
    switch (index) {
      case 0:
        return (
          <CarouselCard>
            <ThemeImage source={logo} />
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
            <Title>Tell us what you like</Title>
            <DescriptionBox>
              <Description>
                From industries and work type to work schedule and salary,
                we&apos;ll match you with jobs that fit you.
              </Description>
            </DescriptionBox>
          </CarouselCard>
        );
      case 2:
        return (
          <CarouselCard>
            <Title>Import Contacts</Title>
            <DescriptionBox>
              <Description>
                Keep all of your contacts safely synced and updated in the cloud.
              </Description>
            </DescriptionBox>
          </CarouselCard>
        );
      case 3:
        return (
          <CarouselCard>
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
      case 4:
        return (
          <CarouselCard>
            <Title>Select your country</Title>
            <DescriptionBox>
              <Description>
                This will ensure phone numbers & other settings are formatted correctly.
              </Description>
            </DescriptionBox>
          </CarouselCard>
        );
      default:
        return null;
    }
  };

  render() {
    const { activeIndex } = this.state;
    return (
      <View style={{ flex: 1 }}>
        <Carousel
          sliderWidth={width}
          itemWidth={width}
          data={['one', 'two', 'three', 'four']}
          slideStyle={{ width }}
          renderItem={this.renderItem}
          onSnapToItem={index => this.setState({ activeIndex: index })}
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
