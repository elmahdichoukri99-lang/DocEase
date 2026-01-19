
import React, { useState } from 'react';
import { Save, Upload, Eye, Trash2, Languages, Layout, Move } from 'lucide-react';
import { DoctorSettings } from '../types';

interface SettingsProps {
  settings: DoctorSettings;
  onUpdate: (newSettings: DoctorSettings) => void;
}

const Settings: React.FC<SettingsProps> = ({ settings, onUpdate }) => {
  const [localSettings, setLocalSettings] = useState<DoctorSettings>(settings);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLocalSettings({ ...localSettings, logoUrl: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    onUpdate(localSettings);
    alert('Paramètres du cabinet enregistrés avec succès!');
  };

  return (
    <div className="max-w-6xl mx-auto space-y-10 animate-in fade-in duration-500 pb-20">
      <header className="flex justify-between items-center">
        <div>
          <h2 className="text-4xl font-black text-gray-900 tracking-tight">Configuration Cabinet</h2>
          <p className="text-gray-500 font-bold italic">Personnalisez votre identité visuelle sur DocEase.</p>
        </div>
        <button
          onClick={handleSave}
          className="bg-emerald-600 text-white px-10 py-4 rounded-2xl shadow-xl shadow-emerald-100 flex items-center gap-3 hover:bg-emerald-700 transition-all font-black uppercase tracking-widest text-sm"
        >
          <Save size={22} />
          Sauvegarder tout
        </button>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* French Info */}
        <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-xl shadow-gray-100/30 space-y-8">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center shadow-sm">
              <Languages size={24} />
            </div>
            <h3 className="text-xl font-black tracking-tight uppercase text-xs tracking-[0.2em] text-blue-600">En-tête Français</h3>
          </div>
          <div className="space-y-5">
            <label className="block">
              <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-2 block">Nom Complet (Français)</span>
              <input
                type="text"
                value={localSettings.nameFr}
                onChange={(e) => setLocalSettings({ ...localSettings, nameFr: e.target.value })}
                className="w-full px-5 py-4 bg-gray-50 border border-transparent rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 font-bold text-gray-800"
              />
            </label>
            <label className="block">
              <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-2 block">Spécialité</span>
              <input
                type="text"
                value={localSettings.specialtyFr}
                onChange={(e) => setLocalSettings({ ...localSettings, specialtyFr: e.target.value })}
                className="w-full px-5 py-4 bg-gray-50 border border-transparent rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 font-bold text-gray-800"
              />
            </label>
            <label className="block">
              <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-2 block">Titres & Diplômes</span>
              <textarea
                value={localSettings.diplomaFr}
                onChange={(e) => setLocalSettings({ ...localSettings, diplomaFr: e.target.value })}
                className="w-full px-5 py-4 bg-gray-50 border border-transparent rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 font-bold text-gray-800 leading-relaxed"
                rows={3}
              />
            </label>
          </div>
        </div>

        {/* Arabic Info */}
        <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-xl shadow-gray-100/30 space-y-8 text-right font-arabic" dir="rtl">
          <div className="flex items-center gap-4 flex-row-reverse">
            <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center shadow-sm">
              <Languages size={24} />
            </div>
            <h3 className="text-2xl font-black tracking-tight text-emerald-600">المعلومات بالعربية</h3>
          </div>
          <div className="space-y-5">
            <label className="block">
              <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-2 block text-right" dir="ltr">الاسم الكامل</span>
              <input
                type="text"
                value={localSettings.nameAr}
                onChange={(e) => setLocalSettings({ ...localSettings, nameAr: e.target.value })}
                className="w-full px-5 py-4 bg-gray-50 border border-transparent rounded-2xl outline-none focus:ring-2 focus:ring-emerald-500 font-black text-gray-800 text-2xl"
              />
            </label>
            <label className="block">
              <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-2 block text-right" dir="ltr">التخصص</span>
              <input
                type="text"
                value={localSettings.specialtyAr}
                onChange={(e) => setLocalSettings({ ...localSettings, specialtyAr: e.target.value })}
                className="w-full px-5 py-4 bg-gray-50 border border-transparent rounded-2xl outline-none focus:ring-2 focus:ring-emerald-500 font-black text-gray-800 text-2xl"
              />
            </label>
            <label className="block">
              <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-2 block text-right" dir="ltr">الشهادات</span>
              <textarea
                value={localSettings.diplomaAr}
                onChange={(e) => setLocalSettings({ ...localSettings, diplomaAr: e.target.value })}
                className="w-full px-5 py-4 bg-gray-50 border border-transparent rounded-2xl outline-none focus:ring-2 focus:ring-emerald-500 font-bold text-gray-800 text-xl leading-relaxed"
                rows={3}
              />
            </label>
          </div>
        </div>
      </div>

      <div className="bg-white p-10 rounded-[3rem] border border-gray-100 shadow-xl shadow-gray-100/30">
        <h3 className="text-2xl font-black mb-10 flex items-center gap-4 text-emerald-700">
          <Layout size={32} />
          Branding & Placement du Logo
        </h3>
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-12">
          {/* Logo Uploader */}
          <div className="xl:col-span-4 space-y-6">
            <div className="p-10 border-4 border-dashed border-gray-100 rounded-[2.5rem] flex flex-col items-center justify-center text-center group hover:border-emerald-300 transition-all cursor-pointer relative overflow-hidden bg-gray-50">
              {localSettings.logoUrl ? (
                <>
                  <img src={localSettings.logoUrl} alt="Preview" className="max-h-48 mb-6 drop-shadow-lg" />
                  <div className="flex gap-2">
                    <button 
                      onClick={() => setLocalSettings({...localSettings, logoUrl: null})}
                      className="p-3 bg-red-50 text-red-500 rounded-2xl hover:bg-red-500 hover:text-white transition-all shadow-sm"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <div className="w-20 h-20 bg-emerald-50 text-emerald-500 rounded-3xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Upload size={32} />
                  </div>
                  <p className="text-gray-900 font-black uppercase text-xs tracking-widest">Logo Cabinet</p>
                  <p className="text-gray-400 text-[10px] mt-1">Glissez votre logo ou cliquez ici</p>
                </>
              )}
              <input 
                type="file" 
                accept="image/*" 
                className="absolute inset-0 opacity-0 cursor-pointer" 
                onChange={handleFileChange}
              />
            </div>
          </div>

          {/* Placement Controls */}
          <div className="xl:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="space-y-8">
               <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-black text-gray-700 uppercase tracking-widest">Opacité (Filigrane)</span>
                    <span className="text-xs font-black bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full">{Math.round(localSettings.logoOpacity * 100)}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={localSettings.logoOpacity}
                    onChange={(e) => setLocalSettings({ ...localSettings, logoOpacity: parseFloat(e.target.value) })}
                    className="w-full h-2 bg-emerald-50 rounded-lg appearance-none cursor-pointer accent-emerald-600"
                  />
               </div>

               <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-black text-gray-700 uppercase tracking-widest">Échelle (Taille)</span>
                    <span className="text-xs font-black bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full">{Math.round(localSettings.logoScale * 100)}%</span>
                  </div>
                  <input
                    type="range"
                    min="0.2"
                    max="2.5"
                    step="0.1"
                    value={localSettings.logoScale}
                    onChange={(e) => setLocalSettings({ ...localSettings, logoScale: parseFloat(e.target.value) })}
                    className="w-full h-2 bg-emerald-50 rounded-lg appearance-none cursor-pointer accent-emerald-600"
                  />
               </div>
            </div>

            <div className="space-y-8 bg-gray-50 p-8 rounded-[2rem] border border-gray-100">
               <div className="flex items-center gap-3 mb-4">
                  <Move size={20} className="text-emerald-600" />
                  <span className="text-xs font-black text-gray-900 uppercase tracking-widest">Position sur Ordonnance</span>
               </div>
               
               <div className="space-y-6">
                 <div className="space-y-3">
                   <div className="flex justify-between text-[10px] font-black text-gray-400">
                     <span>GAUCHE</span>
                     <span>CENTRE</span>
                     <span>DROITE</span>
                   </div>
                   <input
                    type="range"
                    min="0"
                    max="100"
                    value={localSettings.logoX}
                    onChange={(e) => setLocalSettings({ ...localSettings, logoX: parseInt(e.target.value) })}
                    className="w-full h-2 bg-white rounded-lg appearance-none cursor-pointer accent-emerald-600"
                  />
                 </div>

                 <div className="space-y-3">
                   <div className="flex justify-between text-[10px] font-black text-gray-400">
                     <span>HAUT</span>
                     <span>CENTRE</span>
                     <span>BAS</span>
                   </div>
                   <input
                    type="range"
                    min="0"
                    max="100"
                    value={localSettings.logoY}
                    onChange={(e) => setLocalSettings({ ...localSettings, logoY: parseInt(e.target.value) })}
                    className="w-full h-2 bg-white rounded-lg appearance-none cursor-pointer accent-emerald-600"
                  />
                 </div>
               </div>

               <div className="mt-6 flex items-center gap-3 p-3 bg-white rounded-xl text-yellow-700 border border-yellow-100">
                 <Eye size={24} className="shrink-0" />
                 <p className="text-[10px] font-bold leading-tight uppercase tracking-tight">Vérifiez l'aperçu en temps réel sur la page "Nouvelle Ordonnance".</p>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
