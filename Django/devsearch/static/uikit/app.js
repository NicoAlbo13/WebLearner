// Invoke Functions Call on Document Loaded
document.addEventListener('DOMContentLoaded', function () {
  hljs.highlightAll();
});

let alertWrapper = document.querySelector('.alert')
let alertClose = document.querySelector('.alert__close')

if(alertWrapper) {
  console.log('Wrapper exists');
  alertClose.addEventListener('click', ()=>{
    console.log('Click on alert');
    alertWrapper.style.display = 'none'
  })
}


