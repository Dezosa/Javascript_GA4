

// Resume page component
class ResumePage {
    constructor(resumes) {
      this.resumes = resumes;
      this.currentIndex = 0;
      this.filteredResumes = [...resumes];
      this.searchValue = '';
      this.render();
    }
  
    render() {
      const resume = this.filteredResumes[this.currentIndex];
  
      const html = `
        <h1>Resume Page</h1>
        <div>
          <label for="search">Search Job Opening:</label>
          <input type="text" id="search" value="${this.searchValue}" />
          <button id="searchButton">Search</button>
        </div>
        <div>
          <h2>Applicant Details</h2>
          <p>ID: ${resume.id}</p>
          <p>Name: ${resume.basics.name}</p>
          <p>Applied For: ${resume.basics.AppliedFor}</p>
          <p>Email: ${resume.basics.email}</p>
          <p>Phone: ${resume.basics.phone}</p>
          <p>Location: ${resume.basics.location.city}, ${resume.basics.location.state}</p>
          <p>Skills: ${resume.skills.keywords.join(', ')}</p>
          <p>Work: ${resume.work["Company Name"]}, ${resume.work.Position}</p>
          <p>Education: ${resume.education.UG.institute}, ${resume.education.UG.course}</p>
        </div>
        <div>
          <button id="previousButton" ${this.currentIndex === 0 ? 'disabled' : ''}>Previous</button>
          <button id="nextButton" ${this.currentIndex === this.filteredResumes.length - 1 ? 'disabled' : ''}>Next</button>
        </div>
      `;
  
      document.getElementById('app').innerHTML = html;
  
      document.getElementById('previousButton').addEventListener('click', () => {
        this.currentIndex--;
        this.render();
      });
  
      document.getElementById('nextButton').addEventListener('click', () => {
        this.currentIndex++;
        this.render();
      });
  
      document.getElementById('searchButton').addEventListener('click', () => {
        const searchValue = document.getElementById('search').value.trim();
        this.searchValue = searchValue;
        this.filteredResumes = this.resumes.filter(resume =>
          resume.basics.AppliedFor.toLowerCase() === searchValue.toLowerCase()
        );
        this.currentIndex = 0;
        this.render();
      });
    }
  }
  
  // Login page component
  class LoginPage {
    constructor() {
      this.username = '';
      this.password = '';
      this.render();
    }
  
    render() {
      const html = `
        <h1>Login Page</h1>
        <div>
          <label for="username">Username:</label>
          <input type="text" id="username" />
        </div>
        <div>
          <label for="password">Password:</label>
          <input type="password" id="password" />
        </div>
        <button id="loginButton">Login</button>
      `;
  
      document.getElementById('app').innerHTML = html;
  
      document.getElementById('loginButton').addEventListener('click', () => {
        const usernameInput = document.getElementById('username');
        const passwordInput = document.getElementById('password');
  
        const username = usernameInput.value.trim();
        const password = passwordInput.value.trim();
  
        // Validate username and password
        if (username && password) {
          localStorage.setItem('isLoggedIn', 'true');
          this.username = username;
          this.password = password;
          this.redirectToResumePage();
        } else {
          alert('Invalid username/password');
        }
  
        // Clear input fields
        usernameInput.value = '';
        passwordInput.value = '';
      });
    }
  
    redirectToResumePage() {
      window.location.href = './resume.html';
    }
  }
  
  // Check if the user is already logged in
  const isLoggedIn = localStorage.getItem('isLoggedIn');
  
  if (isLoggedIn) {
    // Fetch the JSON data from a separate file
    fetch('C:\Resume.json')
      .then(response => response.json())
      .then(resumes => {
        new ResumePage(resumes.resume);
      })
      .catch(error => {
        console.error('Error fetching resumes:', error);
      });
  } else {
    new LoginPage();
  }
  