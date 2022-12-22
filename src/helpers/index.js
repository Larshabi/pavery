const _= require('lodash');

exports.filterJwtPayload = (payload)=>{
    return _.pick(payload, ['_id', 'role', 'email'])
}