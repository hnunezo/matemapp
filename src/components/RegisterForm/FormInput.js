import { useField } from "formik";

const FormInput = ({ placeholder, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <div
      className="d-flex flex-column"
      style={{ width: "20rem", height: "5rem" }}
    >
      <label>{placeholder}</label>
      <input
        {...field}
        {...props}
        placeholder={`Enter the ${placeholder}...`}
      />
      {meta.touched && meta.error ? (
        <span className="text-danger">{meta.error}</span>
      ) : null}
    </div>
  );
};

export default FormInput;
