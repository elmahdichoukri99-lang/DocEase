
import { Medicine, DoctorSettings, PatientCategory, DrugInteraction } from './types';

export const INITIAL_MEDICINES: Medicine[] = [
  { 
    id: '1', 
    name: 'Amoxicilline 500mg', 
    category: 'Antibiotique',
    defaultPosology: {
      [PatientCategory.ADULT]: '1 gélule 3 fois par jour pendant 7 jours',
      [PatientCategory.CHILD]: '250mg 2 fois par jour selon le poids',
      [PatientCategory.WOMAN]: '1 gélule 3 fois par jour pendant 7 jours'
    }
  },
  { 
    id: '2', 
    name: 'Paracétamol 1g', 
    category: 'Analgésique',
    defaultPosology: {
      [PatientCategory.ADULT]: '1 comprimé toutes les 6 heures en cas de douleur',
      [PatientCategory.CHILD]: 'Dose adaptée au poids (max 60mg/kg/j)',
      [PatientCategory.WOMAN]: '1 comprimé toutes les 6 heures'
    }
  },
  { 
    id: '3', 
    name: 'Ibuprofène 400mg', 
    category: 'AINS',
    defaultPosology: {
      [PatientCategory.ADULT]: '1 comprimé après les repas, max 3 fois par jour',
      [PatientCategory.CHILD]: 'Contre-indiqué en dessous de 6 mois sans avis',
      [PatientCategory.WOMAN]: '1 comprimé max 3 fois par jour'
    }
  },
  { 
    id: '4', 
    name: 'Spasfon', 
    category: 'Antispasmodique',
    defaultPosology: {
      [PatientCategory.ADULT]: '2 comprimés au moment des crises',
      [PatientCategory.CHILD]: '1 comprimé dilué si nécessaire',
      [PatientCategory.WOMAN]: '2 comprimés lors des douleurs abdominales'
    }
  },
  { 
    id: '5', 
    name: 'Warfarine (Coumadine)', 
    category: 'Anticoagulant',
    defaultPosology: {
      [PatientCategory.ADULT]: 'Selon INR (généralement le soir)',
      [PatientCategory.CHILD]: 'Dose pédiatrique stricte',
      [PatientCategory.WOMAN]: 'Selon INR'
    }
  },
  { 
    id: '6', 
    name: 'Aspirine 100mg', 
    category: 'Antiagrégant',
    defaultPosology: {
      [PatientCategory.ADULT]: '1 sachet par jour au milieu du repas',
      [PatientCategory.CHILD]: 'Contre-indiqué (Risque de Syndrome de Reye)',
      [PatientCategory.WOMAN]: '1 sachet par jour'
    }
  }
];

export const DRUG_INTERACTIONS: DrugInteraction[] = [
  {
    drugs: ['3', '5'], // Ibuprofène + Warfarine
    severity: 'high',
    message: 'Risque accru de saignements gastro-intestinaux sévères.'
  },
  {
    drugs: ['3', '6'], // Ibuprofène + Aspirine
    severity: 'moderate',
    message: 'L\'ibuprofène peut réduire l\'effet cardio-protecteur de l\'aspirine.'
  }
];

export const DEFAULT_SETTINGS: DoctorSettings = {
  nameFr: 'Dr. Jean Dupont',
  specialtyFr: 'Médecin Généraliste',
  diplomaFr: 'Faculté de Médecine de Paris',
  nameAr: 'د. جان دوبون',
  specialtyAr: 'طبيب عام',
  diplomaAr: 'كلية الطب بباريس',
  logoUrl: null,
  logoOpacity: 0.1,
  logoX: 50,
  logoY: 50,
  logoScale: 1,
};

export const COLORS = {
  primary: '#10B981', // Emerald 500
  primaryDark: '#059669', // Emerald 600
  bg: '#f8fafc',
  white: '#ffffff',
};
