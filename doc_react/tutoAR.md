
Ce didacticiel est un guide étape par étape pour développer une application AR simple. Notre objectif à la fin de ce tutoriel est de:

Comprendre HelloWorldSceneAR.js
Placez une boîte texturée dans le monde
Ajouter un Smiley Emoji à la scène
Sélectionnez un ARPlane
Ajouter l'emoji à l'avion
Ajouter une ombre à l'emoji
Rendre l'emoji déplaçable
Animez la boîte
Comprendre HelloWorldSceneAR.js
Ouvrez votre projet de test dans l'application Viro Media (comme vous l'avez fait dans le Quick Start (Mac / Linux) ) et sélectionnez l' option AR . Vous devriez voir ce qui suit, "Hello World" en superposition blanche dans la vue de la caméra:


Scène HelloWorldAR

La scène vous est présentée est -ce qui est défini comme le ViroARSceneNavigator composant dans le , qui sert de point d'entrée dans votre application.HelloWorldSceneAR.jsinitialSceneApp.js

ViroReact est construit sur React Native et utilise des constructions React Native pour faciliter la création d'applications AR natives. En plus de comprendre Javascript, vous devrez également comprendre certains concepts de base de React, tels que JSX , les composants , l' état et les accessoires .

Vous trouverez ci-dessous le code pour HelloWorldSceneAR :

