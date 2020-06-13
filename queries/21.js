// Removing email from user
db = db.getSiblingDB('social_network')

id = db.users.find({}, { '_id': 1 }).next()._id

db.users.update({ '_id': id }, { $unset: { 'email': '' } })

print('User after removing email:\n')
cursor = db.users.find({ '_id': id })
while (cursor.hasNext())
    printjson(cursor.next());

