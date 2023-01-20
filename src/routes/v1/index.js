const AuthRoute = require('./auth.route');
const CategoryRoute = require('./category.route');
const ModifierRoute = require('./modifier.route');
const ItemRoute = require('./item.route');
const StoreRoute = require('./store.route');  

module.exports = (app) => {
    app.use('/api/v1/auth', AuthRoute);
    app.use('/api/v1/category', CategoryRoute);
    app.use('/api/v1/modifier-group', ModifierRoute);
    app.use('/api/v1/item', ItemRoute);
    app.use('/api/v1/store', StoreRoute);
}