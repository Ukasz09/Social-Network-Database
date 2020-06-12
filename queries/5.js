db = db.getSiblingDB('social_network')

var comments_qty_query = {
    '$sum': {
        '$map': {
            'input': '$comments',
            'in': { '$size': '$$this.comments_id' }
        }
    }
}

// Users with comments qty
cursor = db.users.aggregate([
    { '$project': { name: 1, surname: 1, birth_day: 1, sex: 1, 'comments_qty': comments_qty_query } },
    { '$sort': { 'comments_qty': 1 } }
])

print('Users with given comments qty:')
while (cursor.hasNext())
    printjson(cursor.next());