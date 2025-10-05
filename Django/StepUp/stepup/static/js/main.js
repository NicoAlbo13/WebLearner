const toggle = document.querySelector('.nav-toggle');
  const links = document.querySelector('.nav-links');

  toggle.addEventListener('click', () => {
    links.classList.toggle('active');
  });

const closing = document.querySelectorAll('.alert-close');
const messages = document.querySelectorAll('.alert')

for(const [index, close] of closing.entries()){
  close.addEventListener('click', ()=>{
    messages[index].style.display = 'none'
  })
}

const allInterest = document.querySelectorAll('.interest');

for (const interest of allInterest) {
  interest.addEventListener('click', ()=>{
    fetch("http://127.0.0.1:8000/api/interest/", {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ interest: interest.dataset.id })
    })
    .then(res=>res.json())
    .then(data=>{
      if(data.ok) interest.style.display = 'none';
    })
  })
}

