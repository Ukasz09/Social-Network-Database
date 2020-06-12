db = db.getSiblingDB('social_network')

//Users born between date [1980-06-12 ; 1985-06-12]  
cursor = db.users.find({
    birth_date: {
        $gt: new Date('1980-06-12'),
        $lt: new Date('1981-01-12')
    }
}, { name: 1, surname: 1, sex: 1, birth_date: 1 })


while (cursor.hasNext())
    printjson(cursor.next());