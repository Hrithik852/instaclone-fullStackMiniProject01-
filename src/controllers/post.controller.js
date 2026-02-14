const express=require('express')
const ImageKit=require('@imagekit/nodejs')
const { toFile }=require('@imagekit/nodejs')
const client=new ImageKit({
  privateKey: process.env.IMAGE_KIT, // This is the default and can be omitted
})
const createPostController=async(req,res)=>{
    const {caption}=req.body;
 console.log(req.body,req.file);
 const file=await client.files.upload({
     file: await toFile(Buffer.from(req.file.buffer), 'file'),
     fileName: 'test',
    });
    res.send(file)
}

module.exports={
    createPostController,
};