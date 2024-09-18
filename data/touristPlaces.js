const touristPlaces = new Map();

touristPlaces.set('TP001', {
    id: 'TP001',
    name: 'Parque Nacional Natural Tayrona',
    department: '47',
    town: '47001',
    description: 'Hermoso parque costero con playas, selva tropical y ruinas arqueológicas.',
    attractions: ['Playas', 'Senderismo', 'Arqueología'],
    bestTimeToVisit: 'Diciembre a Abril'
});

touristPlaces.set('TP002', {
    id: 'TP002',
    name: 'Catedral de Sal de Zipaquirá',
    department: '25',
    town: '25899',
    description: 'Impresionante catedral subterránea construida en una mina de sal.',
    attractions: ['Arquitectura', 'Historia', 'Turismo religioso'],
    bestTimeToVisit: 'Todo el año'
});


module.exports = touristPlaces;