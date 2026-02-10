import Input from "@/components/Inputs/Input";
import Select from "@/components/Inputs/Select/Select";
import { SelectOption } from "@/components/Inputs/Select/Select.types";
import { useFormik } from "formik";
import * as Yup from "yup";
import { StudentRequirementsProps } from "./StudentRequirements.types";
import { useDropzone } from "react-dropzone";
import { useState } from "react";
import { APIFileUploadPayload, APIFileTypesProps } from "@/types";
import { useRouter } from "next/navigation";
import { UploadAPIService } from "@/api";
import Throbber from "@/components/common/Throbber";
import Alert from "@/components/Alert";


const AcademicSetupForm: React.FC<{ requirements: APIFileTypesProps[], studentId: string}> = ({
  requirements,
  studentId
}) => {

  const uploadAPI = new UploadAPIService();
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const [isError, setError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const router = useRouter();

  const schoolTermOptions: SelectOption[] = requirements.map((item) => ({
    label: item.name,
    value: item.id,
  }));


  const formik = useFormik<StudentRequirementsProps>({
    initialValues: { 
        requirment: schoolTermOptions[0],
        file: null,
    },
    validateOnBlur: true,
    validateOnChange: true,
    validationSchema: Yup.object({
      file: Yup.mixed()
        .required("Required Field!")
        .test("fileSize", "File too large", (value) => {
            if (value) {
                return value instanceof File && value.size <= 5 * 1024 * 1024; // 5MB limit
            }
            return true;
        })
        .test("fileType", "Unsupported File Format", (value) => {
            if (value) {
                const supportedFormats = ["image/png", "image/jpeg", "application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"];
                return supportedFormats.includes((value as File).type);
            }
            return true;
        }),
      requirment: Yup.object()
          .shape({
          value: Yup.string().required(),
          label: Yup.string().required(),
          })
      .required("Required Field!"),
    }),
    onSubmit: (values, { setSubmitting, resetForm }) => {
      setShowAlert(false);
      submitHandler(values, setSubmitting, resetForm);
    }
  });

  const submitHandler = async (
    values: StudentRequirementsProps, 
    setSubmitting: (isSubmitting: boolean) => void, 
    resetForm: () => void
  ) => {
    
    const payload:APIFileUploadPayload = {
      applicationForm: values.file as File,
      fileTypeId: values.requirment?.value || '',
      studentId: studentId
    }

    try {
      const response = await uploadAPI.uploadFile(payload);
      if (response) {
        setError(false);
        setErrorMessage('');
        resetForm();
        router.refresh();
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


  const onDrop = (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];

    if (file) {
      formik.setFieldValue("file", file);

      // Generate preview for images
      if (file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setFilePreview(reader.result as string);
        };
        reader.readAsDataURL(file);
      } else {
        setFilePreview(null); // No preview for PDFs or DOCX
      }
    }
  };


  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    multiple: false,
    onDrop,
    accept: {
      "image/*": [".png", ".jpg", ".jpeg", ".gif", ".bmp", ".svg", ".webp"],
      "application/pdf": [".pdf"],
      "application/msword": [".doc"],
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [
        ".docx",
      ],
    },
  });


  return(
    <>
      <form onSubmit={formik.handleSubmit}>
        <div className="flex flex-col mb-4">
          <Select 
            id="requirment"
            name="requirment"
            label="Requirment" 
            options={schoolTermOptions} 
            isMultiple={false} 
            value={formik.values.requirment}
            onChange={(option) => formik.setFieldValue("requirment", option)}
            error={formik.touched.requirment && formik.errors.requirment ? true : false}
            errorMessage={formik.errors.requirment}
          />
        </div>

        <div className="flex flex-col mb-4">
          <div
            {...getRootProps()}
            className={`border-2 border-dashed p-6 rounded-lg cursor-pointer text-center ${
              isDragActive ? "border-blue-500" : "border-gray-300"
            }`}
            >
            <Input
              id="file-input-trigger"
              style={{ display: "none" }}
              {...getInputProps()}
              name="file"
              onChange={(e) => {
              const file = e.currentTarget.files?.[0];
              if (file) {
                formik.setFieldValue("file", file);
                setFilePreview(URL.createObjectURL(file));
              }
              }}
              onBlur={() => formik.handleBlur}
              error={formik.touched.file && formik.errors.file ? true : false}
              errorMessage={formik.errors.file}
            />
            {isDragActive ? (
              <p className="text-blue-500">Drop the file here...</p>
            ) : (
              <p>Drag & drop a file here, or click to select one</p>
            )}
          </div>

          {filePreview ? (
            <div className="mt-2">
              <p className="text-sm text-gray-500">File preview:</p>
              <img src={filePreview} alt="Preview" className="mt-2 w-full h-auto rounded-lg shadow-lg" />
            </div>
          ) : formik.values.file ? (
            <p className="text-sm text-gray-500 mt-2">
              {formik.values.file.name} ({(formik.values.file.size / 1024).toFixed(2)} KB)
            </p>
          ) : null}
        </div>

        <div className="flex justify-end mt-5">
          {formik.isSubmitting ? 
              <Throbber/>
            :
              <input
                type="submit"
                value="Upload"
                className="w-50 cursor-pointer rounded-lg border border-primary bg-primary p-4 text-white transition hover:bg-opacity-90"
              />
          } 
        </div>

        {showAlert &&
          <div className="mt-5">
            <Alert 
              variant={isError ? 'error' : 'success'}
              title={isError ? 'Error' : "Success!"}
              message={isError ? errorMessage : "File Uploaded Successfully!"}
              showLink={false} 
            />
          </div>
        }

      </form>
    </>
  );
}

export default AcademicSetupForm;