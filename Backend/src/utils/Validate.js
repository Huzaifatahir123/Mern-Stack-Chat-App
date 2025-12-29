 export  const validatePassword = (password) => {
     const errors = [];

  if (!/[A-Z]/.test(password)) {
    errors.push("At least one uppercase letter is required");
  }

  if (!/[a-z]/.test(password)) {
    errors.push("At least one lowercase letter is required");
  }

  if (!/\d/.test(password)) {
    errors.push("At least one number is required");
  }

  if (!/[@$!%*?&]/.test(password)) {
    errors.push("At least one special character is required");
  }

  if (password.length < 8) {
    errors.push("Password must be at least 8 characters long");
  }
     return errors;
 }
