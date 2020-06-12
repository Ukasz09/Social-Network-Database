db = db.getSiblingDB('social_network')

var years_diff_query = { $subtract: [{ $year: new Date() }, { $year: '$birth_date' }] }
var projection = { $project: { 'name': 1, 'surname': 1, 'sex': 1, 'birth_date': 1, 'years_old': years_diff_query } }
var matcher = { $match: { 'years_old': { $lt: 18 } } }

//Users whose have less than 18 years old   
cursor = db.users.aggregate([projection, matcher])

print('Users whose have less than 18 years old:\n')
while (cursor.hasNext())
    printjson(cursor.next());