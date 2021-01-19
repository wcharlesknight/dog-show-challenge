document.addEventListener('DOMContentLoaded', () => {
    getDogs();
  })
  function getDogs() {
    fetch ('http://localhost:3000/dogs')
    .then (res => res.json())
    .then (dogs => renderDogs(dogs))
  }
  function renderDogs(dogs) {
    let table = document.getElementById('table-body')
    dogs.forEach (dog => {
      let tr = document.createElement('tr')
      let tdName = document.createElement('td')
      let tdBreed = document.createElement('td')
      let tdSex = document.createElement('td')
      let tdEdit = document.createElement('td')
      tdName.textContent = dog.name
      tdBreed.textContent = dog.breed
      tdSex.textContent = dog.sex
      let editBtn = document.createElement('button')
      editBtn.innerText= 'Edit Dog'
      editBtn.setAttribute('id', dog.id)
      editBtn.addEventListener('click', handleEdit)
      tdEdit.appendChild(editBtn)
      tr.append(tdName, tdBreed, tdSex, tdEdit)
      table.appendChild(tr)
    })
  }
  function handleEdit(e) {
    let dogToEdit = e.target.id
    let form = document.getElementById('dog-form')
    let row = e.target.parentNode.parentNode
    let formName = document.getElementsByName('name')[0]
    let formBreed = document.getElementsByName('breed')[0]
    let formSex = document.getElementsByName('sex')[0]
    formName.value = row.children[0].innerText
    formBreed.value = row.children[1].innerText
    formSex.value = row.children[2].innerText
    form.addEventListener('submit', (e)=> {
      updateDog(e, dogToEdit)
    })
  }
  function updateDog(e, dog)
  {
    e.preventDefault()
    fetch (`http://localhost:3000/dogs/${dog}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({
        name: e.target.children[0].value,
        breed: e.target.children[1].value,
        sex: e.target.children[2].value
      })
    })
    .then (res => res.json())
    .then (dog => {
      clearTable()
      getDogs()
    })
  }
  function clearTable() {
    let table = document.getElementById('table-body')
    while (table.firstElementChild) {
      if (table.firstElementChild.nodeName == 'TR')
        {
          table.firstElementChild.remove()
        }
    }
  }