import * as fs from 'fs';
import * as path from 'path';
import * as csv from 'fast-csv';
import { Customer } from '../config/db';
import { stringify } from 'querystring';

exports.uploadfile = (req, res) => {
    try{
        const customers = [];
        fs.createReadStream(__basedir + "/uploads/" + feq.file.filename)
        .pipe(csv.parse({headers: true}))
      
        .on('error', error => {
            console.error(error);
            throw error.message;
        })
        .on("data", row =>{
            customers.push(row);
            console.log(row);
        })
        .on("end", () => {
            Customer.bulkCreate(customers).then(() => {
                const result = {
                    status : "oke",
                    filename : req.file.originalname,
                    message : "Successfully Uploads Data!!",
                }
                res.json(result);
            });
        });
    } catch(error){
        const result = {
            status : "failed",
            filename : req.file.originalname,
            message : "Error Uploads Data = " + error.message
        }
        res.json(result);
    } 
}

exports.uploadMultiplefiles = async (req, res) => {
    const messages = [];

    for(const file of req.files) {
        try{
            const csvParserStream = fs.createReadStream(__basedir + "/uploads" + file.filename)
            .pipe(csv.parse({headers : true}));

            var end = new Promise(function(resolve, reject){
                let customers = [];

                csvParserStream.on("data", object => {
                    customers.push(object);
                    console.log(object);
                });
                csvParserStream.on("end", () => {
                    resolve(customers);
                });
                csvParserStream.on("error", error => {
                    console.error(error);
                    reject()
                })
            })
            await (async function(){
                let customers = await end;

                await Customer.bulkCreate(customers).then(() =>{
                    const result = {
                        status : "oke successfullyy",
                        filename : file.originalname,
                        message: "Upload Successfully!",
                    }
                    messages.push(result);
                });
            }());
        } catch(error){
            console.log(error);

            const result = {
                status : "failed",
                filename : file.original.filename,
                message : "Error ->" + error.message
            }
            messages.push(result);
        }
    }
    return res.json(messages);
}

exports.downloadfile = (req, res) => {
    Customer.findAll({attributes: ['id', "name", "address", "age"]}).them(objects => {
        const jsonCustomers = JSON.parse(JSON, stringify(objects));
        const csvfields = ["id", "name", "address", "age"];
        const json2csvParser = new json2csvParser.parser({ csvfields });
        const csvData = json2csvParser.parser(jsonCustomers);

        res.setHeader("content-disposition", "attachement; filename-customers.csv");
        res.set("Content-Type", "text/csv");
        res.status(200).end(csvData);
    })
}

