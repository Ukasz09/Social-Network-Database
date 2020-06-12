db = db.getSiblingDB('social_network')

var date = new Date('1999-12-31')

//All users born after given year
cursor = db.users.find(
    { 'birth_date': { $gt: date } },
    { 'surname': 1, 'name': 1, 'birth_date': 1, 'sex': 1 }
);

//printing results
print('User born after: ' + date.getFullYear() + ': \n')
while (cursor.hasNext())
    printjson(cursor.next());

