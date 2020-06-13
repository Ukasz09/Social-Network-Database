// Adding email to user
db = db.getSiblingDB('social_network')

id = db.users.find({}, { '_id': 1 }).next()._id

db.users.update({ '_id': id }, { $set: { 'email': id + '@gmail.com' } })

print('User after adding email:\n')
cursor = db.users.find({ '_id': id })
while (cursor.hasNext())
    printjson(cursor.next());

