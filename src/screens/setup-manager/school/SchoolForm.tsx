import Input from "@/components/Inputs/Input";
import Select from "@/components/Inputs/Select/Select";
import { SelectOption, SelectOption2 } from "@/components/Inputs/Select/Select.types";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useEffect, useMemo, useState } from "react";
import { BrgyProps, CityMunProps, ProvinceProps, SchoolFormProps, SchoolDataProps } from "./School.types";
import { AddressAPIService, SchoolAPIService } from "@/api";
import { APISchoolPayload } from "@/types/shools.types";
import Alert from "@/components/Alert";
import Throbber from "@/components/common/Throbber";
import { useRouter } from "next/navigation";



const SchoolForm: React.FC<{initialData?: SchoolDataProps,provinces: ProvinceProps[], onSuccess: (updatedItem: SchoolDataProps) => void;}> = ({
  initialData,
  provinces,
  onSuccess
}) => {

  const addressesAPI = new AddressAPIService();
  const schoolAPI = new SchoolAPIService();
  const [cityMunOptions, setCityMunOptions] = useState<SelectOption2[]>([]);
  const [brgyOptions, setBrgyOptions] = useState<SelectOption2[]>([]);
  const [isError, setError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  // const [showAlert, setShowAlert] = useState<boolean>(false);
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [initialValues, setInitialValues] = useState<SchoolFormProps>({
    name: initialData?.name || '',
    provinceId: null,
    cityMunId: null,
    brgyId: null,
    schoolType: null,
  });



  const getInitialSchoolType = (value?: string) => {
    return schoolTypeOptions.find((opt) => opt.value === value) || null;
  }


  const provinceData: SelectOption2[] = provinces.map((province) => ({
    label: province.provDesc,
    value: {
      id: province.id,
      provCode: province.provCode,
    }
  }));


  useEffect(() => {
    const initializeForm = async () => {
      if (!initialData) return;
      setIsLoading(true);
      const name = initialData?.name || ''; 
      const schoolType = getInitialSchoolType(initialData.schoolType) || null;

      // Province
      const selectedProvince = provinces.find(prov => prov.id === initialData.provinceId);
      const provinceOption = selectedProvince
        ? provinceData.find(opt => opt.value.id === selectedProvince.id) || null
        : null;

      // Fetch cities based on province
      let cityMunOption = null;
      let brgyOption = null;
      let cityMunOpts: SelectOption2[] = [];
      let brgyOpts: SelectOption2[] = [];


      if (selectedProvince) {
        const cityMunData = await addressesAPI.getAllCities(selectedProvince.provCode);
        cityMunOpts = cityMunData.map((city: CityMunProps) => ({
          label: city.citymunDesc,
          value: {
            id: city.id,
            citymunCode: city.citymunCode,
          }
        }));
        setCityMunOptions(cityMunOpts);

        // Match cityMunId
        const selectedCity = cityMunData.find((city: CityMunProps) => city.id === initialData.cityMunId);
        
        cityMunOption = selectedCity
          ? {
              label: selectedCity.citymunDesc,
              value: {
                id: selectedCity.id,
                citymunCode: selectedCity.citymunCode,
              },
            }
          : null;

        // Fetch barangays based on city
        if (selectedCity) {
          const brgyData = await addressesAPI.getAllBarangays(selectedCity.citymunCode);
          brgyOpts = brgyData.map((brgy: BrgyProps) => ({
            label: brgy.brgyDesc,
            value: {
              id: brgy.id,
              brgyCode: brgy.brgyCode,
            },
          }));
          setBrgyOptions(brgyOpts);

          // Match brgyId
          const selectedBrgy = brgyData.find((brgy:BrgyProps) => brgy.id === initialData.brgyId);
          brgyOption = selectedBrgy
            ? {
                label: selectedBrgy.brgyDesc,
                value: {
                  id: selectedBrgy.id,
                  brgyCode: selectedBrgy.brgyCode,
                },
              }
            : null;
        }
      }

      // Set final initial values
    
      setInitialValues({
        name,
        provinceId: provinceOption ? provinceOption.value.id : null,
        cityMunId: cityMunOption ? cityMunOption.value.id : null,
        brgyId: brgyOption ? brgyOption.value.id : null,
        schoolType,
      });
      setIsLoading(false);

    };
    
    initializeForm();
  },[initialData]);

  const handleProvinceChange = async (option: SelectOption2 | null) => {
    if (option) {
      const cityMunData = await addressesAPI.getAllCities(option.value.provCode);

      setCityMunOptions(cityMunData.map((city: CityMunProps) => ({
        label: city.citymunDesc,
        value: {
          id: city.id,
          citymunCode: city.citymunCode,
        }
      })));
    }
  };

  const handleCityMunChange = async (option: SelectOption2 | null) => {
    if (option) {
      const brgyData = await addressesAPI.getAllBarangays(option.value.citymunCode);

      setBrgyOptions(brgyData.map((brgy: BrgyProps) => ({
        label: brgy.brgyDesc,
        value: {
          id: brgy.id,
          brgyCode: brgy.brgyCode,
        }
      })));
    }
  };

  const schoolTypeOptions: SelectOption[] = [
    { value: "public", label: "Public School" }, 
    { value: "private", label: "Private School" }, 
    { value: "international", label: "International" }, 
  ];



  const formik = useFormik<SchoolFormProps>({
    initialValues,
    enableReinitialize: true,
    validationSchema: Yup.object({
        name: Yup.string().required("School Name is required"),
        provinceId: Yup.number().required("Province is required"),
        cityMunId: Yup.number().required("City is required!"),
        brgyId: Yup.number().required("Barangay is required!"),
        schoolType: Yup.object().shape({ value: Yup.string().required(), label: Yup.string().required(), }) .required("Required Field!"),
    }),
    onSubmit: (values, { setSubmitting, resetForm }) => {
      submitHandler(values, setSubmitting, resetForm);
      setSubmitting(true);
      setShowAlert(false);
    }
  });

  const submitHandler = async (
      values: SchoolFormProps, 
      setSubmitting: (isSubmitting: boolean) => void, 
      resetForm: () => void
    ) => {
      
    try {

      let response: any = null;
        
      const payload:APISchoolPayload = {
        name: values.name,
        provinceId: typeof values.provinceId === "number" ? values.provinceId : 0,
        cityMunId: typeof values.cityMunId === "number" ? values.cityMunId : 0,
        brgyId: typeof values.brgyId === "number" ? values.brgyId : 0,
        schoolType: values.schoolType?.value || '',
      }

      if(initialData?.id) {
        response = await schoolAPI.updateSchool(initialData?.id, payload);
      }else {
        response = await schoolAPI.addSchool(payload);
      }

      if (response) {
        setError(false);
        setErrorMessage('');
        resetForm();
        // Find names for province, city/municipality, and barangay
        const provinceName =
          provinces.find((prov) => prov.id === payload.provinceId)?.provDesc || "";
        const cityName =
          cityMunOptions.find((opt) => opt.value.id === payload.cityMunId)?.label || "";
        const brgyName =
          brgyOptions.find((opt) => opt.value.id === payload.brgyId)?.label || "";


        onSuccess({
          ...payload,
          id: initialData?.id || response?.id,
          provinceName,
          cityMunName: cityName,
          brgyName,
        });
      }
    } catch (err: any) {
      setError(true);
      setShowAlert(true);
      setErrorMessage(err.response?.data?.errorDetails?.errors[0].msg || "An error occurred.");
    } finally {
      setSubmitting(false);
      setShowAlert(true);
    }
  }


  return(
    <>
      <form onSubmit={formik.handleSubmit}>
        <div className="flex flex-col mb-4 gap-6 xl:flex-row">
          <div className="w-full xl:w-1/2">
            <Input 
                id="name"
                label="School Name" 
                type="text" 
                placeholder="School Name" 
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={() => formik.handleBlur}
                error={formik.touched.name && formik.errors.name ? true : false}
                errorMessage={formik.errors.name}
            />
          </div>
          <div className="w-full xl:w-1/2">
            <Select 
              className="z-99"
              id="provinceId"
              name="provinceId"
              label="Province" 
              options={provinceData} 
              isMultiple={false} 
              value={provinceData.find(opt => opt.value.id === formik.values.provinceId) || null}
              onChange={(option) => {
                if (option) {
                  formik.setFieldValue("provinceId", option.value.id);
                  setCityMunOptions([]);
                  setBrgyOptions([]);
                  handleProvinceChange(option);
                } else {
                  formik.setFieldValue("provinceId", null);
                }
              }}
              error={formik.touched.provinceId && formik.errors.provinceId ? true : false}
              errorMessage={formik.errors.provinceId}
              isLoading={isLoading}
            />
          </div>
        </div>

        <div className="flex flex-col mb-4 gap-6 xl:flex-row">
          <div className="w-full xl:w-1/2">
            <Select 
                className="z-999"
                id="cityMunId"
                name="cityMunId"
                label="City/Municipality" 
                options={cityMunOptions} 
                isMultiple={false} 
                value={cityMunOptions.find(opt => opt.value.id === formik.values.cityMunId) || null}
                onChange={(option) => {
                  if (option) {
                    formik.setFieldValue("cityMunId", option.value.id);
                    setBrgyOptions([]);
                    handleCityMunChange(option);
                  } else {
                    formik.setFieldValue("cityMunId", null);
                  }
                }}
                error={formik.touched.cityMunId && formik.errors.cityMunId ? true : false}
                errorMessage={formik.errors.cityMunId}
                isLoading={isLoading}
            />
          </div>
          <div className="w-full xl:w-1/2">
            <Select 
                id="brgyId"
                name="brgyId"
                label="Barangay" 
                options={brgyOptions} 
                isMultiple={false} 
                value={brgyOptions.find(opt => opt.value.id === formik.values.brgyId) || null}
                onChange={(option) => {
                  if (option) {
                    formik.setFieldValue("brgyId", option.value.id);
                  } else {
                    formik.setFieldValue("brgyId", null);
                  }
                }}
                error={formik.touched.brgyId && formik.errors.brgyId ? true : false}
                errorMessage={formik.errors.brgyId}
                isLoading={isLoading}
            />
          </div>
        </div>

        <div className="flex flex-col mb-4 gap-6 xl:flex-row">
          <div className="w-full xl:w-1/2">
            <Select 
                id="schoolType"
                name="schoolType"
                label="School Type" 
                options={schoolTypeOptions} 
                isMultiple={false} 
                value={formik.values.schoolType}
                onChange={(option) => formik.setFieldValue("schoolType", option)}
                error={formik.touched.schoolType && formik.errors.schoolType ? true : false}
                errorMessage={formik.errors.schoolType}
                isLoading={isLoading}
            />
          </div>
        </div>


        <div className="flex justify-end mt-5">
          {formik.isSubmitting ? 
              <Throbber/>
            :
            <input
              type="submit"
              value={initialData?.id ? 'Update School' : 'Add School'}
              className="w-50 cursor-pointer rounded-lg border border-primary bg-primary p-4 text-white transition hover:bg-opacity-90"
            />
          } 
        </div>

        {showAlert &&
          <div className="mt-5">
            <Alert 
              variant={isError ? 'error' : 'success'}
              title={isError ? 'Error' : "Success!"}
              message={isError ? errorMessage : "School Added/Updated Successfully!"}
              showLink={false} 
            />
          </div>
        }
      </form>
    </>
  );
}

export default SchoolForm;