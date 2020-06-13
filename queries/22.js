//post's content longer than <num>
db = db.getSiblingDB('social_network')

min_length = 60
cursor = db.posts.aggregate([
    { $project: { 'content_length': { $strLenCP: '$content' } } },
    { $match: { 'content_length': { $gt: min_length } } },
    { $sort: { 'content_length': -1 } }
])

print(':\n')
while (cursor.hasNext())
    printjson(cursor.next());

