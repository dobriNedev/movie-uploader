import { useState } from "react";

const LanguageSelect = ({ onLanguageChange }) => {
  const [language, setLanguage] = useState("en-US");

  const handleLanguageChange = (e) => {
    const selectedLanguage = e.target.value;
    setLanguage(selectedLanguage);
    onLanguageChange(selectedLanguage);
  };

  return (
    <div className="mb-3">
         <label htmlFor="languageSelect" className="form-label fw-bold">
        Search by Language
      </label>
      <select value={language} onChange={handleLanguageChange} className="form-select">
        <option value="en-US">English</option>
        <option value="bg-BG">Български</option>
        <option value="es-ES">Español</option>
        <option value="fr-FR">Français</option>
        <option value="de-DE">Deutsch</option>
        <option value="it-IT">Italiano</option>
      </select>
    </div>
  );
};

export default LanguageSelect;
