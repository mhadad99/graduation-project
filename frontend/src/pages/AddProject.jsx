import { useState, useEffect, useRef } from 'react';
import { Container, Form, Button, ListGroup } from 'react-bootstrap';
import axios from 'axios';
import '../styles/AddProject.css';

function AddProject() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    skills: '',
    timeline: '',
    postedTime: '',
    location: '',
    level: [],
    type: '',
  });

  const [errors, setErrors] = useState({});
  const [skillSuggestions, setSkillSuggestions] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');
  const skillOptions = ['React', 'JavaScript', 'CSS', 'Bootstrap', 'Node.js', 'Express', 'MongoDB', 'Python'];

  const suggestionsRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === 'skills') {
      const filtered = skillOptions.filter((skill) =>
        skill.toLowerCase().startsWith(value.toLowerCase())
      );
      setSkillSuggestions(filtered);
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.title.trim() || formData.title.length < 20)
      newErrors.title = 'Title must be at least 20 characters.';
    if (!formData.description.trim() || formData.description.length < 130)
      newErrors.description = 'Description must be at least 130 characters.';
    if (!formData.price || isNaN(formData.price) || formData.price < 5)
      newErrors.price = 'Price must be at least $5.';
    if (!formData.skills.trim()) newErrors.skills = 'Please enter at least one skill.';
    if (!formData.timeline || formData.timeline <= 0 || formData.timeline > 365)
      newErrors.timeline = 'Timeline must be between 1 and 365 days.';
    if (!formData.location) newErrors.location = 'Location is required.';
    if (!formData.level.length) newErrors.level = 'Level is required.';
    if (!formData.type) newErrors.type = 'Type is required.';
    return newErrors;
  };

  const handleSkillClick = (skill) => {
    const skillsArray = formData.skills ? formData.skills.split(',').map(s => s.trim()) : [];
    if (!skillsArray.includes(skill)) {
      skillsArray.push(skill);
    }
    setFormData((prev) => ({ ...prev, skills: skillsArray.join(', ') }));
    setSkillSuggestions([]);
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = validate();

    if (Object.keys(formErrors).length === 0) {
      const dataToSend = {
        title: formData.title,
        description: formData.description,
        price: Number(formData.price),
        skills: formData.skills.split(',').map(skill => skill.trim()),
        timeline: formData.timeline,
        postedTime: formData.postedTime || new Date().toLocaleDateString(),
        location: formData.location,
        level: formData.level,
        type: formData.type,
      };

      try {
        const response = await axios.post('http://localhost:5000/projects', dataToSend);
        console.log('Project added:', response.data);
        setSuccessMessage('Project added successfully!');
        setFormData({
          title: '',
          description: '',
          price: '',
          skills: '',
          timeline: '',
          postedTime: '',
          location: '',
          level: [],
          type: '',
        });
        setErrors({});
        setSkillSuggestions([]);
      } catch (err) {
        console.error('Error adding project:', err);
        setSuccessMessage('Failed to add project. Please try again.');
      }
    } else {
      setErrors(formErrors);
      setSuccessMessage('');
    }
  };
  const [levelOpen, setLevelOpen] = useState(false);

