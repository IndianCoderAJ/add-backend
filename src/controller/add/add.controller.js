const addModel = require("../../Models/add.model");
const { getPagination,getPagingData,getFilter } = require("../../utils/paginations");
const { createAddSchema, updateAddSchema, listAddSchema, getSingleAddSchema, deleteAddSchema } = require("../../utils/validations/add.validation");
const { ValidationError}  = require('joi');
const {getMetadata} = require('page-metadata-parser');
const domino = require('domino');
const axios = require('axios');
const { dummyData } = require("../../utils/data");
const { getMetadataCustom } = require("../../utils/common");

// list add
exports.listHandler = async(req,res) => {
 try{
     await listAddSchema.validateAsync(req.body);

    const { limit, offset } = getPagination(req.body.page, req.body.perPage);

    const data = { rows: [], count: 0 };

    let filter = getFilter(req.body.filter);
    let sort = {}

    if(req.body.sort.field == 'created_at') {
        sort = {created_at:parseInt(`${req.body.sort.sort == "desc" ? -1:1}`)}
    }else if (req.body.sort.field == 'updated_at'){
        sort = {updated_at:parseInt(`${req.body.sort.sort == "desc" ? -1:1}`)}
    }

    data.rows = await addModel.find(filter)
    .sort(sort)
    .skip(offset)
    .limit(limit);

    data.count = await addModel.count(filter);
    const response = getPagingData(data, req.body.page, limit);

    return res.status(200).send({
        success: true,
        message: "Add's are fetched successfully.",
        data: response,
    });

 }catch(error){
   if (error instanceof ValidationError) {
           return res.status(400).json({
               error: error.message,
           });
       }
       console.log(error);
    res.sendStatus(500);
 }
}

// single add
exports.singleHandler = async(req,res) => {
 try{
    let {id} = req.params
    let singleAddData = await addModel.findOne({_id:id});

    if(!singleAddData){
        return res.status(401).json({
            error:"Add not found.",
            success:false,
            data:null
        })
    }

    return res.status(200).json({
        message:"Add found.",
        success:true,
        data:singleAddData
    })

 }catch(error){
    if (error instanceof ValidationError) {
        return res.status(400).json({
            error: error.message,
        });
    }
 res.sendStatus(500);
} 
 }

// create add
exports.createHandler = async(req,res) => {
 try{
     await createAddSchema.validateAsync(req.body);

    //get meta data..
    let {metadata} = await getMetadataCustom(req.body);
    req.body.metadata = metadata;
     let createAdd = await addModel.create({
         ...req.body
     }) 

     return res.status(200).json({
         message:"Add added successfully",
         success:true,
         data:createAdd
     })
     
 }catch(error){
     console.log(error);
    if (error instanceof ValidationError) {
        return res.status(400).json({
            error: error.message,
        });
    }
     if(error.code === 11000){
        return res.status(400).json({
            error: "Add with this name is already available in the system.",
        }); 
     }
    res.sendStatus(500);
 }
}

// update add
exports.updateHandler = async(req,res) => {
 try{
     await updateAddSchema.validateAsync(req.body);

    //  check name is exist.
    let existAdd = await addModel.findOne(
                                         {name:req.body.name,
                                         _id:{ $ne:req.body._id
                                        }});
    if(existAdd){
        return res.status(400).json({
            error:"Add with this name is already available in the system.",
            success:false
        })
    }

    let preAdd = await addModel.findOne({_id:req.body._id});

    if(!preAdd){
        return res.status(400).json({
            error:"Add not found.",
            success:false
        })
    }
    // check content url changed
    if(preAdd.content_url !== req.body.content_url){
        //get meta data..
        let {metadata} = await getMetadataCustom(req.body);
        req.body.metadata = metadata;
   }

     
     let updateAdd = await addModel.findOneAndUpdate({_id:req.body._id},{
         ...req.body
     }) 

     if(!updateAdd){
        return res.status(400).json({
            error:"Add not found.",
            success:false,
            data:null
        })
    } 

     return res.status(200).json({
         message:"Add updatted successfully",
         success:true,
         data:updateAdd
     })
     
 }catch(error){
     console.log(error);
    if (error instanceof ValidationError) {
        return res.status(400).json({
            error: error.message,
        });
    }
    res.sendStatus(500);
 }
}

// delete add.
exports.deleteHandler = async(req,res) => {
    try{
        await deleteAddSchema.validateAsync(req.body);
        
        let deleteAdd = await addModel.deleteOne({_id:req.body._id});

        if(!deleteAdd){
            return res.status(401).json({
                error:"Add not found.",
                success:false,
                data:null
            })
        } 
   
        return res.status(200).json({
            message:"Add deleted successfully",
            success:true,
            data:deleteAdd
        })
        
    }catch(error){
       if (error instanceof ValidationError) {
           return res.status(400).json({
               error: error.message,
           });
       }
       console.log(error);
       res.sendStatus(500);
    }
}

exports.dummyDataHandler = async(req,res) => {
  try {
     // delete all. 
      let finalData = []
      dummyData.forEach(async (element) => {
        finalData.push(getMetadataCustom(element))
     });
     Promise.all(finalData).then(async data => {
        await addModel.deleteMany();
        await addModel.insertMany(data);
        return res.status(200).json({
            message:`Data added successfully..`
        })
     })
  }catch(error){
      console.log(error);
    res.sendStatus(500);  
  }
}



