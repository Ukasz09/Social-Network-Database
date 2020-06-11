db = db.getSiblingDB('social_network')

biggest_posts_qty = db.users.aggregate([
    { $project: { '_id': 0, 'number_of_posts': { $size: '$posts_id' } } },
    { $sort: { 'number_of_posts': -1 } },
    { $limit: 1 }
]).next().number_of_posts

//Persons with biggest amount of posts (correct displayed even with more than one person with max qty of posts):
cursor = db.users.aggregate([
    { $project: { '_id': 1, 'surname': 1, 'name': 1, 'sex': 1, 'number_of_posts': { $size: '$posts_id' } } },
    { $match: { 'number_of_posts': biggest_posts_qty } },
])

//printing results
while (cursor.hasNext())
    printjson(cursor.next());