//Removing all users who <given years> old
db = db.getSiblingDB('social_network')

year_treshold = 65

id_to_remove = []
year_query = { $subtract: [{ $year: new Date() }, { $year: '$birth_date' }] }
users_query = [
    { $project: { 'year': year_query } },
    { $match: { 'year': year_treshold } }
]

db.users.aggregate(users_query).forEach(function (obj) { id_to_remove.push(obj._id); })
print('Id to remove:\n')
id_to_remove.forEach(elem => print(elem + '\n'));

print('Removing all users who is ' + year_treshold + 'years old')
db.users.remove({ '_id': { $in: id_to_remove } })

print('Verification (should not display any id):')
cursor = db.users.aggregate(users_query)
while (cursor.hasNext())
    printjson(cursor.next());

