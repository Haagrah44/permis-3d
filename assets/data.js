// Contenu original (rédigé pour Permis 3D). Ne pas copier depuis des éditeurs de code de la route.
window.CODE_THEMES = [
 {id:'circulation', t:"Circulation routière", ic:"🛣️", cours:[
  "En agglomération, la vitesse est limitée à 50 km/h, sauf panneau contraire (zone 30, zone de rencontre à 20 km/h…).",
  "Hors agglomération, sur une route à double sens sans séparateur central, la limite est en général de 80 km/h.",
  "Jeune conducteur (permis probatoire) : 110 km/h sur autoroute, 100 km/h sur les routes à 2×2 voies séparées, 80 km/h ailleurs.",
  "Garde au moins 2 secondes d'écart avec le véhicule devant toi : c'est ta distance de sécurité.",
  "Une ligne continue ne se franchit pas et ne se chevauche pas."],
  q:[
  {q:"En agglomération, sans panneau particulier, quelle est la vitesse maximale ?",c:["30 km/h","50 km/h","70 km/h"],a:1,e:"En agglomération, la limite générale est 50 km/h."},
  {q:"Tu as ton permis depuis 6 mois. Quelle est ta vitesse maximale sur autoroute ?",c:["110 km/h","130 km/h","90 km/h"],a:0,e:"En période probatoire, c'est 110 km/h sur autoroute (au lieu de 130)."},
  {q:"Quelle distance de sécurité minimale dois-tu garder avec la voiture devant ?",c:["1 seconde","2 secondes","5 mètres"],a:1,e:"Au moins 2 secondes, et plus par temps de pluie."},
  {q:"Peux-tu chevaucher une ligne blanche continue pour dépasser un vélo ?",c:["Oui, toujours","Non, jamais","Oui, si la visibilité est bonne et que tu peux le faire en sécurité"],a:2,e:"Exception : pour dépasser un cycliste (ou un engin lent), tu peux chevaucher la ligne continue si la visibilité est suffisante."},
  {q:"Sur une route à double sens hors agglomération, sans séparateur, la vitesse maximale est en général :",c:["80 km/h","90 km/h","110 km/h"],a:0,e:"C'est 80 km/h en règle générale, sauf si un panneau indique autre chose."}]},
 {id:'conducteur', t:"Le conducteur", ic:"🧠", cours:[
  "En permis probatoire, le taux d'alcool maximal est de 0,2 g par litre de sang : en pratique, zéro verre.",
  "Tenir son téléphone en conduisant est interdit : 135 € d'amende et 3 points en moins.",
  "Fais une pause toutes les 2 heures sur un long trajet.",
  "Il faut environ 1 seconde pour réagir à un danger : à 50 km/h, tu parcours environ 14 mètres avant même de freiner.",
  "Un médicament avec le pictogramme rouge (niveau 3) : ne conduis pas."],
  q:[
  {q:"Jeune conducteur, quel est ton taux d'alcool maximal autorisé ?",c:["0,2 g/L de sang","0,5 g/L de sang","0,8 g/L de sang"],a:0,e:"0,2 g/L en période probatoire : autrement dit, aucun verre."},
  {q:"Tu tiens ton téléphone en main en conduisant. Tu risques :",c:["Rien si tu roules lentement","135 € et 3 points","Un simple avertissement"],a:1,e:"Téléphone tenu en main : 135 € d'amende et retrait de 3 points."},
  {q:"Sur un long trajet, tous les combien faut-il faire une pause ?",c:["Toutes les 2 heures","Toutes les 4 heures","Seulement si tu es fatigué"],a:0,e:"Une pause toutes les 2 heures, même si tu ne te sens pas fatigué."},
  {q:"Le temps de réaction moyen d'un conducteur en forme est d'environ :",c:["0,1 seconde","1 seconde","3 secondes"],a:1,e:"Environ 1 seconde, et beaucoup plus avec la fatigue, l'alcool ou le téléphone."},
  {q:"Ton médicament porte un pictogramme rouge (niveau 3). Tu peux :",c:["Conduire prudemment","Conduire seulement de jour","Ne pas conduire"],a:2,e:"Niveau 3 : la conduite est déconseillée, ne prends pas le volant."}]},
 {id:'route', t:"La route", ic:"🚧", cours:[
  "Les panneaux triangulaires à bord rouge annoncent un danger.",
  "Le losange jaune indique que tu es sur une route prioritaire.",
  "En zone de rencontre, la vitesse est limitée à 20 km/h et les piétons sont prioritaires.",
  "La bande d'arrêt d'urgence de l'autoroute n'est utilisée qu'en cas d'urgence réelle.",
  "Sans panneau à une intersection, c'est la priorité à droite."],
  q:[
  {q:"Un panneau triangulaire à bord rouge signifie :",c:["Une obligation","Un danger","Une indication"],a:1,e:"Triangle à bord rouge = panneau de danger."},
  {q:"Le panneau losange jaune bordé de blanc t'indique :",c:["Que tu es sur une route prioritaire","Une priorité à droite","Une fin d'agglomération"],a:0,e:"Losange jaune : tu es prioritaire aux prochaines intersections."},
  {q:"En zone de rencontre, la vitesse est limitée à :",c:["20 km/h","30 km/h","50 km/h"],a:0,e:"Zone de rencontre : 20 km/h et piétons prioritaires."},
  {q:"Tu arrives à une intersection sans aucun panneau ni marquage. Qui passe en premier ?",c:["Celui qui vient de gauche","Celui qui vient de droite","Le plus rapide"],a:1,e:"Sans signalisation, c'est la priorité à droite."},
  {q:"Peux-tu t'arrêter sur la bande d'arrêt d'urgence pour téléphoner ?",c:["Oui","Non, seulement en cas d'urgence","Oui, avec les feux de détresse"],a:1,e:"Elle est réservée aux vraies urgences (panne, malaise…)."}]},
 {id:'usagers', t:"Les autres usagers", ic:"🚲", cours:[
  "Pour dépasser un cycliste : au moins 1 m d'écart en agglomération, 1,5 m hors agglomération.",
  "Un piéton qui traverse ou montre qu'il veut traverser est prioritaire.",
  "En agglomération, facilite le départ d'un bus qui quitte son arrêt.",
  "Un véhicule prioritaire avec gyrophare et sirène : facilite son passage.",
  "Les deux-roues sont difficiles à voir : surveille bien tes angles morts."],
  q:[
  {q:"Hors agglomération, quel écart latéral minimum pour dépasser un cycliste ?",c:["0,5 m","1 m","1,5 m"],a:2,e:"1,5 m hors agglomération, 1 m en agglomération."},
  {q:"Un piéton attend au bord du passage piéton et montre qu'il veut traverser. Tu dois :",c:["Passer avant lui","T'arrêter pour le laisser traverser","Klaxonner"],a:1,e:"Un piéton qui manifeste clairement son intention de traverser est prioritaire."},
  {q:"En agglomération, un bus met son clignotant pour quitter son arrêt. Tu :",c:["Accélères pour passer avant","Facilites son départ","Klaxonnes pour le prévenir"],a:1,e:"En agglomération, tu dois faciliter le départ des bus."},
  {q:"Une ambulance arrive derrière toi avec gyrophare et sirène :",c:["Je facilite son passage","Je l'ignore","Je freine brusquement au milieu de la voie"],a:0,e:"Facilite son passage en te décalant quand c'est possible, sans danger."},
  {q:"Avant de changer de voie, que dois-tu contrôler en plus du rétroviseur ?",c:["Le compteur","L'angle mort","Le GPS"],a:1,e:"Un coup d'œil dans l'angle mort, toujours."}]},
 {id:'notions', t:"Notions diverses", ic:"📄", cours:[
  "Un permis probatoire commence avec 6 points.",
  "La période probatoire dure 3 ans (2 ans si tu as fait la conduite accompagnée).",
  "Un stage de sensibilisation permet de récupérer jusqu'à 4 points.",
  "Le premier contrôle technique a lieu 4 ans après la première mise en circulation, puis tous les 2 ans.",
  "Le constat amiable se remplit sur place, avec l'autre conducteur."],
  q:[
  {q:"Avec combien de points commence un permis probatoire ?",c:["6 points","8 points","12 points"],a:0,e:"6 points au départ, puis le capital augmente si tu ne commets pas d'infraction."},
  {q:"Sans conduite accompagnée, la période probatoire dure :",c:["1 an","2 ans","3 ans"],a:2,e:"3 ans, ou 2 ans après une conduite accompagnée."},
  {q:"Un stage de récupération de points te rend au maximum :",c:["2 points","4 points","6 points"],a:1,e:"Jusqu'à 4 points, dans la limite de ton capital maximal."},
  {q:"Le premier contrôle technique d'une voiture neuve se fait au bout de :",c:["2 ans","4 ans","6 ans"],a:1,e:"4 ans après la première mise en circulation, puis tous les 2 ans."},
  {q:"Après un petit accrochage, le constat amiable se remplit :",c:["Sur place, avec l'autre conducteur","Chez toi le lendemain","Uniquement au commissariat"],a:0,e:"Idéalement sur place, à deux, et signé par les deux conducteurs."}]},
 {id:'secours', t:"Premiers secours", ic:"⛑️", cours:[
  "Retenir les 3 gestes : Protéger, Alerter, Secourir.",
  "Le 112 est le numéro d'urgence européen, joignable gratuitement.",
  "Une victime inconsciente qui respire se met en Position Latérale de Sécurité (PLS).",
  "Ne retire pas le casque d'un motard blessé.",
  "En cas de saignement abondant, appuie fortement sur la plaie."],
  q:[
  {q:"Dans quel ordre faut-il agir sur un accident ?",c:["Secourir, Alerter, Protéger","Protéger, Alerter, Secourir","Alerter, Protéger, Secourir"],a:1,e:"Protéger d'abord pour éviter un sur-accident, puis alerter, puis secourir."},
  {q:"Quel est le numéro d'urgence valable dans toute l'Europe ?",c:["112","15","18"],a:0,e:"Le 112 fonctionne partout en Europe, même sans crédit."},
  {q:"Une victime est inconsciente mais respire. Tu la mets :",c:["Assise","En Position Latérale de Sécurité","Debout"],a:1,e:"La PLS évite qu'elle s'étouffe."},
  {q:"Un motard est blessé et conscient. Tu enlèves son casque ?",c:["Oui, pour qu'il respire","Non","Seulement s'il le demande"],a:1,e:"Ne retire pas le casque : risque de lésion de la colonne."},
  {q:"Une victime saigne abondamment. Que fais-tu ?",c:["Je lui donne à boire","J'appuie fortement sur la plaie","Je la fais marcher"],a:1,e:"Compression directe de la plaie, puis alerte des secours."}]},
 {id:'prendre', t:"Prendre et quitter son véhicule", ic:"🚪", cours:[
  "Avant d'ouvrir ta portière : rétroviseur et coup d'œil pour vérifier qu'aucun vélo n'arrive.",
  "La ceinture est obligatoire pour tous, à l'avant comme à l'arrière.",
  "Un enfant de moins de 10 ans voyage dans un siège adapté à sa taille.",
  "L'appui-tête se règle au niveau du haut de ta tête.",
  "Pour stationner en pente : frein à main serré et une vitesse engagée."],
  q:[
  {q:"Avant d'ouvrir ta portière côté rue, tu :",c:["Ouvres vite","Vérifies qu'aucun cycliste ou véhicule n'arrive","Klaxonnes"],a:1,e:"Rétroviseur + coup d'œil : l'ouverture de portière est une cause fréquente d'accident de vélo."},
  {q:"La ceinture est obligatoire :",c:["À l'avant seulement","À l'avant et à l'arrière","Seulement sur autoroute"],a:1,e:"Pour tous les passagers, partout."},
  {q:"Où doit se trouver le haut de l'appui-tête ?",c:["Au niveau du haut de la tête","Au niveau de la nuque","Au plus bas"],a:0,e:"Au niveau du haut de la tête, pour protéger les cervicales en cas de choc arrière."},
  {q:"Un enfant de 6 ans voyage :",c:["Sur les genoux d'un adulte","Dans un siège ou rehausseur adapté","Avec la ceinture adulte seule"],a:1,e:"Système de retenue adapté jusqu'à 10 ans."},
  {q:"Tu stationnes dans une rue en pente. Tu :",c:["Laisses au point mort","Serres le frein à main et engages une vitesse","Laisses le moteur tourner"],a:1,e:"Frein à main + vitesse engagée pour éviter que la voiture bouge."}]},
 {id:'meca', t:"Mécanique et équipements", ic:"🔧", cours:[
  "La pression des pneus se vérifie à froid.",
  "La profondeur minimale des sculptures des pneus est de 1,6 mm.",
  "Gilet de haute visibilité et triangle de signalisation sont obligatoires dans la voiture.",
  "Un voyant rouge qui s'allume : arrête-toi dès que possible en sécurité.",
  "Feux de croisement : la nuit, et le jour quand il pleut ou que la visibilité est mauvaise."],
  q:[
  {q:"La pression des pneus se contrôle de préférence :",c:["À froid","Après un long trajet","Peu importe"],a:0,e:"À froid, sinon la mesure est faussée."},
  {q:"La profondeur minimale légale des sculptures d'un pneu est :",c:["0,5 mm","1,6 mm","3 mm"],a:1,e:"1,6 mm minimum, mais un pneu est déjà moins efficace avant."},
  {q:"Quels équipements sont obligatoires dans la voiture ?",c:["Gilet et triangle","Extincteur","Trousse de secours"],a:0,e:"Gilet de haute visibilité (à portée de main) et triangle."},
  {q:"Un voyant rouge s'allume au tableau de bord. Tu :",c:["Continues ta route","T'arrêtes dès que possible en sécurité","Attends qu'il s'éteigne"],a:1,e:"Rouge = problème important (huile, freins, température…)."},
  {q:"Il pleut en plein jour. Quels feux allumes-tu ?",c:["Aucun","Feux de croisement","Feux de brouillard arrière"],a:1,e:"Les feux de croisement, pour voir et être vu."}]},
 {id:'securite', t:"Sécurité du passager et du véhicule", ic:"🛡️", cours:[
  "Désactive l'airbag passager si un siège bébé est installé dos à la route à l'avant.",
  "Un chargement qui dépasse de plus d'1 m à l'arrière doit être signalé.",
  "Si un porte-vélos cache la plaque, il faut une plaque supplémentaire.",
  "Avec l'ABS, tu peux freiner fort tout en gardant le contrôle de la direction.",
  "Aquaplaning : lâche l'accélérateur et tiens bien le volant, sans freiner brutalement."],
  q:[
  {q:"Un siège bébé dos à la route est installé à l'avant. L'airbag passager doit être :",c:["Activé","Désactivé","Peu importe"],a:1,e:"Désactivé : il serait dangereux pour le bébé."},
  {q:"Ton porte-vélos cache la plaque d'immatriculation. Tu dois :",c:["Rien faire","Ajouter une plaque répétitrice","Rouler feux allumés"],a:1,e:"La plaque doit rester lisible : plaque supplémentaire obligatoire."},
  {q:"L'ABS sert à :",c:["Freiner plus court sur la glace","Garder la direction en freinant fort","Économiser du carburant"],a:1,e:"Il empêche les roues de se bloquer : tu peux encore tourner."},
  {q:"Ta voiture fait de l'aquaplaning. Tu :",c:["Freines fort","Lâches l'accélérateur et tiens le volant","Accélères"],a:1,e:"Ne pas freiner brutalement : lâche l'accélérateur et garde le volant droit."},
  {q:"Un chargement dépasse de 1,5 m à l'arrière. Il faut :",c:["Le signaler","Rien","Rouler à 30 km/h"],a:0,e:"Au-delà de 1 m, le dépassement doit être signalé."}]},
 {id:'env', t:"Environnement", ic:"🌱", cours:[
  "Éco-conduite : passe rapidement les rapports supérieurs et anticipe pour freiner moins.",
  "À l'arrêt prolongé, coupe le moteur.",
  "Des pneus sous-gonflés augmentent la consommation.",
  "La climatisation augmente la consommation.",
  "Certaines villes ont des Zones à Faibles Émissions : la vignette Crit'Air peut être obligatoire."],
  q:[
  {q:"Pour consommer moins, tu :",c:["Montes dans les tours","Passes vite les rapports supérieurs","Accélères fort"],a:1,e:"Rouler en souplesse avec un rapport élevé économise du carburant."},
  {q:"Tu attends quelqu'un plusieurs minutes. Tu :",c:["Laisses tourner le moteur","Coupes le moteur","Accélères pour chauffer"],a:1,e:"Moteur coupé = zéro consommation et zéro pollution."},
  {q:"Des pneus sous-gonflés :",c:["Font économiser","Augmentent la consommation","N'ont aucun effet"],a:1,e:"Plus de résistance au roulement, donc plus de carburant."},
  {q:"La vignette Crit'Air sert à :",c:["Montrer le niveau de pollution du véhicule","Payer le péage","Prouver l'assurance"],a:0,e:"Elle classe les véhicules selon leurs émissions (utile dans les ZFE)."},
  {q:"La climatisation :",c:["Ne change rien","Augmente la consommation","Diminue la consommation"],a:1,e:"Elle consomme de l'énergie, donc du carburant."}]}
];

