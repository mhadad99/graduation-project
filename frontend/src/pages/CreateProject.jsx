import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Card, Alert, Badge } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { createService } from '../redux/slices/serviceSlice';
import CreatableSelect from 'react-select/creatable';
import { FiX } from 'react-icons/fi';

const CreateProject = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser, isAuthenticated } = useSelector(state => state.user);
  const { services, loading, error } = useSelector(state => state.service);

  // Form state
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [budget, setBudget] = useState('');
  const [projectTypes, setProjectTypes] = useState([]);
  const [projectType, setProjectType] = useState('');
  const [durations, setDurations] = useState([]);
  const [duration, setDuration] = useState('');
  const [experienceLevels, setExperienceLevels] = useState([]);
  const [experienceLevel, setExperienceLevel] = useState('');
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [skillOptions, setSkillOptions] = useState([]);
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [customSkill, setCustomSkill] = useState('');
  const [validationErrors, setValidationErrors] = useState({});
  const [formSubmitted, setFormSubmitted] = useState(false);

  useEffect(() => {
    // Derive unique categories from loaded services
    if (services && services.length > 0) {
      const uniqueCategories = [...new Set(services.map(s => s.category).filter(Boolean))];
      setCategories(uniqueCategories.map(cat => ({ name: cat, value: cat, id: cat })));
    } else {
      dispatch({ type: 'service/fetchAll' }); // or dispatch(fetchServices()) if imported
      setCategories([]);
    }
  }, [services, dispatch]);

  // Fetch all necessary data on component mount
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        // Fetch project types
        const typesResponse = await dispatch({ type: 'FETCH_PROJECT_TYPES' }).unwrap();
        setProjectTypes(typesResponse.data);
        setProjectType(typesResponse.data[0]?.value || '');
        
        // Fetch durations
        const durationsResponse = await dispatch({ type: 'FETCH_PROJECT_DURATIONS' }).unwrap();
        setDurations(durationsResponse.data);
        setDuration(durationsResponse.data[0]?.value || '');
        
        // Fetch experience levels
        const levelsResponse = await dispatch({ type: 'FETCH_EXPERIENCE_LEVELS' }).unwrap();
        setExperienceLevels(levelsResponse.data);
        setExperienceLevel(levelsResponse.data[0]?.value || '');
      } catch (error) {
        console.error('Error fetching initial data:', error);
      }
    };

    fetchInitialData();
  }, []);

  // Fetch relevant skills when category is selected
  useEffect(() => {
    const fetchSkills = async () => {
      if (!selectedCategory) return;
      
      try {
        // Fetch skills related to the selected category from the server
        const response = await dispatch({ type: 'FETCH_SKILLS', payload: selectedCategory.id }).unwrap();
        const allSkills = response.data;
        
        // Filter skills by the selected category ID
        const filteredSkills = allSkills.filter(skill => skill.categoryId === selectedCategory.id);
        
        // Format skills for react-select
        const skillOpts = filteredSkills.map(skill => ({ 
          label: skill.label, 
          value: skill.value,
          id: skill.id 
        }));
        
        setSkillOptions(skillOpts);
      } catch (error) {
        console.error('Error fetching skills:', error);
      }
    };

    fetchSkills();
  }, [selectedCategory]);

  // Validate form inputs
  const validateForm = () => {
    const errors = {};

    if (!title.trim()) errors.title = 'Project title is required';
    if (!description.trim()) errors.description = 'Project description is required';
    if (!budget.trim()) errors.budget = 'Budget is required';
    if (!selectedCategory) errors.category = 'Category is required';
    if (selectedSkills.length === 0) errors.skills = 'At least one skill is required';

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormSubmitted(true);
    
    if (!validateForm()) return;
    
    // Format project data
    const projectData = {
      title,
      description,
      price: parseFloat(budget),
      tags: [selectedCategory.name, ...selectedSkills.map(skill => skill.label)],
      category: selectedCategory.name,
      projectType,
      duration,
      experienceLevel,
      skills: selectedSkills.map(skill => skill.label),
      userId: currentUser.id,
      freelancerId: null, // This will be filled when a freelancer is assigned
      status: 'active',
      createdAt: new Date().toISOString(),
      // Store as service in backend for now, but display as project in UI
      type: 'project'
    };
    
    try {
      // In this example we're using the same service schema but marking it as a project
      await dispatch(createService(projectData)).unwrap();
      navigate(`/profile/${currentUser.id}`);
    } catch (err) {
      console.error('Error creating project:', err);
    }
  };

  if (!isAuthenticated || (currentUser && currentUser.role !== 'client')) {
    return (
      <Container className="py-5">
        <Alert variant="warning">
          Only clients can post projects. Please log in as a client to continue.
        </Alert>
      </Container>
    );
  }

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col md={8}>
          <Card className="shadow-sm">
            <Card.Header className="bg-primary text-white">
              <h4 className="mb-0">Post a New Project</h4>
            </Card.Header>
            <Card.Body>
              {formSubmitted && error && (
                <Alert variant="danger">{error.message || 'Error creating project. Please try again.'}</Alert>
              )}
              
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-4">
                  <Form.Label>Project Title</Form.Label>
                  <Form.Control
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="E.g., 'Need a responsive website built with React'"
                    isInvalid={formSubmitted && validationErrors.title}
                  />
                  <Form.Control.Feedback type="invalid">
                    {validationErrors.title}
                  </Form.Control.Feedback>
                  <Form.Text className="text-muted">
                    A concise and clear title helps attract the right freelancers.
                  </Form.Text>
                </Form.Group>
                
                <Form.Group className="mb-4">
                  <Form.Label>Project Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={5}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Describe your project in detail, including goals, requirements, and deliverables..."
                    isInvalid={formSubmitted && validationErrors.description}
                  />
                  <Form.Control.Feedback type="invalid">
                    {validationErrors.description}
                  </Form.Control.Feedback>
                  <Form.Text className="text-muted">
                    Be as detailed as possible to get accurate proposals.
                  </Form.Text>
                </Form.Group>
                
                <Row className="mb-4">
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>Category</Form.Label>
                      <Form.Select
                        value={selectedCategory?.value || ''}
                        onChange={(e) => {
                          const cat = categories.find(c => c.value === e.target.value);
                          setSelectedCategory(cat ? {id: cat.id, name: cat.name, value: cat.value} : null);
                        }}
                        isInvalid={formSubmitted && validationErrors.category}
                      >
                        <option value="">Select Category</option>
                        {categories.map((category, index) => (
                          <option key={index} value={category.value}>
                            {category.name}
                          </option>
                        ))}
                      </Form.Select>
                      <Form.Control.Feedback type="invalid">
                        {validationErrors.category}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>Project Type</Form.Label>
                      <Form.Select
                        value={projectType}
                        onChange={(e) => setProjectType(e.target.value)}
                      >
                        {projectTypes.map(type => (
                          <option key={type.id} value={type.value}>{type.label}</option>
                        ))}
                      </Form.Select>
                    </Form.Group>
                  </Col>
                </Row>
                
                <Row className="mb-4">
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>Project Budget ($)</Form.Label>
                      <Form.Control
                        type="number"
                        min="5"
                        value={budget}
                        onChange={(e) => setBudget(e.target.value)}
                        placeholder="Enter your budget in USD"
                        isInvalid={formSubmitted && validationErrors.budget}
                      />
                      <Form.Control.Feedback type="invalid">
                        {validationErrors.budget}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>Expected Duration</Form.Label>
                      <Form.Select
                        value={duration}
                        onChange={(e) => setDuration(e.target.value)}
                      >
                        {durations.map(dur => (
                          <option key={dur.id} value={dur.value}>{dur.label}</option>
                        ))}
                      </Form.Select>
                    </Form.Group>
                  </Col>
                </Row>
                
                <Form.Group className="mb-4">
                  <Form.Label>Required Skills</Form.Label>
                  <CreatableSelect
                    isMulti
                    options={skillOptions}
                    value={selectedSkills}
                    onChange={setSelectedSkills}
                    placeholder="Select or type skills required for this project"
                    className={formSubmitted && validationErrors.skills ? 'is-invalid' : ''}
                    formatCreateLabel={(inputValue) => `Add "${inputValue}"`}
                  />
                  {formSubmitted && validationErrors.skills && (
                    <div className="invalid-feedback d-block">
                      {validationErrors.skills}
                    </div>
                  )}
                  <Form.Text className="text-muted">
                    Select from the list or add custom skills by typing and pressing Enter.
                  </Form.Text>
                  
                  <div className="mt-3">
                    {selectedSkills.map((skill, index) => (
                      <Badge 
                        key={index} 
                        bg="primary" 
                        className="me-2 mb-2 p-2"
                        style={{ fontSize: '0.9rem' }}
                      >
                        {skill.label}
                        <FiX 
                          className="ms-1" 
                          style={{ cursor: 'pointer' }} 
                          onClick={() => {
                            const updatedSkills = [...selectedSkills];
                            updatedSkills.splice(index, 1);
                            setSelectedSkills(updatedSkills);
                          }}
                        />
                      </Badge>
                    ))}
                  </div>
                </Form.Group>
                
                <Form.Group className="mb-4">
                  <Form.Label>Experience Level</Form.Label>
                  <Form.Select
                    value={experienceLevel}
                    onChange={(e) => setExperienceLevel(e.target.value)}
                  >
                    {experienceLevels.map(level => (
                      <option key={level.id} value={level.value}>
                        {level.label}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
                
                <div className="d-grid gap-2">
                  <Button 
                    variant="primary" 
                    size="lg" 
                    type="submit" 
                    disabled={loading}
                  >
                    {loading ? 'Posting Project...' : 'Post Project'}
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default CreateProject;
