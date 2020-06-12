db = db.getSiblingDB('social_network')

// preparing date (to make sure that at least one person have no posts)
db.users.remove({ 'surname': 'Mckenzie-II' })
db.users.insert({
    "surname": "Mckenzie-II",
    'name': 'Bransonson',
    'birth_date': new Date(1982, 12, 31),
    'posts_id': []
})

// All users without posts
cursor = db.users.find({ $or: [{ 'posts_id': { $eq: [] } }, { 'posts_id': { $exists: false } }] }, { 'posts_id': 0 })

print('Users without posts: \n')
while (cursor.hasNext())
    printjson(cursor.next());