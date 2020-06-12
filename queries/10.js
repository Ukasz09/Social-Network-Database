db = db.getSiblingDB('social_network')

var projection = {
    $project: {
        name: 1, surname: 1, sex: 1, birth_date: 1,
        years_old: { $subtract: [{ $year: new Date() }, { $year: '$birth_date' }] }
    }
}

var matcher = {
    $match: { 'years_old': { $lt: 18 } }
}

//Users whose have less than 18 years old   
cursor = db.users.aggregate([
    projection, matcher
])


while (cursor.hasNext())
    printjson(cursor.next());