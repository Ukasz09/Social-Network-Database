db = db.getSiblingDB('social_network')

var comments_qty_query = {
    '$sum': {
        '$map': {
            'input': '$comments',
            'in': { '$size': '$$this.comments_id' }
        }
    }
}

var projection = { "$project": { 'name': 1, 'surname': 1, 'birth_day': 1, 'sex': 1, 'comments_qty': comments_qty_query } }

qty = db.users.aggregate([
    projection,
    { $sort: { 'comments_qty': -1 } }
]).next().comments_qty


//Users with biggest total amount of comments (correct displayed even with more than one person with max qty of comments):
cursor = db.users.aggregate([
    projection,
    { $match: { 'comments_qty': qty } }
])

print('Users with biggest total amount of comments:\n')
while (cursor.hasNext())
    printjson(cursor.next());