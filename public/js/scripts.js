document.addEventListener('DOMContentLoaded', function() {
    const departmentSelect = document.getElementById('department');
    const townSelect = document.getElementById('town');
    const form = document.getElementById('touristPlaceForm');
    const table = document.getElementById('touristPlacesTable').getElementsByTagName('tbody')[0];

    // Actualiza los municipios basados en el departamento que se seleccione
    departmentSelect.addEventListener('change', function() {
        const selectedDepartment = this.value;
        townSelect.innerHTML = '<option value="">Seleccione un municipio</option>';
        
        fetch(`/towns/${selectedDepartment}`)
            .then(response => response.json())
            .then(towns => {
                towns.sort((a, b) => a.name.localeCompare(b.name)).forEach(town => {
                    const option = document.createElement('option');
                    option.value = town.code;
                    option.textContent = town.name;
                    townSelect.appendChild(option);
                });
            });
    });

    // Envío del formulario
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const newPlace = {
            name: document.getElementById('name').value,
            department: departmentSelect.value,
            town: townSelect.value,
            description: document.getElementById('description').value,
            attractions: document.getElementById('attractions').value.split(',').map(a => a.trim()),
            bestTimeToVisit: document.getElementById('bestTimeToVisit').value
        };

        fetch('/add-place', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newPlace)
        })
        .then(response => response.json())
        .then(savedPlace => {
            addPlaceToTable(savedPlace);
            form.reset();
            townSelect.innerHTML = '<option value="">Seleccione un municipio</option>';
        })
        .catch(error => console.error('Error:', error));
    });

    //Agrega a la tabla
    function addPlaceToTable(place) {
        const row = table.insertRow();
        const cells = [
            place.name,
            departmentSelect.options[departmentSelect.querySelector(`option[value="${place.department}"]`).index].text,
            townSelect.options[townSelect.querySelector(`option[value="${place.town}"]`).index].text,
            place.description,
            place.attractions.join(', '),
            place.bestTimeToVisit
        ];
        cells.forEach(cellData => {
            const cell = row.insertCell();
            cell.textContent = cellData;
        });
    }
});