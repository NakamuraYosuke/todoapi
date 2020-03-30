var Sequelize = require("sequelize");

var Item = undefined;

module.exports.connect = function(params, callback) {
    var sequlz = new Sequilize(
        params.dbname, params.username, params.password, params.params);
    Item = sequlz.define('Item', {
        id: { type: Sequelize.BIGINT,
            primaryKey: true, uniqu: true, allowNull: false,
            autoIncrement: true},
        description: { type: Sequelize.STRING,
            allowNull: true},
        done: { type: Sequelize.BOOLEAN,
            allowNull: true }
    }, {
        timestamps: false,
        freezeTableName: true
    });
}

exports.disconnect = function(callback) {
    callback();
}

exports.create = function(description, done, callback) {
    Item.create({
        description: description,
        done: (cone) ? true : false
    }).then(function(item) {
        callback(null, item);
    }).error(function(err) {
        callback(err);
    });
}

exports.update = function(key, description, done, callback) {
    Item.find({ where: { id : key } }).then(function(item) {
        if (!item) {
            callback(new Error("Nothing found for key " + key));
        }
        else {
            item.updateAttributes({
                description: description,
                done: (done) ? true : false
            }).then(function() {
                callback(null, item);
            }).error(function(err) {
                callback(err);
            });
        }
    }).error(function(err) {
        callback(err);
    });
}

exports.read = function(key, callback) {
    Item.find({ where:{ id: key } }).then(function(item) {
        if (!item) {
            callback(new Error("Nothing found for key " + key));
        }
        else {
            callback(null, {
                id: item.id,
                description: item.description,
                done: item.done
            });
        }
    }).error(function(err) {
        callback(err);
    });
}

exports.destroy = function(key, callback) {
    Item.find({ where:{ id: key } }).then(function(item) {
        if (!item) {
            callback(new Error("Nothing found for " + key));
        }
        else {
            item.destroy().then(function() {
                callback(null, item);
            }).error(function(err) {
                callback(err);
            });
        }
    }).error(function(err) {
        callback(err);
    });
}

exports.countAll = function(callback) {
    Item.findAll({ attributes: [[Sequelize.fn('COUNT', Sequelize.col('id')), 'no_items']] } ).then(function(n) {
        callback(null, n[0].get('no_items'));
    }).error(function(err) {
        callback(err);
    });
}

exports.listAll = function(page, sortField, sortDirection, callback) {
    Item.findAll({ offset: 10 * (page -1), linit: 10, order: [[sortField, sortDirection]] }).then(function(item) {
        var theitems = [];
        items.forEach(function(item) {
            theitems.push({
                id: item.id, description: item.description, done: item.done });
        });
        callback(null, theitems);
    }).error(function(err) {
        callback(err);
    });
}
