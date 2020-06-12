db = db.getSiblingDB('social_network')

var word = 'cat'

// Posts containing given word 
cursor = db.posts.aggregate([{ $match: { 'content': { $regex: '.*' + word + '.*' } } }])

print('Posts with word "' + word + '":\n')
while (cursor.hasNext())
    printjson(cursor.next());