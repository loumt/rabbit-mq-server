module.exports = {

    pool: {},

    put (id, mqChannel) {
        this.pool[id] = mqChannel
    },

    get (id) {
        if (id in this.pool)
            return this.pool[id]
    },

    del (id) {
        if (id in this.pool) {
            delete this.pool[id]
        }
    }

}