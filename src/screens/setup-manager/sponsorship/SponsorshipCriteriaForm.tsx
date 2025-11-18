// pages/criteria.tsx
import React from 'react';

const payload = {
  criterionCategoryId: "b75369ed-2517-11f0-b26b-a2aab4486a89",
  criteria: [
    {
      name: "residency",
      label: "residency value",
      dataSource: "CUSTOM_INPUT",
      formulaType: null,
      preference: "MAX",
      requiredColumns: null
    },
    {
      name: "monthly income",
      label: "Monthly Income of Applicant",
      dataSource: "COMPUTED",
      formulaType: "SUM",
      preference: "MIN",
      requiredColumns: [
        { table: "student", column: "mother_income" },
        { table: "student", column: "father_income" }
      ]
    },
    {
      name: "number of siblings",
      label: "number of siblings",
      dataSource: "CUSTOM_INPUT",
      formulaType: null,
      preference: "MAX",
      requiredColumns: null
    },
    {
      name: "parent status",
      label: "parent status value",
      dataSource: "CUSTOM_INPUT",
      formulaType: null,
      preference: "MAX",
      requiredColumns: null
    }
  ],
  pairwise: [
    { criteriaNameA: "residency", criteriaNameB: "residency", value: 1 },
    { criteriaNameA: "residency", criteriaNameB: "monthly income", value: 2 },
    { criteriaNameA: "residency", criteriaNameB: "number of siblings", value: 3 },
    { criteriaNameA: "residency", criteriaNameB: "parent status", value: 4 },
    { criteriaNameA: "monthly income", criteriaNameB: "monthly income", value: 1 },
    { criteriaNameA: "monthly income", criteriaNameB: "number of siblings", value: 2 },
    { criteriaNameA: "monthly income", criteriaNameB: "parent status", value: 3 },
    { criteriaNameA: "number of siblings", criteriaNameB: "number of siblings", value: 1 },
    { criteriaNameA: "number of siblings", criteriaNameB: "parent status", value: 2 },
    { criteriaNameA: "parent status", criteriaNameB: "parent status", value: 1 }
  ]
};

export default function CriteriaPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Criteria Inputs</h1>

      <form className="grid gap-4">
        {payload.criteria.map((criterion) => (
          <div key={criterion.name} className="flex flex-col">
            <label className="font-semibold">{criterion.label}</label>
            {criterion.dataSource === 'CUSTOM_INPUT' ? (
              <input
                type="text"
                placeholder={`Enter ${criterion.label.toLowerCase()}`}
                className="border border-gray-300 p-2 rounded"
              />
            ) : (
              <input
                type="text"
                disabled
                value={`SUM of ${criterion.requiredColumns?.map(col => col.column).join(' + ')}`}
                className="border border-gray-300 p-2 rounded bg-gray-100 text-gray-600"
              />
            )}
          </div>
        ))}
      </form>

      <div className="mt-10">
        <h2 className="text-xl font-semibold mb-2">Pairwise Comparison Matrix</h2>
        <table className="table-auto border-collapse border border-gray-400">
          <thead>
            <tr>
              <th className="border border-gray-300 p-2">A / B</th>
              {payload.criteria.map((c) => (
                <th key={c.name} className="border border-gray-300 p-2">
                  {c.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {payload.criteria.map((row) => (
              <tr key={row.name}>
                <td className="border border-gray-300 p-2 font-semibold">{row.label}</td>
                {payload.criteria.map((col) => {
                  const pair = payload.pairwise.find(
                    (p) => p.criteriaNameA === row.name && p.criteriaNameB === col.name
                  );
                  return (
                    <td key={col.name} className="border border-gray-300 p-2 text-center">
                      {pair?.value ?? '-'}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
