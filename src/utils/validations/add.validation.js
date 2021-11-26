const Joi = require('joi');


exports.createAddSchema = Joi.object().keys({
    name:Joi.string().required(),
    type:Joi.string().valid('IMAGE_AD','VIDEO_AD'),
	content_url: Joi.string().required(),
    heading:Joi.string().max(30).required(),
    primary_text:Joi.string().max(120).required(),
    destination_url:Joi.string().required(),
    // metadata:Joi.string().required(),
});

exports.updateAddSchema = Joi.object().keys({
    _id:Joi.string().required(),
    name:Joi.string().required(),
    type:Joi.string().valid('IMAGE_AD','VIDEO_AD'),
	content_url: Joi.string().required(),
    heading:Joi.string().max(30).required(),
    primary_text:Joi.string().max(120).required(),
    destination_url:Joi.string().required(),
    // metadata:Joi.string().required(),
});


exports.getSingleAddSchema = Joi.object().keys({
    _id:Joi.string().required(),
});

exports.deleteAddSchema = Joi.object().keys({
    _id:Joi.string().required(),
});

exports.listAddSchema = Joi.object().keys({
    page:Joi.number().required(),
    perPage:Joi.number().required(),
    filter:Joi.object().required(),
    sort:Joi.object().required(),
});