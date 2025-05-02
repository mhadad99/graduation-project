/** @format */

import { useState, useEffect, useRef } from "react";
import { Container, Form, Row, Col, Alert } from "react-bootstrap";
import axios from "axios";
import "../styles/AddProject.css";
import ProjectBasicInfo from "../components/addproject/ProjectBasicInfo";
import ProjectBudget from "../components/addproject/ProjectBudget";
import ProjectSummary from "../components/addproject/ProjectSummary";
import ProjectRequirements from "../components/addproject/ProjectRequirements";

function AddProject() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    budget: "",
    type: "Fixed Price",
    deliveryTime: "",
    location: "",
    level: [],
    skills: "",
    hourlyRate: "",
    estimatedHours: "",
    status: "open",
  });

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const [levelOpen, setLevelOpen] = useState(false);
  const [skillSuggestions, setSkillSuggestions] = useState([]);
  const suggestionsRef = useRef(null);

  const typeOptions = ["Fixed Price", "Hourly", "Long Term"];
  const levelOptions = ["Entry", "Intermediate", "Expert"];
  const skillOptions = [
    "React",
    "JavaScript",
    "Node.js",
    "Python",
    "Java",
    "Angular",
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    const numericFields = [
      "budget",
      "hourlyRate",
      "estimatedHours",
      "deliveryTime",
    ];

    const finalValue = numericFields.includes(name)
      ? value === ""
        ? ""
        : Number(value)
      : value;

    setFormData((prev) => ({ ...prev, [name]: finalValue }));

    if (name === "skills") {
      const suggestions = skillOptions.filter((skill) =>
        skill.toLowerCase().startsWith(value.toLowerCase())
      );
      setSkillSuggestions(suggestions);
    }
  };

  const handleSkillClick = (skill) => {
    const skillsArray = formData.skills
      ? formData.skills.split(",").map((s) => s.trim())
      : [];

    if (!skillsArray.includes(skill)) {
      setFormData((prev) => ({
        ...prev,
        skills: [...skillsArray, skill].join(", "),
      }));
    }
    setSkillSuggestions([]);
  };

  const handleLevelToggle = (level) => {
    setFormData((prev) => ({
      ...prev,
      level: level, // Now accepts an array with a single value
    }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.title?.trim()) newErrors.title = "Title is required";
    if (!formData.description?.trim())
      newErrors.description = "Description is required";
    if (!formData.type) newErrors.type = "Project type is required";
    if (
      formData.type === "Fixed Price" &&
      (!formData.budget || formData.budget < 5)
    ) {
      newErrors.budget = "Minimum budget is $5";
    }
    if (
      formData.type === "Hourly" &&
      (!formData.hourlyRate || formData.hourlyRate < 3)
    ) {
      newErrors.hourlyRate = "Minimum hourly rate is $3";
    }
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = validate();

    if (Object.keys(formErrors).length === 0) {
      try {
        const response = await axios.post("/api/projects", {
          ...formData,
          postedDate: new Date().toISOString(),
          skills: formData.skills.split(",").map((skill) => skill.trim()),
        });
        setSuccessMessage("Project posted successfully!");
        setFormData({
          title: "",
          description: "",
          budget: "",
          type: "Fixed Price",
          deliveryTime: "",
          location: "",
          level: [],
          skills: "",
          hourlyRate: "",
          estimatedHours: "",
          status: "open",
        });
        setErrors({});
      } catch (err) {
        setSuccessMessage("Failed to post project. Please try again.");
        console.error("Error posting project:", err);
      }
    } else {
      setErrors(formErrors);
      setSuccessMessage("");
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        suggestionsRef.current &&
        !suggestionsRef.current.contains(event.target)
      ) {
        setSkillSuggestions([]);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="page-container">
      <Container>
        <div className="page-header">
          <h1 className="fw-bold">Post a New Project</h1>
          <p className="text-muted mb-0">
            Complete the form below to create a project. Be detailed to attract
            the right freelancers.
          </p>
        </div>

        {successMessage && (
          <Alert
            variant={
              successMessage.includes("successfully") ? "success" : "danger"
            }>
            {successMessage}
          </Alert>
        )}

        <Form onSubmit={handleSubmit}>
          <Row>
            <Col lg={8}>
              <ProjectBasicInfo
                formData={formData}
                handleChange={handleChange}
                errors={errors}
              />

              <ProjectBudget
                formData={formData}
                handleChange={handleChange}
                errors={errors}
                typeOptions={typeOptions}
              />

              <ProjectRequirements
                formData={formData}
                handleChange={handleChange}
                errors={errors}
                levelOpen={levelOpen}
                setLevelOpen={setLevelOpen}
                handleLevelToggle={handleLevelToggle}
                levelOptions={levelOptions}
                skillSuggestions={skillSuggestions}
                handleSkillClick={handleSkillClick}
                suggestionsRef={suggestionsRef}
              />
            </Col>

            <Col lg={4}>
              <ProjectSummary formData={formData} />
            </Col>
          </Row>
        </Form>
      </Container>
    </div>
  );
}

export default AddProject;
