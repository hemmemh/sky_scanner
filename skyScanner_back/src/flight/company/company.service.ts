import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { companyArray } from 'src/data/dataForDb';
import { Company } from 'src/schemas/Company.schema';
import { Repository } from 'typeorm';
import * as path from 'path';
import * as fs from 'fs';
@Injectable()
export class CompanyService {
  constructor(
    @InjectRepository(Company)
    private CompanyRepo: Repository<Company>,
  ) {}

  async createCompany(company: Company) {
    try {
      return this.CompanyRepo.save(company);
    } catch (error) {
      return error;
    }
  }

  async getAll(): Promise<Company[]> {
    return this.CompanyRepo.find({});
  }

  async createMany(): Promise<Company[]> {
    const companyes = companyArray;

    const imagesDir = path.resolve(
      __dirname,
      '../../../src/data/company_images',
    );

    for (let i = 0; i < companyes.length; i++) {
      const company = companyes[i];

      const finded = await this.CompanyRepo.findOne({
        where: { name: company.name },
      });

      if (finded) {
        await this.CompanyRepo.save({ ...finded, image: `${i + 1}.png` });
      } else {
        await this.CompanyRepo.save({ ...company, image: `${i + 1}.png` });
      }
    }

    return this.getAll();
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
      const readStream = fs.createReadStream(oldPath);
      const writeStream = fs.createWriteStream(newPath);

      readStream.on('error', callback);
      writeStream.on('error', callback);

      readStream.on('close', function () {
        fs.unlink(oldPath, callback);
      });

      readStream.pipe(writeStream);
    }
  }
}
