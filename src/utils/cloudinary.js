const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: process.env.cloudinaryName,
    api_key: process.env.cloudinaryAPIKey,
    api_secret: process.env.cloudinaryAPISecret
})

module.exports = cloudinary;