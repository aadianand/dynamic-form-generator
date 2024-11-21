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
  const [error, setError] = useState<string | null>(null); // Track errors

  // Update the text area if the `schema` prop changes
  useEffect(() => {
    setJsonContent(JSON.stringify(schema || {}, null, 2));
  }, [schema]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const { selectionStart, selectionEnd } = textarea;

    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault(); // Prevent default behavior for Enter and Space keys

      const beforeCursor = jsonContent.slice(0, selectionStart);
      const afterCursor = jsonContent.slice(selectionEnd);

      // Insert appropriate content based on the key pressed
      const insert = e.key === "Enter" ? "\n" : " ";
      const newContent = `${beforeCursor}${insert}${afterCursor}`;
      setJsonContent(newContent);

      // Move the cursor appropriately
      setTimeout(() => {
        textarea.setSelectionRange(selectionStart + 1, selectionStart + 1);
      }, 0);
    }
  };

  const handleJSONChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const updatedJson = e.target.value;

    // If the input is empty, clear the error and stop further processing
    if (updatedJson.trim() === "") {
      setError(null);
      setJsonContent(updatedJson);
      onSchemaChange(null); // Notify parent of an empty state
      return;
    }

    // Validate JSON structure
    try {
      const parsedSchema = JSON.parse(updatedJson);
      onSchemaChange(parsedSchema);
      setError(null); // Clear any previous error
    } catch {
      setError("Invalid JSON format."); // Show error for invalid JSON
    }

    setJsonContent(updatedJson);
  };

  return (
    <div style={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      {error && (
        <div
          style={{
            color: "red",
            fontSize: "14px",
            marginBottom: "8px",
            padding: "5px",
            borderBottom: "1px solid #ccc",
            backgroundColor: "#ffe6e6",
          }}
        >
          {error}
        </div>
      )}
      <textarea
        ref={textareaRef}
        value={jsonContent}
        onChange={handleJSONChange}
        onKeyDown={handleKeyDown} // Handle Enter and Space keys
        style={{
          width: "100%",
          height: "calc(100vh - 40px)", // Leave space for the error message
          padding: "10px",
          fontFamily: "monospace",
          fontSize: "14px",
          border: "1px solid #ccc",
          boxSizing: "border-box",
          resize: "none", // Prevent resizing of the textarea
          overflow: "auto", // Add scrolling for overflow content
        }}
      />
    </div>
  );
};

export default JSONEditor;
