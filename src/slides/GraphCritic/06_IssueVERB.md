
## Quels sont les troubles produits par ces agents calculateurs ? 

>Visualisation Issue Tag BICOLOR full

La catégorie intitulée “Issues” permet une lecture comparée des termes relatifs aux troubles et aux enjeux qui sont associés aux agents techniques sur lesquels porte la critique. 

>Visualisation Issue Tag BICOLOR gauche

Du côté de l'espace sémantique “Robots”, c’est l’affrontement entre les humains et les IA qui est constamment appelé comme enjeu. On observe la présence de termes tels que attack, safety, arms race, Cold war, human extinction, extinction, natural disasters, AI-powered horror, mass extinction, physical damage, qui renvoient le plus souvent au registre de la guerre ou de destruction à l’échelle planétaire, faisant peser un risque existentiel sur l’avenir de l’humanité. Ces menaces font émerger des enjeux de contrôle de ces technologies autonomes, tels que ban, petition, human oversight, lack of accountability, superintelligence control problem, control problem. D’autres termes relèvent de troubles assez visibles dans cet espace sémantique associés au remplacement, au dépassement et à une perte de contrôle de l’homme par les machines, notamment dans le domaine de l’économie, avec des termes tels que job losses, surge pricing, pay gap.

>Visualisation Issue Tag BICOLOR droite

Les termes relatifs aux troubles et enjeux constitutifs du sous-ensemble nommé "Algorithmes" laissent apparaître d’autres formes de discours de critique davantage imprégnées de références juridiques et légales. En effet, on trouve dans cette partie du graphe parmi les termes fréquents un champ sémantique constitué de références juridiques tels que crime, law enforcement, Human Rights, lawsuit, Civil Liberties, prejudice, fraud, public interest. Les troubles produits par les agents techniques dénoncés au sein des articles associés à cet espace concernent les discriminations (bias, biases, discrimination, antisemitic, race or gender, fair use, risk score, liberal bias), les enjeux de privacy (privacy, surveillance, Big Brother, privacy issues), les difficultés de filtrage ou d’exposition à de contenus innapropriés (violence, inappropriate content, nudity, age restriction, violent crime) et frauduleux (fake news, misinformaton, conspiracy theories, revenge porn, filter bubble), ou encore de censure et de liberté d’expression (free expression)

>Visualisation Verbes troubles full

Une autre manière de poursuivre cette analyse comparative des troubles et formes d’agentivité associés aux calculateurs consiste en l’exploration d’une autre entité sémantique au sein du corpus d’articles que sont les verbes mais absente du réseau du fait de la procédure d’extraction. Après avoir réalisé une extraction d’une liste de verbes interprétables comme étant potentiellement de bons candidats aux troubles produits par les dispositifs techniques, nous avons calculé et comparé leur score tf-idf  au sein des deux sous-ensemble d’articles constitutifs du réseau.

>Visualisation Verbes troubles robot

Les verbes dont les scores tf-idf sont les plus importants dans les articles qui composent l’espace sémantique “Robots” viennent conforter l’analyse des troubles effectuée à partir des termes catégorisés comme “Issues” au sein du graphe. En effet, on observe une plus forte représentation de verbes exprimant une menace de la part des machines et intelligences autonomes relevant d’un discours prophétique, voire apocalyptique. Parmi les verbes sélectionnés comme bons candidats à l’expression de troubles ayant les plus importants scores, on trouve des verbes qui expriment des notions de destruction (doom, destroy, eradicate, kill, eliminate) et de domination des machines sur l'homme (enslave, dominate), mais également de  dépassement ou de remplacement des hommes par les ces agents techniques (overtake, surpass, replace, defeat). D’autres verbes davantage représentés dans le sous ensemble “robots” renvoient à des notions de transformation et de changement (reshape, transform, disrupt) ou aux capacités de ces agents techniques à imiter ou simuler les comportements humains (ressemble, simulate, reproduce, mimic).

>Visualisation Verbes troubles algos

Dans le sous-ensemble d’articles associés aux "Algorithmes" on retrouve également des verbes qui viennent conforter les analyses précédentes réalisées à partir de la catégories “Issues”. En effet, les verbes qui présentent les plus hauts scores de tf-idf renvoient aux questions de filtrage et de censure de l’information (filter, delete, supress, censor), aux problèmes de surveillance et de privacy (profile, suspect, spy, target, track), à la dénoncitation des formes de discrimination (bias, discriminate) ou encore aux phénomènes de propagation et d’amplification de contenus frauduleux (promote, amplify, spread). 

>Visualisation Verbes troubles full

---

## Méthode : Extraction des verbes de troubles 

**Extraction des verbes et calcul des TF-IDF sur le graphe** 

L’analyse des verbes de troubles a été réalisée, à partir du logiciel Cortext, en effectuant une première extraction de 1000 verbes sur le texte complet des articles critiques du corpus en employant la méthode “pigeon holes” via le logiciel Cortext (identique à la méthode d'extraction des termes du graphe).
La liste de verbes ainsi produite a d’abord été manuellement annotée afin d’extraire une sous liste de 431 verbes pouvant être interprétés comme des problèmes, des difficultés ou des troubles. En effectuant plusieurs itérations de visualisation matricielle via l'outil clustergrammer https://maayanlab.cloud/clustergrammer/ des scores de tf-idf pour chacun des verbes sur l’ensemble des articles associés aux 17 clusters principaux (supérieur à 1% d’articles du corpus) via l’outil clustergrammer une liste plus restreinte de 66 verbes a été sélectionnée présentant une plus forte saillance dans la matrice et étant plus explicitement interprétables comme troubles.
Le calcul final du score tf-idf s'effectue en produisant une matrice du nombre d'occurrences brutes des verbes (en ligne) par documents dans chacun des 23 clusters (en colonne). On calcule la somme des occurrences suivant les deux grands sous ensembles définis en suivant la topologie sur l’axe de l’incarnation, produisant deux ensembles comparables en volume d’articles (Robots : 52% articles - 9 clusters > 1% - 1790 termes ; Algorithmes : 48% articles - 8 clusters > 1% - 1201 termes).
La matrice finale compte 66 verbes en ligne et deux colonnes correspondant aux deux sous-ensembles algorithmes et robots. Le calcul du score tf-idf est obtenu à partir du module TfidfTransformer https://scikit-learn.org/stable/modules/generated/sklearn.feature_extraction.text.TfidfTransformer.html en conservant les options par défaut (intégrant la fonction smooth_idf=True, la constante "1" est ajoutée au numérateur et au dénominateur de l'idf comme si l'on voyait un document supplémentaire contenant chaque terme de la collection exactement une fois, ce qui évite les divisions par zéro : 
>idf(t) = log [ (1 + n) / (1 + df(t)) ] + 1.
