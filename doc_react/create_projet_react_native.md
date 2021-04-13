# Creer un projet react native avec la libairie viro media

Pour créer un projet react-native dans CMD windows
Installer react.js (en globale)

    npm install -g create-react-app

Puis installer la cli de react-native dans CMD windows

    npm install -g react-native-cli

Puis faite 

    react-native -v


## Installer la libairie viro media 

Dans la CMD windows

    react-native init ViroSample --version=0.59.3

Ou cette version qui permettra de ne pas avoir d'erreur après avoir fait npm install -S -E react-viro

    react-native init ViroSample --version=0.59.9

Puis 

    cd ViroSample

Puis toujours dans la CMD

    npm install -S -E react-viro

Si à cette étape il y a des erreurs lors de l'installation rajouter --legacy-peer-deps

    npm install -S -E react-viro --legacy-peer-deps


Puis 


    Copiez les fichiers de node_modules \ react-viro \ bin \ files \ javascript \ * à la racine de votre répertoire.

    Cela devrait remplacer les fichiers index.js et App.js et ajouter metro.config.js, rn-cli.config.js et un répertoire js / à votre projet ViroSample.

Puis

    npm start

S'il y a cette erreur après le npm start

    error Invalid regular expression: /(.*\\__fixtures__\\.*|node_modules[\\\]react[\\\]dist[\\\].*|website\\node_modules\\.*|heapCapture\\bundle\.js|.*\\__tests__\\.*)$/: Unterminated character class. Run CLI with --verbose flag for more details.

Aller dans le dossier \node_modules\metro-config\src\defaults\blacklist.js et modifier la première ligne de sharedBlacklist

    var sharedBlacklist = [
        /node_modules[/\\]react[/\\]dist[/\\].*/,
        /website\/node_modules\/.*/,
        /heapCapture\/bundle\.js/,
        /.*\/__tests__\/.*/
    ];

en 

    var sharedBlacklist = [
        /node_modules[\/\\]react[\/\\]dist[\/\\].*/,
        /website\/node_modules\/.*/,
        /heapCapture\/bundle\.js/,
        /.*\/__tests__\/.*/
    ];



## Télécharger viro media sur le telephone et se connecter par une adresse ngrok dans l'ongelt < Enter Testbed > de viro media

Si vous n'avez pas d'adresse ngrok

## Installer une ngrok sur l'ordinateur

Télécharger le dossier zip de ngrok à cette adresse https://ngrok.com/download 

Décomprésser l'executable. 

(Facultatif) Créez un dossier (ngrok) spécialement pour l'executable ngrok dans cette adresse par exemple C:\Programmes et mettez le dans la variable d'environnement PATH, afin d'utiliser la ligne decommande `ngrok` partout. 

Puis se connecter dans ngrok à cette adresse https://dashboard.ngrok.com/signup , afin de pouvoir récupérer un authtoken

Une fois récupérer le authtoken , taper en ligne de commande :

    ngrok authtoken <your_auth_token>

Puis tapez ngrok http + le port ou est executer le projet 

    ngrok http 8081