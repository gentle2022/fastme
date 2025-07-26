// Firebase configuration (Replace with your own Firebase config)
const firebaseConfig = {
  apiKey: "AIzaSyDECuryjtk7xBJphM98M8d96cTUlwwgsYU",
  authDomain: "softgap-34905.firebaseapp.com",
  projectId: "softgap-34905",
  storageBucket: "softgap-34905.firebasestorage.app",
  messagingSenderId: "721741816459",
  appId: "1:721741816459:web:110068ea0a3a0d0991aa8e",
  measurementId: "G-HF0FLZQCXT"
  // storageBucket, messagingSenderId, appId, etc. can be added if needed
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Bootstrap modal logic
let loanModal;
window.addEventListener('DOMContentLoaded', () => {
  loanModal = new bootstrap.Modal(document.getElementById('loanModal'));
  document.getElementById('applyBtn').onclick = () => {
    document.getElementById('formMsg').textContent = '';
    document.getElementById('loanForm').reset();
    loanModal.show();
  };
  document.getElementById('closeModal').onclick = () => loanModal.hide();
});

// Loan form submission
document.addEventListener('DOMContentLoaded', function() {
  const loanForm = document.getElementById('loanForm');
  const formMsg = document.getElementById('formMsg');
  loanForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const loanType = document.getElementById('loanType').value;
    const amount = parseFloat(document.getElementById('amount').value);

    if (!name || !email || !loanType || !amount) {
      formMsg.textContent = "Please fill all fields.";
      formMsg.style.color = "#c00";
      return;
    }

    try {
      await db.collection('loan_applications').add({
        name, email, loanType, amount, submittedAt: new Date()
      });
      formMsg.textContent = "Application submitted successfully!";
      formMsg.style.color = "#208a3d";
      loanForm.reset();
    } catch (err) {
      formMsg.textContent = "Submission failed. Please try again.";
      formMsg.style.color = "#c00";
    }
  });
});