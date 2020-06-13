db = db.getSiblingDB('social_network')

// Amount of users with the same name
cursor = db.users.aggregate([{ $group: { _id: "$name", qty: { $sum: 1 } } }])

print('Amount of users with the same name:\n')
while (cursor.hasNext())
    printjson(cursor.next());