const handleLevelToggle = (level) => {
  const newLevels = [...formData.level];
  const index = newLevels.indexOf(level);

  if (index === -1) {
    newLevels.push(level);
  } else {
    newLevels.splice(index, 1);
  }

  setFormData((prev) => ({
    ...prev,
    level: newLevels,
  }));
};


  useEffect(() => {
    const handleClickOutside = (event) => {
      if (suggestionsRef.current && !suggestionsRef.current.contains(event.target)) {
        setSkillSuggestions([]);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  return (
    <Container className="add-project-container mt-5">
      <h3 className="add-project-title">Add New Project</h3>
  
      {successMessage && (
        <div className={`alert ${successMessage.includes('successfully') ? 'alert-success' : 'alert-danger'}`}>
          {successMessage}
        </div>
      )}
  
      <Form onSubmit={handleSubmit}>
        {/* Title */}
        <Form.Group className="mt-2">
          <Form.Label className="add-project-label">Title</Form.Label>
          <div className="form-text text-muted mb-1">
            Short and clear project name (e.g., Website Redesign)
          </div>
          <Form.Control
            name="title"
            value={formData.title}
            onChange={handleChange}
            isInvalid={!!errors.title}
          />
          <Form.Control.Feedback type="invalid">{errors.title}</Form.Control.Feedback>
        </Form.Group>
  
        {/* Description */}
        <Form.Group className="mt-3">
          <Form.Label className="add-project-label">Description</Form.Label>
          <div className="form-text text-muted mb-1">
            Brief project overview (minimum 130 characters)
          </div>
          <Form.Control
            as="textarea"
            rows={4}
            name="description"
            value={formData.description}
            onChange={handleChange}
            isInvalid={!!errors.description}
          />
          <Form.Control.Feedback type="invalid">{errors.description}</Form.Control.Feedback>
        </Form.Group>
  
        {/* Price */}
        <Form.Group className="mt-3">
          <Form.Label className="add-project-label">Price ($)</Form.Label>
          <div className="form-text text-muted mb-1">
            Budget you're offering for this project
          </div>
          <Form.Control
            name="price"
            type="number"
            value={formData.price}
            onChange={handleChange}
            isInvalid={!!errors.price}
          />
          <Form.Control.Feedback type="invalid">{errors.price}</Form.Control.Feedback>
        </Form.Group>
  
        {/* Posted Time */}
        <Form.Group className="mt-3">
          <Form.Label className="add-project-label">Posted Time</Form.Label>
          <div className="form-text text-muted mb-1">
            Date when this project is posted (optional)
          </div>
          <Form.Control
            name="postedTime"
            value={formData.postedTime}
            onChange={handleChange}
          />
        </Form.Group>
  
        {/* Location */}
        <Form.Group className="mt-3">
          <Form.Label className="add-project-label">Location</Form.Label>
          <div className="form-text text-muted mb-1">
            Location where the work will be based (or Remote)
          </div>
          <Form.Control
            name="location"
            value={formData.location}
            onChange={handleChange}
            isInvalid={!!errors.location}
          />
          <Form.Control.Feedback type="invalid">{errors.location}</Form.Control.Feedback>
        </Form.Group>
  
        {/* Level */}
        <Form.Group className="mt-3">
          <Form.Label className="add-project-label">Level</Form.Label>
          <div className="form-text text-muted mb-1">
            Level of freelancer you want (entry, intermediate, expert). You can choose more than one.
          </div>
  
          <div
            className="level-dropdown"
            onClick={() => setLevelOpen((prev) => !prev)}
          >
            {formData.level.length === 0 ? "Select Levels" : formData.level.join(", ")}
          </div>
  
          {levelOpen && (
            <div className="level-options">
              {['entry', 'intermediate', 'expert'].map((level, idx) => (
                <div
                  key={idx}
                  className={`level-option ${formData.level.includes(level) ? 'selected' : ''}`}
                  onClick={() => handleLevelToggle(level)}
                >
                  {level.charAt(0).toUpperCase() + level.slice(1)}
                </div>
              ))}
            </div>
          )}
        </Form.Group>
  
        {/* Type */}
        <Form.Group className="mt-3">
          <Form.Label className="add-project-label">Type</Form.Label>
          <div className="form-text text-muted mb-1">
            Project type (e.g., Fixed Price or Hourly)
          </div>
          <Form.Control
            name="type"
            value={formData.type}
            onChange={handleChange}
            isInvalid={!!errors.type}
          />
          <Form.Control.Feedback type="invalid">{errors.type}</Form.Control.Feedback>
        </Form.Group>
  
        {/* Skills */}
        <Form.Group className="mt-3 position-relative" ref={suggestionsRef}>
          <Form.Label className="add-project-label">Skills</Form.Label>
          <div className="form-text text-muted mb-1">
            Start typing and select multiple relevant skills (e.g., React, Node.js)
          </div>
          <Form.Control
            name="skills"
            value={formData.skills}
            onChange={handleChange}
            isInvalid={!!errors.skills}
            autoComplete="off"
          />
          <Form.Control.Feedback type="invalid">{errors.skills}</Form.Control.Feedback>
  
          {skillSuggestions.length > 0 && (
            <ListGroup className="position-absolute w-100 z-1">
              {skillSuggestions.map((skill, idx) => (
                <ListGroup.Item
                  action
                  key={idx}
                  onClick={() => handleSkillClick(skill)}
                >
                  {skill}
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Form.Group>
  
        {/* Timeline */}
        <Form.Group className="mt-3">
          <Form.Label className="add-project-label">Timeline (days)</Form.Label>
          <div className="form-text text-muted mb-1">
            Estimated number of days needed to complete the project
          </div>
          <Form.Control
            name="timeline"
            type="number"
            value={formData.timeline}
            onChange={handleChange}
            isInvalid={!!errors.timeline}
          />
          <Form.Control.Feedback type="invalid">{errors.timeline}</Form.Control.Feedback>
        </Form.Group>
  
        <div className="d-flex justify-content-center m-4">
          <Button type="submit" className="add-project-submit-btn">
            + Add
          </Button>
        </div>
      </Form>
    </Container>
  );
  
}

export default AddProject;
