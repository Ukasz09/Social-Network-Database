db = db.getSiblingDB('social_network')

var date_format_query = { format: '%Y-%m-%d', date: '$birth_date' }

//Women with surname started with G
cursor = db.users.aggregate([
    { $match: { 'surname': { $regex: 'G.*' }, 'sex': 'W' } },
    { $project: { 'name': 1, 'surname': 1, 'birth_date': { $dateToString: date_format_query } } }
])

print('Women with surname started with G')
while (cursor.hasNext())
    printjson(cursor.next());