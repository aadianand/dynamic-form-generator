import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useTheme } from "../context/ThemeContext"; // Import theme context

interface FormGeneratorProps {
  schema: any;
}

const FormGenerator: React.FC<FormGeneratorProps> = ({ schema }) => {
  if (!schema) {
    const { isDarkMode } = useTheme(); // Get theme context

    // Show loading message with the appropriate background and text color
    return (
      <div
        style={{
          height: "95vh", // Full height of the viewport
          display: "flex",
          flexDirection: "column",
          backgroundColor: isDarkMode ? "#333333" : "white", // Set bg color based on darkMode
          color: isDarkMode ? "white" : "black", // Set text color based on darkMode
          transition: "background-color 0.3s, color 0.3s", // Smooth transition
          justifyContent: "center", // Center content
          alignItems: "center", // Center content horizontally
        }}
      >
        <div>Loading form...</div>
      </div>
    );
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

  const formTitle = schema.formTitle || "Untitled Form";
  const formDescription = schema.formDescription || "No description available.";

  // Use theme context to apply the current theme
  const { isDarkMode } = useTheme();

  return (
    <div
      style={{
        height: "100vh", // Full height of the viewport
        display: "flex",
        flexDirection: "column",
        backgroundColor: isDarkMode ? "#333" : "#f9f9f9", // Apply theme-based background color
        color: isDarkMode ? "white" : "black", // Apply text color based on theme
        transition: "background-color 0.3s, color 0.3s", // Smooth transition
      }}
    >
      <div
        style={{
          flexGrow: 1, // Allow this section to grow and fill remaining height
          overflow: "auto", // Only this section will scroll
          padding: "16px",
          boxSizing: "border-box",
        }}
      >
        <form
          onSubmit={handleSubmit(onSubmit)}
          style={{
            maxWidth: "600px",
            margin: "0 auto",
            backgroundColor: isDarkMode ? "#444" : "white", // Form background color based on theme
            padding: "20px",
            borderRadius: "8px",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          }}
        >
          <h1>{formTitle}</h1>
          <p>{formDescription}</p>

          {schema.fields && schema.fields.length > 0 ? (
            schema.fields.map((field: any) => (
              <div key={field.id} style={{ marginBottom: "16px" }}>
                <label>
                  {field.label}
                  {field.required && <span style={{ color: "red" }}> *</span>}
                </label>

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
                      backgroundColor: isDarkMode ? "#555" : "#fff", // Background color based on theme
                      color: isDarkMode ? "#fff" : "#000", // Text color based on theme
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
                      backgroundColor: isDarkMode ? "#555" : "#fff", // Background color based on theme
                      color: isDarkMode ? "#fff" : "#000", // Text color based on theme
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
                      backgroundColor: isDarkMode ? "#555" : "#fff", // Background color based on theme
                      color: isDarkMode ? "#fff" : "#000", // Text color based on theme
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
                        <label
                          htmlFor={`${field.id}-${option.value}`}
                          style={{ marginLeft: "8px" }}
                        >
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
                      backgroundColor: isDarkMode ? "#555" : "#fff", // Background color based on theme
                      color: isDarkMode ? "#fff" : "#000", // Text color based on theme
                    }}
                  />
                )}

                {errors[field.id] && (
                  <p style={{ color: "red", fontSize: "12px", marginTop: "4px" }}>
                    {errors[field.id].message || `${field.label} is required`}
                  </p>
                )}
              </div>
            ))
          ) : (
            <div>No fields available to render.</div>
          )}

          <button
            type="submit"
            style={{
              width: "100%",
              padding: "10px",
              // backgroundColor: "#007BFF",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              marginTop: "16px",
              backgroundColor: isDarkMode ? "#006BB3" : "#007BFF", // Button color based on theme
            }}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default FormGenerator;
