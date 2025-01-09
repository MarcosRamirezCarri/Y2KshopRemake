import React, { useState } from "react";
import { useAppSelector } from "@/lib/hooks/hooks";
import { Product } from "@/helpers/types/Types";

interface ClasificationSelectorProps {
  value: string;
  onChange: (newValue: string) => void;
  error: string;
}

const ClasificationSelector: React.FC<ClasificationSelectorProps> = ({
  value,
  onChange,
  error,
}) => {
  const [isNewClasification, setIsNewClasification] = useState(false);
  const [newClasification, setNewClasification] = useState("");

  const stateProducts = useAppSelector((state) => state.products.sortProducts);

  const getUniqueCategories = (items: Product[]): string[] => {
    const categoriesSet = new Set<string>();
    items.forEach((item) => {
      categoriesSet.add(item.clasification);
    });
    return Array.from(categoriesSet);
  };

  const existingClasifications = getUniqueCategories(stateProducts);

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value;
    if (selectedValue === "new") {
      setIsNewClasification(true);
      setNewClasification("");
      onChange(""); // Clear value when new classification is selected
    } else {
      setIsNewClasification(false);
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
      <label className="font-titilium text-lg focus:outline-Lightblue-400">
        Clasification
      </label>
      <select
        value={isNewClasification ? "new" : value}
        onChange={handleSelectChange}
        className="border p-2 rounded mb-2 focus:outline-Lightblue-400"
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
      {isNewClasification && (
        <input
          type="text"
          value={newClasification}
          onChange={handleNewClasificationChange}
          placeholder="Enter a new classification"
          className="border p-2 rounded focus:outline-Lightblue-400"
        />
      )}
      {error && <p className="text-pink-950 text-sm">{error}</p>}
    </div>
  );
};

export default ClasificationSelector;