JavaScript

    'use strict';

    import React, { Component } from 'react';

    import {StyleSheet} from 'react-native';

    import {
      ViroARScene,
      ViroText,
      ViroConstants,
    } from 'react-viro';

    export default class HelloWorldSceneAR extends Component {

      constructor() {
        super();

        // Set initial state here
        this.state = {
          text : "Initializing AR..."
        };

        // bind 'this' to functions
        this._onInitialized = this._onInitialized.bind(this);
      }

      render() {
        return (
          <ViroARScene onTrackingUpdated={this._onInitialized} >
            <ViroText text={this.state.text} scale={[.5, .5, .5]} position={[0, 0, -1]} style={styles.helloWorldTextStyle} />
          </ViroARScene>
        );
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

    module.exports = HelloWorldSceneAR;

Voyons ce qui se passe dans le code ci-dessus ...

Importer des composants
Le code commence par importer React, à partir des composants React Native et react-viro que l'application utilisera. Dans cette application, nous utilisons et .StyleSheetViroARSceneViroText

JavaScript

    'use strict';

    import React, { Component } from 'react';

    import {StyleSheet} from 'react-native';

    import {
      ViroARScene,
      ViroText,
      ViroConstants
    } from 'react-viro';
  
...
Classe HelloWorldSceneAR
Sous le code d'importation, nous créons une classe ES6 standard qui étend un React qui adhère au cycle de vie du composant react . En savoir plus sur les classes ES6 ici et ici .HelloWorldSceneARComponent

Commençons par le . Dans le constructeur, nous appelons le constructeur / parent (in ) et nous initialisons l'état. En dessous, nous "nous lions" aux fonctions que nous déclarons dans cette classe afin qu'elles puissent référencer un objet.constructor()super()Componentthisthis

Ensuite, nous avons la fonction qui détermine comment notre scène est affichée. Il est défini à l'aide de JSX qui est syntaxiquement similaire à HTML. Dans la section ci-dessous, nous passons en revue cette méthode en détail.render()

JavaScript

...

    export default class HelloWorldSceneAR extends Component {

      constructor() {
        super();

        // Set initial state here
        this.state = {
          text : "Initializing AR..."
        };

        // bind 'this' to functions
        this._onInitialized = this._onInitialized.bind(this);
      }

      render() {
        return (

          <ViroARScene onTrackingUpdated={this._onInitialized} >
            <ViroText text={this.state.text} scale={[.5, .5, .5]} position={[0, 0, -1]} style={styles.helloWorldTextStyle} />
          </ViroARScene>
        );
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

...
Dans la déclaration de retour, nous déclarons le composant de niveau supérieur: . Chaque scène AR doit avoir un comme élément le plus haut. Tous les autres composants sont des enfants de . Nous utilisons la fonction de rappel,, pour appeler notre fonction ci-dessous qui définit le texte sur "Hello World!" une fois que l'état du suivi est .ViroARSceneViroARSceneViroARSceneonTrackingUpdated_onInitialized()TRACKING_NORMAL
ViroTextest déclaré ensuite. Il bascule entre "Initialisation AR ..." et "Hello World" en fonction de l'état à une position de [0,0, -1] avec la police, la taille de police et la couleur spécifiées par la propriété. Dans notre système de coordonnées, le spectateur fait face dans la direction négative-Z, donc fournir une coordonnée Z de -1 place l'objet devant le spectateur.style
Déclaration de styles
Après la méthode de rendu, nous déclarons les styles qui peuvent être utilisés dans notre application. Les styles représentent généralement les propriétés de mise en page des composants. Dans notre application, nous déclarons un style nommé qui décrit le type de police, la couleur, la taille et l'alignement de notre composant.helloWorldTextStyleViroText

JavaScript

    var styles = StyleSheet.create({
      helloWorldTextStyle: {
        fontFamily: 'Arial',
        fontSize: 30,
        color: '#ffffff',
        textAlignVertical: 'center',
        textAlign: 'center',  
      },
    });

    module.exports = HelloWorldSceneAR;


Maintenant que nous avons décrit le fonctionnement de notre scène, voyons comment nous pouvons l'étendre.

Téléchargement d'actifs
La première chose à faire est de télécharger les ressources que nous utiliserons pour le didacticiel, suivez les étapes ci-dessous:

Téléchargez le bundle d' actifs a cette adresse https://s3-us-west-2.amazonaws.com/viro/Assets/res.zip
Décompressez le fichier et remplacez le dossier sous .res< path_to>/ViroSample/js/
Ajout de composants à une scène
Prenons notre scène HelloWorld actuelle et ajoutons une boîte 3D au-dessus du texte "Hello World". Nous pouvons le faire en utilisant le composant. Pour ajouter une boîte à notre scène, nous procédons comme suit:ViroBox

D'abord, nous importons et depuis , nos instructions d'importation ressemblent maintenant à:ViroBoxViroMaterialsreact-viro

JavaScript

    import {
      ...
        ViroBox,
      ViroMaterials,
    } from 'react-viro';


Ensuite, nous devons ajouter la boîte à notre scène. La référence API nous permet de savoir quelles propriétés nous pouvons définir pour personnaliser notre boîte.ViroBox

Copiez le code suivant et ajoutez-le sous le composant:ViroText

JavaScript

    <ViroBox position={[0, -.5, -1]} scale={[.3, .3, .1]} materials={["grid"]} />

position={[horizontal, vertical, -1]}
scale={[largeur, longueur, profondeur(longueur)]}

Personnalisation de la ViroBox

Dans le code ci - dessus, nous avons mis le du à [0, ± 5, -1] de sorte qu'il définit sous le texte « Bonjour tout le monde ».positionViroBox

Nous escaladons alors par [0,3, 0,3, 0,1] pour le rendre plus petit que sa valeur par défaut , et est de 1 (mètres).ViroBoxwidthheightlength

La propriété vous permet de définir un matériau prédéfini (voir ViroMaterials ) comme texture sur la boîte elle-même. Dans cet exemple, nous définissons un matériau nommé sur lequel nous définirons / créerons à l'étape suivante.materialsgridViroBox

Définition d'un matériau
Avant de pouvoir utiliser un matériau tel que celui mentionné ci-dessus , nous devons le définir. Puisque nous avons déjà importé , nous pouvons simplement ajouter le code suivant sous la déclaration de styles.gridViroMaterials

JavaScript

    ViroMaterials.createMaterials({
      grid: {
        diffuseTexture: require('./res/grid_bg.jpg'),
      },
    });


Comme vous pouvez le voir, nous avons défini un matériau contenant lequel pointe vers le fichier dans le répertoire.griddiffuseTexturegrid_bg.jpgres

Deux choses à noter ici:

La fonction est une fonction spéciale fournie dans React qui convertit un chemin de fichier en une valeur que la plate-forme peut utiliser pour récupérer la ressource.require()
L'argument to est un chemin de fichier et est relatif à l'emplacement du fichier (dans ce cas, le répertoire et le sont tous deux dans le même répertoire.require()res/HelloWorldSceneAR.jsViroSample/js/
🚧
Vous ne trouvez pas ?grid_bg.jpg

Assurez-vous d'avoir suivi les instructions sous Téléchargement d'actifs pour télécharger et copier les actifs que nous utiliserons dans ce didacticiel.

Votre devrait ressembler à ce qui suit:HelloWorldSceneAR.js

JavaScript

    'use strict';

    import React, { Component } from 'react';

    import {StyleSheet} from 'react-native';

    import {
      ViroARScene,
      ViroText,
      ViroConstants,
      ViroBox,
      ViroMaterials,
    } from 'react-viro';

    export default class HelloWorldSceneAR extends Component {

      constructor() {
        super();

        // Set initial state here
        this.state = {
          text : "Initializing AR..."
        };

        // bind 'this' to functions
        this._onInitialized = this._onInitialized.bind(this);
      }

      render() {
        return (
          <ViroARScene onTrackingUpdated={this._onInitialized} >
            <ViroText text={this.state.text} scale={[.5, .5, .5]} position={[0, 0, -1]} style={styles.helloWorldTextStyle} />
            <ViroBox position={[0, -.5, -1]} scale={[.3, .3, .1]} materials={["grid"]} />
          </ViroARScene>
        );
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

    module.exports = HelloWorldSceneAR;


Enregistrez votre fichier et rechargez l'application. Vous devriez maintenant voir un cube rose et gris sous le texte Hello WorldHelloWorldSceneAR.js


Pour recharger votre fichier, secouez simplement votre appareil et un menu de débogage apparaîtra, comme indiqué ci-dessous. Appuyez sur "Recharger" et un écran pour choisir AR ou VR apparaîtra. Appuyez sur AR et vos modifications apparaîtront.


Ajout d'un objet 3D à la scène
Ajoutons maintenant un objet 3D à la scène. Il devrait y avoir un dossier dans votre dossier appelé "emoji_smile". Nous utiliserons ces fichiers pour ajouter un emoji 3D à la scène.res

Ajouter des nouveaux composants
Nous avons d' abord besoin d'importer les composants que nous allons utiliser: , et .Viro3DObjectViroAmbientLightViroSpotLight

JavaScript

    import {
        ...
      Viro3DObject,
      ViroAmbientLight,
      ViroSpotLight,
    } from 'react-viro';
    Next we need to add the Viro3DObject and lights to our scene. Copy the code below and paste it below the ViroBox component within the ViroARScene.

JavaScript

    <ViroAmbientLight color={"#aaaaaa"} />
            <ViroSpotLight innerAngle={5} outerAngle={90} direction={[0,-1,-.2]}
              position={[0, 3, 1]} color="#ffffff" castsShadow={true} />
            <Viro3DObject
                source={require('./res/emoji_smile/emoji_smile.vrx')}
                resources={[require('./res/emoji_smile/emoji_smile_diffuse.png'),
                    require('./res/emoji_smile/emoji_smile_normal.png'),
                    require('./res/emoji_smile/emoji_smile_specular.png')]}
                position={[-.5, .5, -1]}
                scale={[.2, .2, .2]}
                type="VRX" />


Save your file and reload the Testbed app. You should see the scene below. Move around if you are unable to see all the components at first as they might be to your left.


Using ViroARPlane
In an AR app, the device's camera is used to present a live, onscreen view of the physical world. Three-dimensional virtual objects are superimposed over this view, creating the illusion that they actually exist.

One method for placing objects in the real world is by using the ViroARPlane or ViroARPlaneSelector component. When the AR system detects a plane, ViroReact attempts to attach it to any declared ViroARPlane components and continually keeps the virtual plane anchored to the detected real-world plane. On the other hand, the ViroARPlaneSelector component enables developers to allow their users to select the plane that they want the developer to use.

To see how it works, let's add a ViroARPlaneSelector into our scene. First, add ViroARPlaneSelector as a new component as shown below:

JavaScript

    import {
      ...
      ViroARPlaneSelector,
    } from 'react-viro';


Next add a ViroARPlaneSelector by pasting the following code into your ViroARScene component.

JavaScript

    <ViroARPlaneSelector />


Save your file and reload the testbed app. In addition to the previous scene, you should now see planes appear as you move around your room. In our real world, both the table and floor plane were detected as shown below:


If you try "selecting" a plane by tapping on it, they will simply all disappear as nothing was added within the ViroARPlaneSelector, in the next section, we'll show you how to add a component to it.

Add a 3D Object to the Plane
Previously, when we added our emoji to the scene, it was at a fixed position as shown {[-.5, -.5, -1]} as shown below:

JavaScript

    <Viro3DObject
                source={require('./res/emoji_smile/emoji_smile.vrx')}
                resources={[require('./res/emoji_smile/emoji_smile_diffuse.png'),
                    require('./res/emoji_smile/emoji_smile_normal.png'),
                    require('./res/emoji_smile/emoji_smile_specular.png')]}
                position={[-.5, .5, -1]}
                scale={[.2, .2, .2]}
                type="VRX" />


With AR, we often times want objects to be placed in relation to the real world. Using the planes we identified earlier, let's place our emoji on a plane. First, delete the you just added from your js file. Then replace the Viro3DObject code above in your HelloWorldSceneAR.js file with the code below:

JavaScript

    <ViroARPlaneSelector>
      <Viro3DObject
                source={require('./res/emoji_smile/emoji_smile.vrx')}
                resources={[require('./res/emoji_smile/emoji_smile_diffuse.png'),
                    require('./res/emoji_smile/emoji_smile_normal.png'),
                    require('./res/emoji_smile/emoji_smile_specular.png')]}
                position={[0, .5, 0]}
                scale={[.2, .2, .2]}
                type="VRX" />
    </ViroARPlaneSelector>


Notice that we also changed the position of the emoji to [0, .5, 0]. This is because the emoji's center is within the emoji itself, so to make it sit "on" the plane, we need to shift it slightly above where the plane is

Save the file and reload the testbed app.

Now that we have placed the 3D Object inside the ViroARPlaneSelector, when a plane is tapped, the emoji will be placed on the selected plane and the other ones will disappear.


Interactions and Animations
One of the great things about AR that users can move about their world to view and interact with objects from different angles. Let's add interaction to the emoji and some movement to the box.

First let's make the emoji draggable so that it can be moved with the drag gesture. First we need to import another component ViroNode:

JavaScript

    import {
      ...
      ViroNode,
    } from 'react-viro';


In the previous step, we placed our emoji within a ViroARPlaneSelector component as shown below.

JavaScript

    <ViroARPlaneSelector>
      <Viro3DObject
                source={require('./res/emoji_smile/emoji_smile.vrx')}
                resources={[require('./res/emoji_smile/emoji_smile_diffuse.png'),
                    require('./res/emoji_smile/emoji_smile_normal.png'),
                    require('./res/emoji_smile/emoji_smile_specular.png')]}
                position={[0, .5, 0]}
                scale={[.2, .2, .2]}
                type="VRX" />
    </ViroARPlaneSelector>


To make our emoji drag along real-world surfaces, we need to replace ViroARPlaneSelector with a ViroNode, set the dragType to "FixedToWorld", and add an empty anonymous function to let the platform know that we want this object to drag.

Replace the above code block with the one below:

JavaScript

    <ViroNode position={[0,-1,0]} dragType="FixedToWorld" onDrag={()=>{}} >
      <Viro3DObject
                source={require('./res/emoji_smile/emoji_smile.vrx')}
                resources={[require('./res/emoji_smile/emoji_smile_diffuse.png'),
                    require('./res/emoji_smile/emoji_smile_normal.png'),
                    require('./res/emoji_smile/emoji_smile_specular.png')]}
                position={[0, .5, 0]}
                scale={[.2, .2, .2]}
                type="VRX" />
    </ViroNode>


Save your file and reload the testbed app.

The emoji should now appear in front of you and to the left. You should now be able to touch and drag the emoji around the scene, notice how it moves along real world surfaces.

Animation
Finally, let's add some movement to the box. First, we need to import ViroAnimations

JavaScript

    import {
      ...
      ViroAnimations,
    } from 'react-viro'

Next, replace the ViroBox component with the following:

JavaScript

    <ViroBox position={[0, -.5, -1]} scale={[.3, .3, .1]} materials={["grid"]} animation={{name: "rotate", run: true, loop: true}}/>


As you can see, we added a new property animation with the value {name: "rotate", run: true, loop: true}. The name refers to an animation we will register in the next step like we did for ViroMaterials above.

Find where we registered ViroMaterials (near the bottom of the file), copy and paste the following code below it:

JavaScript

    ViroAnimations.registerAnimations({
      rotate: {
        properties: {
          rotateY: "+=90"
        },
        duration: 250, //.25 seconds
      },
    });


Enregistrez votre fichier et rechargez l'application testbed. Vous devriez maintenant voir "Hello World", une boîte rotative et pouvoir faire glisser l'emoji. Un exemple du code final complet est publié à la fin de ce tutoriel.


Prochaines étapes
Continuer à modifier la scène
Vous devriez maintenant avoir un aperçu de base du fonctionnement de ViroReact. Consultez nos exemples de code pour d'autres exemples d'applications, ou continuez à ajouter des fonctionnalités par vous-même à HelloWorldScene. Par example:

Ajoutez une animation à d'autres objets de la scène. Consultez notre guide d'animation pour savoir comment y parvenir.
Essayez d'ajouter des ombres et un éclairage à la scène. Consultez le guide de l' éclairage et des matériaux pour plus de détails.
Tutoriel HelloWorldSceneAR - Code final
JavaScript

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
    } from 'react-viro';

    export default class HelloWorldSceneAR extends Component {

      constructor() {
        super();

        // Set initial state here
        this.state = {
          text : "Initializing AR..."
        };

        // bind 'this' to functions
        this._onInitialized = this._onInitialized.bind(this);
      }

      render() {
        return (
          <ViroARScene onTrackingUpdated={this._onInitialized} >
            <ViroText text={this.state.text} scale={[.5, .5, .5]} position={[0, 0, -1]} style={styles.helloWorldTextStyle} />
            <ViroBox position={[0, -.5, -1]} scale={[.3, .3, .1]} materials={["grid"]} animation={{name: "rotate", run: true, loop: true}}/>
            <ViroAmbientLight color={"#aaaaaa"} />
            <ViroSpotLight innerAngle={5} outerAngle={90} direction={[0,-1,-.2]}
              position={[0, 3, 1]} color="#ffffff" castsShadow={true} />
            <ViroNode position={[0,-1,0]} dragType="FixedToWorld" onDrag={()=>{}} >
              <Viro3DObject
                source={require('./res/emoji_smile/emoji_smile.vrx')}
                resources={[require('./res/emoji_smile/emoji_smile_diffuse.png'),
                    require('./res/emoji_smile/emoji_smile_normal.png'),
                    require('./res/emoji_smile/emoji_smile_specular.png')]}
                position={[0, .5, 0]}
                scale={[.2, .2, .2]}
                type="VRX" />
            </ViroNode>
          </ViroARScene>
        );
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

