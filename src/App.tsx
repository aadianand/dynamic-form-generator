import React, { useState } from "react";
import JSONEditor from "./components/JSONEditor";
import FormGenerator from "./components/FormGenerator";

const App: React.FC = () => {
  const [schema, setSchema] = useState<any>(null); // State to manage the JSON schema

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      {/* JSON Editor Section */}
      <div style={{ width: "50%", borderRight: "1px solid #ccc" }}>
        <JSONEditor schema={schema} onSchemaChange={setSchema} />
      </div>

      {/* Form Generator Section */}
      <div style={{ width: "50%" }}>
        <FormGenerator schema={schema} />
      </div>
    </div>
  );
};

export default App;
