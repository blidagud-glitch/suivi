export type ContactStatus = 'telephone' | 'gud' | 'non';

export interface CapitalEntry {
  id: string;
  associe: string;
  nationalite: string;
  part: number;
  montant: number;
  devise: string;
}

export interface FormState {
  // Session info
  sessionId: string;
  createdAt: string;
  status: 'draft' | 'submitted';
  
  // PARTIE I
  attestationNumero: string;
  responsableEmail: string;
  responsableTelephone: string;
  contactEtabli: ContactStatus | '';
  informationPromoteur: string;
  informationPromoteurAutre: string;
  raisonNonContact: string;
  raisonNonContactAutre: string;

  // PARTIE II
  presentationGUD: string;
  autreRendezVous: string;
  autreRendezVousDate: string;
  autreRendezVousAutre: string;
  motifNonPresentation: string;
  motifNonPresentationAutre: string;

  // 5. Conditions de réalisation
  capitalRepartition: CapitalEntry[];
  necessiteCredit: string;
  etatCredit: string;
  
  necessiteFoncier: string;
  typeFoncier: string;
  superficieFoncier: string;
  localisationFoncier: string;
  modeAccesFoncier: string;
  modeAccesFoncierAutre: string;
  etatDemarchesFoncieres: string;

  necessitePermis: string;
  etatPermis: string;
  dateDepotPermis: string;
  dateObtentionPermis: string;

  necessitePPI: string;
  dateDepotPPI: string;
  etatPPI: string;

  // 6. Etat d'avancement
  etatProjet: string;
  montantInvestissement: string;
  emploisCreesExecution: string;
  emploisCreesMaitrise: string;
  emploisCreesCadre: string;
  tauxAvancementPhysique: string;
  
  difficultes: string[];
  difficulteAutre: string;
  difficultePrincipale: string;
  
  perspectivesRelance: string;
  dateRelance: string;
  
  demarchesRealisees: string[];
  
  miseEnExploitation: string;
  tauxUtilisationCapacite: string;
  datePleineExploitation: string;

  // 7. Soutien supplémentaire
  typesSoutien: string[];
  typesSoutienAutre: string;

  // 8. Suivi du traitement
  actionEngagee: string;
  actionEngageeAutre: string;
  partieIntervenante: string;
  partieIntervenanteAutre: string;
  etatTraitement: string;
  echeanceTraitement: string;
  resultatTraitement: string;
  resultatTraitementAutre: string;
  dateMiseAJour: string;
  observations: string;
  possibiliteReactivation: string;

  // Signature
  signatureDataUrl: string;
}

export const initialFormState: FormState = {
  sessionId: '',
  createdAt: '',
  status: 'draft',
  
  attestationNumero: '',
  responsableEmail: '',
  responsableTelephone: '',
  contactEtabli: '',
  informationPromoteur: '',
  informationPromoteurAutre: '',
  raisonNonContact: '',
  raisonNonContactAutre: '',

  presentationGUD: '',
  autreRendezVous: '',
  autreRendezVousDate: '',
  autreRendezVousAutre: '',
  motifNonPresentation: '',
  motifNonPresentationAutre: '',

  capitalRepartition: [],
  necessiteCredit: '',
  etatCredit: '',
  
  necessiteFoncier: '',
  typeFoncier: '',
  superficieFoncier: '',
  localisationFoncier: '',
  modeAccesFoncier: '',
  modeAccesFoncierAutre: '',
  etatDemarchesFoncieres: '',

  necessitePermis: '',
  etatPermis: '',
  dateDepotPermis: '',
  dateObtentionPermis: '',

  necessitePPI: '',
  dateDepotPPI: '',
  etatPPI: '',

  etatProjet: '',
  montantInvestissement: '',
  emploisCreesExecution: '',
  emploisCreesMaitrise: '',
  emploisCreesCadre: '',
  tauxAvancementPhysique: '',
  
  difficultes: [],
  difficulteAutre: '',
  difficultePrincipale: '',
  
  perspectivesRelance: '',
  dateRelance: '',
  
  demarchesRealisees: [],
  
  miseEnExploitation: '',
  tauxUtilisationCapacite: '',
  datePleineExploitation: '',

  typesSoutien: [],
  typesSoutienAutre: '',

  actionEngagee: '',
  actionEngageeAutre: '',
  partieIntervenante: '',
  partieIntervenanteAutre: '',
  etatTraitement: '',
  echeanceTraitement: '',
  resultatTraitement: '',
  resultatTraitementAutre: '',
  dateMiseAJour: '',
  observations: '',
  possibiliteReactivation: '',

  signatureDataUrl: '',
};
