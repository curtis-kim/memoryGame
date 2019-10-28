let peopleModel = require('../models/peopleData');

exports.getAllPeople = (req, res, next) => {
    let Peoples = peopleModel.getall();
    Peoples.then(([rows, fieldData]) => {
        res.render('home', { pageTitle: 'Lab5', heading: 'Welcome to People App'});
    })
};

exports.getAddPeople = (req, res, next) => {
    res.render('peopleadd', { formsCSS: true });
};

exports.getPeople = (req, res, next) => {
    let id = req.params.id;
    let People = peopleModel.getpeople(id);
    People.then(([data, metadata]) => {
        res.render('people', { people: data[0], peopleCSS: true });
    });
}

exports.postAddPeople = (req, res, next) => {
    let p_name = req.body.name;
    let p_about = req.body.about;
    let p_imageURL = req.body.imageURL;
    let pOject = {
        name: p_name,
        about: p_about,
        imageURL: p_imageURL
    }
    peopleModel.add(pOject);
    res.redirect(301, '/');
}

exports.postDeletePeople = (req, res, next)=>{
    let name = req.body.name
    peopleModel.getPeopleName(name).then(([data, metadata])=>{
        let id = data[0].id
        peopleModel.deletepeople(id);
        res.redirect(301, '/'); 
    })
}