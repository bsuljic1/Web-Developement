const fs = require('fs');
module.exports=function(app){
    
app.get("/v1/predmeti", function(req, res){
    fs.readFile('predmeti.txt', function(error, data) {
        if(error) throw error;
        else{
            let predmeti = data.toString().split(/\r?\n/);
            let predmetiJson = [];
            for(var i = 0; i < predmeti.length; i++)
            if(predmeti[i]!='')
                predmetiJson.push({naziv : predmeti[i]});
            return res.json(predmetiJson);
        }
      });
});


app.get("/v1/aktivnosti", function(req, res){
    fs.readFile('aktivnosti.txt', function(error, data) {
        if(error) throw error;
        else{
            let aktivnosti = data.toString().split(/\r?\n/);
            let aktivnostiJson = [];
            for(var i = 0; i < aktivnosti.length; i++){
                let linija = aktivnosti[i].split(",");
                if(linija!='')
                aktivnostiJson.push({naziv:linija[0],tip:linija[1],pocetak:linija[2],kraj:linija[3],dan:linija[4]});
            }
            return res.json(aktivnostiJson);
        }
      });
});


app.get("/v1/predmet/:naziv/aktivnost", function(req, res){
    fs.readFile('aktivnosti.txt', function(error, data) {
        if(error) throw error;
        else{
            let aktivnosti = data.toString().split(/\r?\n/);
            let aktivnostiJson = [];
            for(var i = 0; i < aktivnosti.length; i++){
                let linija = aktivnosti[i].split(",");
                if(linija[0] == req.params.naziv && linija!='')
                    aktivnostiJson.push({naziv : linija[0],tip:linija[1],pocetak:linija[2],kraj:linija[3],dan:linija[4]});
            }
            return res.json(aktivnostiJson);
        }
      });
});


app.post("/v1/predmet", function(req, res){
    let tijelo = req.body;
    let novaLinija = tijelo['naziv'] + '\n';

    fs.readFile('predmeti.txt', function(error, data) {
        if(error) throw error;
        else{
            let predmeti = data.toString().split(/\r?\n/);
            let postojiPredmet = false;
            for(var i = 0; i < predmeti.length; i++){
                if(predmeti[i] == tijelo['naziv']){
                    postojiPredmet = true;
                    return res.json({message:"Naziv predmeta postoji!"});
                }
            }
            if(postojiPredmet == false){
                fs.appendFile('predmeti.txt', novaLinija, function(err){
                    if(err) throw err;
                 });
                 return res.json({message:"Uspješno dodan predmet!"});
            }
        }
      });
});


app.post("/v1/aktivnost", function(req, res){
    let tijelo = req.body;
    let pocetak = Number(tijelo['pocetak']);
    let kraj = Number(tijelo['kraj']);
    let novaLinija = tijelo['naziv'] + "," + tijelo['tip'] + "," + pocetak + "," + kraj + "," + tijelo['dan'] + '\n';
    
    //validacija
    if(!(pocetak >= 8 && pocetak <= 20) 
        || !(kraj >= 8 && kraj <= 20) 
        || pocetak >= kraj
        || (pocetak % 1 != 0 && pocetak % 1 != 0.5) 
        || (kraj % 1 != 0 && kraj % 1 != 0.5)) 
          return res.json({message:"Aktivnost nije validna!"})
    
    else{
        fs.readFile('aktivnosti.txt', function(error, data) {
        if(error) throw error;
        else{
            let aktivnosti = data.toString().split(/\r?\n/);
            let postojiAktivnost = false;
            for(var i = 0; i < aktivnosti.length; i++){
                let linija = aktivnosti[i].split(",");
                if(linija[4] == tijelo['dan'] &&
                 ((linija[2] <= pocetak && linija[3] >= kraj)
                || (linija[2] >= pocetak && linija[3] >= kraj)
                || (linija[2] <= pocetak && linija[2] < kraj && linija[3] >= kraj) )) 
                {
                    postojiAktivnost = true;
                    return res.json({message:"Aktivnost nije validna!"});
                }
            }
            if(postojiAktivnost == false){
                fs.appendFile('aktivnosti.txt', novaLinija, function(err){
                    if(err) throw err;
                 });
                return res.json({message:"Uspješno dodana aktivnost!"});
            }
        }
      });
    }
});



app.delete("/v1/aktivnost/:naziv", function(req, res){
    fs.readFile('aktivnosti.txt', function(error, data) {
        if(error) throw error;
        else{
            let aktivnosti = data.toString().split(/\r?\n/);
            for(var i = 0; i < aktivnosti.length; i++){
                let linija = aktivnosti[i].split(",");
                if(linija[0] == req.params["naziv"]){
                    aktivnosti.splice(i, 1);
                    if(i != 0) i--;
                }
            }

            if(aktivnosti.length == data.toString().split(/\r?\n/).length)
                 return res.json({message:"Greška - aktivnost nije obrisana!"});
        
            let sadrzaj = "";
            for(var i = 0; i < aktivnosti.length; i++)
                if(aktivnosti[i].toString() != "") sadrzaj += aktivnosti[i].toString() + '\n';

            fs.writeFile('aktivnosti.txt', sadrzaj, function(error){
                if(error)
                    return res.json({message:"Greška - aktivnost nije obrisana!"});
                else
                    return res.json({message:"Uspješno obrisana aktivnost!"});
            });
        }
      });
});



app.delete("/v1/predmet/:naziv", function(req, res){
    fs.readFile('predmeti.txt', function(error, data) {
        if(error) throw error;
        else{
            let predmeti = data.toString().split(/\r?\n/);
            for(var i = 0; i < predmeti.length; i++){
                if(predmeti[i] == req.params["naziv"]){
                    predmeti.splice(i, 1);
                    if(i != 0) i--;
                }
            }

            if(predmeti.length == data.toString().split(/\r?\n/).length)
                return res.json({message:"Greška - predmet nije obrisan!"});
        
            let sadrzaj = "";
            for(var i = 0; i < predmeti.length; i++)
                if(predmeti[i].toString() != "")sadrzaj += predmeti[i].toString() + '\n';

            fs.writeFile('predmeti.txt', sadrzaj, function(error){
                if(error)
                    return res.json({message:"Greška - predmet nije obrisan!"});
                else
                    return res.json({message:"Uspješno obrisan predmet!"});
            });
        }
      });
});


app.delete("/v1/all", function(req, res){
    sadrzaj = "";
    fs.writeFile('predmeti.txt', sadrzaj, function(error){
        if(error)
            return res.json({message:"Greška - sadržaj datoteka nije moguće obrisati!"});
        else{
            fs.writeFile('aktivnosti.txt', sadrzaj, function(error){
                if(error)
                    return res.json({message:"Greška - sadržaj datoteka nije moguće obrisati!"});
                else
                    return res.json({message:"Uspješno obrisan sadržaj datoteka!"});
            });
        }
    });
   
});

}