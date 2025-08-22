
const loginBtn = document.getElementById('login-btn')
const logoutBtn = document.getElementById('logout-btn')

const token = localStorage.getItem('token')

if(token){
    loginBtn.style.display = 'none'
}else{
    logoutBtn.style.display = 'none'
}

logoutBtn.addEventListener('click', (e)=>{
    e.preventDefault()
    localStorage.clear()
    window.location = 'file:///C:/Users/nicoa/Documents/WebLearner/Django/frontend/login.html'
})



const url = 'http://127.0.0.1:8000/api/'

const getProjects = async () => {
    try {
        const response = await fetch(`${url}projects/`)
        const data = await response.json()
        console.log(data);
        await buildProjects(data)
    } catch (error) {
        console.log(error);
    }
}

const buildProjects = async (projects=[]) => {
    const projectWrapper = document.getElementById('projects--wrapper')
    projectWrapper.innerHTML = ''
    projects.forEach(project => {
        projectWrapper.innerHTML += `
        <div class="project--card">
        <img src="http://127.0.0.1:8000${project.featured_img}"/>
        <div>
            <div class="card--header">
            <h3>${project.title}</h3>
            <small style="color:#737373;">${project.owner.name}</small>
            <strong class="vote--option" data-vote="up" data-project="${project.id}">&#43;</strong>
            <strong class="vote--option" data-vote="down" data-project="${project.id}">&#8722;</strong>
            </div>
            <i>${project.vote_ratio}% positive feedback</i>
            <p>${project.description.substring(0,150)}</p>
        </div>
        </div>
        `
    });

    await addVote()
}

const addVote = () => {
    const voteBtn = document.getElementsByClassName('vote--option')
    const token = localStorage.getItem('token')
    for (let i = 0; voteBtn.length > i; i++) {
        voteBtn[i].addEventListener('click', async(e) => {
            const voteType = e.target.dataset.vote
            const ProjectId = e.target.dataset.project

            const res = await fetch(`${url}project/${ProjectId}/vote/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({'value': voteType})
            })
            data = await res.json()
            console.log(data);
            await getProjects()
        })
    }
}


getProjects()