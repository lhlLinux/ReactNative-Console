import React from 'react' 
import { StyleSheet, View, Text, Button } from 'react-native'
import { Message } from 'react-native-paho-mqtt'; 

//import { Switch} from 'react-native-paper' 
//import { Button } from '@rneui/themed';

import { Switch } from 'react-native-switch';
import { NotreBDD } from './stockage_app';
import Mqtt from './mqtt_app';

// -------------------------------- VARIABLES -------------------------------------

// États des switchs
const ON  = "ON"  //pour true
const OFF = "OFF" //pour false

var entree = {
  nom: "Lumière Entrée",
  etat: OFF
}

var salon = {
  nom: "Lumière Salon",
  etat: OFF
}

var alarme = {
  nom: "Alarme",
  etat: OFF
}

// -------------------------------- CLASSES -------------------------------------

class Home extends React.Component { // La vue principale avec la console

    static navigationOptions = { 
      title: 'Ma Maison',
      headerTintColor: 'blue'
    };
    
    state = {
      etatSwitchEntree: false,
      etatSwitchSalon:  false,
      etatSwitchAlarme: false
    };

    componentDidMount() { // ce qu'on effectue lorsque la composante est chargée
        this.mqtt = new Mqtt( this.onMessageReceived.bind(this) );
    }

    onMessageReceived(message)
    {
        //console.log( "Home: Message recu: ", message.payloadString ); 

        let chaine = message.payloadString;
        let etat = false; // valeur par défaut
        let nom = "";

        if (chaine[2] == "N") // "N" du "ON" à la position 2 de la chaine
          etat = true; // la valeur change si jamais on trouve un ON

        // on détermine à quelle panneau le message correspond et on convertit
        // le code en un nom et un état ON/OFF
        switch(chaine[0])
        {
          case "1": // Lumière entrée
          {
            nom = entree.nom;
            this.setState( {etatSwitchEntree: etat} );
            break;
          }

          case "2": // Lumière salon
          {
            nom = salon.nom;
            this.setState( {etatSwitchSalon: etat} );
            break;
          }

          case "3": // Alarme
          {
            nom = alarme.nom;
            this.setState( {etatSwitchAlarme: etat} );
            break;
          }

          default:
            console.log("Home: Le message entrant comporte un code inconnu");
        }
        
        //console.log("Les valeurs 'nom' et 'etat': ", nom, etat)

        // On s'apprête à produire les données en format (date, heure, évennement)
        const date  = new Date();
        
        const day   = date.getDate();
        const month = date.getMonth() + 1;
        const year  = date.getFullYear();
        
        const hour  = date.getHours();
        const min   = date.getMinutes(); 
        const sec   = date.getSeconds(); 

        // JSON.stringify(day + '/' + month + '/' + year),
        // JSON.stringify(hour + ':' + min + ':' + sec),

        // Finalement l'enregistrment
        NotreBDD.enregistrerEvennement({ "date": day + '/' + month + '/' + year,
                                       "heure": hour + ':' + min + ':' + sec,
                                       "event": nom + " " + (etat ? ON : OFF) });
    }

    changementEtat( nom, etat ) // opérations à effectuer lorsque les switch sont modifiées
    {
        const message = new Message( nom + (etat ? ON : OFF) );
        message.destinationName = 'IOT';
        this.mqtt.sendMessage(message);
    }
    
    render() { 
      return ( 
        <View style={styles.wrapper}> 
          <View style={styles.container}>
            <Text style={styles.dispositif}> Lumiere Entree </Text>
            <Switch 
              value = {this.state.etatSwitchEntree}
              onValueChange = { (etat) => { this.changementEtat("1", etat); } } // I could probably pass string
              backgroundActive    = {'#596159'}
              backgroundInactive  = {'#596159'}
              circleActiveColor   = {'#5ad15c'}
              circleInActiveColor = {'#a4bfa5'}
            />
            <Text style={styles.etat}>
              Lumiere Entree { this.state.etatSwitchEntree ? ON : OFF }
            </Text>  
          </View>

          <View style={styles.container}>
            <Text style={styles.dispositif}> Lumiere Salon </Text>
            <Switch
              value= {this.state.etatSwitchSalon}
              onValueChange = {(etat) => { this.changementEtat("2", etat); } }
              backgroundActive    = {'#596159'}
              backgroundInactive  = {'#596159'}
              circleActiveColor   = {'#5ad15c'}
              circleInActiveColor = {'#a4bfa5'}
            />
            <Text style={styles.etat}>
              Lumiere Salon { this.state.etatSwitchSalon ? ON : OFF }
            </Text>  
          </View> 
  
          <View style={styles.container}>
            <Text style={styles.dispositif}> Alarme </Text>
            <Switch
              value= {this.state.etatSwitchAlarme}
              onValueChange = {(etat) => { this.changementEtat("3", etat); } }
              backgroundActive    = {'#596159'}
              backgroundInactive  = {'#596159'}
              circleActiveColor   = {'#5ad15c'}
              circleInActiveColor = {'#a4bfa5'}
            />
            <Text style={ styles.etat }>
              Alarme { this.state.etatSwitchAlarme ? ON : OFF }
            </Text>  
          </View>
        
          <Button
            title = "Historique" 
            onPress = {() => this.props.navigation.navigate('Historique')} 
            buttonStyle = { styles.historique } 
          /> 
       </View> 
      ) 
    } 
} 

// ---------------------------------------- STYLES -------------------------------------------

const styles = StyleSheet.create({ 
  wrapper: { 
    backgroundColor: '#edcb93',
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center'
  },

  container: {
    marginTop: 5,
    marginLeft: 5,
    marginRight: 5,

    height:100, 
    width: 350,

    borderWidth:2, 
    borderRadius: 20, 

    backgroundColor: '#ed6b5a',
    borderColor: 'black',
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center'
  },

  dispositif: {
    marginTop:5,
    fontWeight: 'bold',
    fontSize: 18,
    color: '#303830',
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center'
  },

  etat: { 
    marginTop:20,
    fontWeight: 'bold',
    fontSize: 18,
    color: '#303830',
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center' 
  },

  historique:
  {
    marginTop: 5, 
    marginBottom: 5,
    marginLeft: 5,
    marginRight: 5,

    borderWidth: 2,                       
    borderRadius: 15, 
    width: 350,
    backgroundColor: '#f53820',
    borderColor: 'black'
  }
}); 
   
export default Home