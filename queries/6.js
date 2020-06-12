db = db.getSiblingDB('social_network')

var projection = {
    "$project": {
        name: 1, surname: 1, birth_day: 1, sex: 1,
        "max_comments_qty_to_post": {
            "$max": {
                "$map": {
                    "input": "$comments",
                    "in": { "$size": "$$this.comments_id" }
                }
            }
        }
    }
}

max_comments_qty_to_post = db.users.aggregate([
    projection,
    { $sort: { 'max_comments_qty_to_post': -1 } }
]).next().max_comments_qty_to_post


//Persons with biggest amount of comments for one post (correct displayed even with more than one person with max qty of comments):
cursor = db.users.aggregate([
    projection,
    { $match: { 'max_comments_qty_to_post': max_comments_qty_to_post } }
])

//printing results
while (cursor.hasNext())
    printjson(cursor.next());