// Questions de l'examen pratique : 1 vérification + 1 question de sécurité routière + 1 question de premiers secours
window.FICHES = [
 {v:"Allume les feux de croisement.",vo:"Intérieur",sr:"Quand faut-il utiliser les feux de croisement ?",sra:"La nuit, et le jour quand la visibilité est réduite (pluie, brouillard, neige) ainsi que dans les tunnels.",ps:"Quel numéro appeler pour alerter les secours partout en Europe ?",psa:"Le 112."},
 {v:"Montre la commande des feux de brouillard arrière.",vo:"Intérieur",sr:"Dans quels cas les allumer ?",sra:"Uniquement par brouillard ou chute de neige : sinon ils éblouissent les conducteurs derrière.",ps:"Quelles informations donner aux secours quand tu les appelles ?",psa:"Ton numéro de téléphone, ce qui s'est passé (nature du problème) et l'endroit précis."},
 {v:"Mets en marche les feux de détresse.",vo:"Intérieur",sr:"Dans quels cas les utiliser ?",sra:"En cas de panne ou d'accident, d'arrêt d'urgence, ou pour prévenir d'un ralentissement brusque (bouchon sur voie rapide).",ps:"Comment protéger les lieux d'un accident ?",psa:"Allumer les feux de détresse, enfiler le gilet, placer le triangle en amont si c'est possible sans danger, et éloigner les personnes de la circulation."},
 {v:"Ouvre le capot et montre la jauge d'huile moteur.",vo:"Extérieur",sr:"Que risques-tu si le niveau d'huile est trop bas ?",sra:"Une usure rapide et, au pire, la casse du moteur.",ps:"Qu'est-ce que la Position Latérale de Sécurité ?",psa:"Une position sur le côté pour une victime inconsciente qui respire : elle évite qu'elle s'étouffe."},
 {v:"Montre où trouver les pressions des pneus recommandées.",vo:"Extérieur",sr:"Quelles sont les conséquences d'un pneu sous-gonflé ?",sra:"Moins bonne tenue de route, usure plus rapide, plus de consommation et risque d'éclatement.",ps:"Comment vérifier qu'une victime respire ?",psa:"Regarder si le ventre ou la poitrine se soulève, écouter et sentir le souffle pendant quelques secondes."},
 {v:"Montre la commande de désembuage de la lunette arrière.",vo:"Intérieur",sr:"Pourquoi faut-il désembuer les vitres ?",sra:"Pour garder une bonne visibilité tout autour du véhicule.",ps:"Une victime saigne abondamment : que fais-tu ?",psa:"Appuyer fortement sur la plaie (compression) et faire alerter les secours."},
 {v:"Fais fonctionner l'avertisseur sonore.",vo:"Intérieur",sr:"En agglomération, quand peut-on klaxonner ?",sra:"Uniquement en cas de danger immédiat.",ps:"Pourquoi ne faut-il pas déplacer une victime ?",psa:"Pour ne pas aggraver ses blessures, notamment à la colonne vertébrale. Sauf danger réel et immédiat (incendie…)."},
 {v:"Montre le réservoir du liquide de refroidissement.",vo:"Extérieur",sr:"Que risques-tu si le moteur surchauffe ?",sra:"Une panne et des dégâts importants sur le moteur.",ps:"Une personne ne respire plus : que faut-il faire ?",psa:"Alerter les secours, commencer le massage cardiaque et utiliser un défibrillateur dès que possible."},
 {v:"Règle l'appui-tête du conducteur.",vo:"Intérieur",sr:"À quoi sert l'appui-tête ?",sra:"À protéger la nuque et les cervicales en cas de choc, surtout par l'arrière.",ps:"Un motard est blessé : faut-il lui retirer son casque ?",psa:"Non, pour ne pas risquer d'aggraver une blessure à la colonne."},
 {v:"Allume les feux de route.",vo:"Intérieur",sr:"Quand dois-tu passer en feux de croisement ?",sra:"Quand tu croises ou suis un véhicule, et quand la route est suffisamment éclairée.",ps:"Qu'est-ce qu'un défibrillateur automatisé externe ?",psa:"Un appareil qui analyse le cœur et délivre un choc électrique si nécessaire. Tout le monde peut l'utiliser en suivant ses instructions vocales."},
 {v:"Montre le réservoir du liquide de frein.",vo:"Extérieur",sr:"Que se passe-t-il si le niveau est trop bas ?",sra:"Le freinage devient moins efficace : c'est dangereux.",ps:"Comment savoir si une victime est consciente ?",psa:"Lui poser des questions simples et lui demander de serrer la main ou d'ouvrir les yeux."},
 {v:"Mets en marche les essuie-glaces avant.",vo:"Intérieur",sr:"Comment adapter ta conduite sous la pluie ?",sra:"Réduire la vitesse (les limites baissent sur autoroute et voies rapides), augmenter les distances de sécurité et allumer les feux de croisement.",ps:"Pourquoi faut-il alerter les secours rapidement ?",psa:"Pour que les secours arrivent le plus vite possible : chaque minute compte pour la victime."}
];

