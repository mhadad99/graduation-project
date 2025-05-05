/** @format */

import { useState, useEffect, useRef } from "react";
import { Container, Form, Row, Col, Alert } from "react-bootstrap";
import ProjectBasicInfo from "../components/addproject/ProjectBasicInfo";
import ProjectBudget from "../components/addproject/ProjectBudget";
import ProjectSummary from "../components/addproject/ProjectSummary";
import ProjectRequirements from "../components/addproject/ProjectRequirements";
import { useDispatch, useSelector } from "react-redux";
import { createProjectAction } from "../store/slices/projectSlice";

function AddProject() {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    budget: "",
    type: "Fixed Price",
    duration: "",
    // location: "",
    experience_level: "",
    hourlyRate: "",
    // estimatedHours: "",
    // status: "open",
    start_date: "",
    end_date: "",
    progress: "not_started",
  });

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const [levelOpen, setLevelOpen] = useState(false);
  // const [skillSuggestions, setSkillSuggestions] = useState([]);
  const suggestionsRef = useRef(null);

  const typeOptions = ["Fixed Price", "Hourly"];
  const levelOptions = ["Entry", "Intermediate", "Expert"];
  // const skillOptions = [
  //   "React",
  //   "JavaScript",
  //   "Node.js",
  //   "Python",
  //   "Java",
  //   "Angular",
  // ];

  const dispatch = useDispatch();
  const { isLoading, error, createdProject } = useSelector(
    (state) => state.projectSlice
  );
  const handleChange = (e) => {
    const { name, value } = e.target;
    const numericFields = [
      "budget",
      "hourlyRate",
      "estimatedHours",
      "duration",
    ];

    const finalValue = numericFields.includes(name)
      ? value === ""
        ? ""
        : Number(value)
      : value;

    setFormData((prev) => ({ ...prev, [name]: finalValue }));

    // if (name === "skills") {
    //   const suggestions = skillOptions.filter((skill) =>
    //     skill.toLowerCase().startsWith(value.toLowerCase())
    //   );
    //   setSkillSuggestions(suggestions);
    // }
  };

  // const handleSkillClick = (skill) => {
  //   const skillsArray = formData.skills
  //     ? formData.skills.split(",").map((s) => s.trim())
  //     : [];

  //   if (!skillsArray.includes(skill)) {
  //     setFormData((prev) => ({
  //       ...prev,
  //       skills: [...skillsArray, skill].join(", "),
  //     }));
  //   }
  //   setSkillSuggestions([]);
  // };

  const handleLevelToggle = (experience_level) => {
    setFormData((prev) => ({
      ...prev,
      experience_level: experience_level,
    }));
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.name?.trim()) newErrors.name = "Title is required";
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
    if (!formData.start_date) newErrors.start_date = "Start date is required";
    if (!formData.end_date) newErrors.end_date = "End date is required";
    if (!formData.duration || formData.duration < 1)
      newErrors.duration = "Duration must be at least 1 day";
    if (!formData.experience_level)
      newErrors.experience_level = "Experience level is required";
    return newErrors;
  };

  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    const formErrors = validate();

    if (Object.keys(formErrors).length === 0) {
      // Map UI values to backend values
      const typeMap = {
        "Fixed Price": "fixed",
        Hourly: "hourly",
      };
      const levelMap = {
        Entry: "junior",
        Intermediate: "mid",
        Expert: "senior",
      };

      const projectData = {
        name: formData.name,
        description: formData.description,
        start_date: formData.start_date,
        end_date: formData.end_date,
        duration: Number(formData.duration),
        progress: formData.progress || "not_started",
        experience_level:
          levelMap[formData.experience_level] || formData.experience_level,
        type: typeMap[formData.type] || formData.type,
        budget:
          formData.type === "Hourly"
            ? String(formData.hourlyRate)
            : String(formData.budget),
      };
      console.log("Submitting projectData:", projectData);

      dispatch(createProjectAction(projectData));
      setErrors({});
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

  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => setSuccessMessage(""), 3000);
      return () => clearTimeout(timer);
    }
  }, [successMessage]);

  useEffect(() => {
    if (!isLoading && !error && createdProject) {
      setSuccessMessage("Project posted successfully!");
      setFormData({
        name: "",
        description: "",
        start_date: "",
        end_date: "",
        duration: "",
        progress: "not_started",
        experience_level: "",
        type: "Fixed Price",
        budget: "",
        hourlyRate: "",
        estimatedHours: "",
        location: "",
        status: "open",
      }); // reset form
      setErrors({});
    }
  }, [isLoading, error, createdProject]);

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

        {error && (
          <Alert variant="danger">
            {typeof error === "string" ? error : "Failed to post project."}
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
                // skillSuggestions={skillSuggestions}
                // handleSkillClick={handleSkillClick}
                // suggestionsRef={suggestionsRef}
              />
            </Col>

            <Col lg={4}>
              <ProjectSummary
                formData={formData}
                handleSubmit={handleSubmit}
                isLoading={isLoading}
              />
            </Col>
          </Row>
        </Form>
      </Container>
    </div>
  );
}

export default AddProject;
