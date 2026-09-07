export const LABELS: Record<string, Record<string, string>> = {
  contactEtabli: {
    'informe': 'Promoteur informé et invité à se présenter au GUD',
    'demande_delai': 'Promoteur demande un délai / rendez-vous',
    'refuse': 'Promoteur refuse de se présenter',
    'injoignable': 'Numéro injoignable',
    'incorrect': 'Numéro incorrect',
    'inactif': 'Numéro inactif, bloqué ou non attribué',
    'absence': 'Absence de réponse',
    'repondeur': 'Répondeur / Boîte vocale',
    'autre': 'Autre'
  },
  presentationGUD: {
    'renseigne': 'Oui, formulaire renseigné',
    'non_renseigne': 'Oui, présentation au GUD mais formulaire non renseigné',
    'pas_presente': 'Non, ne s\'est pas encore présenté',
    'refuse': 'Non, refuse de se présenter'
  },
  motifNonPresentation: {
    'disponibilite': 'Manque de disponibilité',
    'report': 'Report demandé par le promoteur',
    'interet': 'Absence d\'intérêt',
    'refus': 'Refus de renseigner le formulaire',
    'deplacer': 'Difficulté à se déplacer au GUD',
    'autre': 'Autre'
  },
  etatCredit: {
    'aucune': 'Aucune démarche engagée',
    'preparation': 'Dossier en préparation',
    'depose': 'Dossier déposé',
    'etude': 'Dossier en cours d\'étude',
    'approuve': 'Crédit approuvé',
    'partiellement': 'Crédit partiellement approuvé',
    'refuse': 'Crédit refusé',
    'decaisse': 'Crédit décaissé'
  },
  modeAccesFoncier: {
    'concession_aapi': "Concession du domaine privé de l'État (Plateforme AAPI)",
    'acquisition_particulier': "Acquisition auprès d'un particulier",
    'acquisition_entreprise': "Acquisition auprès d'une entreprise",
    'location': "Location",
    'deja_detenu': "Terrain déjà détenu par le promoteur",
    'autre': "Autre"
  },
  etatDemarchesFoncieres: {
    'aucune': "Aucune démarche engagée",
    'identifie': "Terrain identifié",
    'deposee': "Demande déposée",
    'instruction': "Dossier en cours d'instruction",
    'favorable': "Avis favorable obtenu",
    'attribution': "Décision d'attribution obtenue",
    'acte_signe': "Acte de concession signé",
    'mis_disposition': "Terrain mis à disposition",
    'acquis': "Terrain acquis",
    'suspendu': "Dossier suspendu",
    'rejete': "Dossier rejeté"
  },
  etatPermis: {
    'aucune': 'Aucune démarche engagée',
    'preparation': 'Dossier en préparation',
    'deposee': 'Demande déposée',
    'examen': 'Demande en cours d\'examen',
    'accord_total': 'Accord total sans modification',
    'accord_partiel': 'Accord partiel',
    'accord_reserve': 'Accord sous réserve de modifications',
    'rejetee': 'Demande rejetée',
    'attente_info': 'Demande en attente de complément d\'information',
    'autre': 'Autre'
  },
  etatPPI: {
    'aucune': 'Aucune démarche engagée',
    'preparation': 'Dossier en préparation',
    'deposee': 'Demande déposée',
    'examen': 'Demande en cours d\'examen',
    'accord_total': 'Accord total sans modification',
    'accord_partiel': 'Accord partiel',
    'accord_reserve': 'Accord sous réserve de modifications',
    'rejetee': 'Demande rejetée',
    'attente_info': 'Demande en attente de complément d\'information',
    'autre': 'Autre'
  },
  etatProjet: {
    'abandonne': 'Abandonné',
    'annule': 'Annulé',
    'en_arret': 'En arrêt',
    'non_entame': 'Non encore entamé',
    'en_cours': 'En cours de réalisation',
    'acheve': 'Achevé'
  },
  difficultes: {
    'admin': 'Procédures administratives et réglementaires',
    'permis': 'Permis de construire et actes d\'urbanisme',
    'foncier': 'Foncier',
    'finance': 'Financement',
    'ppi': 'Importations et approvisionnement extérieur (PPI)',
    'logistique': 'Approvisionnement et logistique',
    'tech': 'Contraintes techniques ou technologiques',
    'partenaires': 'Partenaires, prestataires ou sous-traitants',
    'reseaux': 'Raccordement aux réseaux et infrastructures',
    'rh': 'Main-d\'œuvre et ressources humaines',
    'marche': 'Marché et conditions économiques',
    'autre': 'Autre difficulté'
  },
  demarchesRealisees: {
    'admin': 'Formalités administratives réalisées',
    'foncier': 'Foncier sécurisé',
    'etudes': 'Études et business plan finalisés',
    'financement': 'Financement obtenu ou mobilisé',
    'autorisations': 'Autorisations, agréments et permis obtenus',
    'importation': 'Formalités d\'importation accomplies',
    'travaux': 'Travaux de réalisation engagés',
    'equipements': 'Équipements acquis, réceptionnés ou installés',
    'recrutement': 'Recrutement et formation du personnel réalisés',
    'exploitation_partielle': 'Mise en exploitation partielle ou phase de tests engagée'
  },
  miseEnExploitation: {
    'non': 'Non encore mis en exploitation',
    'partielle': 'Mis partiellement en exploitation',
    'totalement': 'Mis totalement en exploitation'
  },
  actionEngagee: {
    'aucune': 'Aucune action : aucune action n\'a encore été engagée',
    'info_promo': 'Information du promoteur',
    'saisine': 'Saisine de la partie compétente',
    'coordination': 'Coordination avec la partie concernée',
    'reunion': 'Réunion / séance de travail',
    'correspondance': 'Correspondance officielle',
    'obstacle_leve': 'Obstacle levé',
    'en_cours': 'Action en cours de suivi',
    'autre': 'Autre'
  },
  partieIntervenante: {
    'promoteur': 'Promoteur / investisseur',
    'aapi': 'AAPI / Guichet unique',
    'locale': 'Administration locale',
    'centrale': 'Administration centrale',
    'public': 'Établissement public / opérateur',
    'banque': 'Banque / établissement financier',
    'plusieurs': 'Plusieurs parties',
    'autre': 'Autre'
  },
  etatTraitement: {
    'non_engagee': 'Non engagée',
    'en_cours': 'En cours',
    'achevee': 'Achevée',
    'attente': 'En attente d\'intervention d\'une autre partie',
    'sans_suite': 'Sans suite'
  },
  resultatTraitement: {
    'leve': 'Obstacle levé',
    'partiellement': 'Obstacle partiellement levé',
    'non_leve': 'Obstacle non levé',
    'reactive': 'Projet réactivé / relancé',
    'tjrs_arret': 'Projet toujours non entamé / à l\'arrêt',
    'nouvelle_inter': 'Nouvelle intervention nécessaire',
    'autre': 'Autre'
  },
  possibiliteReactivation: {
    'oui': 'Oui',
    'oui_cond': 'Oui, sous conditions',
    'a_confirmer': 'À confirmer',
    'non': 'Non',
    'en_eval': 'En cours d\'évaluation',
    'non_concerne': 'Non concerné'
  },
  necessiteFoncier: {
    'oui': 'Oui',
    'non': 'Non'
  },
  necessiteCredit: {
    'oui': 'Oui',
    'non': 'Non'
  },
  necessitePermis: {
    'oui': 'Oui',
    'non': 'Non'
  },
  necessitePPI: {
    'oui': 'Oui',
    'non': 'Non'
  },
  perspectivesRelance: {
    'oui': 'Oui',
    'non': 'Non',
    'nsp': 'Je ne sais pas'
  }
,
  typesSoutien: {
    'tech': 'Assistance technique',
    'fin': 'Soutien financier',
    'juridique': 'Conseil juridique',
    'admin': 'Accompagnement administratif',
    'reseautage': 'Réseautage et partenariats',
    'formation': 'Formation et développement des compétences',
    'logistique': 'Assistance logistique',
    'feedback': 'Évaluation et feedback',
    'foncier': 'Appui pour l\'accès au foncier',
    'ppi': 'Appui pour l\'obtention des autorisations d\'importation (PPI)',
    'autre': 'Autre'
  },
};

export const getLabel = (field: string, value: string | undefined): string => {
  if (!value) return '';
  return LABELS[field]?.[value] || value;

};
