/** @format */

import { Form, Card } from "react-bootstrap";
import { FiChevronDown } from "react-icons/fi";

const ProjectRequirements = ({
  formData,
  handleChange,
  errors,
  levelOpen,
  setLevelOpen,
  handleLevelToggle,
  levelOptions,
  skillSuggestions,
  handleSkillClick,
  suggestionsRef,
}) => (
  <Card className="custom-card">
    <div className="card-header-custom">
      <h5 className="mb-0 text-light">Requirements</h5>
    </div>
    <Card.Body className="card-body-custom">
      {/* Skills Section */}
      <Form.Group className="mb-3 position-relative">
        <Form.Label>Skills Required</Form.Label>
        <Form.Control
          name="skills"
          value={formData.skills}
          onChange={handleChange}
          isInvalid={!!errors.skills}
          placeholder="Enter required skills (e.g., React, JavaScript)"
        />
        <Form.Control.Feedback type="invalid">
          {errors.skills}
        </Form.Control.Feedback>
        {skillSuggestions.length > 0 && (
          <div ref={suggestionsRef} className="level-options">
            {skillSuggestions.map((skill, idx) => (
              <div
                key={idx}
                className="level-option"
                onClick={() => handleSkillClick(skill)}>
                {skill}
              </div>
            ))}
          </div>
        )}
      </Form.Group>

      {/* Experience Level Section */}
      <Form.Group className="mb-3 position-relative">
        <Form.Label>Experience Level</Form.Label>
        <div
          className={`level-dropdown ${levelOpen ? "active" : ""}`}
          onClick={() => setLevelOpen(!levelOpen)}>
          <span className="selected-level">
            {formData.level[0] || "Select Level"}
          </span>
          <FiChevronDown
            className={`dropdown-icon ${levelOpen ? "open" : ""}`}
          />
        </div>
        {levelOpen && (
          <div className="level-options">
            {levelOptions.map((level, idx) => (
              <div
                key={idx}
                className={`level-option ${
                  formData.level[0] === level ? "selected" : ""
                }`}
                onClick={() => {
                  handleLevelToggle([level]);
                  setLevelOpen(false);
                }}>
                {level}
              </div>
            ))}
          </div>
        )}
        {errors.level && (
          <div className="invalid-feedback d-block">{errors.level}</div>
        )}
      </Form.Group>

      {/* Location Section */}
      <Form.Group>
        <Form.Label>Location</Form.Label>
        <Form.Control
          name="location"
          value={formData.location}
          onChange={handleChange}
          isInvalid={!!errors.location}
          placeholder="Project location (optional)"
        />
        <Form.Control.Feedback type="invalid">
          {errors.location}
        </Form.Control.Feedback>
        <Form.Text className="text-muted">
          Leave empty if location is not relevant
        </Form.Text>
      </Form.Group>
    </Card.Body>
  </Card>
);

export default ProjectRequirements;
