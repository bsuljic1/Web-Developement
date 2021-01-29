const baza = require('./baza');
const Predmet = baza.models.Predmet;
const Aktivnost = baza.models.Aktivnost;
const Grupa = baza.models.Grupa;
const Tip = baza.models.Tip;
const Dan = baza.models.Dan;
const Student = baza.models.Student;

module.exports = function(app) {
    /*GET METODE*/
    app.get("/v2/predmet", async(req, res) => {
        let PredmetiJson = await Predmet.findAll();
        return res.json(PredmetiJson);  
    });
 
    app.get("/v2/grupa", async(req, res) => {
        let grupeJson = await Grupa.findAll();
        return res.json(grupeJson);      
    });

    app.get("/v2/aktivnost", async(req, res) => {
        let AktivnostiJson = await Aktivnost.findAll();
        return res.json(AktivnostiJson);  
    });

    app.get("/v2/dan", async(req, res) => {
        let DaniJson = await Dan.findAll();
        return res.json(DaniJson);  
    });

    app.get("/v2/tip", async(req, res) => {
        let TipoviJson = await Tip.findAll();
        return res.json(TipoviJson);  
    });
    
    app.get("/v2/student", async(req, res) => {
        let StudentiJson = await Student.findAll();
        return res.json(StudentiJson);  
    });


    /*GET METODE PO ID*/

    app.get('/v2/predmet/:id', async (req, res) => {
        return Predmet.findOne({
            where: {
                id: req.params.id 
            }
        }).then((predmet) => {
            if (!predmet) 
                return res.json({ message: "Predmet ne postoji!" });
            else 
                return res.json(predmet);
        });
    });

    app.get('/v2/grupa/:id', async (req, res) => {
        return Grupa.findOne({
            where: {
                id: req.params.id 
            }
        }).then((grupa) => {
            if (!grupa) 
                return res.json({ message: "Grupa ne postoji!" });
            else 
                return res.json(grupa);
        });
    });

    app.get('/v2/aktivnost/:id', async (req, res) => {
        return Aktivnost.findOne({
            where: {
                id: req.params.id 
            }
        }).then((aktivnost) => {
            if (!aktivnost) 
                return res.json({ message: "Aktivnost ne postoji!" });
            else 
                return res.json(aktivnost);
        });
    });

    app.get('/v2/dan/:id', async (req, res) => {
        return Dan.findOne({
            where: {
                id: req.params.id 
            }
        }).then((dan) => {
            if (!dan) 
                return res.json({ message: "Dan ne postoji!" });
            else 
                return res.json(dan);
        });
    });

    app.get('/v2/tip/:id', async (req, res) => {
        return Tip.findOne({
            where: {
                id: req.params.id 
            }
        }).then((tip) => {
            if (!tip) 
                return res.json({ message: "Tip ne postoji!" });
            else 
                return res.json(tip);
        });
    });

    app.get('/v2/student/:id', async (req, res) => {
        return Student.findOne({
            where: {
                id: req.params.id 
            }
        }).then((student) => {
            if (!student) 
                return res.json({ message: "Student ne postoji!" });
            else 
                return res.json(student);
        });
    });


    /*POST METODE*/

    app.post("/v2/predmet", async(req, res) => {
        try{
            let noviPredmet = await Predmet.create(req.body);
            return res.json({message:"Uspješno dodan predmet!"});  
        }
        catch(error){
            return res.json({message: "Već postoji predmet sa tim nazivom!"});
        }
    });

    app.post("/v2/grupa", async(req, res) => {
        return Grupa.findOne({
            where: {
             PredmetId: req.body.PredmetId,
             naziv: req.body.naziv
            }
           }).then(async(postoji) => { 
            if (!postoji) {
                try{
                    await Grupa.create(req.body).then(gr => { return res.json(gr);})
                }
                catch{
                    return res.json({message: "Ne postoji predmet sa tim idom!"});
                }
            }
            else
             res.json({ message:"Grupa vec postoji!"});
           });
    });

    app.post("/v2/aktivnost", async(req, res) => {
        let pocetak = req.body.pocetak;
        let kraj = req.body.kraj;

        //validacija vremena
        if(!(pocetak >= 8 && pocetak <= 20) 
            || !(kraj >= 8 && kraj <= 20) 
            || pocetak >= kraj
            || (pocetak % 1 != 0 && pocetak % 1 != 0.5) 
            || (kraj % 1 != 0 && kraj % 1 != 0.5)) 
                return res.json({message:"Aktivnost nije validna!"});
         
        //dobavljamo sve aktivnosti na taj dan iz baze
        let aktivnosti = await Aktivnost.findAll({
            where:{
                DanId: req.body.DanId
            }
        });

        //provjeravamo da li postoji preklapanje aktivnosti
        let postojiAktivnost = false;
        for(var i = 0; i < aktivnosti.length; i++){
            let aktivnost = aktivnosti[i];
            let p = aktivnost.pocetak;
            let k = aktivnost.kraj;
            if((p <= pocetak && k >= kraj)
                || (p >= pocetak && k >= kraj)
                || (p <= pocetak && p < kraj && k >= kraj)){
                    postojiAktivnost = true;
                    return res.json({message:"Aktivnost nije validna!"});
                }
        }
        if(postojiAktivnost == false){
            try{
                let novaAktivnost = await Aktivnost.create(req.body);
                return res.json(novaAktivnost);  
            }
            catch(error){
                return res.json({message:"Podaci nisu validni!"});
            }
        }
    });

    app.post("/v2/dan", async(req, res) => {
        try{
            let noviDan = await Dan.create(req.body);
            return res.json(noviDan); 
        }
        catch(error){
            return res.json({message:"Već postoji dan sa tim nazivom!"});
        } 
    });

    app.post("/v2/tip", async(req, res) => {
        try{
            let noviTip = await Tip.create(req.body);
            return res.json(noviTip);  
        }
        catch(error){
            return res.json({message:"Već postoji tip sa tim nazivom!"});
        }
    });

    app.post("/v2/student", async(req, res) => {
        try{
            let noviStudent = await Student.create({ime: req.body.ime, index:req.body.index, GrupaId: req.body.GrupaId});
            if(req.body.GrupaId){
                let grupa = await Grupa.findOne({ where: { id: req.body.GrupaId } });
                await noviStudent.addGrupa(grupa);
            }
            return res.json({message:"Uspješno dodan student!"});  
        }
        catch(error){
            return res.json({message:"Već postoji student sa tim indexom!"});
        }
    });


    /*DELETE METODE*/

   app.delete('/v2/predmet/:id', async function(req, res){ 
        await Predmet.destroy({
          where: {
           id: req.params.id
          }
         }).then(postoji => { 
          if (!postoji) 
            res.json({ message:"Predmet ne postoji!"});
          else
          res.json({ message:"Predmet uspješno izbrisan!"});
         });
      })

      app.delete('/v2/predmet/:naziv', async function(req, res){ 
        await Predmet.destroy({
          where: {
           naziv: req.params.naziv
          }
         }).then(postoji => { 
          if (!postoji) 
            res.json({ message:"Predmet ne postoji!"});
          else
          res.json({ message:"Predmet uspješno izbrisan!"});
         });
      })

      app.delete('/v2/grupa/:id', async function(req, res){ 
        await Grupa.destroy({
          where: {
           id: req.params.id
          }
         }).then(postoji => { 
          if (!postoji) 
            res.json({ message:"Grupa ne postoji!"});
          else
          res.json({ message:"Grupa uspješno izbrisana!"});
         });
      })

      app.delete('/v2/aktivnost/:id', async function(req, res){ 
        await Aktivnost.destroy({
          where: {
           id: req.params.id
          }
         }).then(postoji => { 
          if (!postoji) 
            res.json({ message:"Aktivnost ne postoji!"});
          else
          res.json({ message:"Aktivnost uspješno izbrisana!"});
         });
      })

      app.delete('/v2/dan/:id', async function(req, res){ 
        await Dan.destroy({
          where: {
           id: req.params.id
          }
         }).then(postoji => { 
          if (!postoji) 
            res.json({ message:"Dan ne postoji!"});
          else
          res.json({ message:"Dan uspješno izbrisan!"});
         });
      })

      app.delete('/v2/tip/:id', async function(req, res){ 
        await Tip.destroy({
          where: {
           id: req.params.id
          }
         }).then(postoji => { 
          if (!postoji) 
            res.json({ message:"Tip ne postoji!"});
          else
          res.json({ message:"Tip uspješno izbrisan!"});
         });
      })

      app.delete('/v2/student/:id', async function(req, res){ 
        await Student.destroy({
          where: {
           id: req.params.id
          }
         }).then(postoji => { 
          if (!postoji) 
            res.json({ message:"Student ne postoji!"});
          else
          res.json({ message:"Student uspješno izbrisan!"});
         });
      })

    /* PUT METODE */
  

    app.put('/v2/predmet/:id', async (req, res) => {
        return Predmet.findOne({
            where: {
                id: req.params.id 
            }
        }).then((predmet) => {
            if (!predmet) 
                return res.json({ message: "Predmet ne postoji!" });
            else{
                try{
                predmet.update(req.body).then(p => {
                    return res.json(p);
                });
                }catch(error){
                    return res.json({message: "Već postoji predmet sa tim nazivom!"});
                }
            }
        });
    });

    app.put('/v2/grupa/:id', async (req, res) => {
        return Grupa.findOne({
            where: {
                id: req.params.id 
            }
        }).then((grupa) => {
            if (!grupa) 
                return res.json({ message: "Grupa ne postoji!" });
            else {
                try{
                    Grupa.update(req.body).then(p => {
                    return res.json(p);
                });
                }catch(error){
                    return res.json({message: "Već postoji grupa sa tim nazivom!"});
                }
            }
        });
    });

    app.put('/v2/aktivnost/:id', async (req, res) => {
        let pocetak = req.body.pocetak;
        let kraj = req.body.kraj;

        //validacija vremena
        if(!(pocetak >= 8 && pocetak <= 20) 
            || !(kraj >= 8 && kraj <= 20) 
            || pocetak >= kraj
            || (pocetak % 1 != 0 && pocetak % 1 != 0.5) 
            || (kraj % 1 != 0 && kraj % 1 != 0.5)) 
                return res.json({message:"Aktivnost nije validna!"});
         
        //dobavljamo sve aktivnosti na taj dan iz baze
        let aktivnosti = await Aktivnost.findAll({
            where:{
                DanId: req.body.DanId
            }
        });

        //provjeravamo da li postoji preklapanje aktivnosti
        let postojiAktivnost = false;
        for(var i = 0; i < aktivnosti.length; i++){
            let aktivnost = aktivnosti[i];
            let p = aktivnost.pocetak;
            let k = aktivnost.kraj;
            if((p <= pocetak && k >= kraj)
                || (p >= pocetak && k >= kraj)
                || (p <= pocetak && p < kraj && k >= kraj)){
                    postojiAktivnost = true;
                    return res.json({message:"Aktivnost nije validna!"});
                }
        }
        if(postojiAktivnost == false){
            return Aktivnost.findOne({
                where: {
                    id: req.params.id 
                }
            }).then((aktivnost) => {
                if (!aktivnost) 
                    return res.json({ message: "Aktivnost ne postoji!" });
                else{
                    try{
                        aktivnost.update(req.body).then(p => {
                            return res.json(p);
                        });
                    }catch(error){
                         return res.json({message: "Podaci nisu validni!"});
                    }
                } 
                   
            });
        }
    });

    app.put('/v2/dan/:id', async (req, res) => {
        return Dan.findOne({
            where: {
                id: req.params.id 
            }
        }).then((dan) => {
            if (!dan) 
                return res.json({ message: "Dan ne postoji!" });
            else{
                try{
                    dan.update(req.body).then(p => {
                        return res.json(p);
                    });
                }catch(error){
                    return res.json({message: "Već postoji dan sa tim nazivom!"});
                }
            }
        });
    });

    app.put('/v2/tip/:id', async (req, res) => {
        return Tip.findOne({
            where: {
                id: req.params.id 
            }
        }).then((tip) => {
            if (!tip) 
                return res.json({ message: "Tip ne postoji!" });
            else{
                try{
                    tip.update(req.body).then(p => {
                        return res.json(p);
                    });
                }catch(error){
                    return res.json({message: "Već postoji tip sa tim nazivom!"});
                }
            }
        });
    });

    app.put('/v2/student/:id', async (req, res) => {
        return Student.findOne({
            where: {
                id: req.params.id 
            }
        }).then(async (student) => {
            if (!student) 
                return res.json({ message: "Student ne postoji!" });
            else{
                try{
                    student.update({ime:req.body.ime, index:req.body.index}).then(p => {
                        return res.json(p);
                    });
                    if(req.body.GrupaId){
                        let sveGrupe = await student.getGrupe();
                        let grupa = await Grupa.findOne({where:{id:GrupaId}});
                    for (var i = 0; i < sveGrupe.length; i++) {
                        if (sveGrupe[i].PredmetId == grupa.PredmetId) {      
                            await student.removeGrupa(sveGrupe[i])
                            await student.addGrupa(grupa);
                            return;
                        }
                    }

                }
                }catch(error){
                    return res.json({message: "Već postoji student sa tim indexom!"});
                }
            }
        });
    });

    /*METODA ZA POTREBE TRECEG ZADATKA ZA AJAX SKRIPTU*/
    app.post("/ajax/aktivnost", async(req, res) => {
        let predmet = await Predmet.findOne({
            where: {
                naziv: req.body.naziv 
            }
        });

        let grupa = await Grupa.findOne({
            where: {
                naziv: req.body.grupa,
                PredmetId: predmet.id
            }
        });
        if(!grupa)
            grupa = await Grupa.create({naziv: req.body.grupa, PredmetId: predmet.id});

        let tip = await Tip.findOne({
            where: {
                naziv: req.body.tip
            }
        });
        if(!tip)
            tip = await Tip.create({naziv: req.body.tip}); 

        let dan = await Dan.findOne({
            where: {
                naziv: req.body.dan
            }
            });
        if(!dan)
            dan = await Dan.create({naziv: req.body.dan});               

        let tipId = tip.id;
        let danId = dan.id;
        let predmetId = predmet.id;
        let grupaId = grupa.id;

        let pocetak = parseFloat(req.body.pocetak);
        let kraj = parseFloat(req.body.kraj);

        //validacija vremena

        if(!(pocetak >= 8 && pocetak <= 20) 
            || !(kraj >= 8 && kraj <= 20) 
            || pocetak >= kraj
            || (pocetak % 1 != 0 && pocetak % 1 != 0.5) 
            || (kraj % 1 != 0 && kraj % 1 != 0.5)) 
                return res.json({message:"Aktivnost nije validna!"});
  
        //dobavljamo sve aktivnosti na taj dan iz baze
        let aktivnosti = await Aktivnost.findAll({
            where:{
                DanId: danId
            }
        });



        //provjeravamo da li postoji preklapanje aktivnosti
        let postojiAktivnost = false;
        for(var i = 0; i < aktivnosti.length; i++){
            let aktivnost = aktivnosti[i];
            let p = aktivnost.pocetak;
            let k = aktivnost.kraj;
            if((p <= pocetak && k >= kraj)
                || (p >= pocetak && k >= kraj)
                || (p <= pocetak && p < kraj && k >= kraj)){
                    postojiAktivnost = true;
                    return res.json({message:"Aktivnost nije validna!"});
                }
        }
        if(postojiAktivnost == false){
            try{
                let novaAktivnost = await Aktivnost.create({ naziv: req.body.naziv, pocetak: req.body.pocetak, kraj: req.body.kraj, PredmetId: predmetId, GrupaId: grupaId, DanId: danId, TipId: tipId });
                return res.json({message:"Uspješno dodana aktivnost!"});  
            }
            catch(error){
                return res.json({message:"Podaci nisu validni!"});
            }
        }
    });

  

}