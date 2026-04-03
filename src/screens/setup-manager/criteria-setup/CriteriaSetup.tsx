'use client';

import PairwiseMatrix from './PairwiseMatrix';
import { Criteria, CriteriaColumnData, CriterionCategory } from './CriteriaSetup.types';
import { useFormik } from 'formik';
import { v4 as uuidv4 } from 'uuid';
import Select from '@/components/Inputs/Select';
import { SponsorshipAPIService } from "@/api";
import { SponsorshipDetailsProps } from '../sponsorship/Sponsorship.types';
import { useMemo } from 'react';

interface CriteriaSetupProps {
  serverData: {
    sponsorshipDetails: SponsorshipDetailsProps;
    criterionCategories: CriterionCategory[];
    dataSources: CriteriaColumnData[];
  };
}

export default function CriteriaSetup({ serverData }: CriteriaSetupProps) {
  const SponsorshipAPI = new SponsorshipAPIService();
  const { sponsorshipDetails, criterionCategories, dataSources } = serverData;
  const allCriterions = criterionCategories.flatMap((cat) => cat.criterions);
  const studentColumns = dataSources.find((data) => data.name === 'student')?.columns || [];
  const sponsorAppColumns = dataSources.find((data) => data.name === 'sponsorshipApplications')?.columns || [];

  const formatLabel = (name: string) =>
    name
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');

  const defaultCriterions =
    sponsorshipDetails.criterion.length > 0
      ? sponsorshipDetails.criterion
      : criterionCategories[0].criterions;

  const formik = useFormik({
    initialValues: {
      criterionCategoryId: criterionCategories[0].id,
      criteria: (defaultCriterions || []).map((criterion: any) => ({
        name: criterion.name,
        label: formatLabel(criterion.name),
        dataSource: criterion.dataSource || 'CUSTOM_INPUT',
        formulaType: criterion.formulaType || null,
        preference: criterion.preference || 'MAX',
        requiredColumns: criterion.requiredColumns || []
      })) as Criteria[],
      matrix: {} as Record<string, number>
    },

    onSubmit: async (values) => {
      const criteriaNames = values.criteria.map((c) => c.name);
      const pairwise = buildPairwiseArray(criteriaNames, values.matrix);

      const payload = {
        criterionCategoryId: values.criterionCategoryId,
        criteria: values.criteria,
        pairwise
      };

      try {

        console.log('Submitting payload:', payload);
        let response: any = null;     

        response = await SponsorshipAPI.updateSponsorshipCriterion('dummy-sponsorship-id', payload);
      }  catch (err: any) {

      } finally {
        console.log('Submission complete');
      }

    }
  });

  const handleCategoryChange = (categoryId: string) => {
    const selectedCategory = criterionCategories.find(
      (c) => c.id === categoryId
    );

    if (!selectedCategory) return;

    formik.setValues({
      criterionCategoryId: selectedCategory.id,
      criteria: selectedCategory.criterions.map((criterion: any) => ({
        id: criterion.id || uuidv4(),
        name: criterion.name,
        label: formatLabel(criterion.name),
        dataSource: 'CUSTOM_INPUT',
        formulaType: null,
        preference: 'MAX',
        requiredColumns: []
      })),
      matrix: {} as Record<string, number> // reset matrix when switching
    });
  };


  const buildPairwiseArray = (criteria: string[], matrix: Record<string, number>) => {
    const result: { criteriaNameA: string; criteriaNameB: string; value: number }[] = [];
    criteria.forEach((a, i) => {
      criteria.forEach((b, j) => {
        if (i <= j) {
          const key = `${a}|${b}`;
          const value = i === j ? 1 : matrix[key] ?? '';
          if (value !== undefined && value !== null) {
            result.push({
              criteriaNameA: a,
              criteriaNameB: b,
              value: Number(value),
            });
          }
        }
      });
    });
    return result;
  };

  const categoryOptions = useMemo(() => {
    return criterionCategories.map((cat) => ({
      label: cat.name.replace(/\b\w/g, (c) => c.toUpperCase()),
      value: cat.id,
    }));
  }, [criterionCategories]);

  const selectedCategory = useMemo(() => {
    if (!formik.values.criterionCategoryId) return null;

    const found = criterionCategories.find(
      (cat) => cat.id === formik.values.criterionCategoryId
    );

    if (!found) return null;

    return {
      label: found.name.replace(/\b\w/g, (c) => c.toUpperCase()),
      value: found.id,
    };
  }, [formik.values.criterionCategoryId, criterionCategories]);


  return (
    <div className="p-4 space-y-6">
      
      <div>
        <label className="block font-medium mb-2">
          Select Criterion Category
        </label>


        <Select
          id="criterionCategory"
          name="criterionCategory"
          label=""
          options={ categoryOptions }
          isMultiple={false}
          value={ selectedCategory }
          onChange={(option) => handleCategoryChange(option?.value || '')}
          className='w-full'
        />
      </div>

      <form onSubmit={formik.handleSubmit} className="space-y-6">
        <PairwiseMatrix formik={formik} studentColumns={studentColumns} sponsorAppColumns={sponsorAppColumns} allCriterions={allCriterions} />

        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-green-600 text-white px-6 py-2 rounded-xl"
          >
            Save Criteria
          </button>
        </div>
      </form>
    </div>
  );
}