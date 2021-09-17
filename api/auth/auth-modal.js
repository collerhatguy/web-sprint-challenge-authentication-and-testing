const db = require("../../data/dbConfig")

const getAll = () => db("users")

const findBy = filter => {
    return getAll()
        .where(filter)
}

const findById = id => {
    return findBy({ id }).first()
}

const create = user => {
    return getAll()
        .insert(user)
        .then(([id]) => findById(id))
}


module.exports = {
    getAll, 
    findBy,
    create
}
