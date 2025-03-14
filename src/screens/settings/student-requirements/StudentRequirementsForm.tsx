import Input from "@/components/Inputs/Input";
import Select from "@/components/Inputs/Select/Select";
import { SelectOption } from "@/components/Inputs/Select/Select.types";
import { useFormik } from "formik";
import * as Yup from "yup";
import { StudentRequirementsProps } from "./StudentRequirements.types";
import { useDropzone } from "react-dropzone";
import { useState } from "react";


const AcademicSetupForm: React.FC = () => {

  const [filePreview, setFilePreview] = useState<string | null>(null);

  const schoolTermOptions: SelectOption[] = [
    { value: "1", label: "Requirement 1" },
    { value: "2", label: "Requirement 2" },
    { value: "3", label: "Requirement 3" },
    { value: "4", label: "Requirement 4" }
  ];

  const statusOptions: SelectOption[] = [
    { value: "1", label: "Active" },
    { value: "0", label: "Lock" }
  ];

  const formik = useFormik<StudentRequirementsProps>({
    initialValues: { 
        requirment: schoolTermOptions[0],
        filename: "",
        file: null
    },
    validateOnBlur: true,
    validateOnChange: true,
    validationSchema: Yup.object({
        requirment: Yup.object()
            .shape({
            value: Yup.string().required(),
            label: Yup.string().required(),
            })
        .required("Required Field!"),
        filename: Yup.string().required("Required Field!"),

    }),
    onSubmit: (values) => console.log(values),
  });


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
        <div className="flex flex-col mb-4 gap-6 xl:flex-row">
          <div className="w-full xl:w-1/2">
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
          <div className="w-full xl:w-1/2">
            <Input  
              id="filename"
              label="Filename" 
              type="text" 
              placeholder="Filename" 
              name="filename"
              value={formik.values.filename}
              onChange={formik.handleChange}
              onBlur={() => formik.handleBlur}
              error={formik.touched.filename && formik.errors.filename ? true : false}
              errorMessage={formik.errors.filename}
            />
          </div>
        </div>

        <div className="flex flex-col mb-4">
          <div
            {...getRootProps()}
            className={`border-2 border-dashed p-6 rounded-lg cursor-pointer text-center ${
              isDragActive ? "border-blue-500" : "border-gray-300"
            }`}
          >
            <input {...getInputProps()} />
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
          <input
            type="submit"
            value="Submit"
            className="w-50 cursor-pointer rounded-lg border border-primary bg-primary p-4 text-white transition hover:bg-opacity-90"
          />
        </div>
      </form>
    </>
  );
}

export default AcademicSetupForm;