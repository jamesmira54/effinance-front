"use client";

import Input from "@/components/Inputs/Input";
import Select from "@/components/Inputs/Select/Select";
import { SelectOption, SelectOption2 } from "@/components/Inputs/Select/Select.types";
import { useFormik } from "formik";
import * as Yup from "yup";
import { StudentProfileFormProps } from "./StudentProfile.types";
import { APIStudentListResponse } from "@/types";
import CheckBox from "@/components/Checkboxes";
import Collapsible from "@/components/Collapsible";
import SiblingRepeater from "./SiblingRepeater";
import { useState } from "react";
import { AddressAPIService, StudentAPIService } from "@/api";
import { useRouter } from "next/navigation";
import Throbber from "@/components/common/Throbber";
import Alert from "@/components/Alert";
import { IoIosArrowRoundBack } from "react-icons/io";
import Button from "@/components/Button";
import { BrgyProps, CityMunProps, ProvinceProps, RegionProps, SchoolDataProps } from "@/screens/setup-manager/school/School.types";

const StudentProfileForm: React.FC<
    {
        studentDetails: APIStudentListResponse, 
        provinces: ProvinceProps[], 
        regions: RegionProps[],
        schools: SchoolDataProps[]
    }> = ({
    studentDetails,
    provinces,
    regions,
    schools
}) => {

    const studentAPI = new StudentAPIService();
    const addressesAPI = new AddressAPIService();
    const [showAlert, setShowAlert] = useState<boolean>(false);
    const [isError, setError] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>('');
    const router = useRouter();
    const [permanentCityMunOptions, setPermanentCityMunOptions] = useState<SelectOption2[]>([]);
    const [permanentBrgyOptions, setPermanentBrgyOptions] = useState<SelectOption2[]>([]);
    const [currentCityMunOptions, setCurrentCityMunOptions] = useState<SelectOption2[]>([]);
    const [currentBrgyOptions, setCurrentBrgyOptions] = useState<SelectOption2[]>([]);


    const provinceData: SelectOption2[] = provinces.map((province) => ({
        label: province.provDesc,
        value: {
            id: province.id,
            provCode: province.provCode,
        }
    }));


    const regionData: SelectOption2[] = regions.map((region) => ({
        label: region.regDesc,
        value: {
            id: region.id,
            regCode: region.regCode,
        }
    }));

    const schoolData: SelectOption[] = schools.map((school) => ({
        label: school.name,
        value: school.id,
    }));


    const formik = useFormik<StudentProfileFormProps>({
        initialValues: { 
            userId: studentDetails.userId,
            firstName: studentDetails.firstName,
            middleName: studentDetails.middleName,
            lastName: studentDetails.lastName,
            extensionName: studentDetails.extensionName,
            sex: studentDetails.sex,
            placeOfBirth: studentDetails.placeOfBirth ,
            birthdate: studentDetails?.birthdate?.split('T')[0] ?? new Date().toISOString().split('T')[0],
            height: studentDetails.height,
            weight: studentDetails.weight,
            permanentStreet: studentDetails.permanentStreet,
            permanentBrgId: studentDetails.permanentBrgyId,
            permanentCitymunId: studentDetails.permanentCitymunId,
            permanentProvinceId: studentDetails.permanentProvinceId,
            permanentRegionId: studentDetails.permanentRegionId,
            permanentZipCode: studentDetails.permanentZipCode,
            permanentCountry: studentDetails.permanentCountry,
            currentStreet: studentDetails.currentStreet,
            currentBrgId: studentDetails.currentBrgyId,
            currentCitymunId: studentDetails.currentCitymunId,
            currentProvinceId: studentDetails.currentProvinceId,
            currentRegionId: studentDetails.currentRegionId,
            currentZipCode: studentDetails.currentZipCode,
            currentCountry: studentDetails.currentCountry,
            email: studentDetails.email,
            mobileNumber: studentDetails.mobileNumber,
            isSoloParent: studentDetails.isSoloParent,
            isChildOfSoloParent: studentDetails.isChildOfSoloParent,
            isIndigenousPeople: studentDetails.isIndigenousPeople,
            indigenousGroup: studentDetails.indigenousGroup,
            isSped: studentDetails.isSped,
            isPwd: studentDetails.isPwd,
            emergencyContactName: studentDetails.emergencyContactName,
            emergencyContactNumber: studentDetails.emergencyContactNumber,
            emergencyContactName2: studentDetails.emergencyContactName2,
            emergencyContactNumber2: studentDetails.emergencyContactNumber2,
            g12AcademicStrand: studentDetails.g12AcademicStrand,
            g12ProgramName: studentDetails.g12ProgramName,
            g12AwardHonor: studentDetails.g12AwardHonor,
            g12Organization: studentDetails.g12Organization,
            g12YearOfGraduation: studentDetails.g12YearOfGraduation,
            g12SchoolId: studentDetails.g12SchoolId,
            collegeProgramName: studentDetails.collegeProgramName,
            collegeYearLevel: studentDetails.collegeYearLevel,
            collegeAwardHonor: studentDetails.collegeAwardHonor,
            collegeOrganization: studentDetails.collegeOrganization,
            collegeSchoolId: studentDetails.collegeSchoolId,
            fatherFirstName: studentDetails.fatherFirstName,
            fatherMiddleName: studentDetails.fatherMiddleName,
            fatherLastName: studentDetails.fatherLastName,
            fatherExtension: studentDetails.fatherExtension,
            fatherOccupation: studentDetails.fatherOccupation,
            fatherIncome: studentDetails.fatherIncome,
            fatherMobileNumber: studentDetails.fatherMobileNumber,
            motherFirstName: studentDetails.motherMaidenFirstName,
            motherMiddleName: studentDetails.motherMaidenMiddleName,
            motherLastName: studentDetails.motherMaidenLastName,
            motherExtension: studentDetails.motherMaidenExtension,
            motherOccupation: studentDetails.motherOccupation,
            motherIncome: studentDetails.motherIncome,
            motherMobileNumber: studentDetails.motherMobileNumber,
            guardianFirstName: studentDetails.guardianFirstName,
            guardianMiddleName: studentDetails.guardianMiddleName,
            guardianLastName: studentDetails.guardianLastName,
            guardianExtension: studentDetails.guardianExtension,
            guardianOccupation: studentDetails.guardianOccupation,
            guardianIncome: studentDetails.guardianIncome,
            guardianMobileNumber: studentDetails.guardianMobileNumber,
            numberOfSiblings: studentDetails.numberOfSiblings,
            siblings: studentDetails.siblings,
            gwa: studentDetails.gwa
        },
        validateOnBlur: true,
        validateOnChange: true,
        validationSchema: Yup.object({
            firstName: Yup.string().required("Required Field!"),
            lastName: Yup.string().required("Required Field!"),
            email: Yup.string().email("Invalid email format").required("Required Field!"),
        }),
        onSubmit: (values, { setSubmitting }) => {
            submitHandler(values, setSubmitting);
            setSubmitting(true);
            setShowAlert(false);
        }
    });

    const submitHandler = async (payload: StudentProfileFormProps, setSubmitting: (isSubmitting: boolean) => void) => {
        try {
            const response = await studentAPI.updateStudentProfile(studentDetails.studentId, payload);
            if(response){
                setError(false);
                setErrorMessage('');
                router.refresh();
              }
        } catch (err: any) {
            setError(true);
            setShowAlert(true);
            setErrorMessage(err.response?.data?.errorDetails?.errors[0].msg || "An error occurred while updating the profile.");
        } finally {
            setSubmitting(false);
            setShowAlert(true);
        }
    }


    const handlePermanetProvinceChange = async (option: SelectOption2 | null) => {
        if (option) {
          const cityMunData = await addressesAPI.getAllCities(option.value.provCode);
    
          setPermanentCityMunOptions(cityMunData.map((city: CityMunProps) => ({
            label: city.citymunDesc,
            value: {
              id: city.id,
              citymunCode: city.citymunCode,
            }
          })));
        }
      };
    
      const handlePermanentCityMunChange = async (option: SelectOption2 | null) => {
        if (option) {
          const brgyData = await addressesAPI.getAllBarangays(option.value.citymunCode);
    
          setPermanentBrgyOptions(brgyData.map((brgy: BrgyProps) => ({
            label: brgy.brgyDesc,
            value: {
              id: brgy.id,
              brgyCode: brgy.brgyCode,
            }
          })));
        }
      };


       const handleCurrentProvinceChange = async (option: SelectOption2 | null) => {
        if (option) {
          const cityMunData = await addressesAPI.getAllCities(option.value.provCode);
    
          setCurrentCityMunOptions(cityMunData.map((city: CityMunProps) => ({
            label: city.citymunDesc,
            value: {
              id: city.id,
              citymunCode: city.citymunCode,
            }
          })));
        }
      };
    
      const handleCurrentCityMunChange = async (option: SelectOption2 | null) => {
        if (option) {
          const brgyData = await addressesAPI.getAllBarangays(option.value.citymunCode);
    
          setCurrentBrgyOptions(brgyData.map((brgy: BrgyProps) => ({
            label: brgy.brgyDesc,
            value: {
              id: brgy.id,
              brgyCode: brgy.brgyCode,
            }
          })));
        }
      };






    return(
        <>
            <form onSubmit={formik.handleSubmit}>
                <Button startIcon={<IoIosArrowRoundBack/>} onClick={() =>  router.back()} variants={'text'}>Back</Button>   
                {showAlert &&
                    <div className="mt-5 w-[50%]">
                        <Alert 
                        variant={isError ? 'error' : 'success'}
                        title={isError ? 'Error' : "Success!"}
                        message={isError ? errorMessage : "Profile updated successfully!"}
                        showLink={false} 
                        />
                    </div>
                }
                <div className="flex justify-end mt-5">
                    {formik.isSubmitting ? 
                        <Throbber/>
                    :
                        <input
                            type="submit"
                            value="Save Updates"
                            className="w-50 cursor-pointer rounded-lg border border-primary bg-primary p-4 text-white transition hover:bg-opacity-90"
                        />
                    }
                </div>
                <Collapsible title="Personal Information:" isOpen={true}>
                        <div className="flex flex-col mb-4 sm:flex-row gap-6 max-xl:flex-wrap">
                            <div className="w-full md:w-[48%] xl:w-1/4">
                                <Input 
                                    id="firstName"
                                    label="First Name" 
                                    type="text" 
                                    placeholder="First Name" 
                                    name="firstName"
                                    value={formik.values.firstName}
                                    onChange={formik.handleChange}
                                    onBlur={() => formik.handleBlur}
                                    error={formik.touched.firstName && formik.errors.firstName ? true : false}
                                    errorMessage={formik.errors.firstName}
                                />
                            </div>

                            <div className="w-full md:w-[48%] xl:w-1/4">
                                <Input 
                                    id="middleName"
                                    label="Middle Name" 
                                    type="text" 
                                    placeholder="Middle Name" 
                                    name="middleName"
                                    value={formik.values.middleName}
                                    onChange={formik.handleChange}
                                    onBlur={() => formik.handleBlur}
                                    error={formik.touched.middleName && formik.errors.middleName ? true : false}
                                    errorMessage={formik.errors.middleName}
                                />
                            </div>

                            <div className="w-full md:w-[48%] xl:w-1/4">
                                <Input 
                                    id="lastName"
                                    label="Last Name" 
                                    type="text" 
                                    placeholder="Last Name" 
                                    name="lastName"
                                    value={formik.values.lastName}
                                    onChange={formik.handleChange}
                                    onBlur={() => formik.handleBlur}
                                    error={formik.touched.lastName && formik.errors.lastName ? true : false}
                                    errorMessage={formik.errors.lastName}
                                />
                            </div>
                            <div className="w-full md:w-[48%] xl:w-1/4">
                                <Input 
                                    id="extensionName"
                                    label="Extension Name" 
                                    type="text" 
                                    placeholder="Extension Name" 
                                    name="extensionName"
                                    value={formik.values.extensionName}
                                    onChange={formik.handleChange}
                                    onBlur={() => formik.handleBlur}
                                    error={formik.touched.extensionName && formik.errors.extensionName ? true : false}
                                    errorMessage={formik.errors.extensionName}
                                />
                            </div>
                        </div> 

                        <div className="flex flex-col mb-4 gap-6 xl:flex-row">
                            <div className="w-full md:w-[48%] xl:w-1/3">
                                <Input 
                                    id="email"
                                    label="Email" 
                                    type="email" 
                                    placeholder="Email" 
                                    name="email"
                                    value={formik.values.email}
                                    onChange={formik.handleChange}
                                    onBlur={() => formik.handleBlur}
                                    error={formik.touched.email && formik.errors.email ? true : false}
                                    errorMessage={formik.errors.email}
                                />
                            </div>

                            <div className="w-full md:w-[48%] xl:w-1/3">
                                <Input 
                                    id="mobileNumber"
                                    label="Mobile Number" 
                                    type="text" 
                                    placeholder="Mobile Number" 
                                    name="mobileNumber"
                                    value={formik.values.mobileNumber}
                                    onChange={formik.handleChange}
                                    onBlur={() => formik.handleBlur}
                                    error={formik.touched.mobileNumber && formik.errors.mobileNumber ? true : false}
                                    errorMessage={formik.errors.mobileNumber}
                                />
                            </div>

                            <div className="w-full md:w-[48%] xl:w-1/3">
                                <Input 
                                    id="sex"
                                    label="Sex" 
                                    type="text" 
                                    placeholder="Sex" 
                                    name="sex"
                                    value={formik.values.sex}
                                    onChange={formik.handleChange}
                                    onBlur={() => formik.handleBlur}
                                    error={formik.touched.sex && formik.errors.sex ? true : false}
                                    errorMessage={formik.errors.sex}
                                />
                            </div>
                        </div>
                        
                        <div className="flex flex-col mb-4 gap-6 xl:flex-row">
                            <div className="w-full md:w-[48%] xl:w-1/3">
                                <Input 
                                    id="placeOfBirth"
                                    label="Place Of Birth" 
                                    type="text" 
                                    placeholder="Place Of Birth" 
                                    name="placeOfBirth"
                                    value={formik.values.placeOfBirth}
                                    onChange={formik.handleChange}
                                    onBlur={() => formik.handleBlur}
                                    error={formik.touched.placeOfBirth && formik.errors.placeOfBirth ? true : false}
                                    errorMessage={formik.errors.placeOfBirth}
                                />
                            </div>

                            <div className="w-full md:w-[48%] xl:w-1/5">
                                <Input 
                                    id="birthdate"
                                    label="Birthdate" 
                                    type="date" 
                                    placeholder="Birthdate" 
                                    name="birthdate"
                                    value={formik.values.birthdate}
                                    onChange={formik.handleChange}
                                    onBlur={() => formik.handleBlur}
                                    error={formik.touched.birthdate && formik.errors.birthdate ? true : false}
                                    errorMessage={formik.errors.birthdate}
                                />
                            </div>

                            <div className="w-full md:w-[48%] xl:w-1/4">
                                <Input 
                                    id="height"
                                    label="Height" 
                                    type="number" 
                                    placeholder="Height in cm" 
                                    name="height"
                                    value={formik.values.height}
                                    onChange={formik.handleChange}
                                    onBlur={() => formik.handleBlur}
                                    error={formik.touched.height && formik.errors.height ? true : false}
                                    errorMessage={formik.errors.height}
                                />
                            </div>

                            <div className="w-full md:w-[48%] xl:w-1/4">
                                <Input 
                                    id="weight"
                                    label="Weight" 
                                    type="number" 
                                    placeholder="Weight in Kilo" 
                                    name="weight"
                                    value={formik.values.weight}
                                    onChange={formik.handleChange}
                                    onBlur={() => formik.handleBlur}
                                    error={formik.touched.weight && formik.errors.weight ? true : false}
                                    errorMessage={formik.errors.weight}
                                />
                            </div>
                        </div>
                </Collapsible>

                <Collapsible title="Academic Information (Grade 12)">
                    <div className="flex flex-col mb-4 gap-6 xl:flex-row">
                        <div className="w-full md:w-[48%] xl:w-1/3">
                            <Input 
                                id="g12AcademicStrand"
                                label="Academic Strand" 
                                type="text" 
                                placeholder="Academic Stran" 
                                name="g12AcademicStrand"
                                value={formik.values.g12AcademicStrand}
                                onChange={formik.handleChange}
                                onBlur={() => formik.handleBlur}
                                error={formik.touched.g12AcademicStrand && formik.errors.g12AcademicStrand ? true : false}
                                errorMessage={formik.errors.g12AcademicStrand}
                            />
                        </div>
                        <div className="w-full md:w-[48%] xl:w-1/3">
                            <Input 
                                id="g12ProgramName"
                                label="Program Name" 
                                type="text" 
                                placeholder="Program Name" 
                                name="g12ProgramName"
                                value={formik.values.g12ProgramName}
                                onChange={formik.handleChange}
                                onBlur={() => formik.handleBlur}
                                error={formik.touched.g12ProgramName && formik.errors.g12ProgramName ? true : false}
                                errorMessage={formik.errors.g12ProgramName}
                            />
                        </div>
                        <div className="w-full md:w-[48%] xl:w-1/3">
                            <Input 
                                id="g12AwardHonor"
                                label="Award/Honor" 
                                type="text" 
                                placeholder="Award/Honor" 
                                name="g12AwardHonor"
                                value={formik.values.g12AwardHonor}
                                onChange={formik.handleChange}
                                onBlur={() => formik.handleBlur}
                                error={formik.touched.g12AwardHonor && formik.errors.g12AwardHonor ? true : false}
                                errorMessage={formik.errors.g12AwardHonor}
                            />
                        </div>
                    </div>

                    <div className="flex flex-col mb-4 gap-6 xl:flex-row">
                        <div className="w-full md:w-[48%] xl:w-1/3">
                            <Input 
                                id="g12Organization"
                                label="Organization" 
                                type="text" 
                                placeholder="Organization" 
                                name="g12Organization"
                                value={formik.values.g12Organization}
                                onChange={formik.handleChange}
                                onBlur={() => formik.handleBlur}
                                error={formik.touched.g12Organization && formik.errors.g12Organization ? true : false}
                                errorMessage={formik.errors.g12Organization}
                            />
                        </div>
                        <div className="w-full md:w-[48%] xl:w-1/3">
                            <Input 
                                id="g12YearOfGraduation"
                                label="Year Of Graduation" 
                                type="text" 
                                placeholder="Year Of Graduation" 
                                name="g12YearOfGraduation"
                                value={formik.values.g12YearOfGraduation}
                                onChange={formik.handleChange}
                                onBlur={() => formik.handleBlur}
                                error={formik.touched.g12YearOfGraduation && formik.errors.g12YearOfGraduation ? true : false}
                                errorMessage={formik.errors.g12YearOfGraduation}
                            />
                        </div>
                        <div className="w-full md:w-[48%] xl:w-1/3">
                            <Select 
                                className="z-99"
                                id="g12SchoolId"
                                name="g12SchoolId"
                                label="School" 
                                options={schoolData} 
                                isMultiple={false} 
                                value={schoolData.find(opt => opt.value === formik.values.g12SchoolId) || null}
                                onChange={(option) => {
                                    if (option) {
                                        formik.setFieldValue("g12SchoolId", option.value);
                                    } else {
                                        formik.setFieldValue("g12SchoolId", null);
                                    }
                                }}
                                error={formik.touched.g12SchoolId && formik.errors.g12SchoolId ? true : false}
                                errorMessage={formik.errors.g12SchoolId}
                            />
                        </div>
                    </div>
                </Collapsible>

                <Collapsible title="Academic Information (College)">
                    <div className="flex flex-col mb-4 gap-6 xl:flex-row">
                        <div className="w-full md:w-[48%] xl:w-1/3">
                            <Input 
                                id="collegeProgramName"
                                label="Program Name" 
                                type="text" 
                                placeholder="Program Name" 
                                name="collegeProgramName"
                                value={formik.values.collegeProgramName}
                                onChange={formik.handleChange}
                                onBlur={() => formik.handleBlur}
                                error={formik.touched.collegeProgramName && formik.errors.collegeProgramName ? true : false}
                                errorMessage={formik.errors.collegeProgramName}
                            />
                        </div>
                        <div className="w-full md:w-[48%] xl:w-1/3">
                            <Input 
                                id="collegeYearLevel"
                                label="Year Level" 
                                type="text" 
                                placeholder="Year Level" 
                                name="collegeYearLevel"
                                value={formik.values.collegeYearLevel}
                                onChange={formik.handleChange}
                                onBlur={() => formik.handleBlur}
                                error={formik.touched.collegeYearLevel && formik.errors.collegeYearLevel ? true : false}
                                errorMessage={formik.errors.collegeYearLevel}
                            />
                        </div>
                        <div className="w-full md:w-[48%] xl:w-1/3">
                            <Input 
                                id="collegeAwardHonor"
                                label="Award/Honor" 
                                type="text" 
                                placeholder="Award/Honor" 
                                name="collegeAwardHonor"
                                value={formik.values.collegeAwardHonor}
                                onChange={formik.handleChange}
                                onBlur={() => formik.handleBlur}
                                error={formik.touched.collegeAwardHonor && formik.errors.collegeAwardHonor ? true : false}
                                errorMessage={formik.errors.collegeAwardHonor}
                            />
                        </div>
                    </div>

                    <div className="flex flex-col mb-4 gap-6 xl:flex-row">
                        <div className="w-full md:w-[48%] xl:w-1/3">
                            <Input 
                                id="collegeOrganization"
                                label="Organization" 
                                type="text" 
                                placeholder="Organization" 
                                name="collegeOrganization"
                                value={formik.values.collegeOrganization}
                                onChange={formik.handleChange}
                                onBlur={() => formik.handleBlur}
                                error={formik.touched.collegeOrganization && formik.errors.collegeOrganization ? true : false}
                                errorMessage={formik.errors.collegeOrganization}
                            />
                        </div>
                        <div className="w-full md:w-[48%] xl:w-1/3">
                            <Select 
                                className="z-99"
                                id="collegeSchoolId"
                                name="collegeSchoolId"
                                label="School" 
                                options={schoolData} 
                                isMultiple={false} 
                                value={schoolData.find(opt => opt.value === formik.values.collegeSchoolId) || null}
                                onChange={(option) => {
                                    if (option) {
                                        formik.setFieldValue("collegeSchoolId", option.value);
                                    } else {
                                        formik.setFieldValue("collegeSchoolId", null);
                                    }
                                }}
                                error={formik.touched.collegeSchoolId && formik.errors.collegeSchoolId ? true : false}
                                errorMessage={formik.errors.collegeSchoolId}
                            />
                        </div>
                    </div>
                </Collapsible>

                <Collapsible title="Permanent Address:">
                    <div className="flex flex-col mb-4 gap-6 xl:flex-row">
                        <div className="w-full md:w-[48%] xl:w-1/3">
                            <Select 
                                className="z-99"
                                id="permanentProvinceId"
                                name="permanentProvinceId"
                                label="Permanent Province" 
                                options={provinceData} 
                                isMultiple={false} 
                                value={provinceData.find(opt => opt.value.id === formik.values.permanentProvinceId) || null}
                                onChange={(option) => {
                                    if (option) {
                                    formik.setFieldValue("permanentProvinceId", option.value.id);
                                    setPermanentCityMunOptions([]);
                                    setPermanentBrgyOptions([]);
                                    handlePermanetProvinceChange(option);
                                    } else {
                                    formik.setFieldValue("permanentProvinceId", null);
                                    }
                                }}
                                error={formik.touched.permanentProvinceId && formik.errors.permanentProvinceId ? true : false}
                                errorMessage={formik.errors.permanentProvinceId}
                                // isLoading={isLoading}
                            />
                        </div>

                         <div className="w-full md:w-[48%] xl:w-1/3">
                            <Select 
                                className="z-999"
                                id="permanentCitymunId"
                                name="permanentCitymunId"
                                label="Permanent City/Muni." 
                                options={permanentCityMunOptions} 
                                isMultiple={false} 
                                value={permanentCityMunOptions.find(opt => opt.value.id === formik.values.permanentCitymunId) || null}
                                onChange={(option) => {
                                if (option) {
                                    formik.setFieldValue("permanentCitymunId", option.value.id);
                                    setPermanentBrgyOptions([]);
                                    handlePermanentCityMunChange(option);
                                } else {
                                    formik.setFieldValue("permanentCitymunId", null);
                                }
                                }}
                                error={formik.touched.permanentCitymunId && formik.errors.permanentCitymunId ? true : false}
                                errorMessage={formik.errors.permanentCitymunId}
                            />
                        </div>
                        

                        <div className="w-full md:w-[48%] xl:w-1/3">
                            <Select 
                                id="permanentBrgId"
                                name="permanentBrgId"
                                label="Permanent Brgy." 
                                options={permanentBrgyOptions} 
                                isMultiple={false} 
                                value={permanentBrgyOptions.find(opt => opt.value.id === formik.values.permanentBrgId) || null}
                                onChange={(option) => {
                                if (option) {
                                    formik.setFieldValue("permanentBrgId", option.value.id);
                                } else {
                                    formik.setFieldValue("permanentBrgId", null);
                                }
                                }}
                                error={formik.touched.permanentBrgId && formik.errors.permanentBrgId ? true : false}
                                errorMessage={formik.errors.permanentBrgId}
                            />
                        </div>

                        <div className="w-full md:w-[48%] xl:w-1/3">
                            <Input 
                                id="permanentStreet"
                                label="Primary Street" 
                                type="text" 
                                placeholder="Primary Street" 
                                name="permanentStreet"
                                value={formik.values.permanentStreet}
                                onChange={formik.handleChange}
                                onBlur={() => formik.handleBlur}
                                error={formik.touched.permanentStreet && formik.errors.permanentStreet ? true : false}
                                errorMessage={formik.errors.permanentStreet}
                            />
                        </div>

                    </div>
                    <div className="flex flex-col mb-4 gap-6 xl:flex-row">
                        <div className="w-full md:w-[48%] xl:w-1/3">
                            <Select 
                                className="z-99"
                                id="permanentRegionId"
                                name="permanentRegionId"
                                label="Permanent Region" 
                                options={regionData} 
                                isMultiple={false} 
                                value={regionData.find(opt => opt.value.id === formik.values.permanentRegionId) || null}
                                onChange={(option) => {
                                    if (option) {
                                    formik.setFieldValue("permanentRegionId", option.value.id);
                                    setPermanentCityMunOptions([]);
                                    setPermanentBrgyOptions([]);
                                    handlePermanetProvinceChange(option);
                                    } else {
                                    formik.setFieldValue("permanentRegionId", null);
                                    }
                                }}
                                error={formik.touched.permanentRegionId && formik.errors.permanentRegionId ? true : false}
                                errorMessage={formik.errors.permanentRegionId}
                            />
                        </div>

                        <div className="w-full md:w-[48%] xl:w-1/3">
                            <Input 
                                id="permanentZipCode"
                                label="Permanent Zipcode" 
                                type="number" 
                                placeholder="Permanent Zipcode" 
                                name="permanentZipCode"
                                value={formik.values.permanentZipCode}
                                onChange={formik.handleChange}
                                onBlur={() => formik.handleBlur}
                                error={formik.touched.permanentZipCode && formik.errors.permanentZipCode ? true : false}
                                errorMessage={formik.errors.permanentZipCode}
                            />
                        </div>

                        <div className="w-full md:w-[48%] xl:w-1/3">
                            <Input 
                                id="permanentCountry"
                                label="Permanent Country" 
                                type="text" 
                                placeholder="Permanent Country" 
                                name="permanentCountry"
                                value={formik.values.permanentCountry}
                                onChange={formik.handleChange}
                                onBlur={() => formik.handleBlur}
                                error={formik.touched.permanentCountry && formik.errors.permanentCountry ? true : false}
                                errorMessage={formik.errors.permanentCountry}
                            />
                        </div>
                    </div>
                </Collapsible>

                <Collapsible title="Current Address:">
                    <div className="flex flex-col mb-4 gap-6 xl:flex-row">
                        <div className="w-full md:w-[48%] xl:w-1/3">
                            <Select 
                                className="z-99"
                                id="currentProvinceId"
                                name="currentProvinceId"
                                label="Current Province" 
                                options={provinceData} 
                                isMultiple={false} 
                                value={provinceData.find(opt => opt.value.id === formik.values.currentProvinceId) || null}
                                onChange={(option) => {
                                    if (option) {
                                    formik.setFieldValue("currentProvinceId", option.value.id);
                                    setCurrentCityMunOptions([]);
                                    setCurrentBrgyOptions([]);
                                    handleCurrentProvinceChange(option);
                                    } else {
                                    formik.setFieldValue("currentProvinceId", null);
                                    }
                                }}
                                error={formik.touched.currentProvinceId && formik.errors.currentProvinceId ? true : false}
                                errorMessage={formik.errors.currentProvinceId}
                                // isLoading={isLoading}
                            />
                        </div>
                        
                        <div className="w-full md:w-[48%] xl:w-1/3">
                            <Select 
                                className="z-999"
                                id="currentCitymunId"
                                name="currentCitymunId"
                                label="Current City/Muni." 
                                options={currentCityMunOptions} 
                                isMultiple={false} 
                                value={currentCityMunOptions.find(opt => opt.value.id === formik.values.currentCitymunId) || null}
                                onChange={(option) => {
                                if (option) {
                                    formik.setFieldValue("currentCitymunId", option.value.id);
                                    setCurrentBrgyOptions([]);
                                    handleCurrentCityMunChange(option);
                                } else {
                                    formik.setFieldValue("currentCitymunId", null);
                                }
                                }}
                                error={formik.touched.currentCitymunId && formik.errors.currentCitymunId ? true : false}
                                errorMessage={formik.errors.currentCitymunId}
                            />
                        </div>



                        <div className="w-full md:w-[48%] xl:w-1/3">
                            <Select 
                                id="currentBrgId"
                                name="currentBrgId"
                                label="Current Brgy." 
                                options={currentBrgyOptions} 
                                isMultiple={false} 
                                value={currentBrgyOptions.find(opt => opt.value.id === formik.values.currentBrgId) || null}
                                onChange={(option) => {
                                if (option) {
                                    formik.setFieldValue("currentBrgId", option.value.id);
                                } else {
                                    formik.setFieldValue("currentBrgId", null);
                                }
                                }}
                                error={formik.touched.currentBrgId && formik.errors.currentBrgId ? true : false}
                                errorMessage={formik.errors.currentBrgId}
                            />
                        </div>


                        <div className="w-full md:w-[48%] xl:w-1/3">
                            <Input 
                                id="currentStreet"
                                label="Current Street" 
                                type="text" 
                                placeholder="Current Street" 
                                name="currentStreet"
                                value={formik.values.currentStreet}
                                onChange={formik.handleChange}
                                onBlur={() => formik.handleBlur}
                                error={formik.touched.currentStreet && formik.errors.currentStreet ? true : false}
                                errorMessage={formik.errors.currentStreet}
                            />
                            
                        </div>

                    </div>

                    <div className="flex flex-col mb-4 gap-6 xl:flex-row">
                        <div className="w-full md:w-[48%] xl:w-1/3">
                            <Select 
                                className="z-99"
                                id="currentRegionId"
                                name="currentRegionId"
                                label="Current Region" 
                                options={regionData} 
                                isMultiple={false} 
                                value={regionData.find(opt => opt.value.id === formik.values.currentRegionId) || null}
                                onChange={(option) => {
                                    if (option) {
                                    formik.setFieldValue("currentRegionId", option.value.id);
                                    setPermanentCityMunOptions([]);
                                    setPermanentBrgyOptions([]);
                                    handlePermanetProvinceChange(option);
                                    } else {
                                    formik.setFieldValue("currentRegionId", null);
                                    }
                                }}
                                error={formik.touched.currentRegionId && formik.errors.currentRegionId ? true : false}
                                errorMessage={formik.errors.currentRegionId}
                            />
                        </div>

                        <div className="w-full md:w-[48%] xl:w-1/3">
                            <Input 
                                id="currentZipCode"
                                label="Current Zipcode" 
                                type="number" 
                                placeholder="Current Zipcode" 
                                name="currentZipCode"
                                value={formik.values.currentZipCode}
                                onChange={formik.handleChange}
                                onBlur={() => formik.handleBlur}
                                error={formik.touched.currentZipCode && formik.errors.currentZipCode ? true : false}
                                errorMessage={formik.errors.currentZipCode}
                            />
                        </div>

                        <div className="w-full md:w-[48%] xl:w-1/3">
                            <Input 
                                id="currentCountry"
                                label="Current Country" 
                                type="text" 
                                placeholder="Current Country" 
                                name="currentCountry"
                                value={formik.values.currentCountry}
                                onChange={formik.handleChange}
                                onBlur={() => formik.handleBlur}
                                error={formik.touched.currentCountry && formik.errors.currentCountry ? true : false}
                                errorMessage={formik.errors.currentCountry}
                            />
                        </div>
                    </div>

                    <div className="flex flex-col mb-4 gap-6 xl:flex-row">
                        <div className="w-full md:w-[48%] xl:w-1/4">
                            <CheckBox 
                                name="isSoloParent"
                                style="default"
                                checked={formik.values.isSoloParent}
                                onChange={(val) => formik.setFieldValue("isSoloParent", val)}
                                label="Is Solo Parent?"
                            />
                        </div>

                        <div className="w-full md:w-[48%] xl:w-1/4">
                            <CheckBox 
                                name="isChildOfSoloParent"
                                style="default"
                                checked={formik.values.isChildOfSoloParent}
                                onChange={(val) => formik.setFieldValue("isChildOfSoloParent", val)}
                                label="Is Child Of Solo Parent?"
                            />
                        </div>

                        <div className="w-full md:w-[48%] xl:w-1/4">
                            <CheckBox 
                                name="isIndigenousPeople"
                                style="default"
                                checked={formik.values.isIndigenousPeople}
                                onChange={(val) => formik.setFieldValue("isIndigenousPeople", val)}
                                label="Is Indigenous People?"
                            />
                        </div>
                    </div>

                    <div className="flex flex-col mb-4 gap-6 xl:flex-row">
                        <div className="w-full md:w-[48%] xl:w-1/4">
                            <CheckBox 
                                name="isSped"
                                style="default"
                                checked={formik.values.isSped}
                                onChange={(val) => formik.setFieldValue("isSped", val)}
                                label="Is Sped?"
                            />
                        </div>

                        <div className="w-full md:w-[48%] xl:w-1/4">
                            <CheckBox 
                                name="isPwd"
                                style="default"
                                checked={formik.values.isPwd === true}
                                onChange={(val) => formik.setFieldValue("isPwd", val)}
                                label="Is Pwd?"
                            />
                        </div>

                        {formik.values.isIndigenousPeople &&
                            <div className="w-full md:w-[48%] xl:w-1/3">
                                <Input 
                                    id="indigenousGroup"
                                    label="Indigenous Group" 
                                    type="text" 
                                    placeholder="Indigenous Group" 
                                    name="indigenousGroup"
                                    value={formik.values.indigenousGroup}
                                    onChange={formik.handleChange}
                                    onBlur={() => formik.handleBlur}
                                    error={formik.touched.indigenousGroup && formik.errors.indigenousGroup ? true : false}
                                    errorMessage={formik.errors.indigenousGroup}
                                />
                            </div>
                        }


                    </div>

                    <div className="flex flex-col mb-4 gap-6 xl:flex-row">
                        <div className="w-full md:w-[48%] xl:w-1/4">
                            <Input 
                                id="emergencyContactName"
                                label="Emergency Contact Name" 
                                type="text" 
                                placeholder="Emergency Contact Name" 
                                name="emergencyContactName"
                                value={formik.values.emergencyContactName}
                                onChange={formik.handleChange}
                                onBlur={() => formik.handleBlur}
                                error={formik.touched.emergencyContactName && formik.errors.emergencyContactName ? true : false}
                                errorMessage={formik.errors.emergencyContactName}
                            />
                        </div>
                        <div className="w-full md:w-[48%] xl:w-1/4">
                            <Input 
                                id="emergencyContactNumber"
                                label="Emergency Contact Number" 
                                type="text" 
                                placeholder="Emergency Contact Number" 
                                name="emergencyContactNumber"
                                value={formik.values.emergencyContactNumber}
                                onChange={formik.handleChange}
                                onBlur={() => formik.handleBlur}
                                error={formik.touched.emergencyContactNumber && formik.errors.emergencyContactNumber ? true : false}
                                errorMessage={formik.errors.emergencyContactNumber}
                            />
                        </div>
                        <div className="w-full md:w-[48%] xl:w-1/4">
                            <Input 
                                id="emergencyContactName2"
                                label="Emergency Contact Name 2" 
                                type="text" 
                                placeholder="Emergency Contact Name 2" 
                                name="emergencyContactName2"
                                value={formik.values.emergencyContactName2}
                                onChange={formik.handleChange}
                                onBlur={() => formik.handleBlur}
                                error={formik.touched.emergencyContactName2 && formik.errors.emergencyContactName2 ? true : false}
                                errorMessage={formik.errors.emergencyContactName2}
                            />
                        </div>
                        <div className="w-full md:w-[48%] xl:w-1/4">
                            <Input 
                                id="emergencyContactNumber2"
                                label="Emergency Contact Number 2" 
                                type="text" 
                                placeholder="Emergency Contact Number 2" 
                                name="emergencyContactNumber2"
                                value={formik.values.emergencyContactNumber2}
                                onChange={formik.handleChange}
                                onBlur={() => formik.handleBlur}
                                error={formik.touched.emergencyContactNumber2 && formik.errors.emergencyContactNumber2 ? true : false}
                                errorMessage={formik.errors.emergencyContactNumber2}
                            />
                        </div>
                    </div>
                </Collapsible>

                <Collapsible title="Father's Information">
                    <div className="flex flex-col mb-4 gap-6 xl:flex-row">
                        <div className="w-full md:w-[48%] xl:w-1/4">
                            <Input 
                                id="fatherFirstName"
                                label="First Name" 
                                type="text" 
                                placeholder="First Name" 
                                name="fatherFirstName"
                                value={formik.values.fatherFirstName}
                                onChange={formik.handleChange}
                                onBlur={() => formik.handleBlur}
                                error={formik.touched.fatherFirstName && formik.errors.fatherFirstName ? true : false}
                                errorMessage={formik.errors.fatherFirstName}
                            />
                        </div>
                        <div className="w-full md:w-[48%] xl:w-1/4">
                            <Input 
                                id="fatherMiddleName"
                                label="Middle Name" 
                                type="text" 
                                placeholder="Middle Name" 
                                name="fatherMiddleName"
                                value={formik.values.fatherMiddleName}
                                onChange={formik.handleChange}
                                onBlur={() => formik.handleBlur}
                                error={formik.touched.fatherMiddleName && formik.errors.fatherMiddleName ? true : false}
                                errorMessage={formik.errors.fatherMiddleName}
                            />
                        </div>
                        <div className="w-full md:w-[48%] xl:w-1/4">
                            <Input 
                                id="fatherLastName"
                                label="Last Name" 
                                type="text" 
                                placeholder="Last Name" 
                                name="fatherLastName"
                                value={formik.values.fatherLastName}
                                onChange={formik.handleChange}
                                onBlur={() => formik.handleBlur}
                                error={formik.touched.fatherLastName && formik.errors.fatherLastName ? true : false}
                                errorMessage={formik.errors.fatherLastName}
                            />
                        </div>
                        <div className="w-full md:w-[48%] xl:w-1/4">
                            <Input 
                                id="fatherExtension"
                                label="Name Extension" 
                                type="text" 
                                placeholder="Name Extension" 
                                name="fatherExtension"
                                value={formik.values.fatherExtension}
                                onChange={formik.handleChange}
                                onBlur={() => formik.handleBlur}
                                error={formik.touched.fatherExtension && formik.errors.fatherExtension ? true : false}
                                errorMessage={formik.errors.fatherExtension}
                            />
                        </div>
                    </div>

                    <div className="flex flex-col mb-4 gap-6 xl:flex-row">
                        <div className="w-full md:w-[48%] xl:w-1/3">
                            <Input 
                                id="fatherOccupation"
                                label="Occupation" 
                                type="text" 
                                placeholder="Occupation" 
                                name="fatherOccupation"
                                value={formik.values.fatherOccupation}
                                onChange={formik.handleChange}
                                onBlur={() => formik.handleBlur}
                                error={formik.touched.fatherOccupation && formik.errors.fatherOccupation ? true : false}
                                errorMessage={formik.errors.fatherOccupation}
                            />
                        </div>
                        <div className="w-full md:w-[48%] xl:w-1/3">
                            <Input 
                                id="fatherIncome"
                                label="Income" 
                                type="text" 
                                placeholder="Income" 
                                name="fatherIncome"
                                value={formik.values.fatherIncome}
                                onChange={formik.handleChange}
                                onBlur={() => formik.handleBlur}
                                error={formik.touched.fatherIncome && formik.errors.fatherIncome ? true : false}
                                errorMessage={formik.errors.fatherIncome}
                            />
                        </div>
                        <div className="w-full md:w-[48%] xl:w-1/3">
                            <Input 
                                id="fatherMobileNumber"
                                label="Mobile Number" 
                                type="text" 
                                placeholder="Mobile Number" 
                                name="fatherMobileNumber"
                                value={formik.values.fatherMobileNumber}
                                onChange={formik.handleChange}
                                onBlur={() => formik.handleBlur}
                                error={formik.touched.fatherMobileNumber && formik.errors.fatherMobileNumber ? true : false}
                                errorMessage={formik.errors.fatherMobileNumber}
                            />
                        </div>
                    </div>
                </Collapsible>

                <Collapsible title="Mother's Information">
                    <div className="flex flex-col mb-4 gap-6 xl:flex-row">
                        <div className="w-full md:w-[48%] xl:w-1/4">
                            <Input 
                                id="motherFirstName"
                                label="First Name" 
                                type="text" 
                                placeholder="First Name" 
                                name="motherFirstName"
                                value={formik.values.motherFirstName}
                                onChange={formik.handleChange}
                                onBlur={() => formik.handleBlur}
                                error={formik.touched.motherFirstName && formik.errors.motherFirstName ? true : false}
                                errorMessage={formik.errors.motherFirstName}
                            />
                        </div>
                        <div className="w-full md:w-[48%] xl:w-1/4">
                            <Input 
                                id="motherMiddleName"
                                label="Middle Name" 
                                type="text" 
                                placeholder="Middle Name" 
                                name="motherMiddleName"
                                value={formik.values.motherMiddleName}
                                onChange={formik.handleChange}
                                onBlur={() => formik.handleBlur}
                                error={formik.touched.motherMiddleName && formik.errors.motherMiddleName ? true : false}
                                errorMessage={formik.errors.motherMiddleName}
                            />
                        </div>
                        <div className="w-full md:w-[48%] xl:w-1/4">
                            <Input 
                                id="motherLastName"
                                label="Last Name" 
                                type="text" 
                                placeholder="Last Name" 
                                name="motherLastName"
                                value={formik.values.motherLastName}
                                onChange={formik.handleChange}
                                onBlur={() => formik.handleBlur}
                                error={formik.touched.motherLastName && formik.errors.motherLastName ? true : false}
                                errorMessage={formik.errors.motherLastName}
                            />
                        </div>
                        <div className="w-full md:w-[48%] xl:w-1/4">
                            <Input 
                                id="motherExtension"
                                label="Name Extension" 
                                type="text" 
                                placeholder="Name Extension" 
                                name="motherExtension"
                                value={formik.values.motherExtension}
                                onChange={formik.handleChange}
                                onBlur={() => formik.handleBlur}
                                error={formik.touched.motherExtension && formik.errors.motherExtension ? true : false}
                                errorMessage={formik.errors.motherExtension}
                            />
                        </div>
                    </div>

                    <div className="flex flex-col mb-4 gap-6 xl:flex-row">
                        <div className="w-full md:w-[48%] xl:w-1/3">
                            <Input 
                                id="motherOccupation"
                                label="Occupation" 
                                type="text" 
                                placeholder="Occupation" 
                                name="motherOccupation"
                                value={formik.values.motherOccupation}
                                onChange={formik.handleChange}
                                onBlur={() => formik.handleBlur}
                                error={formik.touched.motherOccupation && formik.errors.motherOccupation ? true : false}
                                errorMessage={formik.errors.motherOccupation}
                            />
                        </div>
                        <div className="w-full md:w-[48%] xl:w-1/3">
                            <Input 
                                id="motherIncome"
                                label="Income" 
                                type="text" 
                                placeholder="Income" 
                                name="motherIncome"
                                value={formik.values.motherIncome}
                                onChange={formik.handleChange}
                                onBlur={() => formik.handleBlur}
                                error={formik.touched.motherIncome && formik.errors.motherIncome ? true : false}
                                errorMessage={formik.errors.motherIncome}
                            />
                        </div>
                        <div className="w-full md:w-[48%] xl:w-1/3">
                            <Input 
                                id="motherMobileNumber"
                                label="Mobile Number" 
                                type="text" 
                                placeholder="Mobile Number" 
                                name="motherMobileNumber"
                                value={formik.values.motherMobileNumber}
                                onChange={formik.handleChange}
                                onBlur={() => formik.handleBlur}
                                error={formik.touched.motherMobileNumber && formik.errors.motherMobileNumber ? true : false}
                                errorMessage={formik.errors.motherMobileNumber}
                            />
                        </div>
                    </div>
                </Collapsible>

                <Collapsible title="Guardian's Information">
                    <div className="flex flex-col mb-4 gap-6 xl:flex-row">
                        <div className="w-full md:w-[48%] xl:w-1/4">
                            <Input 
                                id="guardianFirstName"
                                label="First Name" 
                                type="text" 
                                placeholder="First Name" 
                                name="guardianFirstName"
                                value={formik.values.guardianFirstName}
                                onChange={formik.handleChange}
                                onBlur={() => formik.handleBlur}
                                error={formik.touched.guardianFirstName && formik.errors.guardianFirstName ? true : false}
                                errorMessage={formik.errors.guardianFirstName}
                            />
                        </div>
                        <div className="w-full md:w-[48%] xl:w-1/4">
                            <Input 
                                id="guardianMiddleName"
                                label="Middle Name" 
                                type="text" 
                                placeholder="Middle Name" 
                                name="guardianMiddleName"
                                value={formik.values.guardianMiddleName}
                                onChange={formik.handleChange}
                                onBlur={() => formik.handleBlur}
                                error={formik.touched.guardianMiddleName && formik.errors.guardianMiddleName ? true : false}
                                errorMessage={formik.errors.guardianMiddleName}
                            />
                        </div>
                        <div className="w-full md:w-[48%] xl:w-1/4">
                            <Input 
                                id="guardianLastName"
                                label="Last Name" 
                                type="text" 
                                placeholder="Last Name" 
                                name="guardianLastName"
                                value={formik.values.guardianLastName}
                                onChange={formik.handleChange}
                                onBlur={() => formik.handleBlur}
                                error={formik.touched.guardianLastName && formik.errors.guardianLastName ? true : false}
                                errorMessage={formik.errors.guardianLastName}
                            />
                        </div>
                        <div className="w-full md:w-[48%] xl:w-1/4">
                            <Input 
                                id="guardianExtension"
                                label="Name Extension" 
                                type="text" 
                                placeholder="Name Extension" 
                                name="guardianExtension"
                                value={formik.values.guardianExtension}
                                onChange={formik.handleChange}
                                onBlur={() => formik.handleBlur}
                                error={formik.touched.guardianExtension && formik.errors.guardianExtension ? true : false}
                                errorMessage={formik.errors.guardianExtension}
                            />
                        </div>
                    </div>
                    <div className="flex flex-col mb-4 gap-6 xl:flex-row">
                        <div className="w-full md:w-[48%] xl:w-1/3">
                            <Input 
                                id="guardianOccupation"
                                label="Occupation" 
                                type="text" 
                                placeholder="Occupation" 
                                name="guardianOccupation"
                                value={formik.values.guardianOccupation}
                                onChange={formik.handleChange}
                                onBlur={() => formik.handleBlur}
                                error={formik.touched.guardianOccupation && formik.errors.guardianOccupation ? true : false}
                                errorMessage={formik.errors.guardianOccupation}
                            />
                        </div>
                        <div className="w-full md:w-[48%] xl:w-1/3">
                            <Input 
                                id="guardianIncome"
                                label="Income" 
                                type="text" 
                                placeholder="Income" 
                                name="guardianIncome"
                                value={formik.values.guardianIncome}
                                onChange={formik.handleChange}
                                onBlur={() => formik.handleBlur}
                                error={formik.touched.guardianIncome && formik.errors.guardianIncome ? true : false}
                                errorMessage={formik.errors.guardianIncome}
                            />
                        </div>
                        <div className="w-full md:w-[48%] xl:w-1/3">
                            <Input 
                                id="guardianMobileNumber"
                                label="Mobile Number" 
                                type="text" 
                                placeholder="Mobile Number" 
                                name="guardianMobileNumber"
                                value={formik.values.guardianMobileNumber}
                                onChange={formik.handleChange}
                                onBlur={() => formik.handleBlur}
                                error={formik.touched.guardianMobileNumber && formik.errors.guardianMobileNumber ? true : false}
                                errorMessage={formik.errors.guardianMobileNumber}
                            />
                        </div>
                    </div>
                </Collapsible>

                <Collapsible title="Siblings Information">
                    <div className="flex flex-col mb-4 gap-6 xl:flex-row">
                        <div className="w-full md:w-[48%] xl:w-1/3">
                            <Input 
                                id="numberOfSiblings"
                                label="Number of Siblings" 
                                type="text" 
                                placeholder="Number of Siblings" 
                                name="numberOfSiblings"
                                value={formik.values.numberOfSiblings}
                                onChange={formik.handleChange}
                                onBlur={() => formik.handleBlur}
                                error={formik.touched.numberOfSiblings && formik.errors.numberOfSiblings ? true : false}
                                errorMessage={formik.errors.numberOfSiblings}
                            />
                        </div>
                    </div>
                    <SiblingRepeater siblingsSet={formik.values.siblings} setSiblingsInit={(siblings) => formik.setFieldValue('siblings', siblings)} />
                </Collapsible>

                <Collapsible title="Others">
                    <div className="flex flex-col mb-4 gap-6 xl:flex-row">
                        <div className="w-full md:w-[48%] xl:w-1/3">
                            <Input 
                                id="gwa"
                                label="GWA" 
                                type="text" 
                                placeholder="GWA" 
                                name="gwa"
                                value={formik.values.gwa}
                                onChange={formik.handleChange}
                                onBlur={() => formik.handleBlur}
                                error={formik.touched.gwa && formik.errors.gwa ? true : false}
                                errorMessage={formik.errors.gwa}
                            />
                        </div>
                    </div>
                </Collapsible>


                <div className="flex justify-end mt-5">
                    {formik.isSubmitting ? 
                        <Throbber/>
                    :
                        <input
                            type="submit"
                            value="Save Updates"
                            className="w-50 cursor-pointer rounded-lg border border-primary bg-primary p-4 text-white transition hover:bg-opacity-90"
                        />
                    }
                </div>

                {showAlert &&
                <div className="mt-5 w-[50%]">
                    <Alert 
                    variant={isError ? 'error' : 'success'}
                    title={isError ? 'Error' : "Success!"}
                    message={isError ? errorMessage : "Profile updated successfully!"}
                    showLink={false} 
                    />
                </div>
            }
            </form>
        </>
    );
}

export default StudentProfileForm;