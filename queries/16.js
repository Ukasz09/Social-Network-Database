db = db.getSiblingDB('social_network')

var posts_qty = 5
var date_convert_query = { $dateToString: { format: '%Y-%m-%d', date: '$birth_date' } }
var projection = { $project: { 'name': 1, 'surname': 1, 'birth_date': date_convert_query, 'posts_qty': { $size: '$posts_id' } } }

// Users with at least <posts qty> of given posts qty 
cursor = db.users.aggregate([
    projection,
    { $match: { 'posts_qty': { $gte: posts_qty } } },
    { $sort: { 'posts_qty': -1 } }
])

print('Users with at least ' + posts_qty + ' posts qty ')
while (cursor.hasNext())
    printjson(cursor.next());