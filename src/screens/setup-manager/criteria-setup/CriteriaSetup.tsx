'use client';

import Tabs from '@/components/Tabs/Tabs';
import PairwiseMatrix from './PairwiseMatrix';
import { Criterion, CriterionCategory } from './CriteriaSetup.types';
import { useFormik } from 'formik';

interface CriteriaSetupProps {
    serverData: {
        criterionCategories: CriterionCategory[];
    }
}

export default function CriteriaSetup({ serverData }: CriteriaSetupProps) {

  const CriteriaSection = ({ formik }: any) => {
    return (
      <div className="space-y-8">
        <PairwiseMatrix formik={formik} />
      </div>
    );
  };

  const CriterionForm = ({ category }: { category: CriterionCategory }) => {

    const formik = useFormik({
      initialValues: {
        criterionCategoryId: category.id,
        criteria: category.criterions.map((criterion: any) => ({
          name: criterion.name,
          label: criterion.name
            .split(' ')
            .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
            .join(' '),
          dataSource: "CUSTOM_INPUT",
          formulaType: null,
          preference: "MAX",
          requiredColumns: []
        })) as Criterion[],
        matrix: {} 
      },
      onSubmit: async (values) => {
        const payload = {
          criterionCategoryId: values.criterionCategoryId,
          criteria: values.criteria,
          matrix: Object.entries(values.matrix).map(([key, value]) => {
            const [criteriaNameA, criteriaNameB] = key.split('|');
            return {
              criteriaNameA,
              criteriaNameB,
              value
            }
          })
        };

        console.log("Submitting criterion payload:", payload);

      }
    });

    return (
      <>
        <form onSubmit={formik.handleSubmit} className="space-y-6">
          <CriteriaSection
            formik={formik}
            criteria={formik.values.criteria}
          />

          <button
            type="submit"
            className="bg-green-600 text-white px-6 py-2 rounded-xl"
          >
            Save Criterion
          </button>
        </form>
      </>
    );
  }

  const { criterionCategories } = serverData;

  const tabs = criterionCategories.map(category => ({
    label: category.name.replace(/\b\w/g, (c: string) => c.toUpperCase()),
    content: (
      <CriterionForm   
        key={category.id}  
        category={category}
      />
    )
  }));
 

  return (
    <div style={{ padding: 30 }}>
      <Tabs tabs={tabs}/>
    </div>
  );
}
