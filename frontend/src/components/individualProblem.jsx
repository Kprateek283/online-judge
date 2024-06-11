import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, Link, useNavigate } from "react-router-dom";

const getDefaultBoilerplate = (language) => {
  switch (language) {
    case "C":
      return '#include <stdio.h>\nint main() {\n    printf("Hello, World!");\n    return 0;\n}';
    case "C++":
      return '#include <iostream>\nint main() {\n    std::cout << "Hello, World!";\n    return 0;\n}';
    case "Java":
      return 'public class Main {\n    public static void main(String[] args) {\n        System.out.println("Hello, World!");\n    }\n}';
    case "Python":
    default:
      return 'print("Hello, World!")';
  }
};

const IndividualProblem = () => {
  const [problemData, setProblemData] = useState(null);
  const [selectedLanguage, setSelectedLanguage] = useState("Python");
  const { id } = useParams();
  const navigate = useNavigate();
  const [code, setCode] = useState(getDefaultBoilerplate(selectedLanguage));
  const [output, setOutput] = useState("");
  const [verdict, setVerdict] = useState("Not Applicable");
  const [input, setInput] = useState("");

  useEffect(() => {
    const fetchProblemData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/getIndividualProblem/${id}`
        );
        setProblemData(response.data);
      } catch (error) {
        console.error("Error fetching problem data:", error);
      }
    };

    fetchProblemData();
  }, [id]);

  const handleLanguageChange = (event) => {
    const newLanguage = event.target.value;
    setSelectedLanguage(newLanguage);
    setCode(getDefaultBoilerplate(newLanguage));
  };

  const executeCode = async () => {
    const payload = {
      language: selectedLanguage.toLowerCase(),
      code,
      input,
    };

    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_COMPILER_URL}/compiler`,
        payload,
        {
          withCredentials: true,
        }
      );
      setOutput(data.output);
      setVerdict(data.verdict || "Code executed successfully");
    } catch (error) {
      console.error("Error in executeCode:", error);
      setOutput("");
      setVerdict("Error executing code");
    }
  };

  const handleSubmitClick = async () => {
    try {
      console.log(problemData);

      const payload = {
        language: selectedLanguage.toLowerCase(),
        code,

      };

      // Log the payload to ensure it's being created correctly
      console.log("Payload:", payload);

      const { data } = await axios.post(
        `${import.meta.env.VITE_COMPILER_URL}/submit/${id}`,
        payload,
        {
          withCredentials: true,
        }
      );
      console.log(data);
      if (data.correct === 1) {
        setVerdict("Code accepted");
      } else {
        setVerdict(`Code not accepted, error on test case ${data.failedTestCase}`);
      }
    } catch (error) {
      console.error("Error in submitCode:", error);
      setVerdict("Error submitting code");
    }
  };

  const handleRunClick = async () => {
    await executeCode();
  };

  return (
    <div
      style={{
        backgroundImage: "linear-gradient(#00d5ff,#0095ff,rgba(93,0,255,.555))",
      }}
      className="vh-100"
    >
      <br></br>
      <br></br>
      <br></br>
      <div className="d-flex justify-content-around p-5 bg-dark w-100">
        <Link className="btn btn-primary" to="/Profile">
          Profile
        </Link>
        <Link className="btn btn-primary" to="/Home">
          Home
        </Link>
        <Link className="btn btn-primary" to="/Login">
          Logout
        </Link>
        <Link className="btn btn-primary" to="/AddProblem">
          Add Problem
        </Link>
      </div>
      <div className="d-flex h-100">
        {/* Left Side */}
        <div className="w-50 p-4">
          <button
            className="btn btn-secondary mb-4"
            onClick={() => navigate(-1)}
          >
            Back
          </button>
          {problemData ? (
            <div className="card p-4">
              <h2 className="mb-4">{problemData.title || "Problem Title"}</h2>
              <h3>Problem Statement:</h3>
              <p>{problemData.description.statement}</p>
              <h3>Difficulty:</h3>
              <p>{problemData.difficulty}</p>
              <h3>Example:</h3>
              <div className="example-box mb-3">
                <h4>Input</h4>
                <div className="input-box p-3 mb-3 bg-light border rounded">
                  {problemData.testCases[0].input}
                </div>
                <h4>Output</h4>
                <div className="output-box p-3 mb-3 bg-light border rounded">
                  {problemData.testCases[0].expectedOutput}
                </div>
              </div>

                <>
                  <h3>Input Description:</h3>
                  <p>{problemData.description.inputFormat}</p>
                </>
    
                <>
                  <h3>Output Description:</h3>
                  <p>{problemData.description.outputFormat}</p>
                </>
            </div>
          ) : (
            <p>Loading problem data...</p>
          )}
        </div>
        {/* Right Side */}
        <div className="w-50 p-4 d-flex flex-column">
          <div className="d-flex mb-3">
            <select
              className="form-select me-2"
              value={selectedLanguage}
              onChange={handleLanguageChange}
            >
              <option value="C">C</option>
              <option value="C++">C++</option>
              <option value="Java">Java</option>
              <option value="Python">Python</option>
            </select>
            <button className="btn btn-primary me-2" onClick={handleRunClick}>
              Run
            </button>
            <button className="btn btn-primary" onClick={handleSubmitClick}>
              Submit
            </button>
          </div>
          <textarea
            className="form-control mb-3"
            style={{ backgroundColor: "#000", color: "#fff", height: "50vh" }}
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
          <div className="flex-grow-1">
            <div className="d-flex flex-column h-100">
              <textarea
                className="form-control mb-2"
                style={{ flex: 1, backgroundColor: "#fff", color: "#000" }}
                placeholder="Input"
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
              <textarea
                className="form-control mb-2"
                style={{ flex: 1, backgroundColor: "#fff", color: "#000" }}
                placeholder="Output"
                value={output}
                readOnly
              />
              <textarea
                className="form-control"
                style={{ flex: 1, backgroundColor: "#fff", color: "#000" }}
                placeholder="Verdict"
                value={verdict}
                readOnly
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IndividualProblem;
