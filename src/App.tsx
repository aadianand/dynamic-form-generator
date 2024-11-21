import React, { useEffect, useState } from "react";
import JSONEditor from "./components/JSONEditor";
import FormGenerator from "./components/FormGenerator";
import NavJSON from "./components/NavJSON";
import { ThemeProvider } from "./context/ThemeContext";


const App: React.FC = () => {
  const [schema, setSchema] = useState<any>(null); // State to manage the JSON schema

  return (
    <ThemeProvider>
    <>
    <NavJSON />
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
    </>
    </ThemeProvider>
  );
};

export default App;
