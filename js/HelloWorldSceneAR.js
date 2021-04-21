'use strict';

import React, { Component } from 'react';

import {StyleSheet} from 'react-native';

import Geolocation from 'react-native-geolocation-service';

import projector from 'ecef-projector';

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
  ViroVideo,
  ViroFlexView,
  ViroImage,
  ViroMaterialVideo
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
        videos : [
            {element : './video/wOof.mp4'}
        ],
        geolocation : {
            latitude: null,
            longitude: null,
            error: null,
            selisih: null,
            xSel: null,
            ySel: null,
            zSel: null,
            distance: null,
            string: '',
            isString: true,
            count: 0,
            _condition: false,
            condition: ''
        } 
    };
    

    // bind 'this' to functions
    this._onInitialized = this._onInitialized.bind(this);
    this._onPlayVideo = this._onPlayVideo.bind(this);
  }

    getCoordinate = () => {

        const userxyz = projector.project(this.state.geolocation.latitude, this.state.geolocation.longitude, 0.0);
        const objectxyz = projector.project(-6.260719, 106.781616, 0.0)

        if (this.state.geolocation.count === 0) {
            this.selisih(userxyz, objectxyz)
        }
        const distance = this.getDistance(this.state.geolocation.latitude, this.state.geolocation.longitude, -6.260719, 106.781616)
        this.setState({
            geolocation: {
                distance: distance
            }
        })
    }

    selisih = (user, object) => {

        let selisih = {
            x: user[0] - object[0],
            y: user[1] - object[1],
            z: user[2] - object[2]
        }
        this.setState({
            geolocation: {
                xSel: selisih.x,
                ySel: selisih.y,
                zSel: selisih.z,
                count: this.state.geolocation.count + 1
            }
        })
    }


    getDistance = (lon1, lat1, lon2, lat2) => {
        if (typeof(Number.prototype.toRad) === "undefined") {
            Number.prototype.toRad = function() {
                return this * Math.PI / 180;
            }
        }

        var R = 6371; // Radius of the earth in km

        var dLat = (lat2-lat1).toRad();  // Javascript functions in radians

        var dLon = (lon2-lon1).toRad(); // distance longitude

        var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
                Math.cos(lat1.toRad()) * Math.cos(lat2.toRad()) *
                Math.sin(dLon/2) * Math.sin(dLon/2);

        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

        var d = R * c * 1000 // Distance in km

        return d.toFixed(2)
    }

    componentDidMount() {
        Geolocation.getCurrentPosition(
            (position) => {
                this.setState({
                    geolocation: {
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                        error: null,
                        string: String(position.coords.latitude)
                    }
                });
                this.getCoordinate()
            },
            (error) => this.setState({ geolocation: { error: error.message} }),
            { enableHighAccuracy: true, timeout: 2000, maximumAge: 2000, distanceFilter: 1 },
        )

        Geolocation.watchPosition(
            (position) => {
                this.setState({
                    geolocation: {
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                        error: null,
                        string: String(position.coords.latitude)
                    }
                });
                this.getCoordinate()
            },
            (error) => this.setState({ geolocation: { error: error.message} }),
            { enableHighAccuracy: true, timeout: 2000, maximumAge: 2000, distanceFilter: 1 },
        )
    }

    _reload = () => {
        if (this.state.geolocation.distance < 2) {
            this.setState({
                geolocation: {
                    condition: 'Salam 3 jari enak',
                    _condition: true
                }
            })
        } else {
            this.setState({
                geolocation: {
                    condition: 'you are not close enough',
                    _condition: true
                }
            })
        }
    }



  render() {
      const numx = this.state.geolocation.xSel;
      const numy = this.state.geolocation.ySel;
      const numz = this.state.geolocation.zSel;

      return (

          <ViroARScene onTrackingUpdated={this._onInitialized} >


            {/*  Début essaie geolocalisation */}

            {
                this.state.geolocation.xSel && this.state.geolocation.ySel && this.state.geolocation.zSel &&

                <ViroBox 
                    position={[numx, 0, numz]} 
                    scale={[.3, .3, .1]} 
                    materials={["grid"]} 
                    animation={{ name: "rotate", run: true, loop: true}}
                    onClick={this._reload}
                />
            }
            {
                this.state.geolocation.distance &&

                <ViroText 
                    text={this.state.text} 
                    scale={[3, 3, 3]} 
                    position={[numx, 0, numz]} 
                    style={styles.helloWorldTextStyle} 
                />
            }
            {
                this.state.geolocation._condition &&

                <ViroText 
                    text={this.state.geolocation.condition} 
                    scale={[1, 1, 1]} 
                    position={[numx, 0, numz]} 
                    style={styles.helloWorldTextStyle} 
                />
            }

            {/*  Fin essaie geolocalisation */}








            
              {/* <ViroText text={this.state.text} scale={[.5, .5, .5]} position={[0, 0, -1]} style={styles.helloWorldTextStyle} /> */}

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

              <ViroFlexView 
                  style={{flexDirection: 'row', padding: .1, backgroundColor: 'transparent'}}
                  width={4.0} height={2.0} 
                  position={[0, 3.0, -5.0]}
              >


                  <ViroFlexView style={{flexDirection: 'row',flex: .9, padding: .1, backgroundColor: 'white'}}
                      width={3.0} height={2.0}
                  >
                      <ViroVideo
                            ref={this.VIDEO_REF}
                            source={require('./video/wOof.mp4')}
                            // source={require(this.state.videos[this.state.videoIndex])}
                            loop={true}
                            // position={[0,2,-5]}
                            // scale={[2,2,0]}
                            // width={2}
                            // height={1.0}
                            onClick={this._onPlayVideo}
                            paused={this.state.videoPaused}
                            style={{flex: 1}}
                      />
                  </ViroFlexView>


                  <ViroFlexView style={{flex: .1 ,flexDirection: 'column', backgroundColor: 'transparent', padding: .1}}>

                      <ViroImage
                          // height={.1}
                          // width={.1}
                          style={{flex: .1}}
                          // placeholderSource={require("./res/local_spinner.jpg")}
                          source={require("./res/wallky/cross.jpg")}
                      />

                      <ViroImage
                          // height={.1}
                          // width={.1}
                          style={{flex: .1}}
                          // placeholderSource={require("./res/local_spinner.jpg")}
                          source={require("./res/wallky/eye2.jpg")}
                      />

                      <ViroImage
                          // height={.05}
                          // width={.1}
                          style={{flex: .1, margin: .1}}
                          // placeholderSource={require("./res/local_spinner.jpg")}
                          source={require("./res/wallky/partage2.png")}
                      />

                      <ViroImage
                          style={{flex: .1, margin: .1}}
                          source={require("./res/wallky/coeur.png")}
                      />

                  </ViroFlexView>

              </ViroFlexView>

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
