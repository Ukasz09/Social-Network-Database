// use('social_network');
db = db.getSiblingDB('social_network')

//Projection with personal data for all woman in collection 
cursor = db.users.find({ 'sex': 'W' }, { '_id': 1, 'surname': 1, 'name': 1, 'birth_date': 1, 'sex': 1 });

//printing results
while (cursor.hasNext())
    printjson(cursor.next());