// @flow
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

import carouselData from './strings'

const { width } = Dimensions.get('window');

const ThemeImage = styled(Image)`
  flex: 1;
  margin: 10.32% 59px 52px 59px;
`

const CarouselCard = styled(View)`
  width: ${width};
  flex: 1;
  align-items: center;
`

const Title = styled(Text)`
  font-size: 24px;
  line-height: 27px;
  font-weight: 700;
  text-align: center;
  text-transform: uppercase;
  color: ${props => props.theme.darkGray};
  font-family: Gotham;
`

const DescriptionBox = styled(View)`
  margin: 21px 31px 0 22px;
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

  renderItem = ({ index }: {index: number }) => (
    <CarouselCard>
      <ThemeImage
        source={carouselData[index].image}
        resizeMode="center"
      />
      <Title>{carouselData[index].title}</Title>
      <DescriptionBox>
        {
        carouselData[index].descriptions.map(item => (
          <Description>
            {item}
          </Description>
        ))
        }
      </DescriptionBox>
    </CarouselCard>
  )

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
