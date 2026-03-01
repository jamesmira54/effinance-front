'use client';

import { FormikProps } from 'formik';
import { Criterion } from './CriteriaSetup.types';
import Input from '@/components/Inputs/Input';
import Select from '@/components/Inputs/Select';
import { DATA_SOURCE_OPTIONS, FORMULA_TYPE_OPTIONS, PREFERENCE_OPTIONS } from '@/utils/constant';
import { capitalizeAndSpace, capitalized } from '@/utils/helpers';

interface Props {
  formik: FormikProps<{
    criterionCategoryId: string;
    criteria: Criterion[];
    matrix: Record<string, number>;
  }>;
}

const TABLE_OPTIONS = [
  'student',
  'sponsorship Applications',
];

const COLUMN_OPTIONS = [
  'gwa',
  'college_year_level',
  'g12_year_of_graduation',
  'father_income',
  'mother_income',
  'guardian_income',
  'number_of_siblings',
  'is_solo_parent',
  'is_child_of_solo_parent',
  'is_indigenous_people',
  'is_sped',
  'is_pwd',
  'interview_status',
  'exam_status',
];

export default function PairwiseMatrix({ formik }: Props) {
  const { values, handleChange, setFieldValue } = formik;

  const criteriaNames = values.criteria.map((c) => c.name);

  return (
    <div className="bg-white shadow-sm rounded-xl p-8 space-y-10">
      <div>
        <h3 className="text-lg font-semibold mb-4">
          Criteria Configuration
        </h3>

        <div className="space-y-6">
          {values.criteria.map((criterion, index) => (
            <div key={index} className="border rounded-lg p-5 space-y-5" >
              <div className="grid grid-cols-2 gap-4">
                <p>{criterion.label}</p>
              </div>

              <div className="grid grid-cols-3 gap-4">

                <Select 
                    className="z-99"
                    id={`criteria.${index}.dataSource`}
                    name={`criteria.${index}.dataSource`}
                    label="Data Source" 
                    options={DATA_SOURCE_OPTIONS} 
                    isMultiple={false} 
                    value={DATA_SOURCE_OPTIONS.find(opt => opt.value === criterion.dataSource) || null}
                    onChange={(option) => {
                      setFieldValue(`criteria.${index}.dataSource`, option?.value);

                      if (option?.value !== 'COMPUTED') {
                        setFieldValue(
                          `criteria.${index}.requiredColumns`,
                          null
                        );
                        setFieldValue(
                          `criteria.${index}.formulaType`,
                          null
                        );
                      } else {
                        setFieldValue(
                          `criteria.${index}.requiredColumns`,
                          []
                        );
                      }
                    }}
                />

                <Select 
                  className="z-99"
                  id={`criteria.${index}.preference`}
                  name={`criteria.${index}.preference`}
                  label="Preference" 
                  options={PREFERENCE_OPTIONS} 
                  isMultiple={false} 
                  value={PREFERENCE_OPTIONS.find(opt => opt.value === criterion.preference) || null}
                  onChange={(option) => {
                      if (option) {
                          formik.setFieldValue(`criteria.${index}.preference`, option.value);
                      } else {
                          formik.setFieldValue(`criteria.${index}.preference`, null);
                      }
                  }}
                />

                {criterion.dataSource === 'COMPUTED' && (
                  <Select 
                    className="z-99"
                    id={`criteria.${index}.formulaType`}
                    name={`criteria.${index}.formulaType`}
                    label="Formula Type" 
                    options={FORMULA_TYPE_OPTIONS} 
                    isMultiple={false} 
                    value={FORMULA_TYPE_OPTIONS.find(opt => opt.value === criterion.formulaType) || null}
                    onChange={(option) => {
                      if (option) {
                          formik.setFieldValue(`criteria.${index}.formulaType`, option.value);
                      } else {
                          formik.setFieldValue(`criteria.${index}.formulaType`, null);
                      }
                    }}
                  />
                )}
              </div>

              {/* REQUIRED COLUMNS */}
              {criterion.dataSource === 'COMPUTED' && (
                <div className="bg-gray-50 p-4 rounded-lg space-y-4">
                  <div className="flex justify-between items-center">
                    <h4 className="font-medium">Required Columns</h4>

                    <button
                      type="button"
                      onClick={() =>
                        setFieldValue(
                          `criteria.${index}.requiredColumns`,
                          [
                            ...(criterion.requiredColumns || []),
                            { table: '', column: '' },
                          ]
                        )
                      }
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
                      <select
                        value={col.table}
                        onChange={(e) =>
                          setFieldValue(
                            `criteria.${index}.requiredColumns.${rIndex}.table`,
                            e.target.value
                          )
                        }
                        className="border px-3 py-2 rounded-md"
                      >
                        <option value="">Select Table</option>
                        {TABLE_OPTIONS.map((t) => (
                          <option key={t} value={t}>
                            {capitalized(t)}
                          </option>
                        ))}
                      </select>

                      <select
                        value={col.column}
                        onChange={(e) =>
                          setFieldValue(
                            `criteria.${index}.requiredColumns.${rIndex}.column`,
                            e.target.value
                          )
                        }
                        className="border px-3 py-2 rounded-md"
                      >
                        <option value="">Select Column</option>
                        {COLUMN_OPTIONS.map((c) => (
                            <option key={c} value={c}>
                            {capitalizeAndSpace(c)}
                            </option>
                        ))}
                      </select>

                      <button
                        type="button"
                        onClick={() => {
                          const updated =
                            criterion.requiredColumns?.filter(
                              (_, i) => i !== rIndex
                            ) || [];

                          setFieldValue(
                            `criteria.${index}.requiredColumns`,
                            updated
                          );
                        }}
                        className="text-red-600 text-sm"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* PAIRWISE MATRIX TABLE */}
      <div>
        <h3 className="text-lg font-semibold mb-4">
          Pairwise Matrix
        </h3>

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
                    const key = `${row}-${col}`;

                    return (
                      <td key={key} className="py-4">
                        <input
                          type="number"
                          min="1"
                          max="9"
                          className="w-16 border rounded-md text-center py-1"
                          value={i === j ? 1 : values.matrix[key] ?? ''}
                          disabled={i === j}
                          onChange={(e) =>
                            setFieldValue(
                              `matrix.${key}`,
                              Number(e.target.value)
                            )
                          }
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