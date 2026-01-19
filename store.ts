
import { AppState, DailyRecord, Patient, Prescription, DoctorSettings, PatientCategory } from './types';
import { INITIAL_MEDICINES, DEFAULT_SETTINGS } from './constants';

const STORAGE_KEY = 'medscript_data';

export const getInitialState = (): AppState => {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    return JSON.parse(saved);
  }
  return {
    currentDayRevenue: 0,
    history: [],
    patients: [],
    prescriptions: [],
    settings: DEFAULT_SETTINGS,
    medicines: INITIAL_MEDICINES,
  };
};

export const saveState = (state: AppState) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
};

export const archiveDay = (state: AppState): AppState => {
  const today = new Date().toISOString().split('T')[0];
  
  // Find all prescriptions for today
  const todaysPrescriptions = state.prescriptions.filter(p => p.date === today);
  const revenue = todaysPrescriptions.reduce((acc, p) => acc + p.invoiceAmount, 0);
  
  const segments = {
    [PatientCategory.ADULT]: 0,
    [PatientCategory.CHILD]: 0,
    [PatientCategory.WOMAN]: 0,
  };

  todaysPrescriptions.forEach(p => {
    const patient = state.patients.find(pat => pat.id === p.patientId);
    if (patient) {
      segments[patient.category]++;
    }
  });

  const newRecord: DailyRecord = {
    date: today,
    totalRevenue: revenue,
    patientsCount: todaysPrescriptions.length,
    segments,
  };

  return {
    ...state,
    history: [newRecord, ...state.history],
    currentDayRevenue: 0, // Reset for the new day
  };
};
