# Skill: docusaurus_auth_form_generator

## Description
A skill to generate customized Better-Auth.com compatible forms, including user profiling fields for the Physical AI & Humanoid Robotics textbook project.

## Functionality
1. Generates a **React Signup Form** (`SignupForm.jsx`).
2. Includes standard fields (Email, Password).
3. Adds custom fields for collecting **"Software Background"** and **"Hardware Background"** (text area/dropdown).
4. Generates a basic **React Signin Form** (`SigninForm.jsx`).

## Implementation

### SignupForm.jsx
```jsx
import React, { useState } from 'react';
import { useRegister } from 'better-auth/react';

const SignupForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    softwareBackground: '',
    hardwareBackground: ''
  });

  const { register, isPending } = useRegister();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Call Better Auth registration
    await register({
      email: formData.email,
      password: formData.password,
      name: formData.email.split('@')[0], // Use email prefix as name
      // Store background info in user metadata if supported
      profile: {
        softwareBackground: formData.softwareBackground,
        hardwareBackground: formData.hardwareBackground
      }
    });
  };

  return (
    <div className="auth-form-container">
      <h2>Sign Up for Physical AI & Humanoid Robotics Book</h2>
      <form onSubmit={handleSubmit} className="signup-form">
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="softwareBackground">Software Background:</label>
          <select
            id="softwareBackground"
            name="softwareBackground"
            value={formData.softwareBackground}
            onChange={handleChange}
          >
            <option value="">Select your software background</option>
            <option value="beginner">Beginner (Basic programming)</option>
            <option value="intermediate">Intermediate (ROS, Python, C++)</option>
            <option value="advanced">Advanced (Robotics frameworks, AI/ML)</option>
            <option value="expert">Expert (Research/Industry professional)</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="hardwareBackground">Hardware Background:</label>
          <select
            id="hardwareBackground"
            name="hardwareBackground"
            value={formData.hardwareBackground}
            onChange={handleChange}
          >
            <option value="">Select your hardware background</option>
            <option value="beginner">Beginner (Basic electronics)</option>
            <option value="intermediate">Intermediate (Sensors, microcontrollers)</option>
            <option value="advanced">Advanced (Robotics platforms, embedded systems)</option>
            <option value="expert">Expert (Hardware design, custom robots)</option>
          </select>
        </div>

        <button type="submit" disabled={isPending}>
          {isPending ? 'Signing up...' : 'Sign Up'}
        </button>
      </form>
    </div>
  );
};

export default SignupForm;
```

### SigninForm.jsx
```jsx
import React, { useState } from 'react';
import { useSignIn } from 'better-auth/react';

const SigninForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const { signIn, isPending } = useSignIn();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Call Better Auth sign in
    await signIn({
      email: formData.email,
      password: formData.password
    });
  };

  return (
    <div className="auth-form-container">
      <h2>Login to Physical AI & Humanoid Robotics Book</h2>
      <form onSubmit={handleSubmit} className="signin-form">
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" disabled={isPending}>
          {isPending ? 'Signing in...' : 'Sign In'}
        </button>
      </form>
    </div>
  );
};

export default SigninForm;
```

## Usage
1. Save the above components to your Docusaurus project
2. Import and use in your signup and login pages
3. Configure Better Auth in your Docusaurus project according to their documentation
4. The forms will collect user background information for personalized learning experiences
```