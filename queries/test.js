db = db.getSiblingDB('social_network')

test = db.users.find({ 'name': 'Ivory', 'surname': 'Thomas' })


//printing results
while (test.hasNext())
    printjson(test.next());