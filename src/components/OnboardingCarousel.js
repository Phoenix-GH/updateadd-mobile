import React from 'react';
import { Text, View, Dimensions } from 'react-native';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import styled from 'styled-components';

const { width } = Dimensions.get('window');

import logo from '../images/logo.png'

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
`

const DescriptionBox = styled(View)`
  padding-top: 20;
  padding-left: 30;
  padding-right: 30;
`;

const Description = styled(Text)`
  font-size: 15;
  color: ${props => props.theme.slateGray};
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
          activeDotIndex={this.state.activeIndex}
          containerStyle={{ backgroundColor: '#fff' }}
          dotStyle={{
            width: 10,
            height: 10,
            borderRadius: 5,
            marginHorizontal: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
          }}
          inactiveDotStyle={
            {
              
            }
          }
          inactiveDotOpacity={0.4}
          inactiveDotScale={0.6}
        />
      </View>
    );
  }
}

export default OnboardingCarousel;