// Commandes de l'intérieur du véhicule
window.CONTROLS = [
 {id:'cli',n:"Clignotants",x:22,y:62,d:"Le levier à gauche du volant. Vers le haut = droite, vers le bas = gauche. Mets-le avant chaque changement de direction ou de voie, même s'il n'y a personne.",ex:"À l'examen : oublier le clignotant est une erreur fréquente."},
 {id:'feux',n:"Feux (croisement, route, brouillard)",x:15,y:55,d:"La molette au bout du levier gauche. Croisement la nuit et par mauvais temps, route hors agglomération sans personne en face, brouillard arrière seulement par brouillard ou neige.",ex:"Question fréquente : « Allume les feux de croisement »."},
 {id:'essuie',n:"Essuie-glaces",x:78,y:62,d:"Le levier à droite du volant. Plusieurs vitesses, et un appui pour le lave-glace.",ex:"Vérification : « Mets en marche les essuie-glaces avant »."},
 {id:'warning',n:"Feux de détresse (warning)",x:50,y:46,d:"Le bouton rouge avec un triangle, au centre. Il fait clignoter les 4 clignotants.",ex:"Utilise-les en cas de panne, d'accident ou de ralentissement brusque sur voie rapide."},
 {id:'clim',n:"Chauffage et climatisation",x:68,y:74,d:"Les commandes au centre : température, ventilation, répartition de l'air. La climatisation aide aussi à désembuer plus vite.",ex:"Astuce : air vers le pare-brise + clim pour désembuer rapidement."},
 {id:'desemb',n:"Désembuage avant et arrière",x:58,y:74,d:"Le bouton avec un pare-brise (avant) et celui avec un rectangle et des flèches (lunette arrière).",ex:"Vérification : « Montre la commande de désembuage arrière »."},
 {id:'klaxon',n:"Avertisseur sonore (klaxon)",x:40,y:70,d:"Le centre du volant. En agglomération, seulement en cas de danger immédiat.",ex:"Vérification : « Fais fonctionner l'avertisseur sonore »."},
 {id:'compteur',n:"Compteur et voyants",x:40,y:52,d:"Vitesse, régime moteur, carburant et voyants. Orange = à surveiller, rouge = arrête-toi dès que possible.",ex:"Voyants importants : huile, batterie, température, freins, airbag."},
 {id:'frein',n:"Frein de stationnement",x:62,y:90,d:"Le levier ou le bouton « P » entre les sièges. Toujours serré quand tu quittes la voiture.",ex:"En pente : frein serré + une vitesse engagée."},
 {id:'levier',n:"Levier de vitesses",x:52,y:88,d:"Pour changer de rapport (boîte manuelle) ou choisir D/R/P (boîte automatique).",ex:"Éco-conduite : passe vite les rapports supérieurs."},
 {id:'retro',n:"Rétroviseurs",x:50,y:8,d:"Le rétroviseur intérieur au centre, et les deux extérieurs. Règle-les avant de démarrer, puis contrôle aussi l'angle mort.",ex:"Contrôles : rétroviseur intérieur, extérieur, puis angle mort."},
 {id:'ceinture',n:"Ceinture de sécurité",x:90,y:40,d:"Obligatoire pour tous, avant et arrière. Elle doit passer sur l'épaule et le bassin, jamais sous le bras.",ex:"Le conducteur est responsable des passagers mineurs."}
];
