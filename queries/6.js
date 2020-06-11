db = db.getSiblingDB('social_network')

test = db.users.aggregate([
    {
        $group: {
            '_id': {
                id: '$comments.post_id',
                size: {
                    $sum: 1
                }
            }
        }
    }
])

//printing results
while (test.hasNext())
    printjson(test.next());

// //Persons with biggest amount of comments:
// cursor = db.users.aggregate([
//     { $project: { '_id': 1, 'surname': 1, 'name': 1, 'sex': 1, 'number_of_comments': { $size: '$comments' } } },
//     { $match: { 'number_of_comments': biggest_comments_qty } },
// ])

// //printing results
// while (cursor.hasNext())
//     printjson(cursor.next());