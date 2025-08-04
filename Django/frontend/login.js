
const form = document.getElementById('login-form')

form.addEventListener('submit', async (e)=>{
    e.preventDefault()
    const username = form.username.value;
    const password = form.password.value;
    const res = await fetch('http://127.0.0.1:8000/api/token/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({'username': username, 'password': password})
    })

    const data = await res.json()
    console.log(data.access);

    if(data.access){
        localStorage.setItem('token', data.access)
        // redirect to projects page
        window.location = 'file:///C:/Users/nicoa/Documents/WebLearner/Django/frontend/project-list.html'
    }else{
        alert('Username or password incorrect!')
    }
})

