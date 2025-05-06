import React, { useEffect, useRef, useState } from "react";
import { SiblingRequest } from "@/types";
import Input from "@/components/Inputs/Input";
import CheckBox from "@/components/Checkboxes";

const emptySibling: SiblingRequest = {
  name: "",
  birthdate: "",
  age: undefined,
  status: "",
  remarks: "",
  livingWithParents: false,
  ownHouse: false,
};

interface SiblingRepeaterProps {
    siblingsSet?: SiblingRequest[];
    setSiblingsInit?: (siblings: SiblingRequest[]) => void;
}


const SiblingRepeater: React.FC<SiblingRepeaterProps> = ({ siblingsSet, setSiblingsInit }) => {
    const [siblings, setSiblings] = useState<SiblingRequest[]>([]);
    const initialized = useRef(false);

    // Initialize from props
    useEffect(() => {
        if (!initialized.current && siblingsSet && siblingsSet.length > 0) {
        setSiblings(siblingsSet);
        initialized.current = true;
        }
    }, [siblingsSet]);


    // Sync with parent component if callback provided
    useEffect(() => {
        setSiblingsInit?.(siblings);
    }, [siblings]);
    
    const handleChange = (index: number, field: keyof SiblingRequest, value: any) => {
      const updatedSiblings = [...siblings];
      updatedSiblings[index][field] = value;
      setSiblings(updatedSiblings);
    };
  
    const addSibling = () => {
      setSiblings([...siblings, { ...emptySibling }]);
    };
  
    const removeSibling = (index: number) => {
      const updatedSiblings = siblings.filter((_, i) => i !== index);
      setSiblings(updatedSiblings);
    };
  
    return (
      <div className="space-y-6">
        {siblings.map((sibling, index) => (
          <div
            key={index}
            className="border p-4 rounded-lg shadow-sm space-y-4 bg-white"
          >
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
              <Input
                type="text"
                placeholder="Name"
                value={sibling.name || ""}
                onChange={(e) => handleChange(index, "name", e.target.value)}
                className="input"
              />
              <Input
                type="date"
                placeholder="Birthdate"
                value={sibling.birthdate || ""}
                onChange={(e) => handleChange(index, "birthdate", e.target.value)}
                className="input"
              />
              <Input
                type="number"
                placeholder="Age"
                value={sibling.age || ""}
                onChange={(e) => handleChange(index, "age", parseInt(e.target.value) || 0)}
                className="input"
              />
              <Input
                type="text"
                placeholder="Status"
                value={sibling.status || ""}
                onChange={(e) => handleChange(index, "status", e.target.value)}
                className="input"
              />
              <Input
                type="text"
                placeholder="Remarks"
                value={sibling.remarks || ""}
                onChange={(e) => handleChange(index, "remarks", e.target.value)}
                className="input"
              />
              <div className="flex items-center gap-2">
                <CheckBox
                    name="livingWithParents"
                    checked={!!sibling.livingWithParents}
                    onChange={(val) => handleChange(index, "livingWithParents", val)}
                />
                <label>Living With Parents</label>
              </div>
              <div className="flex items-center gap-2">
                <CheckBox
                    name="ownHouse"
                    checked={!!sibling.ownHouse}
                    onChange={(val) => handleChange(index, "ownHouse", val)}
                />
                <label>Own House</label>
              </div>
            </div>
  
            <div className="text-right">
              {siblings.length > 0 && (
                <button
                  onClick={() => removeSibling(index)}
                  className="text-red-500 hover:underline text-sm"
                >
                  Remove
                </button>
              )}
            </div>
          </div>
        ))}
  
        <button
          onClick={addSibling}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition"
        >
          Add Sibling
        </button>
      </div>
    );
  };
  
  export default SiblingRepeater;