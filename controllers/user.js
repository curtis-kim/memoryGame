
let userData = require("../models/userData")

exports.getAllUser = (req, res, next) => {
    let AllUsers = userData.getall();
    AllUsers.then(([rows, fieldData]) => {
        res.render('home', { pageTitle: 'Individual Assignment'});
    })
};

exports.getTop5User = (req, res, next)=>{
    let top5Users = userData.getTop5();
    let userArray = []
    top5Users.then(([rows, fieldData]) => {
        rows.forEach(element => {
            let userData = {}
            userData.name = element.name
            userData.score = element.score
            userArray.push(data)
        });
        res.render('leaderboard', { pageTitle: 'Individual Assignment', hasList: userArray.length>0, list: userArray});
    })
}

exports.postAddUser = (req, res, next) => {
    let u_name = req.body.name;
    let u_score = req.body.score;
    let uOject = {
        name: u_name,
        u_score: u_score,
    }
    userData.add(uOject);
}

exports.displayGame = (req, res, next) => {
    res.render('play-game', { pageTitle: 'Individual Assignment' })
}

exports.summaryPage = (req, res, next) => {
    let score = req.body.score
    console.log(score)
    res.render('summary', { pageTitle: 'Individual Assignment', score: score })

}
exports.leaderboard = (req, res, next) => {
    let name = req.body.name
    let score = req.body.score
    let rank
    let uObject = {
        name: name,
        score: score,
    }
    userData.add(uObject)
    
  
    let AllUsers = userData.getall()
    AllUsers.then(([rows, fieldData]) => {
          let userArray=[uObject]
          rows.forEach(element=>{
            let userDataObj = {}
            userDataObj.name = element.name
            userDataObj.score = element.score
            userArray.push(userDataObj)
        })
        userArray.sort(function(a,b){
            return b.score - a.score
        })
        
        for(let i = 0; i<userArray.length; i++){
            if(userArray[i]==uObject){
                rank = "Rank " + i + 1;
            }    
        }
        
        console.log(userArray)
    })
    let top5Users = userData.getTop5();
    top5Users.then(([rows, fieldData]) => {
        let user5Array = []
        let index =1;
        rows.forEach(element => {
            let userDataObj = {}
            userDataObj.name = element.name
            userDataObj.score = element.score
            userDataObj.rank = index++
            user5Array.push(userDataObj)
        });
        res.render('leaderboard', { pageTitle: 'Individual Assignment', username:name, score: score, userrank: rank, hasList: user5Array.length>0, list: user5Array});
    })
}