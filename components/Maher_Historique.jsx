import React from 'react' 
import { StyleSheet, View, Text, FlatList } from 'react-native'
import { NotreBDD } from './stockage_app';


class Historique extends React.Component {  // représente la vue "Historique"
   
  static navigationOptions = { 
    title: 'Historique', 
    headerStyle: { 
      backgroundColor: 'yellow'
    } 
  };


  state = {
      valeur: "Historique",
      records: []
  };
 
  componentDidMount() {
    // Très important: c'est ici qu'on charge le tableau
    NotreBDD.obtenirDonnes( this.updateTable.bind(this) );
  }

  updateTable( liste_de_donnes )
  {
      //console.log(liste_de_donnes);
      
      // ici on peut limiter la longueur de la liste
      // mais par manque de temps, on omet cette procédure
      
      this.setState( { records: liste_de_donnes } );
  }

  tableRow(record) // on affiche une ligne à la fois 
  {
    //console.log("tableRow(): ", record.date, record.heure, record.event);

    return ( 
      <View style={styles.row}> 
          <View style={styles.cel}> 
              <Text style={styles.celText}>{record.date}</Text>
          </View>
          <View style={styles.cel}> 
              <Text style={styles.celText}>{record.heure}</Text>
          </View>
          <View style={styles.celEvent}> 
              <Text style={styles.celText}>{record.event}</Text>
          </View>
      </View>
    ); 
  }

  renderTable() // on affiche le tableau, c'est-à-dire les données tabulées
  {
    return (
        <FlatList
          data = {this.state.records}
          renderItem = {({item})=>{return(this.tableRow(item))}}        
        />
    );
  }

  render() { 
    return ( 
      <View style={styles.wrapper}>
        <View style={styles.table}>
            {/* Entete du tableau */} 
            <View style={styles.header}> 
                <View style={styles.cel}> 
                    <Text style={styles.headerText}>Date</Text> 
                </View> 
                <View style={styles.cel}> 
                    <Text style={styles.headerText}>Heure</Text> 
                </View>
                <View style={styles.celEvent}> 
                    <Text style={styles.headerText}>Évennement</Text> 
                </View>  
            </View>
            {/* Tableau généré par méthode ci-bas*/} 
            { this.renderTable() }
        </View> 
      </View> 
    ) 
  } 
} 

// ---------------------------------------- STYLES -------------------------------------------

const styles = StyleSheet.create({ 

    wrapper: { 
        flex: 1, 
        //alignItems: 'center',  // ceci a causé des problèmes
        justifyContent: 'center' 
    },

    table: {
        flex: 1,
        justifyContent: 'center',
        //borderWidth: 1,
        margin: 10
        //backgroundColor: '#fff'
    },

    header: {
        //alignSelf: 'stretch', 
        flexDirection: 'row', 
        marginTop: 5, 
        backgroundColor: 'gray',
    },

    headerText: {
        fontSize: 12,
        fontWeight: 'bold' ,
        textAlign: 'center', 
        color: 'black'
    },

    cel: { 
        flex: 1, 
        // alignSelf: 'stretch',
        paddingRight: 2, 
        paddingLeft: 2, 
        paddingTop: 2, 
        paddingBottom: 2,
        borderWidth: 1,
        alignItems: 'center'
    },

    celEvent: { 
        flex: 2, 
        // alignSelf: 'stretch',
        paddingRight: 2, 
        paddingLeft: 2, 
        paddingTop: 2, 
        paddingBottom: 2,
        borderWidth: 1,
        alignItems: 'center'
    },

    celText: { 
        fontSize: 12,
        textAlign: 'center',
        color: 'black'
    }, 

    row: { 
        flex: 1,
        //alignSelf: 'stretch',
        flexDirection: "row",  
        alignItems: 'center'
    } 
});
 
export default Historique