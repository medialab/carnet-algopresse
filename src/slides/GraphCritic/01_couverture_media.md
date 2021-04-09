
## Quelle est la couverture médiatique de l'IA ?

Notre recherche a consisté à extraire un large corpus de 29342 d'articles de presse portant sur  l’IA et les algorithmes sur une période de 5 années, réalisée sur l'agrégateur de presse Factiva sur un ensemble de 47 sources de presse généraliste aux États unis et au Royaume Uni (27 sources pour USA et 20 sources pour UK).

Les données récoltées laisse apparaître est une augmentation du volume d’articles portant sur l’IA - telle que définie par notre requête - sur la période d’observation. Cette augmentation atteste de la place de plus en plus importante du thème des algorithmes et de l’IA dans l’espace médiatique ces dernières années. Afin de contrôler cette augmentation au sein de notre corpus, nous avons comparé avec d’autres requêtes effectuées sur la même période et des sources identiques, pour lesquelles on attend une distribution stable. L’observation du volume d’articles extraits à partir de notre requête montre une augmentation significative de 163% entre 2015 et 2019  des publications portant sur l’IA et les algorithmes alors que les articles consacrés à l’art (-9%), la culture (+2%), l'économie (+0%) ou la technologie (+14%) restent relativement stables. 

**Visuel Caparatif volume articles Les statistiques comparées des différentes requêtes intègrent les doublons présents dans la base Factiva**

Ce constat d’une augmentation de la visibilité croissante du thème de l’IA a été observé dans d’autres travaux à partir d'analyses statistiques portants sur différentes sources informationnelles  (Perrault et al, 2019). Tout d'abord dans presse anglophone, à l'échelle mondiale, à partir d'analyses statistiques produites par le projet GDELT, s’observe une croissance du thème de l'IA et des termes associés tels que Deep learning, Machine Learning entre 2017 et 2019. Cette augmentation de la présence du terme de l'IA est aussi largement visible à partir des statistiques de requêtes effectuées sur le moteur de recherche Google aux USA et analysables via le service Google trends sur la période allant de 2015 à 2019. Enfin le même constat est également fait d'une augmentation entre 2017 et 2019 de la fréquence d'apparition des termes AI et Machine Learning dans différents corpus de documents issus par exemple d'organisations gouvernementales aux USA, au Canada, et au Royaume Uni, mais également dans les appels de fonds des entreprises américaines.

## Comment detecter le disours critique dans les médias ? 

En s’appuyant sur des outils d’annotations par apprentissage supervisé, un sous corpus d’articles produisant un discours critique des algorithmes et de l’IA a été constitué. À partir de l’annotation manuelle de 2000 titres d’articles de presse jugés "critiques", nous avons construit un modèle d’apprentissage automatique en réalisant plusieurs itérations incluant des phases de contrôle des résultats afin d’optimiser le modèle de détection des articles "critiques". Tous les titres d’articles comportant des arguments ou éléments sémantiques négatifs portant explicitement sur une forme de calculateur (algorithme, IA, robot, etc.) ont été annotés comme critiques. À l’inverse ont été annotés comme non critiques ou ignorés les titres d’articles aux énoncés neutres, positifs, ambigus ou n'évoquant pas directement un calculateur. Par exemple les titres "Robocops to replace british bobbies on the streets, police force reveals" ou "Growth of ai could boost cybercrime and security threats , report warns"  ont été annotés comme critiques, alors que "AI to create more than 7m jobs" ou "Google so advanced stores will pack your products before you’ve thought of ordering them" ont été annotés non critiques. Étant donné le travail de sourcing manuel du corpus de départ et l’usage de méthode d’annotation par apprentissage supervisé, ce corpus ne prétend pas à une quelconque exhaustivité ou représentativité. Notre démarche permet en revanche d’appréhender avec la plus large diversité possible les thèmes associés à la critique de l’IA et des algorithmes. 

**Visuel taux sur la période et nb articles critic non critic**

