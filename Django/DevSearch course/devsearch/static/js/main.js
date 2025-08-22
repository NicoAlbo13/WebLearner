let form = document.querySelector('#searchForm')
let pageLinks = document.querySelectorAll(".page-link")

if(form){
    for(let i=0; pageLinks.length>i; i++){
        pageLinks[i].addEventListener('click', (e)=>{
            e.preventDefault()

            let page = pageLinks[i].dataset.page

            form.innerHTML += `<input value=${page} name="page" hidden />`
            console.log(page)

            form.submit()
        })
    }
}


const tags = document.getElementsByClassName('project-tag')
for(let i=0; tags.length>i; i++){
    tags[i].addEventListener('click', async(e)=>{
        const {project, tag} =e.target.dataset
        const res = await fetch('http://127.0.0.1:8000/api/remove-tag/', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({'tag': tag, 'project': project})
        })
        const data = await res.json()
        if(res.ok){
            tags[i].style.display = 'none'
        }
    })
}