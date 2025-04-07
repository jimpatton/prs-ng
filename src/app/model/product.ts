import { Vendor } from "./vendor";

export class Product {
    id:number;
    vendor:Vendor;
    partNumber:string;
    name:string;
    price:number;
    unit:string|undefined;
    photopath:string|undefined;

    constructor (id:number = 0, vendor:Vendor = new Vendor, partNumber:string = '', name:string = '', price:number = 0, 
        unit:string = '', photopath:string = ''){
            this.id = id,
            this.vendor = vendor,
            this.partNumber = partNumber,
            this.name = name,
            this.price = price,
            this.unit = unit,
            this.photopath = photopath
        }      
}
