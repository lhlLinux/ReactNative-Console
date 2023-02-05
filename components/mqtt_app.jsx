
import { Client, Message } from 'react-native-paho-mqtt'; 
 

// pour opérations avec MQTT
const myStorage = {
    setItem: (key, item) => { myStorage[key] = item; }, // on insère/met à jour l'item spécifié
    getItem:       (key) => { return myStorage[key]; }, // on retourne l'item spécifié
    removeItem:    (key) => { delete myStorage[key]; }  // on spécifie quel item effacer
}; 


class Mqtt { // Composante s'occupant de la gestion du mqtt et ses opérations
 
    constructor( onMessage_callback ) // initialisation de notre objet
    { 
        // Initialisation du client MQTT 'ws://iot.eclipse.org:80/ws' (alternative de connexion)
        this.client = new Client( { uri: 'ws://mqtt.eclipseprojects.io:80/mqtt',
                                    clientId: '', 
                                    storage: myStorage } ); 

        // on tente de se connecter
        this.client.connect()
            .then(() => { 
                console.log('MQTT: connexion en cours...'); 
                return this.client.subscribe('IOT');
            })
            .then(() => { 
                console.log('MQTT: inscription aux messages...'); 
            }); 
 
        // On passe quelques fonctions à executer dans différentes situations
        this.client.on('messageReceived', onMessage_callback ); // lors de la réception des messages
        this.client.on('connectionLost', this.onDisconnect ); // lors d'une déconnexion pour le savoir
    } // fin du constructeur

    // Méthode à utiliser par l'usager de cet objet
    sendMessage(message) {
        this.client.send( message );
    }

    onDisconnect(response) { console.log("MQTT: déconnexion"); }
} 


export default Mqtt 