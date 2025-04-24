import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Container, Tabs, Tab, Alert, Button } from "react-bootstrap";
import {
  Briefcase,
  PersonFill,
  Collection,
  Star,
  GeoAlt
} from "react-bootstrap-icons";

// Import Redux actions
import { fetchUserProfile } from "../redux/slices/userSlice";
import { fetchUserServices } from "../redux/slices/serviceSlice";
import { fetchUserPortfolio, addPortfolioItem, deletePortfolioItem } from "../redux/slices/portfolioSlice";
import { fetchUserRatings, submitUserRating } from "../redux/slices/ratingSlice";

// Import profile components
import {
  ProfileHeader,
  ServicesTab,
  PortfolioTab,
  AboutTab,
  ReviewsTab
} from "../components/profile";

// Import mock data for fallback
import { mockUsers, mockServices, mockPortfolioItems, mockRatings } from "../utils/apiUtils";

// Import API
import api from "../api/axiosConfig";

// Import styles
import "../styles/UserProfile.css";

const UserProfile = () => {
  const dispatch = useDispatch();
  const { userId: urlUserId } = useParams();
  
  // Redux state
  const { currentUser } = useSelector(state => state.user);
  const { userServices, loading: servicesLoading } = useSelector(state => state.service);
  const { portfolioItems, loading: portfolioLoading } = useSelector(state => state.portfolio);
  const { userRatings, loading: ratingsLoading } = useSelector(state => state.rating);
  
  // Local state
  const [activeTab, setActiveTab] = useState("about");
  const [isMyProfile, setIsMyProfile] = useState(false);
  const [profileData, setProfileData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [effectiveUserId, setEffectiveUserId] = useState(urlUserId);
  
  // If urlUserId is undefined, use the current user's ID
  useEffect(() => {
    if (!urlUserId && currentUser) {
      console.log('No userId in URL, using current user ID:', currentUser.id);
      setEffectiveUserId(currentUser.id.toString());
      setIsMyProfile(true);
    } else if (!urlUserId) {
      // If no urlUserId and no currentUser, try to get from localStorage
      const localUser = JSON.parse(localStorage.getItem('user'));
      if (localUser) {
        console.log('Using user ID from localStorage:', localUser.id);
        setEffectiveUserId(localUser.id.toString());
        setIsMyProfile(true);
      }
    } else {
      // If urlUserId is defined, use it
      setEffectiveUserId(urlUserId);
    }
  }, [urlUserId, currentUser]);
  
  // Sample data for skills and qualities
  const skills = [
    "Professional landing page design",
    "Responsive and fast loading",
    "Custom website development",
    "React.js",
    "Website optimization",
    "API integration",
    "Converting wireframes into websites",
    "MongoDB database design",
    "Python & Django",
    "UI/UX Design",
  ];

  const qualities = [
    "Attention to detail",
    "Clean design and high-quality performance",
    "Commitment to deadlines",
    "Efficient and professional workflow",
    "Clear communication",
    "Understanding client requirements",
  ];
  
  // Determine if this is the current user's profile
  useEffect(() => {
    if (currentUser && effectiveUserId) {
      const isCurrentUserProfile = currentUser.id.toString() === effectiveUserId.toString();
      console.log('Checking if current user profile:', isCurrentUserProfile);
      setIsMyProfile(isCurrentUserProfile);
    }
  }, [currentUser, effectiveUserId]);

  // Fetch user profile data - simplified to run only once when component mounts
  useEffect(() => {
    const fetchData = async () => {
      if (!effectiveUserId) {
        console.log('No effectiveUserId available yet, waiting...');
        return;
      }
      
      console.log('Starting to fetch data for userId:', effectiveUserId);
      setIsLoading(true);
      
      try {
        // Check if we're viewing our own profile
        const isOwnProfile = currentUser && currentUser.id.toString() === effectiveUserId.toString();
        
        // Set profile data directly if it's our own profile
        if (isOwnProfile) {
          console.log('Using current user data');
          setProfileData(currentUser);
        } else {
          // Fetch profile data for other users
          console.log('Fetching user profile data');
          const userData = await dispatch(fetchUserProfile(effectiveUserId)).unwrap();
          setProfileData(userData);
        }
        
        // Always fetch these additional data in parallel
        console.log('Fetching user services');
        dispatch(fetchUserServices(effectiveUserId));
        
        console.log('Fetching user portfolio');
        dispatch(fetchUserPortfolio(effectiveUserId));
        
        console.log('Fetching user ratings');
        dispatch(fetchUserRatings(effectiveUserId));
        
        setError(null);
      } catch (err) {
        console.error('Error fetching profile data:', err);
        setError('Failed to load profile data. Please try again later.');
        
        // Use mock data as fallback
        setProfileData(mockUsers.find(user => user.id.toString() === effectiveUserId));
        dispatch(fetchUserServices(effectiveUserId));
        dispatch(fetchUserPortfolio(effectiveUserId));
        dispatch(fetchUserRatings(effectiveUserId));
      } finally {
        // Set loading to false after a short delay to ensure data is displayed
        setTimeout(() => {
          setIsLoading(false);
        }, 500);
      }
    };
    
    fetchData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [effectiveUserId]);
  
  // This second useEffect is no longer needed as we've simplified the data fetching logic above

  // Handle adding portfolio item
  const handleAddPortfolioItem = async (portfolioData) => {
    try {
      const newItem = {
        userId: parseInt(effectiveUserId),
        ...portfolioData,
        createdAt: new Date().toISOString()
      };
      
      await dispatch(addPortfolioItem(newItem)).unwrap();
    } catch (err) {
      console.error('Error adding portfolio item:', err);
      setError('Failed to add portfolio item');
    }
  };

  // Handle deleting portfolio item
  const handleDeletePortfolioItem = async (itemId) => {
    try {
      await dispatch(deletePortfolioItem(itemId)).unwrap();
    } catch (err) {
      console.error('Error deleting portfolio item:', err);
      setError('Failed to delete portfolio item');
    }
  };

  // Handle submitting a review
  const handleSubmitReview = async (reviewData) => {
    try {
      const ratingData = {
        userId: parseInt(userId),
        raterId: currentUser.id,
        ...reviewData,
        createdAt: new Date().toISOString()
      };
      
      await dispatch(submitUserRating(ratingData)).unwrap();
    } catch (err) {
      console.error('Error submitting rating:', err);
      setError('Failed to submit rating');
    }
  };

  if (isLoading) {
    return (
      <Container className="py-5 text-center">
        {profileData ? (
          <>
            <div className="position-relative profile-pic-container mx-auto">
              <img
                className="rounded-circle img-fluid profile-pic"
                src={profileData.profileImage}
                alt="Profile Picture"
              />
              <span className="position-absolute profile-status-dot bg-success rounded-circle"></span>
            </div>
            <h2 className="mt-3 mb-1 fw-bold">{profileData.name}</h2>
            <div className="profile-title mb-2">{profileData.title}</div>
            <div className="d-flex justify-content-center align-items-center mb-3">
              <GeoAlt className="me-1" />
              <span>{profileData.location}</span>
            </div>
          </>
        ) : (
          <div className="text-center">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-2">Loading profile data...</p>
          </div>
        )}
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="py-5">
        <Alert variant="danger">{error}</Alert>
      </Container>
    );
  }

  if (!profileData) {
    return (
      <Container className="py-5">
        <Alert variant="warning">User profile not found</Alert>
      </Container>
    );
  }

  // Determine which tabs to show based on user role
  const renderRoleBasedTabs = () => {
    // Default to freelancer if role not available
    const userRole = profileData?.role || 'freelancer';
    
    // Array to hold tabs based on role
    const roleTabs = [];
    
    // Common tabs for all roles - About tab is always first for all roles
    roleTabs.push(
      <Tab key="about" eventKey="about" title={<span><PersonFill className="me-2" /> About</span>}>
        <AboutTab 
          profileData={profileData} 
          skills={skills} 
          qualities={qualities} 
        />
      </Tab>
    );
    
    // Role-specific tabs
    if (userRole === 'freelancer') {
      // Freelancers have services
      roleTabs.unshift(
        <Tab key="services" eventKey="services" title={<span><Briefcase className="me-2" /> Services</span>}>
          <ServicesTab 
            services={userServices || mockServices} 
            isLoading={servicesLoading} 
            isMyProfile={isMyProfile} 
          />
        </Tab>
      );
      
      // Freelancers have portfolio
      roleTabs.push(
        <Tab key="portfolio" eventKey="portfolio" title={<span><Collection className="me-2" /> Portfolio</span>}>
          <PortfolioTab 
            portfolioItems={portfolioItems || mockPortfolioItems} 
            isLoading={portfolioLoading} 
            isMyProfile={isMyProfile} 
            onAddItem={handleAddPortfolioItem}
            onDeleteItem={handleDeletePortfolioItem}
          />
        </Tab>
      );
    } else if (userRole === 'client') {
      // Clients have projects instead of services
      roleTabs.unshift(
        <Tab key="projects" eventKey="projects" title={<span><Briefcase className="me-2" /> Projects</span>}>
          <div className="p-4">
            {isMyProfile && (
              <div className="mb-4">
                <Button 
                  variant="primary" 
                  as={Link} 
                  to="/create-project"
                  className="d-flex align-items-center"
                >
                  <span className="me-2">+</span> Add New Project
                </Button>
              </div>
            )}
            
            {userServices && userServices.length > 0 ? (
              <ServicesTab 
                services={userServices || mockServices} 
                isLoading={servicesLoading} 
                isMyProfile={isMyProfile} 
                displayAsProjects={true}
              />
            ) : (
              <Alert variant="info">
                {isMyProfile ? "You haven't created any projects yet." : "This user hasn't created any projects yet."}
              </Alert>
            )}
          </div>
        </Tab>
      );
    } else if (userRole === 'admin') {
      // Admins have a dashboard tab instead of services
      roleTabs.unshift(
        <Tab key="dashboard" eventKey="dashboard" title={<span><Briefcase className="me-2" /> Dashboard</span>}>
          <div className="p-4">
            <h3>Admin Dashboard</h3>
            <p>Welcome to your admin profile. Use the main admin dashboard for full management capabilities.</p>
            
            <Link to="/admin" className="btn btn-primary mt-3">
              Go to Admin Dashboard
            </Link>
          </div>
        </Tab>
      );
    }
    
    // Everyone has reviews
    roleTabs.push(
      <Tab key="reviews" eventKey="reviews" title={<span><Star className="me-2" /> Reviews</span>}>
        <ReviewsTab 
          profileData={profileData} 
          testimonials={userRatings || mockRatings} 
          isLoading={ratingsLoading} 
          isMyProfile={isMyProfile} 
          onSubmitReview={handleSubmitReview}
        />
      </Tab>
    );
    
    return roleTabs;
  };

  return (
    <div className="bg-light min-vh-100">
      {/* Profile Header */}
      {profileData && <ProfileHeader profileData={profileData} isMyProfile={isMyProfile} />}

      {/* Navigation */}
      <Container className="mt-4">
        <Tabs
          activeKey={activeTab}
          onSelect={(k) => setActiveTab(k)}
          className="mb-4 custom-tab"
          justify
        >
          {renderRoleBasedTabs()}
        </Tabs>
      </Container>
    </div>
  );
};

export default UserProfile;