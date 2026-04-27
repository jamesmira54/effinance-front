'use client';

import PairwiseMatrix from './PairwiseMatrix';
import { Criteria, CriteriaColumnData, CriterionCategory, Pairwise } from './CriteriaSetup.types';
import { useFormik } from 'formik';
import { v4 as uuidv4 } from 'uuid';
import Select from '@/components/Inputs/Select';
import { SponsorshipAPIService } from "@/api";
import { SponsorshipDetailsProps } from '../sponsorship/Sponsorship.types';
import { useEffect, useMemo, useState } from 'react';
import Button from '@/components/Button';
import { useRouter } from "next/navigation";
import Alert from '@/components/Alert';
import { IoIosArrowRoundBack } from "react-icons/io";
import { useLoader } from '@/context/LoaderContext';
import Modal from '@/components/Modal/Modal';
import styled from 'styled-components';

const ActionModal = styled(Modal)`

`;
interface CriteriaSetupProps {
  serverData: {
    sponsorshipDetails: SponsorshipDetailsProps;
    criterionCategories: CriterionCategory[];
    dataSources: CriteriaColumnData[];
  };
}

export default function CriteriaSetup({ serverData }: CriteriaSetupProps) {

  const { showLoader, hideLoader } = useLoader();
  const SponsorshipAPI = new SponsorshipAPIService();
  const { sponsorshipDetails, criterionCategories, dataSources } = serverData;
  const allCriterions = criterionCategories.flatMap((cat) => cat.criterions);
  const studentColumns = dataSources.find((data) => data.name === 'student')?.columns || [];
  const sponsorAppColumns = dataSources.find((data) => data.name === 'sponsorshipApplications')?.columns || [];
  const [isEditable, setIsEditable] = useState<boolean>(sponsorshipDetails.criterion.length > 0);
  const [showCancel, setShowCancel] = useState<boolean>(false);
  const router = useRouter();
  const [isError, setError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [openConfirmModal, setOpenConfirmModal] = useState<boolean>(false);

  const formatLabel = (name: string) =>
    name
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');

  const defaultCriterions =
    sponsorshipDetails.criterion.length > 0
      ? sponsorshipDetails.criterion
      : criterionCategories[0].criterions;

  const pairwiseInitial = (sponsorshipDetails.pairwise || []).reduce(
    (acc: Record<string, number>, item) => {
      const key = `${item.criterionAName}|${item.criterionBName}`;
      acc[key] = item.value;
      return acc;
    },
    {}
  );

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
      pairwise: pairwiseInitial
    },

    onSubmit: async (values) => {
      const criteriaNames = values.criteria.map((c) => c.name);
      const pairwise = buildPairwiseArray(criteriaNames, values.pairwise);

      const payload = {
        criterionCategoryId: values.criterionCategoryId,
        criteria: values.criteria,
        pairwise
      };

      try {
        showLoader();
        let response: any = null;     
        response = await SponsorshipAPI.updateSponsorshipCriterion(sponsorshipDetails.id, payload);

        if(response) {
          setError(false);
          setErrorMessage("");
          setOpenConfirmModal(true);
        }
      }  catch (err: any) {
        setError(true);
        setErrorMessage(err.message || "An error occurred");
      } finally {
        setShowAlert(true);
        const formElemet = document.querySelector('form');
        if(formElemet) {
          formElemet.scrollIntoView({ behavior: 'smooth' });
        } else {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
        hideLoader();
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
      pairwise: {} as Record<string, number> // reset pairwise when switching
    });
  };


  const buildPairwiseArray = (criteria: string[], pairwise: Record<string, number>) => {
    const result: { criteriaNameA: string; criteriaNameB: string; value: number }[] = [];
    criteria.forEach((a, i) => {
      criteria.forEach((b, j) => {
        if (i <= j) {
          const key = `${a}|${b}`;
          const value = i === j ? 1 : pairwise[key] ?? '';
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


  useEffect(() => {
      if(showAlert) {
          const timer = setTimeout(() => {
              setShowAlert(false);
          }, 5000);
          return () => clearTimeout(timer);
      }
  }, [showAlert]);

  const handleBack = () => {
    router.back();
  };

  const confirmNotif = () => {
      setOpenConfirmModal(false);
  };


  return (
    <div className="p-4 space-y-6">
      <h2 className="text-title-md2 font-semibold text-black dark:text-white">
        {sponsorshipDetails.name}
      </h2>
      <Button startIcon={<IoIosArrowRoundBack/>} onClick={handleBack} variants={'text'}>Go Back</Button>
      {showAlert && (
          <div className="mt-5">
              <Alert 
                  variant={isError ? 'error' : 'success'}
                  title={isError ? 'Error' : "Success!"}
                  message={isError ? errorMessage : "Sponsorship Criteria Updated Successfully!"}
                  showLink={false} 
              />
          </div>
      )}
      
      {!isEditable ?
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
      :
       <Button variants="default" className='bg-primary' onClick={() => {
          setIsEditable(false);
          setShowCancel(true);
        }}>
          Edit Criteria
        </Button>
      }

      {showCancel && !isEditable && (
        <Button className='mt-5 bg-warning' variants="default" onClick={() => handleBack()}>
          Cancel
        </Button>
      )}

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

       <ActionModal isTextCentered={true} title="Update Confirmation" className="max-w-100" isOpen={openConfirmModal} onClose={() => confirmNotif()}>
          <div className="text-center">
              <p className="text-sm leading-6 text-gray-500 dark:text-gray-400">
                  Sponsorship Criteria Updated Successfully!
              </p>

              <div className="flex items-center justify-center w-full gap-6 mt-8">
                  <Button className="bg-primary" onClick={() => confirmNotif()}> Okay </Button>
              </div>
          </div>
      </ActionModal>
    </div>
  );
}