 
import AsyncStorage from '@react-native-async-storage/async-storage'; 


class StockageLocal // pour la gestion du stockage local
{    
    constructor () {
        this.compteur = 0; // compteur pour la clef d'accès
        this.clefs = [];
    }

    async enregistrerEvennement( donnee ) // Avec cette méthode on enregistre les données
    {
        try
        { 
            // On génère une clef pour l'enregistrement
            const clef = 'historique@' + JSON.stringify( this.compteur ); 
            const item = JSON.stringify( donnee );
            this.clefs.push(clef);
            this.compteur += 1; // si on place cette ligne après l'enregistrement...
            // ... JS incrémente le compteur plusieurs fois sans explication
            await AsyncStorage.setItem(clef, item);
        }
        catch (error) { 
            alert("BDD - Erreur à l'enregistrement!");
            this.compteur -= 1; // pour corriger
        } 
    } 
    
    async obtenirDonnes( fonction ) // Avec cette méthode on récupère les données stockées
    {
        try { 
            let liste_a_exporter = [];

            const array = await AsyncStorage.multiGet(this.clefs); // tentative de lecture
            //console.log(this.clefs)


            if (array != null)
            {
                // puisque les données récupérées sont ube liste de listes de clef-valeur
                // on doit traiter cette liste, pour ne transférer que les valeurs dans une autre liste
                for (item in array)
                    liste_a_exporter.push( JSON.parse(array[item][1])); 

                console.log( "BDD - données récupérées" );
                fonction(liste_a_exporter); // c'est ici qu'on appel la méthod passé en argument...
                // ... du fichier de l'historique, qui recevra les données
            }
            else { console.log( "BDD - pas de données!" );  }
        }
        catch (error) { alert("BDD - Erreur de lecture!"); }
    }
} 

const NotreBDD = new StockageLocal(); // objet global utilisé par les deux vues:

export { NotreBDD };