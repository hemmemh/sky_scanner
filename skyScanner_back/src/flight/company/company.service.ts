import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { companyArray } from 'src/data/dataForDb';
import { Company } from 'src/schemas/Company.schema';
import { Repository } from 'typeorm';
import {v4} from 'uuid'
import * as path from 'path'
import * as fs from 'fs';
@Injectable()
export class CompanyService {

    constructor(
        @InjectRepository(Company)
        private CompanyRepo: Repository<Company>,
    ){}

   async  createCompany(company:Company){
      try {
        return this.CompanyRepo.save(company)
      } catch (error) {
        return error
      }
    }

    async getAll(): Promise<Company[]> {
        return this.CompanyRepo.find({})
      }  


    async createMany(): Promise<Company[]> {
        const companyes = companyArray
     
        const imagesDir = path.resolve(__dirname, '../../../src/data/company_images');
    
        for (let i = 0; i < companyes.length; i++) {
          const company = companyes[i];
          const imagePath = v4() + '.png'
          const destinationPath = path.resolve(__dirname, '../../../src/static/companies', imagePath); // Измените путь назначения
  
          const filePath = path.join(imagesDir, `${i + 1}.png`);
          console.log('dd',filePath, destinationPath );
          
          this.move(filePath, destinationPath,(e:any)=>{console.log('ee', e);
          })
          const finded = await this.CompanyRepo.findOne({where:{name:company.name}})

          if (finded){
            await this.CompanyRepo.save({...finded, image:imagePath});
          }else{
            await this.CompanyRepo.save({...company, image:imagePath});
          }
         
        }
  
     
         return this.getAll()
      }

       move(oldPath, newPath, callback) {
        fs.rename(oldPath, newPath, function (err) {
            if (err) {
                if (err.code === 'EXDEV') {
                    copy();
                } else {
                    callback(err);
                }
                return;
            }
            callback();
        });
    
        function copy() {
            var readStream = fs.createReadStream(oldPath);
            var writeStream = fs.createWriteStream(newPath);
    
            readStream.on('error', callback);
            writeStream.on('error', callback);
    
            readStream.on('close', function () {
                fs.unlink(oldPath, callback);
            });
    
            readStream.pipe(writeStream);
        }
    }

}
