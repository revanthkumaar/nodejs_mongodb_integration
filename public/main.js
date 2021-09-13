const updateButton = document.querySelector('#update-button')
const deleteButton = document.querySelector('#delete-button')

updateButton.addEventListener('click', () => {
    console.log('update event triggered')
    const payload = {
        method: 'put',
        headers: { 'Content-Type':'application/json'},
        body:{
            name:'kumar',
        }
    }
    fetch('/updateEmployee',payload)
    .then(res => {
        if(res.ok) return res.json()
    })
    .then(response => {
        window.location.reload(true);
    })
})

deleteButton.addEventListener("click", () => {
    //hit the delete end point
});