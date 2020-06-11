db = db.getSiblingDB('social_network')

// persons with comments qty
cursor = db.users.aggregate([{
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
}])

//printing results
while (cursor.hasNext())
    printjson(cursor.next());