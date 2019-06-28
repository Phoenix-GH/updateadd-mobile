// @flow
import React from 'react';
import {
  Text,
  View,
  Dimensions,
  Image,
} from 'react-native'
import Carousel, { Pagination } from 'react-native-snap-carousel'
import { css } from '@emotion/native'
import carouselData from './strings'

const { width } = Dimensions.get('window');

const themeImageStyle = css`
  flex: 1;
  margin: 10.32% 59px 52px 59px;
`

const carouselCardStyle = css`
  width: ${width};
  flex: 1;
  align-items: center;
`

const titleStyle = css`
  font-size: 24px;
  line-height: 27px;
  font-weight: 700;
  text-align: center;
  text-transform: uppercase;
  color: #272727;
  font-family: Gotham;
`

const descriptionBoxStyle = css`
  margin: 21px 31px 0 22px;
  display: flex;
  justify-content: space-between;
`

const descriptionStyle = css`
  font-size: 16px;
  color: #7b7b7b;
  text-align: center;
  font-family: Gotham;
  line-height: 22px;
`

type OnboardingCarouselTypes = {|
  activeIndex?: number,
  setIndex: Function,
|}

class OnboardingCarousel extends React.Component<OnboardingCarouselTypes> {
  _carousel = null

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
    <View style={carouselCardStyle}>
      <Image
        style={themeImageStyle}
        source={carouselData[index].image}
        resizeMode="center"
      />
      <Text style={titleStyle}>{carouselData[index].title}</Text>
      <View style={descriptionBoxStyle}>
        {
        carouselData[index].descriptions.map(item => (
          <Text key={item.id} style={descriptionStyle}>
            {item.text}
          </Text>
        ))
        }
      </View>
    </View>
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
