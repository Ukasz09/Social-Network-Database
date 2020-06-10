
// use('social_network');
db = db.getSiblingDB('social_network')

//Women qty
qty = db.users.find({ 'sex': 'W' }).count();
print('Women qty:', qty)

//Younges woman 
cursor = db.users
    .find({}, { '_id': 1, 'surname': 1, 'name': 1, 'birth_date': 1 })
    .sort({ 'birth_date': -1 })
    .limit(1)

//printing results
print('Youngest person: \n')
while (cursor.hasNext())
    printjson(cursor.next());