
export class Resturant {
    private  URLNAME="http://services.edge-techno.com/boq";
    
    public name: string;
    public id: string;
    public des : string;
    public image: string;
    public category : string;
    public products : Product[];
    
    constructor(name = "" , id = "" , des = "" , imageUrl = "" , products = [new  Product()],Category = ""){
        this.name = name ;
        this.id = id ;
        this.des = des ; 
        this.image = ( imageUrl !=null &&imageUrl.length > 0 )?this.URLNAME+imageUrl.substring(1,imageUrl.length) : "";
        this.products = products ;
        this.category= Category;
    }


}


export class Product {
    private  URLNAME="http://services.edge-techno.com/boq";

    public name:any;
    public imageUrl:any;
    public price : number;
    public des : any;
    public id :string;
    public quantity: number;
    public category: Category;
    public PosId: string;

    constructor(name = "" , imageUrl = "" , price = 0 , des = "" , id = "-1" , quantity = 0 , category= new Category(),POSId = "-1"){
        this.category = category;
        this.des = des;
        this.id = id;
        this.imageUrl = (imageUrl != null &&imageUrl.length > 0 )?this.URLNAME+imageUrl.substring(1,imageUrl.length) : "";
        this.name = name;
        this.price = price;
        this.quantity = quantity;
        this.PosId = POSId;

    }

}
export class Category{
    name :string;
    id : string;
    constructor(name= "",id='-1'){
        this.name=name;
        this.id=id;
    }
}
export class PosCategory{
    private  URLNAME="http://services.edge-techno.com/boq";
    name : string ;
    id : string ;
    image : string;
    constructor(name: string ,id:string,image:string){
        this.name=name;
        this.id=id;
        this.image=(image != null &&image.length > 0 )?this.URLNAME+image.substring(1,image.length) : "";
    }
}