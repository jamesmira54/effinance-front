'use client';

import { useState } from 'react';
import { FormikProps } from 'formik';
import { Criteria } from './CriteriaSetup.types';
import Select from '@/components/Inputs/Select';
import {
  DATA_SOURCE_OPTIONS,
  FORMULA_TYPE_OPTIONS,
  PREFERENCE_OPTIONS,
} from '@/utils/constant';
import { capitalizeAndSpace, capitalized } from '@/utils/helpers';
import { v4 as uuidv4 } from 'uuid';
import Button from "@/components/Button";
import { RiDeleteBin5Line } from "react-icons/ri";

interface Props {
  formik: FormikProps<{
    criterionCategoryId: string;
    criteria: Criteria[];
    matrix: Record<string, number>;
  }>;
  studentColumns: any;
  sponsorAppColumns: any;
  allCriterions: any;
}

const TABLE_OPTIONS = ['student', 'sponsorshipApplications'];

export default function PairwiseMatrix({ formik, studentColumns, sponsorAppColumns, allCriterions }: Props) {
  const { values, setFieldValue } = formik;
  const [selectedColumn, setSelectedColumn] = useState<string>('');
  const criteriaNames = values.criteria.map((c) => c.name);

  const handleAddCriterion = () => {
    if (!selectedColumn) return;

    // Avoid duplicates
    if (criteriaNames.includes(selectedColumn)) {
      alert('This criterion is already added.');
      return;
    }

    const newCriterion: Criteria = {
      name: selectedColumn,
      label: capitalizeAndSpace(selectedColumn),
      dataSource: 'CUSTOM_INPUT',
      preference: 'MAX',
      formulaType: null,
      requiredColumns: [],
    };

    const updatedCriteria = [...values.criteria, newCriterion];

    // Ensure every pairwise combination exists in the matrix
    const updatedMatrix = { ...values.matrix };
    updatedCriteria.forEach((row) => {
      updatedCriteria.forEach((col) => {
        const key = `${row.name}-${col.name}`;
        if (!(key in updatedMatrix)) {
          updatedMatrix[key] = row.name === col.name ? 1 : 0;
        }
      });
    });

    setFieldValue('criteria', updatedCriteria);
    setFieldValue('matrix', updatedMatrix);
    setSelectedColumn(''); // reset dropdown
  };

  // --- REMOVE CRITERION ---
  const handleRemoveCriterion = (index: number) => {
    const criterionToRemove = values.criteria[index];
    const updatedCriteria = values.criteria.filter((_, i) => i !== index);

    const updatedMatrix: Record<string, number> = {};
    updatedCriteria.forEach((row) => {
      updatedCriteria.forEach((col) => {
        const key = `${row.name}-${col.name}`;
        if (values.matrix[key] !== undefined) {
          updatedMatrix[key] = values.matrix[key];
        } else {
          updatedMatrix[key] = row.name === col.name ? 1 : 0;
        }
      });
    });

    setFieldValue('criteria', updatedCriteria);
    setFieldValue('matrix', updatedMatrix);
  };

  return (
    <div className="bg-white shadow-sm rounded-xl p-8 space-y-10">
      <div>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">
            Criteria Configuration
          </h3>
          <div className="flex gap-3 items-center">
            <Select
              id="select-data-source"
              name="select-data-source"
              label=""
              options={allCriterions.map((col: any) => ({
                label: capitalizeAndSpace(col.name),
                value: col.name,
              }))}
              isMultiple={false}
              value={
                selectedColumn
                ? {
                    label: capitalizeAndSpace(selectedColumn),
                    value: selectedColumn,
                  }
                : null
              }
              onChange={(option) => setSelectedColumn(option?.value || '')}
              className='w-70'
            />

            <button
              type="button"
              onClick={handleAddCriterion}
              disabled={!selectedColumn}
              className={`${
                selectedColumn
                  ? 'bg-green-600 hover:bg-green-700'
                  : 'bg-warning cursor-not-allowed'
              } text-white px-4 py-2 rounded-md text-sm`}
            >
              + Add Criterion
            </button>
          </div>
        </div>

        {/* --- CRITERIA CONFIG FORM --- */}
        <div className="space-y-6">
          {values.criteria.map((criterion, index) => (
            <div
              key={index}
              className="border rounded-lg p-5 space-y-5 relative"
            >
              <Button 
                className="absolute top-4 right-4 text-red-600 text-sm" 
                onClick={() => handleRemoveCriterion(index)} 
                variants="text" 
                startIcon={<RiDeleteBin5Line 
                title="Delete" 
                size={20}
              />}
                >Remove
              </Button>

              <div style={{marginTop: 0}} className="grid grid-cols-2 gap-4">
                <p className="font-medium">{criterion.label}</p>
              </div>

              <div className="grid grid-cols-3 gap-4">
                {/* Data Source */}
                <Select
                  id={`criteria.${index}.dataSource`}
                  name={`criteria.${index}.dataSource`}
                  label="Data Source"
                  options={DATA_SOURCE_OPTIONS}
                  isMultiple={false}
                  value={
                    DATA_SOURCE_OPTIONS.find(
                      (opt) => opt.value === criterion.dataSource,
                    ) || null
                  }
                  onChange={(option) => {
                    setFieldValue(`criteria.${index}.dataSource`, option?.value);
                    if (option?.value !== 'COMPUTED') {
                      setFieldValue(`criteria.${index}.requiredColumns`, null);
                      setFieldValue(`criteria.${index}.formulaType`, null);
                    } else {
                      setFieldValue(`criteria.${index}.requiredColumns`, []);
                    }
                  }}
                />

                {/* Preference */}
                <Select
                  id={`criteria.${index}.preference`}
                  name={`criteria.${index}.preference`}
                  label="Preference"
                  options={PREFERENCE_OPTIONS}
                  isMultiple={false}
                  value={
                    PREFERENCE_OPTIONS.find(
                      (opt) => opt.value === criterion.preference,
                    ) || null
                  }
                  onChange={(option) =>
                    setFieldValue(
                      `criteria.${index}.preference`,
                      option ? option.value : null,
                    )
                  }
                />

                {/* Formula Type */}
                {criterion.dataSource === 'COMPUTED' && (
                  <Select
                    id={`criteria.${index}.formulaType`}
                    name={`criteria.${index}.formulaType`}
                    label="Formula Type"
                    options={FORMULA_TYPE_OPTIONS}
                    isMultiple={false}
                    value={
                      FORMULA_TYPE_OPTIONS.find(
                        (opt) => opt.value === criterion.formulaType,
                      ) || null
                    }
                    onChange={(option) =>
                      setFieldValue(
                        `criteria.${index}.formulaType`,
                        option ? option.value : null,
                      )
                    }
                  />
                )}
              </div>

              {(criterion.dataSource === 'COMPUTED' || criterion.dataSource === 'COLUMN') && (
                <div className="bg-gray-50 py-4 rounded-lg space-y-4">
                  <div className="flex justify-between items-center">
                    <h4 className="font-medium">Required Columns</h4>
                    <button
                      type="button"
                      onClick={() => {
                        const currentCols = criterion.requiredColumns || [];
                        if (criterion.dataSource === 'COLUMN' && currentCols.length >= 1) {
                          alert('You can only add one column for COLUMN data source.');
                          return;
                        }
                        setFieldValue(`criteria.${index}.requiredColumns`, [
                          ...currentCols,
                          { table: '', column: '' },
                        ]);
                      }}
                      className="text-sm bg-black text-white px-3 py-1 rounded-md"
                    >
                      + Add Column
                    </button>
                  </div>

                  {criterion.requiredColumns?.map((col, rIndex) => (
                    <div
                      key={rIndex}
                      className="grid grid-cols-3 gap-4 items-center"
                    >
                      <Select
                        id={`criteria.${index}.requiredColumns.${rIndex}.table`}
                        name={`criteria.${index}.requiredColumns.${rIndex}.table`}
                        label=""
                        options={TABLE_OPTIONS.map((col) => ({
                          label: col === 'sponsorshipApplications' ? 'Sponsorship Application' : capitalizeAndSpace(col),
                          value: col,
                        }))}
                        isMultiple={false}
                        value={
                          col.table                            ? {
                              label: col.table === 'sponsorshipApplications' ? 'Sponsorship Application' : capitalizeAndSpace(col.table),
                              value: col.table,
                            }
                          : null
                        }
                        onChange={(option) =>
                          setFieldValue(
                            `criteria.${index}.requiredColumns.${rIndex}.table`,
                            option?.value || '',
                          )
                        }
                      />

                      <Select
                        id={`criteria.${index}.requiredColumns.${rIndex}.column`}
                        name={`criteria.${index}.requiredColumns.${rIndex}.column`}
                        label=""
                        options={
                          col.table === 'sponsorshipApplications' ? sponsorAppColumns.map((col: { name: string; }) => ({
                            label: capitalizeAndSpace(col.name),
                            value: col.name,
                          })) : studentColumns.map((col: { name: string; }) => ({
                            label: capitalizeAndSpace(col.name),
                            value: col.name,
                          }))
                        }
                        isMultiple={false}
                        value={
                          col.column                            ? {
                              label: capitalizeAndSpace(col.column),
                              value: col.column,
                            }
                          : null
                        }
                        onChange={(option) =>
                          setFieldValue(
                            `criteria.${index}.requiredColumns.${rIndex}.column`,
                            option?.value || '',
                          )
                        }
                      />

                      <Button 
                        className="text-red-600 text-sm"
                        onClick={() => {
                          const updated =
                            criterion.requiredColumns?.filter(
                              (_, i) => i !== rIndex,
                            ) || [];
                          setFieldValue(
                            `criteria.${index}.requiredColumns`,
                            updated,
                          );
                        }}
                        variants="text" 
                        startIcon={<RiDeleteBin5Line 
                        title="Remove" 
                        size={20}
                      />}
                        >Remove
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* --- PAIRWISE MATRIX TABLE --- */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Pairwise Matrix</h3>

        <div className="overflow-x-auto">
          <table className="w-full text-center border-collapse">
            <thead>
              <tr className="border-b">
                <th className="py-3 text-left">Criteria</th>
                {criteriaNames.map((c) => (
                  <th key={c} className="py-3">
                    {capitalizeAndSpace(c)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {criteriaNames.map((row, i) => (
                <tr key={row} className="border-b">
                  <td className="py-4 text-left font-medium">
                    {capitalizeAndSpace(row)}
                  </td>

                  {criteriaNames.map((col, j) => {
                    const key = `${row}|${col}`;
                    const oppositeKey = `${col}|${row}`;

                    if (i === j && values.matrix[key] !== 1) {
                      setFieldValue(`matrix.${key}`, 1, false);
                    }

                    return (
                      <td key={key} className="py-4">
                        <input
                          type="text"
                          className={`w-16 border rounded-md text-center py-1 ${
                            i === j ? 'bg-gray-100' : ''
                          }`}
                          value={i === j ? 1 : values.matrix[key] ?? ''}
                          disabled={j <= i}
                          onChange={(e) => {
                            const val = Number(e.target.value);
                            // Set A vs B
                            setFieldValue(`matrix.${key}`, val);

                            // Set B vs A automatically as reciprocal
                            if (val && val > 0) {
                              setFieldValue(`matrix.${oppositeKey}`, 1 / val);
                            } else {
                              setFieldValue(`matrix.${oppositeKey}`, '');
                            }
                          }}
                        />
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
