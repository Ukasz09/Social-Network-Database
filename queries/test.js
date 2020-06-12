db = db.getSiblingDB('social_network')


cursor = db.users.find({ surname: 'Mckenzie-II' })


while (cursor.hasNext())
    printjson(cursor.next());