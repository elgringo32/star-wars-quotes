const update = document.querySelector('#update-button')

update.addEventListener('click', _=> {
    fetch('/quotes', {
        method: 'put',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            name: 'Dart Vader',
            quote: 'I find your lack of faith disturbing.'
        })
    })
    .then(res => {
        if (res.ok) return res.json()
    })
    .then(response => {
        window.location.reload(true)
    }) 
})


const deleteButton = document.querySelector('#delete-button')

deleteButton.addEventListener('click', _=> {
    fetch('/quotes', {
        method: 'delete',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            name: 'Dart Vader',
        })
    })
    .then(res => {
        if (res.ok) return res.json()
    })
    .then(response => {
        alert(response)
        window.location.reload(true)
    }) 
})
