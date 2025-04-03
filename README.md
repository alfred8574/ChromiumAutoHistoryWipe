# ChromiumAutoHistoryWipe

## Description

**ChromiumAutoHistoryWipe** est une extension pour les navigateurs basés sur Chromium (comme Google Chrome, Microsoft Edge ou Opera) qui automatise la suppression de l'historique de navigation. Ce script est conçu pour protéger votre vie privée en effaçant régulièrement l'historique de navigation, soit après une période d'inactivité, soit à intervalles réguliers.

## Fonctionnalités

- **Suppression automatique de l'historique après une période d'inactivité** : Si aucune activité n'est détectée dans le navigateur pendant une heure (par défaut), l'historique de navigation est automatiquement supprimé.
- **Suppression horaire de l'historique** : L'historique est également effacé toutes les heures, indépendamment de l'activité.
- **Détection d'activité utilisateur** : Le script surveille les interactions utilisateur, comme l'activation d'onglets, la mise à jour d'onglets ou le changement de fenêtre.
- **Compatibilité avec les navigateurs Chromium** : Le script est conçu pour fonctionner uniquement avec les navigateurs basés sur Chromium. Si un autre navigateur est détecté, il ne s'exécutera pas.

## Pourquoi l'utiliser ?

1. **Protection de la vie privée** : Empêche l'accumulation d'un historique de navigation qui pourrait être utilisé pour suivre vos activités en ligne.
2. **Nettoyage automatisé** : Plus besoin de penser à effacer manuellement votre historique, le script s'en charge pour vous.
3. **Simplicité** : Une fois installé, le script fonctionne en arrière-plan sans nécessiter d'intervention de votre part.
4. **Sécurité** : Réduit les risques liés à l'accès non autorisé à votre historique de navigation.

## Fonctionnement

1. **Détection du navigateur** : Le script vérifie si le navigateur est basé sur Chromium. Si ce n'est pas le cas, il affiche un avertissement et s'arrête.
2. **Surveillance de l'activité** : Le script met à jour un horodatage interne à chaque interaction utilisateur (activation ou mise à jour d'onglets, changement de fenêtre).
3. **Vérification de l'inactivité** : Toutes les minutes, le script vérifie si l'utilisateur est inactif depuis plus d'une heure. Si c'est le cas, l'historique est supprimé.
4. **Suppression horaire** : Un système d'alarmes supprime l'historique toutes les heures, même si l'utilisateur est actif.
5. **Événements du navigateur** : L'historique est également effacé au démarrage ou à la suspension du navigateur.

## Installation

1. Téléchargez ou clonez ce dépôt sur votre machine.
2. Ouvrez Google Chrome (ou un autre navigateur basé sur Chromium).
3. Accédez à `chrome://extensions/`.
4. Activez le **mode développeur**.
5. Cliquez sur **Charger l'extension non empaquetée** et sélectionnez le dossier contenant ce projet.
6. L'extension est maintenant installée et fonctionnera automatiquement.

## Configuration

- **INACTIVITY_LIMIT** : Vous pouvez modifier la durée d'inactivité avant la suppression de l'historique en changeant la valeur de `INACTIVITY_LIMIT` dans le fichier `background.js`. Par défaut, il est défini sur 1 heure (60 * 60 * 1000 millisecondes).

## Limitations

- Ce script ne fonctionne que sur les navigateurs basés sur Chromium. Il n'est pas compatible avec Firefox ou d'autres navigateurs.
- Il supprime uniquement l'historique de navigation. Les autres données (cookies, cache, etc.) ne sont pas affectées.

## Avertissement

Ce script est fourni "tel quel". Utilisez-le à vos propres risques. Assurez-vous de comprendre son fonctionnement avant de l'utiliser, en particulier si vous avez besoin de conserver votre historique de navigation pour des raisons professionnelles ou personnelles.

## Auteur

Créé par [Votre Nom ou Pseudonyme].

## Licence

Ce projet est sous licence MIT. Consultez le fichier `LICENSE` pour plus d'informations.