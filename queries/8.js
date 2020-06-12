db = db.getSiblingDB('social_network')

//woman with surname started with G
cursor = db.users.aggregate([
    { $match: { surname: { $regex: 'G.*' }, sex: 'W' } },
    { $project: { name: 1, surname: 1, 'birth_date': { $dateToString: { format: "%Y-%m-%d", date: "$birth_date" } } } }
])

while (cursor.hasNext())
    printjson(cursor.next());