db = db.getSiblingDB('social_network')

var max_comments_query = {
    '$max': {
        '$map': {
            'input': '$comments',
            'in': { '$size': '$$this.comments_id' }
        }
    }
}

var projection = { '$project': { 'name': 1, 'surname': 1, 'birth_day': 1, 'sex': 1, 'max_qty': max_comments_query } }

qty = db.users.aggregate([
    projection,
    { $sort: { 'max_qty': -1 } }
]).next().max_qty


//Users with biggest amount of comments for one post (correct displayed even with more than one person with max qty of comments):
cursor = db.users.aggregate([
    projection,
    { $match: { 'max_qty': qty } }
])

print('User with biggest amount of comments for one post: \n')
while (cursor.hasNext())
    printjson(cursor.next());