import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";

interface FormGeneratorProps {
  schema: any;
}

const FormGenerator: React.FC<FormGeneratorProps> = ({ schema }) => {
  // Safeguard for when schema is null or undefined
  if (!schema) {
    return <div>Loading form...</div>; // Show loading message if schema is not passed
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit: SubmitHandler<any> = (data) => {
    console.log("Form Submitted:", data);
    alert("Form submitted successfully!");
  };

  // Fallback title and description in case formTitle or formDescription are not provided
  const formTitle = schema.formTitle || "Untitled Form";
  const formDescription = schema.formDescription || "No description available.";

  return (
    <div
      style={{
        height: "100vh",
        overflowY: "auto",
        padding: "16px",
        boxSizing: "border-box",
        backgroundColor: "#f9f9f9",
      }}
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{
          maxWidth: "600px",
          margin: "0 auto",
          backgroundColor: "white",
          padding: "20px",
          borderRadius: "8px",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        }}
      >
        {/* Render form title and description with fallback values */}
        <h1>{formTitle}</h1>
        <p>{formDescription}</p>

        {schema.fields && schema.fields.length > 0 ? (
          schema.fields.map((field: any) => (
            <div key={field.id} style={{ marginBottom: "16px" }}>
              <label>
                {field.label}
                {field.required && <span style={{ color: "red" }}> *</span>}
              </label>

              {/* Render field based on type */}
              {field.type === "text" && (
                <input
                  type="text"
                  placeholder={field.placeholder}
                  {...register(field.id, { required: field.required })}
                  style={{
                    width: "100%",
                    padding: "8px",
                    marginTop: "4px",
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                  }}
                />
              )}

              {field.type === "email" && (
                <input
                  type="email"
                  placeholder={field.placeholder}
                  {...register(field.id, {
                    required: field.required,
                    pattern: field.validation?.pattern
                      ? new RegExp(field.validation.pattern)
                      : undefined,
                  })}
                  style={{
                    width: "100%",
                    padding: "8px",
                    marginTop: "4px",
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                  }}
                />
              )}

              {field.type === "select" && (
                <select
                  {...register(field.id, { required: field.required })}
                  style={{
                    width: "100%",
                    padding: "8px",
                    marginTop: "4px",
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                  }}
                >
                  <option value="">Select an option</option>
                  {field.options?.map((option: any) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              )}

              {field.type === "radio" && (
                <div style={{ marginTop: "4px" }}>
                  {field.options?.map((option: any) => (
                    <div key={option.value} style={{ marginBottom: "4px" }}>
                      <input
                        type="radio"
                        value={option.value}
                        {...register(field.id, { required: field.required })}
                        id={`${field.id}-${option.value}`}
                      />
                      <label htmlFor={`${field.id}-${option.value}`} style={{ marginLeft: "8px" }}>
                        {option.label}
                      </label>
                    </div>
                  ))}
                </div>
              )}

              {field.type === "textarea" && (
                <textarea
                  placeholder={field.placeholder}
                  {...register(field.id, { required: field.required })}
                  style={{
                    width: "100%",
                    padding: "8px",
                    marginTop: "4px",
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                    resize: "vertical",
                  }}
                />
              )}

              {/* Display error message if validation fails */}
              {errors[field.id] && (
                <p style={{ color: "red", fontSize: "12px", marginTop: "4px" }}>
                  {errors[field.id].message || `${field.label} is required`}
                </p>
              )}
            </div>
          ))
        ) : (
          <div>No fields available to render.</div> // Show message if there are no fields
        )}

        {/* Submit button */}
        <button
          type="submit"
          style={{
            width: "100%",
            padding: "10px",
            backgroundColor: "#007BFF",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default FormGenerator;