A partir de ce protocole de catégorisation, un sous corpus de 2 091 articles de presse catégorisés comme critiques a été constitué. Le taux d'articles annotés comme critiques de la base initiale est de 7,1% en moyenne sur l’ensemble du corpus et présente une assez forte stabilité durant la période (écart type de +/- 2,2%). Si le volume d’articles portant sur l’IA et les algorithmes augmente significativement, le taux d’articles détectés par le modèle comme contenant un discours critique augmente simultanément durant la période. Des travaux portant sur l’analyse de la couverture médiatique du thème de l’IA en Grande Bretagne ont montré qu’une très large majorité des publications portaient sur les avancées technologiques dans le domaine et sur les potentiels développement que ces derniers permettent dans les secteurs du commerce et de l’industrie. Les questions éthiques et les problèmes sociaux tels que les risques de discrimination associés au déploiement de ces technologies sont sous représentés au sein de l’espace médiatique (Brennen et al, 2018). 

---
## Méthode : Extraction de corpus et Detection du discours critique par apprentissage supervisé

**Requête utilisée sur Factiva** : "artificial intelligence" OR "AI" OR "algorithm*" OR "machine learning" OR "deep learning" OR "neural network*" -"amnesty international" -"weiwei" -"air india" 
**Période d'extraction** : du 01/01/2015 au 31/12/2019 
**Volume d'articles extraits** : 29 342 articles

**Sources UK (n=20)** : Daily Mail, Daily Record, Daily star, Economist, Evenng Standard, Evening Times, Express, Guardian, Independent, Mail online, Morning Star, Observer, Sunday Mall, Telegraph, The Mirror, The Sunday Mirror, The Sun, The Sunday Times, The Times, Which

**Sources USA (n=27)** : ABCNEWS, Barron's, Business Insider, CBS News, Chicago Tribune, CNN, Dailynews, Forbes, Fox News , Los Angeles Times, MSNBC News, New York Newsday, New York Post, New York Times, Newsweek, Politico, Rochester Democrat Chronicle, Slate, The Huffington Post, The Verge, Time Magazine, USA Today, Vice News, Wall Street Journal Online, Wall Street Journal, Washington Post, Washington Times

**Modèle utilisé pour la détection du discours critique :** fasText - https://fasttext.cc

**Corpus d'apprentissage :** 2000 articles annotés manuellement via prodigy - https://prodi.gy

**Régles de codage des articles :** 
 - CRITIQUE : Enoncés critiques ou réponse à une critique  (champ sémantique ou arguments critiques), Evocation d’un calculateur ( algorithme, IA, robot, etc.). Exemple : « Robots put jobs at risk », 
« Robot lawyers: how humans can fight back »
 - NON CRITIQUE : Enoncés neutres ou positifs, Pas d’évocation d’un calculateur. Exemple : « AI to 'create more than 7m jobs’ », 
« In the 2020s, artificial intelligence will transform the work of lawyers »
 - IGNORE : Enoncés ambigus, Pas d’évocation d’un calculateur. Exemple : « Restaurants are now employing robots – should chefs be worried? », « Need a lawyer? There's an algorithm for that »

**Comparaison des modèles de détection de la critique :** 
Afin de s’assurer de la variété et de la précision des articles différents modèles d’annotation ont été comparés et améliorés par itérations successives et un contrôle manuel systématique des résultats produits par ces modèles ont été effectués. C'est finalement le modèle fastext qui a produit la détection la plus précise des articles critiques

**Tableau résutats comparatifs**

**Contrôle des résultats du modèle :** 
Cette approche méthodologique a permis de traiter une large base de données qui aurait été difficilement catégorisable manuellement. En revanche, les outils mobilisés de catégorisation automatique par apprentissage supervisé comportent un risque potentiel de ne pas détecter certains articles critiques dans le corpus. Pourtant, les itérations successives réduisent ce biais car les résultats obtenus à chaque itération montrent un épuisement des capacités du modèle à détecter de nouveaux articles critiques. Par ailleurs, des opérations de contrôle manuel systématique de l’ensemble des résultats produits par l‘algorithme ont permis de s’assurer que le sous corpus d’articles catégorisés comme critiques ne contenait pas de faux positifs. 
