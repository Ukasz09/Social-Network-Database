// use('social_network');
db = db.getSiblingDB('social_network')

//Projection with all users born after 1999 year
cursor = db.users.find({ 'birth_date': { $gt: new Date('1999-12-31') } }, { '_id': 1, 'surname': 1, 'name': 1, 'birth_date': 1, 'sex': 1 });

//printing results
while (cursor.hasNext())
    printjson(cursor.next());

