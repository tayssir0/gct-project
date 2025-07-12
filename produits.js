const form = document.getElementById('idOfYourForm'); // remplace 'idOfYourForm' par l'id de ton formulaire

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const data = {
    name: form.elements['name'].value,
    email: form.elements['email'].value,
    password: form.elements['password'].value,
  };

  try {
    const response = await fetch('http://localhost:5000/api/user/register', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (response.ok) {
      alert('Inscription réussie !');
      form.reset();
    } else {
      alert('Échec de l\'inscription : ' + result.message);
    }
  } catch (error) {
    alert('Une erreur est survenue : ' + error.message);
  }
});
