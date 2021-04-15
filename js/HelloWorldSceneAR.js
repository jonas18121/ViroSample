'use strict';

import React, { Component } from 'react';

import {StyleSheet} from 'react-native';

import {
  ViroARScene,
  ViroText,
  ViroConstants,
  ViroBox,
  ViroMaterials,
  Viro3DObject,
  ViroAmbientLight, 
  ViroSpotLight,
  ViroARPlaneSelector,
  ViroNode,
  ViroAnimations,
  ViroVideo
} from 'react-viro';



export default class HelloWorldSceneAR extends Component {

  VIDEO_REF = "videoref";

  /* videos = [
    {uri: './video/wOof.mp4'}
  ]; */

  constructor() {
    super();

    // Set initial state here
     this.state = {
      text : "Initializing AR... ok",
      videoPaused: true,
      videoIndex: 0,
    }; 

    // bind 'this' to functions
    this._onInitialized = this._onInitialized.bind(this);
    this._onPlayVideo = this._onPlayVideo.bind(this);
  }

  

  render() {
      return (
          <ViroARScene onTrackingUpdated={this._onInitialized} >

              <ViroText text={this.state.text} scale={[.5, .5, .5]} position={[0, 0, -1]} style={styles.helloWorldTextStyle} />

              <ViroBox position={[0, -.5, -1]} scale={[.3, .3, .1]} materials={["grid"]} animation={{ name: "rotate", run: true, loop: true}} />

              <ViroAmbientLight color={"#aaaaaa"} />

              <ViroSpotLight innerAngle={5} outerAngle={90} direction={[0,-1,-.2]} position={[0, 3, 1]} color="#ffffff" castsShadow={true} />

              <ViroNode position={[0,-1,0]} dragType="FixedToWorld" onDrag={ () => {} }>
                  <Viro3DObject
                      source={require('./res/emoji_smile/emoji_smile.vrx')}
                      resources={[require('./res/emoji_smile/emoji_smile_diffuse.png'),
                          require('./res/emoji_smile/emoji_smile_normal.png'),
                          require('./res/emoji_smile/emoji_smile_specular.png')]}
                      position={[0, .5, 0]}
                      scale={[.2, .2, .2]}
                      type="VRX"
                  />
              </ViroNode>

              <ViroVideo
                  ref={this.VIDEO_REF}
                  source={require('./video/wOof.mp4')}
                  // source={require(this.state.videos.uri = this.state.videoIndex)}
                  loop={true}
                  position={[0,2,-5]}
                  scale={[2,2,0]}
                  width={2}
                  onClick={this._onPlayVideo}
                  paused={this.state.videoPaused}
              />

          </ViroARScene>
      );
  }

  _onPlayVideo(){

      this.setState({
          videoPaused : !this.state.videoPaused
      });
  }

  _onInitialized(state, reason) {
    if (state == ViroConstants.TRACKING_NORMAL) {
      this.setState({
        text : "Hello World!"
      });
    } else if (state == ViroConstants.TRACKING_NONE) {
      // Handle loss of tracking
    }
  }
}

var styles = StyleSheet.create({
  helloWorldTextStyle: {
    fontFamily: 'Arial',
    fontSize: 30,
    color: '#ffffff',
    textAlignVertical: 'center',
    textAlign: 'center',  
  },
});

ViroMaterials.createMaterials({
  grid: {
    diffuseTexture: require('./res/grid_bg.jpg'),
  },
});

ViroAnimations.registerAnimations({
    rotate: {
        properties: {
          rotateY: "+=90"
        },
        duration: 250, //.25 seconds
    },
});

module.exports = HelloWorldSceneAR;
