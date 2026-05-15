const BASE = 'https://www.pokepedia.fr';

/**
 * Sprites Pokepedia — miniatures officielles des objets.
 * Clé : nom exact de l'objet tel qu'utilisé dans items.json.
 * Valeur : URL directe vers l'image sur www.pokepedia.fr.
 */
export const itemSprites: Record<string, string> = {
  // Pierres d'évolution (LPZA)
  'Pierre Feu':            `${BASE}/images/2/29/Miniature_Pierre_Feu_LPZA.png`,
  'Pierre Eau':            `${BASE}/images/e/ed/Miniature_Pierre_Eau_LPZA.png`,
  'Pierre Foudre':         `${BASE}/images/b/b4/Miniature_Pierre_Foudre_LPZA.png`,
  'Pierre Plante':         `${BASE}/images/6/61/Miniature_Pierre_Plante_LPZA.png`,
  'Pierre Lune':           `${BASE}/images/8/87/Miniature_Pierre_Lune_LPZA.png`,
  'Pierre Soleil':         `${BASE}/images/f/fc/Miniature_Pierre_Soleil_LPZA.png`,
  'Pierre Eclat':          `${BASE}/images/9/99/Miniature_Pierre_%C3%89clat_LPZA.png`,
  'Pierre Nuit':           `${BASE}/images/8/8a/Miniature_Pierre_Nuit_LPZA.png`,
  'Pierre Aube':           `${BASE}/images/6/6a/Miniature_Pierre_Aube_LPZA.png`,
  'Pierre Glace':          `${BASE}/images/b/b6/Miniature_Pierre_Glace_LPZA.png`,
  'Pierre Ovale':          `${BASE}/images/3/32/Miniature_Pierre_Ovale_EV.png`,
  'Pierre Dure':           `${BASE}/images/2/2a/Miniature_Pierre_Dure_LPZA.png`,

  // Objets marins
  'Ecaille Océan':         `${BASE}/images/7/70/Miniature_%C3%89caille_Oc%C3%A9an_DEPS.png`,
  'Dent Océan':            `${BASE}/images/b/b5/Miniature_Dent_Oc%C3%A9an_DEPS.png`,
  'Ecaille Draco':         `${BASE}/images/e/ea/Miniature_%C3%89caille_Draco_EV.png`,

  // Objets d'échange / évolution
  'CD douteux':            `${BASE}/images/3/3e/Miniature_CD_Douteux_LPZA.png`,
  'Electriseur':           `${BASE}/images/1/10/Miniature_%C3%89lectriseur_EV.png`,
  'Magmariseur':           `${BASE}/images/5/52/Miniature_Magmariseur_EV.png`,
  'Roche Royale':          `${BASE}/images/5/51/Miniature_Roche_Royale_LPZA.png`,
  'Peau Métal':            `${BASE}/images/5/56/Miniature_Peau_M%C3%A9tal_LPZA.png`,
  'Bel\'Ecaille':           `${BASE}/images/d/db/Miniature_Bel%27%C3%89caille_LPZA.png`,
  'Protecteur':            `${BASE}/images/5/5f/Miniature_Protecteur_EV.png`,
  'Tissu Fauche':          `${BASE}/images/a/a9/Miniature_Tissu_Fauche_EV.png`,
  'Sachet Senteur':        `${BASE}/images/f/f4/Miniature_Sachet_Senteur_LPZA.png`,
  'Améliorator':           `${BASE}/images/3/3b/Miniature_Am%C3%A9liorator_LPZA.png`,
  'Chantibonbon':          `${BASE}/images/0/01/Miniature_Chantibonbon_LPZA.png`,
  'Griffe Rasoir':         `${BASE}/images/d/df/Miniature_Griffe_Rasoir_EV.png`,
  'Croc Rasoir':           `${BASE}/images/f/f6/Miniature_Croc_Rasoir_EV.png`,
  'Friandise':             `${BASE}/images/e/e3/Miniature_Friandise_EV.png`,
  'Fil de Liaison':        `${BASE}/images/f/f5/Miniature_Fil_de_Liaison_LPA.png`,
  'Métal Composite':       `${BASE}/images/d/d5/Miniature_M%C3%A9tal_Composite_EV.png`,

  // Pommes (Épée/Bouclier)
  'Pomme Sucrée':          `${BASE}/images/0/0d/Miniature_Pomme_Sucr%C3%A9e_EV.png`,
  'Pomme Acidulée':        `${BASE}/images/4/49/Miniature_Pomme_Acidul%C3%A9e_EV.png`,
  'Pomme Nectar':          `${BASE}/images/0/0b/Miniature_Pomme_Nectar_EV.png`,

  // Légendes Arceus
  'Obsidienne':            `${BASE}/images/9/93/Miniature_Obsidienne_LPZA.png`,
  'Bloc de Tourbe':        `${BASE}/images/0/09/Miniature_Bloc_de_Tourbe_LPA.png`,

  // Théières (Écarlate/Violet)
  'Théière Ebréchée':      `${BASE}/images/b/b6/Miniature_Th%C3%A9i%C3%A8re_%C3%89br%C3%A9ch%C3%A9e_EV.png`,
  'Théière Fêlée':         `${BASE}/images/3/31/Miniature_Th%C3%A9i%C3%A8re_F%C3%AAl%C3%A9e_EV.png`,

  // Rouleaux (Écarlate/Violet)
  'Rouleau de l\'Eau':      `${BASE}/images/c/c3/Miniature_Rouleau_de_l%27Eau_EV.png`,
  'Rouleau des Ténèbres':  `${BASE}/images/3/39/Miniature_Rouleau_des_T%C3%A9n%C3%A8bres_EV.png`,

  // Galanoa (Légendes Z-A)
  'Bracelet Galanoa':      `${BASE}/images/1/1c/Miniature_Bracelet_Galanoa_LPZA.png`,
  'Couronne Galanoa':      `${BASE}/images/7/77/Miniature_Couronne_Galanoa_LPZA.png`,
  'Armure de la Fortune':  `${BASE}/images/0/06/Miniature_Armure_de_la_Fortune_LPZA.png`,
  'Armure de la Rancune':  `${BASE}/images/f/f3/Miniature_Armure_de_la_Rancune_LPZA.png`,

  // Dynamax / Téracristal
  'Eclat de Souhait':      `${BASE}/images/8/8d/Miniature_Morceau_V%C5%93u_EB.png`,
  'Orbe Téracristal':      `${BASE}/images/c/cd/Miniature_Orbe_T%C3%A9racristal_EV.png`,
  'Téra-Éclat':            `${BASE}/images/c/cf/Miniature_T%C3%A9ra-%C3%89clat_Plante_EV.png`,

  // Modificateurs de type (LPZA)
  'Aimant':                `${BASE}/images/f/f8/Miniature_Aimant_LPZA.png`,
  'Charbon':               `${BASE}/images/8/84/Miniature_Charbon_LPZA.png`,
  'Croc Dragon':           `${BASE}/images/1/13/Miniature_Croc_Dragon_LPZA.png`,
  'Cuillère Tordue':       `${BASE}/images/3/37/Miniature_Cuill%C3%A8re_Tordue_LPZA.png`,
  'Glace Éternelle':       `${BASE}/images/0/07/Miniature_Glace_%C3%89ternelle_LPZA.png`,
  'Graine Miracle':        `${BASE}/images/d/dc/Miniature_Graine_Miracle_LPZA.png`,
  'Pic Venin':             `${BASE}/images/0/07/Miniature_Pic_Venin_LPZA.png`,
  'Poudre Argentée':       `${BASE}/images/8/89/Miniature_Poudre_Argent%C3%A9e_LPZA.png`,
  'Rune Sort':             `${BASE}/images/7/7f/Miniature_Rune_Sort_LPZA.png`,
  'Sable Doux':            `${BASE}/images/9/94/Miniature_Sable_Doux_LPZA.png`,
  'Plume Enchantée':       `${BASE}/images/f/fe/Miniature_Plume_Enchant%C3%A9e_LPZA.png`,

  // Divers
  'Boue noire':            `${BASE}/images/1/1b/Miniature_Boue_Noire_EV.png`,
  'PP Plus':               `${BASE}/images/7/7e/Miniature_PP_Plus_EV.png`,
  'PP Max':                `${BASE}/images/b/b7/Miniature_PP_Max_EV.png`,
  'Pépite':                `${BASE}/images/6/63/Miniature_P%C3%A9pite_LPZA.png`,
  'Capsule Technique':     `${BASE}/images/9/9d/Vignette_CT171_EV.png`,
};
