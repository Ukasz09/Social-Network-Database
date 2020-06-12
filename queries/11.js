db = db.getSiblingDB('social_network')

db.users.remove({ surname: 'Mckenzie-II' })

db.users.insert({
    "surname": "Mckenzie-II",
    'name': 'Bransonson',
    'birth_date': "1982-12-31T00:00:00.000Z",
    'posts_id': []
})

// all users without posts
cursor = db.users.find({ $or: [{ posts_id: { $eq: [] } }, { posts_id: { $exists: false } }] })


while (cursor.hasNext())
    printjson(cursor.next());