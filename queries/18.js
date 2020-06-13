db = db.getSiblingDB('social_network')

year_treshold = 65
year_query = { $subtract: [{ $year: new Date() }, { $year: '$birth_date' }] }

//Users who have more than 70 years old
cursor = db.users.aggregate([
    { $project: { 'years_old': year_query } },
    { $match: { 'years_old': { $gt: year_treshold } } }
])

print('Users who have more than ' + year_treshold + ' years old:\n')
while (cursor.hasNext())
    printjson(cursor.next());