
import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import NewPrescription from './pages/NewPrescription';
import Settings from './pages/Settings';
import Analytics from './pages/Analytics';
import { AppState, DoctorSettings, Patient, PrescriptionItem, Prescription } from './types';
import { getInitialState, saveState, archiveDay } from './store';

const App: React.FC = () => {
  const [state, setState] = useState<AppState>(getInitialState());

  // Auto-save state whenever it changes
  useEffect(() => {
    saveState(state);
  }, [state]);

  const handleNewDay = () => {
    setState(prev => archiveDay(prev));
  };

  const handleUpdateSettings = (newSettings: DoctorSettings) => {
    setState(prev => ({ ...prev, settings: newSettings }));
  };

  const handleSavePrescription = (patient: Patient, items: PrescriptionItem[], amount: number) => {
    const today = new Date().toISOString().split('T')[0];
    
    const newPrescription: Prescription = {
      id: Math.random().toString(36).substr(2, 9),
      patientId: patient.id,
      date: today,
      items,
      invoiceAmount: amount,
    };

    setState(prev => ({
      ...prev,
      patients: [...prev.patients, patient],
      prescriptions: [...prev.prescriptions, newPrescription],
      currentDayRevenue: prev.currentDayRevenue + amount,
    }));
  };

  return (
    <Router>
      <div className="flex min-h-screen bg-gray-50">
        <Sidebar />
        <main className="flex-1 p-8 overflow-y-auto">
          <Routes>
            <Route 
              path="/" 
              element={<Dashboard state={state} onNewDay={handleNewDay} />} 
            />
            <Route 
              path="/new-prescription" 
              element={<NewPrescription state={state} onSave={handleSavePrescription} />} 
            />
            <Route 
              path="/patients" 
              element={
                <div className="bg-white p-8 rounded-3xl border shadow-sm">
                  <h2 className="text-3xl font-bold mb-6">Base de données Patients</h2>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left">
                      <thead>
                        <tr className="border-b text-gray-400 font-bold uppercase text-xs tracking-widest">
                          <th className="py-4 px-4">Patient</th>
                          <th className="py-4 px-4">Âge</th>
                          <th className="py-4 px-4">Sexe</th>
                          <th className="py-4 px-4">Catégorie</th>
                          <th className="py-4 px-4">Historique</th>
                        </tr>
                      </thead>
                      <tbody>
                        {state.patients.map((p, idx) => (
                          <tr key={idx} className="border-b hover:bg-gray-50">
                            <td className="py-4 px-4 font-bold text-gray-800">{p.name}</td>
                            <td className="py-4 px-4">{p.age} ans</td>
                            <td className="py-4 px-4">{p.sex}</td>
                            <td className="py-4 px-4">
                              <span className="px-3 py-1 rounded-full bg-[#00A86B]/10 text-[#00A86B] text-xs font-bold">
                                {p.category}
                              </span>
                            </td>
                            <td className="py-4 px-4">
                              <button className="text-blue-500 hover:underline text-sm font-medium">Voir fiches</button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              } 
            />
            <Route 
              path="/analytics" 
              element={<Analytics state={state} />} 
            />
            <Route 
              path="/settings" 
              element={<Settings settings={state.settings} onUpdate={handleUpdateSettings} />} 
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
