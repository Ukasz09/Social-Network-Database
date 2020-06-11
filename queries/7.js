db = db.getSiblingDB('social_network')

var projection = {
    "$project": {
        name: 1, surname: 1, birth_day: 1, sex: 1,
        "comments_qty": {
            "$sum": {
                "$map": {
                    "input": "$comments",
                    "in": { "$size": "$$this.comments_id" }
                }
            }
        }
    }
}

biggest_comments_qty = db.users.aggregate([
    projection,
    { $sort: { 'comments_qty': -1 } }
]).next().comments_qty


//Persons with biggest amount of comments (correct displayed even with more than one person with max qty of comments):
cursor = db.users.aggregate([
    projection,
    { $match: { 'comments_qty': biggest_comments_qty } }
])

//printing results
while (cursor.hasNext())
    printjson(cursor.next());