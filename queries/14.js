db = db.getSiblingDB('social_network')

searched_name = 'Jacqueline'

// Amount of all women with given name 
cursor = db.users.aggregate([
    { $match: { 'name': searched_name } },
    { $group: { '_id': null, 'qty': { $sum: 1 } } },
    { $project: { '_id': 0 } }
])

print('Amount of all women with name "' + searched_name + '":\n')
while (cursor.hasNext())
    printjson(cursor.next());