import React from 'react';
import { Button } from 'react-bootstrap';
import '../../styles/registerPage/SocialRegister.css'
import {FaApple, FaGoogle} from "react-icons/fa";

export default function SocialRegister() {
    return (
        <div className="social-signup d-flex justify-content-between">
          <Button 
            variant="outline-secondary" 
            className="w-50 me-2 py-2 rounded-pill d-flex align-items-center justify-content-center" 
          >
              <FaGoogle className="mx-1"/>
            Continue with Google
          </Button>
          
          <Button 
            variant="outline-secondary" 
            className="w-50 py-2 rounded-pill d-flex align-items-center justify-content-center"
          >
              <FaApple className="mx-1"/>
            Continue with Apple
          </Button>
        </div>
      );
}
