!function () {
    var config={
        "html":{
            "tit":{
                "tit-out":'<div class="col">#out</div>',
                "tit-title":'<h4><a>#title</a></h4><ul>#con</ul>',
                "tit-con":'<li><a href="##id">#text</a></li>'
            },
            "con":{
                "con-tit":'<div class="heading"><h2>#outtit</h2></div>',
                "con-con":'<div class="section" id="#id"><div class="col"><h3>#tit</h3><p>#con</p></div>',
                "con-code":'<div class="col"><div class="highlight"><pre><code>#code</code></pre></div></div></div>',
                "con-code-empty":'<div><div></div></div></div>'
            }

        }
    },
    Base=new base();
    //Prism.highlightElement(Base.hasTypeDom["asdasd"]);
    function setRandom() {
        return Math.ceil(Math.random() * 1000000000) + "-jump";
    }
    function reSetData(d){

        d=d.split("↳1");

        var ldata={},i=0,n=d.length;
        for(;i<n;i++){
            d[i]=d[i].split("↳2")
            ldata[d[i][0]]={}
            var x=1,y=d[i].length;
            for(;x<y;x++){

                d[i][x]=d[i][x].split("↳3")
                ldata[d[i][0]][d[i][x][0]]=d[i][x][1]
            }

        }
        return ldata
    }
    function setNav(data){
        var i=0,n=data.length,s=config.html.tit,tit,con,dataIndex,out,outCon=[];
        for(;i<n;i++){
            con=[]
            dataIndex=data[i]
            tit=s["tit-title"].forMat({"#title":dataIndex["title"]})

            for(var x=0,m=dataIndex["con"].length,dataIndexCon;x<m;x++){
                dataIndexCon=dataIndex["con"][x]
                con.push(s["tit-con"].forMat({"#id":dataIndexCon["id"],"#text":dataIndexCon["text"]}))
            }
            tit=tit.forMat({"#con":con.join("")})
            out=s["tit-out"].forMat({"#out":tit})
            outCon.push(out)
        }
        return outCon.join("")
    }
    function setTit(data){
        var a,tit,con,code,outCon=[],titCon=[],titlData;
        for(a in data){
            titlData={}
            tit=config["html"]["con"]["con-tit"].forMat({"#outtit":a})
            titlData["title"]=a
            titlData["con"]=[];
            outCon.push(tit)
            var b,l,ld=data[a],random;
            for(b in ld){
                random=setRandom()
                con=config["html"]["con"]["con-con"].forMat({"#tit":b,"#id":random})
                titlData["con"].push({"id":random,"text":b})
                l=ld[b].split("↳4")

                con=con.forMat({"#con":l[0]})
                l[1]=l[1].replace(/</g,"&lt;").replace(/>/g,"&gt")
                code=l[1].length>5?config["html"]["con"]["con-code"].forMat({"#code":l[1]}):config["html"]["con"]["con-code-empty"]
                outCon.push(con,code);
            }
            titCon.push(titlData)
        }
console.log(titCon)
        return {
            "titCon":titCon,
            "outCon":outCon.join("")
        }
    }
    // Base.getData({
    //
    //     url:"scripts/title.json",
    //     dataType:"json",
    //     callback:function(data){
    //         Base.hasTypeDom["head-tit"].innerHTML=setNav(data)
    //     }
    // })

    Base.getData({

        url:"scripts/details.txt",
        callback:function(data){
            data=reSetData(data)
            data=setTit(data)

            Base.hasTypeDom["head-tit"].innerHTML=setNav(data["titCon"])

            Base.hasTypeDom["con-code"].innerHTML=data["outCon"]
            hljs.initHighlightingOnLoad();
        }
    })

}()
