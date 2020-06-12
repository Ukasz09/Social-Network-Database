// Alternative js script version of 'use('social_network')'
db = db.getSiblingDB('social_network')

//All woman saved in database 
cursor = db.users.find(
    { 'sex': 'W' },
    { 'surname': 1, 'name': 1, 'birth_date': 1, 'sex': 1 }
);

print('All women: \n')
while (cursor.hasNext())
    printjson(cursor.next());