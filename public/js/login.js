

const loginFormHandler = async (event) => {
    event.preventDefault();
  
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();
  
    console.log(username)
    console.log(password)

    if (username && password) {
      const response = await fetch('/api/users/login', {
        method: 'POST',
        body: JSON.stringify({ username, password }),
        headers: { 'Content-Type': 'application/json' },
      })
      if (response.ok) {
        console.log(response, "good response")
        document.location.replace('/dashboard');
        } else {
        // response.message represents the issue upon failed log-in attempt
        alert(response.message);
        console.log(response)
        }
    }
  };
  
  document
    .getElementById('loginbutton')
    .addEventListener('click', loginFormHandler);



const signupFormHandler = async (event) => {
    event.preventDefault();
    
    const username = document.getElementById('usernamesignup').value.trim();
    const email = document.getElementById('emailsignup').value.trim();
    const password = document.getElementById('passwordsignup').value.trim();
    const passwordconfirm = document.getElementById('passwordsignup_confirm').value.trim(); 
    const errorElement = document.getElementById('error');
    const symbols = /[-!$%^&*()_+|~=`{}\[\]:";'<>?,.\/]/
    const letters = /[a-zA-Z]/;
    const upperCase = /[A-Z]/;
    
    console.log(username)
    console.log(email)
    console.log(password)
    console.log(passwordconfirm)
    
    if (password.length < 6) {
        errorElement.textContent = 'Password must be longer than 6 characters'

    }  else if (password != passwordconfirm) {
        errorElement.textContent = 'Passwords do not match!'
        
    } else if (password.length > 20) {
        errorElement.textContent = 'Password must be less than 20 characters'
    
    } else if (!symbols.test(password)) {
        errorElement.textContent = 'Password must contain at least one special characters'
    
    } else if (!letters.test(password)) {
        errorElement.textContent = 'Password must contain at least one letter'
    
    } else if (!upperCase.test(password)) {
        errorElement.textContent = 'Password must contain at least one upper-case letter'
    
    } else if (username && email && password) {
      const response = await fetch('/api/users/signup', {
        method: 'POST',
        body: JSON.stringify({ username, email, password }),
        headers: { 'Content-Type': 'application/json' },
      });
    
      if (response.ok) {
          console.log(response)
        document.location.replace('/dashboard');
      } else {
        alert('Failed to sign up.');
      }
    }
};
    
    document
    .getElementById('signinbutton')
    .addEventListener('click', signupFormHandler);