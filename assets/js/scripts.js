document.addEventListener("DOMContentLoaded", function() {// Your Firebase config object
const firebaseConfig = {
    apiKey: "AIzaSyBgQLNMDVaaVKy6NhocXpU3ysqts8b-URg", // Add your API key here
    authDomain: "recruiters-be8ab.firebaseapp.com",
    projectId: "recruiters-be8ab",
    storageBucket: "recruiters-be8ab.appspot.com",
    messagingSenderId: "880574555307",
    appId: "1:880574555307:web:7740932c3c84c649c483ee",
    measurementId: "G-M7P3MKK8SR"
};

function sendEmailViaGAS(message, recipientEmail) {
    fetch("https://script.google.com/macros/s/AKfycbwRe9tQPHSpKBxRgMB5X2nOplfCuIG8BqAdZ1MydQ6WOA0qw0EVnlJ-DhK5DctOfcri/exec", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: `message=${message}&email=${recipientEmail}`,  // use recipientEmail here
    })
    .then(response => response.text())
    .then(data => console.log(data))
    .catch((error) => {
        console.error('Error:', error);
    });
}

  

// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.database();

// Function to toggle chat display
function toggleChat() {
    const chatbot = document.querySelector('.chatbot-body');
    if (chatbot.style.display === 'none' || chatbot.style.display === '') {
        chatbot.style.display = 'block';
    } else {
        chatbot.style.display = 'none';
    }
}

// Function to show recruiter fields
function showRecruiterFields() {
    document.getElementById('recruiterQuestion').style.display = 'none';
    document.getElementById('recruiterFields').style.display = 'block';
}

// Function to show non-recruiter fields
function showNonRecruiterFields() {
    document.getElementById('recruiterQuestion').style.display = 'none';
    document.getElementById('nonRecruiterFields').style.display = 'block';
}

// Function to submit recruiter feedback
function submitRecruiterFeedback() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const company = document.getElementById('company').value;
    const feedback = document.getElementById('feedback').value;

    // Assuming you'll implement a function to save this data to your NoSQL database
    saveToDatabase(name, email, company, feedback);
        // If email exists, send acknowledgment
    if(email) {
            const message = `Hello ${name}, thank you for providing feedback. Your insights as a recruiter are valuable to me. I'd be happy to connect on LinkedIn https://www.linkedin.com/in/ghulam-murtaza-ms-310741110/. If you have any opportunities, advice, or suggestions, please don't hesitate to reach out. Phone: +1 716 547 0965`;
            sendEmailViaGAS(message,email);
    }
    showThankYouModal();
}

// Example function to save data to your database


function saveToDatabase(name, email, company, feedback) {
    // Reference to your 'feedbacks' path in Firebase
    const feedbackRef = db.ref('feedbacks');
    
    // Generate the current formatted date and time
    const timestamp = getCurrentFormattedDate();

    // Push the new feedback to the database
    feedbackRef.push({ name, email, company, feedback, timestamp }, function(error) {
        if (error) {
            console.error('Error saving feedback:', error);
        } else {
            console.log('Feedback saved successfully!');
        }
    });
}


// Function to show the thank you modal
function showThankYouModal() {
    const modal = document.getElementById("myModal");
    modal.style.display = "block";

    const span = document.getElementsByClassName("close")[0];
    span.onclick = function() {
        modal.style.display = "none";
    }

    window.onclick = function(event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    }
}

// For the non-recruiters, we just console.log the data.
// However, you could easily adjust this function to save the non-recruiter data as well.
function submitNonRecruiterFeedback() {
    const name = document.getElementById('nameNonRecruiter').value;
    const feedback = document.getElementById('feedbackNonRecruiter').value;
    const email = document.getElementById('emailNonRecruiter').value;
    console.log('Non-Recruiter Feedback:', { name, feedback });

    if(email) {
        const message = `Hello ${name}, thank you for providing feedback. Your insights are valuable to me.I'd be happy to connect on LinkedIn https://www.linkedin.com/in/ghulam-murtaza-ms-310741110/. If you have any opportunities, advice, or suggestions, please don't hesitate to reach out. Phone: +1 716 547 0965`;
        sendEmailViaGAS(message,email);
    }
    showThankYouModal();
}
function getCurrentFormattedDate() {
    const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
    };
    return new Intl.DateTimeFormat('en-US', options).format(new Date());
}
    window.toggleChat = toggleChat;
    window.showRecruiterFields = showRecruiterFields;
    window.showNonRecruiterFields = showNonRecruiterFields;
    window.submitRecruiterFeedback = submitRecruiterFeedback;
    window.submitNonRecruiterFeedback = submitNonRecruiterFeedback;
});
