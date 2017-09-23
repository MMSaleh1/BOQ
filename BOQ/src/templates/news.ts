export class News{
    private static URLNAME="http://services.edge-techno.com/boq";
    id :string ;
    title : string;
    content : string ;
    likeCount : number ; 
    dislikeCount : number;
    isliked : boolean;
    isdesliked : boolean;
    image : string;
    category : string;
    
    constructor(id:string="",title:string="",content:string="",likeCount:number=0,dislikeCount:number =0,image:string="" ,category : string= "-1"){
        this.id = id;
        this.title = title;
        this.content = content;
        this.likeCount = likeCount;
        this.dislikeCount = dislikeCount;
        this.isdesliked=false;
        this.isliked=false;
        this.image = (image !=null &&image.length > 0)?News.URLNAME+image.substring(1,image.length) : "";
        this.category = category;
    }

}
export class NewsCategory{
    private static  URLNAME="http://services.edge-techno.com/boq";
    name :String ;
    id : string;
    image : string;
    constructor(name : string="", id :string="",image:string =""){
        this.name= name;
        this.id = id ;
        this.image = (image !=null &&image.length > 0)?NewsCategory.URLNAME+image.substring(1,image.length) : "";
    }
}