db = db.getSiblingDB('social_network')

var min_date = new Date('1980-06-12')
var max_date = new Date('1981-01-12')

//Users born between date [min_date ; max_date]  
cursor = db.users.find(
    { birth_date: { $gt: min_date, $lt: max_date } },
    { 'name': 1, 'surname': 1, 'sex': 1, 'birth_date': 1 }
)

var print_date = (date) => date.getFullYear() + '-' + (date.getUTCMonth() + 1) + '-' + date.getUTCDate()
print('Users born between date [' + print_date(min_date) + ' ; ' + print_date(max_date) + ']: \n')
while (cursor.hasNext())
    printjson(cursor.next());