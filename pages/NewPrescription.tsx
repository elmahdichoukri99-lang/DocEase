
import React, { useState, useRef, useEffect } from 'react';
import { Plus, Trash2, Printer, Save, User, Search, AlertTriangle, History, Receipt, CheckCircle } from 'lucide-react';
import { AppState, Medicine, PrescriptionItem, Patient, PatientCategory, DrugInteraction } from '../types';
import { DRUG_INTERACTIONS } from '../constants';
import { v4 as uuidv4 } from 'uuid';

interface NewPrescriptionProps {
  state: AppState;
  onSave: (patient: Patient, items: PrescriptionItem[], amount: number) => void;
}

const NewPrescription: React.FC<NewPrescriptionProps> = ({ state, onSave }) => {
  const [patientName, setPatientName] = useState('');
  const [patientAge, setPatientAge] = useState<string>('');
  const [patientSex, setPatientSex] = useState<'M' | 'F'>('M');
  const [patientCategory, setPatientCategory] = useState<PatientCategory>(PatientCategory.ADULT);
  const [items, setItems] = useState<PrescriptionItem[]>([]);
  const [amount, setAmount] = useState<string>('200');
  const [searchMedicine, setSearchMedicine] = useState('');
  const [showResults, setShowResults] = useState(false);
  const [warnings, setWarnings] = useState<DrugInteraction[]>([]);

  const previewRef = useRef<HTMLDivElement>(null);

  // Auto-set category based on age
  useEffect(() => {
    const ageNum = parseInt(patientAge);
    if (!isNaN(ageNum)) {
      if (ageNum < 15) setPatientCategory(PatientCategory.CHILD);
      else if (patientSex === 'F' && ageNum >= 15 && ageNum < 50) setPatientCategory(PatientCategory.WOMAN);
      else setPatientCategory(PatientCategory.ADULT);
    }
  }, [patientAge, patientSex]);

  // Compatibility Logic
  useEffect(() => {
    const activeWarnings: DrugInteraction[] = [];
    const medIds = items.map(i => i.medicineId);

    DRUG_INTERACTIONS.forEach(interaction => {
      const hasFirst = medIds.includes(interaction.drugs[0]);
      const hasSecond = medIds.includes(interaction.drugs[1]);
      if (hasFirst && hasSecond) activeWarnings.push(interaction);
    });

    setWarnings(activeWarnings);
  }, [items]);

  const addItem = (med: Medicine) => {
    const newItem: PrescriptionItem = {
      id: uuidv4(),
      medicineId: med.id,
      medicineName: med.name,
      posology: med.defaultPosology[patientCategory] || med.defaultPosology[PatientCategory.ADULT],
    };
    setItems([...items, newItem]);
    setSearchMedicine('');
    setShowResults(false);
  };

  const removeItem = (id: string) => {
    setItems(items.filter(item => item.id !== id));
  };

  const updatePosology = (id: string, newPosology: string) => {
    setItems(items.map(item => item.id === id ? { ...item, posology: newPosology } : item));
  };

  const handleSubmit = () => {
    if (!patientName || items.length === 0) {
      alert('Veuillez remplir le nom du patient et ajouter au moins un médicament.');
      return;
    }

    const patient: Patient = {
      id: uuidv4(),
      name: patientName,
      age: parseInt(patientAge) || 0,
      sex: patientSex,
      category: patientCategory,
      lastVisit: new Date().toISOString()
    };

    onSave(patient, items, parseFloat(amount));
    setPatientName('');
    setPatientAge('');
    setItems([]);
    setAmount('200');
    alert('Ordonnance et facture enregistrées avec succès!');
  };

  const filteredMedicines = state.medicines.filter(m => 
    m.name.toLowerCase().includes(searchMedicine.toLowerCase()) || 
    m.category.toLowerCase().includes(searchMedicine.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in slide-in-from-bottom duration-500 pb-20">
      <header className="flex justify-between items-center no-print">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-emerald-100 text-[#10B981] rounded-2xl">
            <Plus size={24} />
          </div>
          <div>
            <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">Nouvelle Consultation</h2>
            <p className="text-gray-500 font-medium italic">DocEase Intelligence Workflow</p>
          </div>
        </div>
        <div className="flex gap-3">
           <button className="flex items-center gap-2 px-5 py-2.5 bg-white border border-gray-200 rounded-xl font-bold text-gray-600 hover:bg-gray-50 transition-all shadow-sm">
             <History size={18} /> Historique
           </button>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 no-print">
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-xl shadow-gray-100/50 space-y-6">
            <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
               <User size={20} className="text-[#10B981]" /> Fiche Patient
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <label className="block">
                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1 block">Nom Complet</span>
                <input
                  type="text"
                  value={patientName}
                  onChange={(e) => setPatientName(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-50 border border-transparent rounded-2xl focus:ring-2 focus:ring-[#10B981] focus:bg-white outline-none transition-all font-bold"
                  placeholder="Patient"
                />
              </label>
              
              <div className="grid grid-cols-2 gap-4">
                <label className="block">
                  <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1 block">Âge</span>
                  <input
                    type="number"
                    value={patientAge}
                    onChange={(e) => setPatientAge(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-50 border border-transparent rounded-2xl outline-none focus:ring-2 focus:ring-[#10B981] focus:bg-white font-bold"
                    placeholder="25"
                  />
                </label>
                <label className="block">
                  <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1 block">Sexe</span>
                  <select
                    value={patientSex}
                    onChange={(e) => setPatientSex(e.target.value as 'M' | 'F')}
                    className="w-full px-4 py-3 bg-gray-50 border border-transparent rounded-2xl outline-none focus:ring-2 focus:ring-[#10B981] focus:bg-white font-bold"
                  >
                    <option value="M">M</option>
                    <option value="F">F</option>
                  </select>
                </label>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-xl shadow-gray-100/50 flex flex-col min-h-[500px]">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold text-gray-900">Traitement</h3>
              <div className="relative w-72">
                <input
                  type="text"
                  value={searchMedicine}
                  onChange={(e) => {
                    setSearchMedicine(e.target.value);
                    setShowResults(true);
                  }}
                  onFocus={() => setShowResults(true)}
                  className="w-full pl-10 pr-4 py-2.5 bg-emerald-50 border border-transparent rounded-2xl outline-none focus:ring-2 focus:ring-[#10B981] focus:bg-white transition-all font-bold"
                  placeholder="Chercher..."
                />
                <Search className="absolute left-3.5 top-3 text-[#10B981]" size={18} />
                {showResults && searchMedicine && (
                  <div className="absolute z-50 w-full mt-2 bg-white border border-gray-100 rounded-2xl shadow-2xl max-h-72 overflow-y-auto">
                    {filteredMedicines.map(m => (
                      <button
                        key={m.id}
                        onClick={() => addItem(m)}
                        className="w-full px-4 py-3 text-left hover:bg-emerald-50 group border-b border-gray-50 last:border-0 transition-colors"
                      >
                        <div className="flex justify-between items-center">
                           <p className="font-bold text-gray-800 group-hover:text-[#10B981]">{m.name}</p>
                           <span className="text-[10px] bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full font-bold uppercase">{m.category}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {items.length > 0 && (
              <div className="mb-6 flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-gray-100">
                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Contrôle de compatibilité</span>
                {warnings.length > 0 ? (
                  <div className="flex items-center gap-2 text-red-600 font-bold text-xs uppercase animate-pulse">
                    <AlertTriangle size={16} /> Interactions ({warnings.length})
                  </div>
                ) : (
                  <div className="flex items-center gap-2 text-[#10B981] font-bold text-xs uppercase">
                    <CheckCircle size={16} /> Compatible
                  </div>
                )}
              </div>
            )}

            {warnings.length > 0 && (
              <div className="mb-6 space-y-2">
                {warnings.map((w, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-red-50 border border-red-100 text-red-700 text-xs font-bold flex gap-3">
                    <AlertTriangle size={18} className="shrink-0" />
                    <p>{w.message}</p>
                  </div>
                ))}
              </div>
            )}

            <div className="flex-1 space-y-4 overflow-y-auto max-h-[400px] pr-2 custom-scrollbar">
              {items.map((item, index) => (
                <div key={item.id} className="p-5 bg-gray-50 rounded-2xl border border-transparent hover:border-emerald-100 transition-all flex gap-5 group">
                  <div className="w-8 h-8 rounded-lg bg-white border flex items-center justify-center font-black text-[#10B981] text-sm shadow-sm">
                    {index + 1}
                  </div>
                  <div className="flex-1 space-y-2">
                    <div className="flex justify-between items-start">
                      <p className="font-black text-gray-800 uppercase tracking-tight text-base">{item.medicineName}</p>
                      <button onClick={() => removeItem(item.id)} className="text-gray-300 hover:text-red-500 transition-colors"><Trash2 size={16} /></button>
                    </div>
                    <textarea
                      value={item.posology}
                      onChange={(e) => updatePosology(item.id, e.target.value)}
                      className="w-full bg-white border border-gray-100 rounded-xl p-3 text-sm text-gray-600 focus:ring-2 focus:ring-[#10B981] outline-none font-bold"
                      rows={2}
                    />
                  </div>
                </div>
              ))}
              {items.length === 0 && (
                <div className="h-48 flex flex-col items-center justify-center text-gray-300 space-y-3 opacity-30">
                   <Receipt size={48} strokeWidth={1} />
                   <p className="font-bold uppercase tracking-widest text-[10px]">Aucun médicament</p>
                </div>
              )}
            </div>

            <div className="mt-8 pt-8 border-t border-gray-100 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Facturation (DH)</span>
                <div className="flex items-center bg-emerald-50 rounded-2xl px-4 py-2 border border-emerald-100">
                   <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-20 bg-transparent outline-none font-black text-[#10B981] text-xl text-center"
                  />
                  <span className="font-black text-emerald-300 ml-2">DH</span>
                </div>
              </div>
              <div className="flex gap-4">
                <button 
                  onClick={() => window.print()}
                  className="px-6 py-3 border-2 border-[#10B981] text-[#10B981] rounded-2xl font-black flex items-center gap-2 hover:bg-emerald-50 transition-all"
                >
                  <Printer size={20} /> IMPRIMER
                </button>
                <button 
                  onClick={handleSubmit}
                  className="px-8 py-3 bg-[#10B981] text-white rounded-2xl font-black flex items-center gap-2 shadow-xl shadow-emerald-100 hover:bg-[#059669] transition-all"
                >
                  <Save size={20} /> ENREGISTRER
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-5 hidden lg:block sticky top-8 h-fit">
          <div ref={previewRef} className="bg-white shadow-2xl border border-gray-100 p-10 aspect-[1/1.41] relative overflow-hidden">
            {state.settings.logoUrl && (
              <div 
                className="absolute pointer-events-none select-none z-0"
                style={{ 
                  top: `${state.settings.logoY}%`, 
                  left: `${state.settings.logoX}%`, 
                  transform: `translate(-50%, -50%) scale(${state.settings.logoScale})`,
                  opacity: state.settings.logoOpacity 
                }}
              >
                <img src={state.settings.logoUrl} alt="Logo" className="max-w-[300px] grayscale" />
              </div>
            )}

            <div className="relative z-10 h-full flex flex-col">
              <div className="flex justify-between border-b-4 border-emerald-500 pb-6 mb-6">
                <div className="space-y-0.5">
                  <h1 className="text-xl font-black text-emerald-700 uppercase tracking-tighter">{state.settings.nameFr}</h1>
                  <p className="text-xs font-bold text-gray-800">{state.settings.specialtyFr}</p>
                </div>
                <div className="text-right font-arabic space-y-0.5" dir="rtl">
                  <h1 className="text-2xl font-black text-emerald-700 leading-none">{state.settings.nameAr}</h1>
                  <p className="text-lg font-bold text-gray-800">{state.settings.specialtyAr}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-8">
                 <div className="p-3 bg-gray-50 rounded-xl border border-gray-100">
                    <p className="text-[9px] font-black text-gray-400 uppercase tracking-[0.2em] mb-1">Patient</p>
                    <p className="font-bold text-gray-900 truncate">{patientName || '...'}</p>
                 </div>
                 <div className="p-3 bg-gray-50 rounded-xl border border-gray-100 flex justify-between">
                    <div>
                      <p className="text-[9px] font-black text-gray-400 uppercase tracking-[0.2em] mb-1">Âge</p>
                      <p className="font-bold text-gray-900">{patientAge || '--'} ans</p>
                    </div>
                    <div className="text-right">
                      <p className="text-[9px] font-black text-gray-400 uppercase tracking-[0.2em] mb-1">Date</p>
                      <p className="font-bold text-gray-900">{new Date().toLocaleDateString('fr-FR')}</p>
                    </div>
                 </div>
              </div>

              <div className="flex-1 flex flex-col">
                <div className="text-center mb-10">
                  <span className="inline-block px-4 py-1 bg-emerald-600 text-white text-[10px] font-black rounded-full uppercase tracking-[0.3em]">Ordonnance</span>
                </div>
                <div className="space-y-6">
                  {items.map((item, index) => (
                    <div key={item.id} className="flex gap-4">
                      <span className="text-lg font-black text-emerald-200 leading-none">{index + 1}.</span>
                      <div className="flex-1">
                        <h3 className="text-base font-black text-gray-800 uppercase tracking-tight leading-none mb-1">{item.medicineName}</h3>
                        <p className="text-xs text-gray-600 font-bold leading-relaxed">{item.posology}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-10 pt-6 border-t border-gray-100 flex justify-between items-end">
                <div className="text-[9px] font-bold text-gray-300 uppercase tracking-widest">Cachet & Signature</div>
                <div className="text-right">
                   <p className="text-[9px] text-[#10B981] font-black italic">Généré par DocEase Clinic</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewPrescription;
