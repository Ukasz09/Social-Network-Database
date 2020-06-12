db = db.getSiblingDB('social_network')

// Amount of all comments from application 
cursor = db.posts.aggregate([
    { $project: { 'comments_qty': { $size: '$comments' }, } },
    { $group: { _id: null, sum: { $sum: '$comments_qty' } } }
])

print('Amount of all comments in database: \n')
while (cursor.hasNext())
    printjson(cursor.next());