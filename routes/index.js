const routes = require('express').Router()
const departments = require('../data/departments')
const towns = require('../data/towns')
const touristPlaces = require('../data/touristPlaces')

routes.get('/', (req, res) => {
    return res.render('index', { 
        title: 'Lugares Turísticos', 
        data: touristPlaces,
        departments,
        towns
    });
});

routes.get('/towns/:departmentCode', (req, res) => {
    const departmentTowns = towns.filter(town => town.department === req.params.departmentCode);
    res.json(departmentTowns);
});

routes.post("/add-place", (req, res) => {
    const { name, department, town, description, attractions, bestTimeToVisit } = req.body;
    const id = `TP${touristPlaces.size + 1}`.padStart(5, '0');
    
    const newPlace = {
        id,
        name,
        department,
        town,
        description,
        attractions,
        bestTimeToVisit
    };

    touristPlaces.set(id, newPlace);
    res.json(newPlace);
});

module.exports = routes;