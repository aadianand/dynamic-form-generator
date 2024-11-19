import React, { useRef, useState, useEffect } from "react";

interface JSONEditorProps {
  schema: any; // Current JSON schema
  onSchemaChange: (newSchema: any) => void; // Callback to notify schema changes
}

const JSONEditor: React.FC<JSONEditorProps> = ({ schema, onSchemaChange }) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [jsonContent, setJsonContent] = useState(
    JSON.stringify(schema || {}, null, 2) // Initialize with an empty object if no schema
  );

  // Update the text area if the `schema` prop changes
  useEffect(() => {
    setJsonContent(JSON.stringify(schema || {}, null, 2));
  }, [schema]);

  const handleJSONChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const updatedJson = e.target.value;
    setJsonContent(updatedJson);

    try {
      const parsedSchema = JSON.parse(updatedJson);
      onSchemaChange(parsedSchema); // Notify the parent of the valid JSON change
    } catch (error) {
      console.error("Invalid JSON"); // Handle invalid JSON gracefully
    }
  };

  return (
    <textarea
      ref={textareaRef}
      value={jsonContent}
      onChange={handleJSONChange}
      style={{
        width: "100%",
        height: "100%",
        padding: "10px",
        fontFamily: "monospace",
        fontSize: "14px",
        border: "1px solid #ccc",
        boxSizing: "border-box",
      }}
    />
  );
};

export default JSONEditor;
