import Input from "@/components/Inputs/Input";
import Select from "@/components/Inputs/Select/Select";
import { SelectOption } from "@/components/Inputs/Select/Select.types";
import { useFormik } from "formik";
import * as Yup from "yup";


const SponsorshipForm: React.FC = () => {


  const formik = useFormik({
    initialValues: { name: "", email: "" },
    validationSchema: Yup.object({
      name: Yup.string().required("Required"),
      email: Yup.string().email("Invalid email").required("Required"),
    }),
    onSubmit: (values) => console.log(values),
  });

  const options: SelectOption[] = [
    { value: "apple", label: "Apple" },
    { value: "banana", label: "Banana" },
    { value: "cherry", label: "Cherry" },
  ];


  return(
    <>
        <div className="flex flex-col mb-4">
          <Input label="Academic Year & Term" type="text" placeholder="Academic Year & Term"/>
        </div>

        <div className="flex flex-col mb-4">
          <Select label="School Term" options={options} onChange={() => {}} isMultiple={false} />
        </div>

        <div className="flex flex-col mb-4">
          <Input label="Date Covered " type="date" placeholder="Date Covered"/>
        </div>

        <div className="flex flex-col mb-4">
          <Select label="Status" options={options} onChange={() => {}} isMultiple={false} />
        </div>

        <div className="flex justify-end mt-5">
          <input
            type="submit"
            value="Submit"
            className="w-50 cursor-pointer rounded-lg border border-primary bg-primary p-4 text-white transition hover:bg-opacity-90"
          />
        </div>
    </>
  );
}

export default SponsorshipForm;