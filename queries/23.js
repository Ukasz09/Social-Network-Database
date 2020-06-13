//Adding new field 'likes' with random value to each post

db = db.getSiblingDB('social_network')

min_likes = 0
max_likes = db.users.find({}).count()
rand_likes = () => Math.floor(Math.random() * (max_likes - min_likes)) + min_likes //to make it lazy

//This will add the same likes value to each element, because query is proceeded once  

// db.posts.updateMany({}, { $set: { 'likes': rand_likes() } })

//..so we use this intead

posts_id = []
db.posts.find({}).forEach(function (post) { posts_id.push(post._id); })

update_query = (id) => db.posts.update({ '_id': id }, { $set: { 'likes': rand_likes() } })
posts_id.forEach(id => update_query(id))

cursor = db.posts.find({})
print('After update: \n')
while (cursor.hasNext())
    printjson(cursor.next());