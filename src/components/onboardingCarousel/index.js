// @flow
import React from 'react'
import {
  Text,
  View,
  Image,
  Dimensions,
} from 'react-native'
import Carousel, { Pagination } from 'react-native-snap-carousel'
import strings from '../../constants/strings'
import {
  themeImageStyle,
  carouselCardStyle,
  titleStyle,
  descriptionBoxStyle,
  descriptionStyle,
} from './styles'

const { width } = Dimensions.get('window')

type OnboardingCarouselTypes = {|
  activeIndex?: number,
  setIndex: number => void,
|}

type OnboardingCarouselStateType = {|
  activeIndex: number,
|}

class OnboardingCarousel extends React.Component<OnboardingCarouselTypes, OnboardingCarouselStateType> {
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
        source={strings.carouselData[index].image}
        resizeMode="center"
      />
      <Text style={titleStyle}>{strings.carouselData[index].title}</Text>
      <View style={descriptionBoxStyle}>
        {
        strings.carouselData[index].descriptions.map(item => (
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
