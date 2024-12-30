import React, { useState } from "react";

interface ClasificationSelectorProps {
  existingClasifications: string[];
  value: string;
  onChange: (newValue: string) => void;
  error: string;
}

const ClasificationSelector: React.FC<ClasificationSelectorProps> = ({
  existingClasifications,
  value,
  onChange,
  error,
}) => {
  const [newClasification, setNewClasification] = useState("");

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value;
    if (selectedValue === "new") {
      setNewClasification("");
      onChange("");
    } else {
      onChange(selectedValue);
    }
  };

  const handleNewClasificationChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newValue = e.target.value;
    setNewClasification(newValue);
    onChange(newValue);
  };

  return (
    <div className="flex flex-col w-full">
      <label className="font-titilium text-lg">Clasification</label>
      <select
        value={existingClasifications.includes(value) ? value : "new"}
        onChange={handleSelectChange}
        className="border p-2 rounded mb-2"
      >
        <option value="" disabled>
          Select a classification
        </option>
        {existingClasifications.map((clasification) => (
          <option key={clasification} value={clasification}>
            {clasification}
          </option>
        ))}
        <option value="new">New Classification</option>
      </select>
      {value === "" || value === "new" ? (
        <input
          type="text"
          value={newClasification}
          onChange={handleNewClasificationChange}
          placeholder="Enter a new classification"
          className="border p-2 rounded"
        />
      ) : null}
      {error && <p className="text-pink-950 text-sm">{error}</p>}
    </div>
  );
};

export default ClasificationSelector;