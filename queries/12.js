db = db.getSiblingDB('social_network')

var projection = { $project: { 'user_id': 1, 'content': 1, 'comments_qty': { $size: '$comments' } } }
var sort = { $sort: { 'comments_qty': -1 } }

qty = db.posts.aggregate([projection, sort]).next().comments_qty

var matcher = { $match: { 'comments_qty': qty } }

//Posts with biggest amount of comments (correct displayed even with more than one person with max qty of comments):
cursor = db.posts.aggregate([projection, matcher, sort])

print('Posts with biggest amount of comments: \n')
while (cursor.hasNext())
    printjson(cursor.next());