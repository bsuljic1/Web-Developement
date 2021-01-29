let assert = chai.assert;
describe('Modul', function() {
    window.alert=function(){}
 describe('iscrtajRaspored()', function() {
   it('Raspored od 6 redova', function() {
    var okvir = document.createElement("div");
    Modul.iscrtajRaspored(okvir, ["Ponedjeljak", "Utorak", "Srijeda", "Četvrtak", "Petak"], 8, 21);
    var redovi = okvir.getElementsByTagName("table")[0].getElementsByTagName("tr");
    assert.equal(redovi.length, 6,"Broj redova treba biti 6");
   });
   it('Raspored od 8 redova', function() {
    var okvir = document.createElement("div");
    Modul.iscrtajRaspored(okvir, ["Ponedjeljak", "Utorak", "Srijeda", "Četvrtak", "Petak", "Subota", "Nedjelja"], 9, 20);
    var redovi = okvir.getElementsByTagName("table")[0].rows;
    assert.equal(redovi.length, 8,"Broj redova treba biti 8");
   });
   it('Raspored od 12 kolona', function() {
    var okvir = document.createElement("div");
    Modul.iscrtajRaspored(okvir, ["Ponedjeljak", "Utorak", "Srijeda", "Četvrtak", "Petak"], 8, 14);
    var redovi = okvir.getElementsByTagName("table")[0].rows;
    var kolone = redovi[1].cells;
    assert.equal(kolone.length - 1, 12,"Broj kolona treba biti 12");
   });
   it('Raspored od 2 kolone', function() {
    var okvir = document.createElement("div");
    Modul.iscrtajRaspored(okvir, ["Ponedjeljak", "Utorak", "Srijeda", "Četvrtak", "Petak"], 8, 9);
    var redovi = okvir.getElementsByTagName("table")[0].rows;
    var kolone = redovi[1].cells;
    assert.equal(kolone.length - 1, 2,"Broj kolona treba biti 12");
   });
   it('Provjera da li su dani ispravno uneseni', function() {
    var okvir = document.createElement("div");
    Modul.iscrtajRaspored(okvir, ["Ponedjeljak", "Utorak", "Srijeda", "Četvrtak", "Petak"], 8, 21);
    var redovi = okvir.getElementsByTagName("table")[0].getElementsByTagName("tr");
    assert.equal(redovi[1].cells[0].innerHTML, "Ponedjeljak", "Dan treba biti ponedjeljak");
    assert.equal(redovi[2].cells[0].innerHTML, "Utorak", "Dan treba biti utorak");
    assert.equal(redovi[3].cells[0].innerHTML, "Srijeda", "Dan treba biti srijeda");
    assert.equal(redovi[4].cells[0].innerHTML, "Četvrtak", "Dan treba biti cetvrtak");
    assert.equal(redovi[5].cells[0].innerHTML, "Petak", "Dan treba biti petak");
   });
   it('Provjera da li je treci dan srijeda', function() {
    var okvir = document.createElement("div");
    Modul.iscrtajRaspored(okvir, ["Ponedjeljak", "Utorak", "Srijeda", "Četvrtak", "Petak"], 8, 21);
    var redovi = okvir.getElementsByTagName("table")[0].getElementsByTagName("tr");
    assert.equal(redovi[3].cells[0].innerHTML, "Srijeda", "Dan treba biti srijeda");
   });
   it('Kreiranje rasporeda ispisuje gresku jer je satPocetak veci od satKraj', function() {
    var okvir = document.createElement("div");
    Modul.iscrtajRaspored(okvir, ["Ponedjeljak", "Utorak", "Srijeda", "Četvrtak", "Petak"], 8, 7);
    assert.equal(okvir.textContent, "Greška","Treba ispisati gresku");
   });
   it('Kreiranje rasporeda ispisuje gresku jer je satPocetak isti kao satKraj', function() {
    var okvir = document.createElement("div");
    Modul.iscrtajRaspored(okvir, ["Ponedjeljak", "Utorak", "Srijeda", "Četvrtak", "Petak"], 8, 8);
    assert.equal(okvir.innerHTML, "Greška","Treba ispisati gresku");
   });
   it('Kreiranje rasporeda ispisuje gresku jer je satPocetak manji od 0', function() {
    var okvir = document.createElement("div");
    Modul.iscrtajRaspored(okvir, ["Ponedjeljak", "Utorak", "Srijeda", "Četvrtak", "Petak"], -50, 17);
    assert.equal(okvir.innerHTML, "Greška","Treba ispisati gresku");
   });
   it('Kreiranje rasporeda ispisuje gresku jer je satKraj veci od 24', function() {
    var okvir = document.createElement("div");
    Modul.iscrtajRaspored(okvir, ["Ponedjeljak", "Utorak", "Srijeda", "Četvrtak", "Petak"], 11, 50);
    assert.equal(okvir.innerHTML, "Greška","Treba ispisati gresku");
   });
   it('Kreiranje rasporeda ispisuje gresku jer su sati u nedozvoljenom opsegu', function() {
    var okvir = document.createElement("div");
    Modul.iscrtajRaspored(okvir, ["Ponedjeljak", "Utorak", "Srijeda", "Četvrtak", "Petak"], -50, 50);
    assert.equal(okvir.innerHTML, "Greška","Treba ispisati gresku");
   });
 });

 describe('dodajAktivnost()', function() {
    it('Kreiranje rasporeda i dodavanje aktivnosti iz postavke spirale', function() {
        var okvir = document.createElement("div");
        Modul.iscrtajRaspored(okvir, ["Ponedjeljak", "Utorak", "Srijeda", "Četvrtak", "Petak"], 8, 21);
        Modul.dodajAktivnost(okvir, "WT", "predavanje", 9, 12, "Ponedjeljak");
        Modul.dodajAktivnost(okvir, "WT", "vježbe", 12, 13.5, "Ponedjeljak");
        Modul.dodajAktivnost(okvir, "RMA", "predavanje", 14, 17, "Ponedjeljak");
        Modul.dodajAktivnost(okvir, "RMA", "vježbe", 12.5, 14, "Utorak");
        Modul.dodajAktivnost(okvir, "DM", "tutorijal", 14 , 16, "Utorak");
        Modul.dodajAktivnost(okvir, "DM", "predavanje", 16, 19, "Utorak");
        Modul.dodajAktivnost(okvir, "OI", "predavanje", 12, 15, "Srijeda");
        var redovi = okvir.getElementsByTagName("table")[0].getElementsByTagName("tr");
        assert.equal(redovi[1].cells[3].innerHTML, "WT" + "<br>" + "predavanje","Tekst treba biti WT predavanje");
        assert.equal(redovi[1].cells[4].innerHTML, "WT" + "<br>" + "vježbe", "Tekst treba biti WT vježbe");
        assert.equal(redovi[1].cells[6].innerHTML, "RMA" + "<br>" + "predavanje","Tekst treba biti RMA predavanje");
        assert.equal(redovi[2].cells[10].innerHTML, "RMA" + "<br>" + "vježbe","Tekst treba biti RMA vježbe");
        assert.equal(redovi[2].cells[11].innerHTML, "DM" + "<br>" + "tutorijal","Tekst treba biti DM tutorijal");
        assert.equal(redovi[2].cells[12].innerHTML, "DM" + "<br>" + "predavanje","Tekst treba biti DM predavanje");
        assert.equal(redovi[3].cells[9].innerHTML, "OI" + "<br>" + "predavanje","Tekst treba biti OI predavanje");
    });
    it('Kreiranje dva rasporeda i dodavanje aktivnosti', function() {
        var okvir = document.createElement("div");
        Modul.iscrtajRaspored(okvir, ["Ponedjeljak", "Utorak", "Srijeda", "Četvrtak", "Petak"], 8, 21);
        Modul.dodajAktivnost(okvir, "WT", "predavanje", 9, 12, "Ponedjeljak");
        Modul.dodajAktivnost(okvir, "WT", "vježbe", 12, 13.5, "Ponedjeljak");
        Modul.dodajAktivnost(okvir, "RMA", "predavanje", 14, 17, "Ponedjeljak");
        Modul.dodajAktivnost(okvir, "RMA", "vježbe", 12.5, 14, "Utorak");
        Modul.dodajAktivnost(okvir, "DM", "tutorijal", 14 , 16, "Utorak");
        Modul.dodajAktivnost(okvir, "DM", "predavanje", 16, 19, "Utorak");
        Modul.dodajAktivnost(okvir, "OI", "predavanje", 12, 15, "Srijeda");
        var redovi = okvir.getElementsByTagName("table")[0].getElementsByTagName("tr");
        assert.equal(redovi[1].cells[3].innerHTML, "WT" + "<br>" + "predavanje","Tekst treba biti WT predavanje");
        assert.equal(redovi[1].cells[4].innerHTML, "WT" + "<br>" + "vježbe", "Tekst treba biti WT vježbe");
        assert.equal(redovi[1].cells[6].innerHTML, "RMA" + "<br>" + "predavanje","Tekst treba biti RMA predavanje");
        assert.equal(redovi[2].cells[10].innerHTML, "RMA" + "<br>" + "vježbe","Tekst treba biti RMA vježbe");
        assert.equal(redovi[2].cells[11].innerHTML, "DM" + "<br>" + "tutorijal","Tekst treba biti DM tutorijal");
        assert.equal(redovi[2].cells[12].innerHTML, "DM" + "<br>" + "predavanje","Tekst treba biti DM predavanje");
        assert.equal(redovi[3].cells[9].innerHTML, "OI" + "<br>" + "predavanje","Tekst treba biti OI predavanje");

        var okvir2 = document.createElement("div");
        Modul.iscrtajRaspored(okvir2, ["Ponedjeljak", "Utorak", "Srijeda", "Četvrtak", "Petak"], 9, 21);
        Modul.dodajAktivnost(okvir2, "RG", "vježbe", 11, 13, "Ponedjeljak");
        Modul.dodajAktivnost(okvir2, "PWS", "predavanje", 15, 17, "Ponedjeljak");
        Modul.dodajAktivnost(okvir2, "PWS", "vježbe", 17, 18, "Ponedjeljak");
        Modul.dodajAktivnost(okvir2, "WT", "vježbe", 19, 20.5, "Ponedjeljak");
        Modul.dodajAktivnost(okvir2, "VVS", "vježbe", 9, 10.5, "Utorak");
        Modul.dodajAktivnost(okvir2, "OOI", "predavanje", 12, 15, "Utorak");
        Modul.dodajAktivnost(okvir2, "OIS", "predavanje", 15, 17, "Utorak");
        Modul.dodajAktivnost(okvir2, "OIS", "vježbe", 17, 18, "Utorak");
        Modul.dodajAktivnost(okvir2, "WT", "predavanje", 9 , 12, "Srijeda");
        Modul.dodajAktivnost(okvir2, "OOI", "vježbe", 13, 14, "Srijeda");
        Modul.dodajAktivnost(okvir2, "RG", "predavanje", 9, 11, "Četvrtak");
        Modul.dodajAktivnost(okvir2, "RG", "tutorijal", 11, 12, "Četvrtak");
        Modul.dodajAktivnost(okvir2, "VVS", "predavanje", 12, 15, "Četvrtak");
        Modul.dodajAktivnost(okvir2, "OOI", "tutorijal", 15, 16.5, "Četvrtak");

        var redovi2 = okvir2.getElementsByTagName("table")[0].getElementsByTagName("tr");
        assert.equal(redovi2[1].cells[5].innerHTML, "RG" + "<br>" + "vježbe","Tekst treba biti RG vježbe");
        assert.equal(redovi2[1].cells[10].innerHTML, "PWS" + "<br>" + "predavanje", "Tekst treba biti PWS predavanje");
        assert.equal(redovi2[1].cells[11].innerHTML, "PWS" + "<br>" + "vježbe","Tekst treba biti PWS vježbe");
        assert.equal(redovi2[1].cells[14].innerHTML, "WT" + "<br>" + "vježbe","Tekst treba biti WT vježbe");
        assert.equal(redovi2[2].cells[1].innerHTML, "VVS" + "<br>" + "vježbe","Tekst treba biti VVS vježbe");
        assert.equal(redovi2[2].cells[5].innerHTML, "OOI" + "<br>" + "predavanje","Tekst treba biti OOI predavanje");
        assert.equal(redovi2[2].cells[6].innerHTML, "OIS" + "<br>" + "predavanje","Tekst treba biti OIS predavanje");
        assert.equal(redovi2[2].cells[7].innerHTML, "OIS" + "<br>" + "vježbe","Tekst treba biti OIS vježbe");
        assert.equal(redovi2[3].cells[1].innerHTML, "WT" + "<br>" + "predavanje","Tekst treba biti WT predavanje");
        assert.equal(redovi2[3].cells[4].innerHTML, "OOI" + "<br>" + "vježbe","Tekst treba biti OOI vježbe");
        assert.equal(redovi2[4].cells[1].innerHTML, "RG" + "<br>" + "predavanje","Tekst treba biti RG predavanje");
        assert.equal(redovi2[4].cells[2].innerHTML, "RG" + "<br>" + "tutorijal","Tekst treba biti RG tutorijal");
        assert.equal(redovi2[4].cells[3].innerHTML, "VVS" + "<br>" + "predavanje","Tekst treba biti VVS predavanje");
        assert.equal(redovi2[4].cells[4].innerHTML, "OOI" + "<br>" + "tutorijal","Tekst treba biti OOI tutorijal");


    });
    it('Dodavanje jedne aktivnosti u prazan raspored', function() {
     var okvir = document.createElement("div");
     Modul.iscrtajRaspored(okvir, ["Ponedjeljak", "Utorak", "Srijeda", "Četvrtak", "Petak"], 8, 21);
     var redovi = okvir.getElementsByTagName("table")[0].getElementsByTagName("tr");
     Modul.dodajAktivnost(okvir, "WT", "predavanje", 9, 12, "Ponedjeljak");
     assert.equal(redovi[1].cells[3].innerHTML, "WT" + "<br>" + "predavanje","Tekst treba biti WT predavanje");
    });
    it('Dodavanje dvije aktivnosti u isti dan, jedna poslije druge', function() {
        var okvir = document.createElement("div");
        Modul.iscrtajRaspored(okvir, ["Ponedjeljak", "Utorak", "Srijeda", "Četvrtak", "Petak"], 8, 21);
        var redovi = okvir.getElementsByTagName("table")[0].getElementsByTagName("tr");
        Modul.dodajAktivnost(okvir, "WT", "predavanje", 9, 12, "Ponedjeljak");
        Modul.dodajAktivnost(okvir, "WT", "vježbe", 12, 13.5, "Ponedjeljak");
        assert.equal(redovi[1].cells[3].innerHTML, "WT" + "<br>" + "predavanje","Tekst treba biti WT predavanje");
        assert.equal(redovi[1].cells[4].innerHTML, "WT" + "<br>" + "vježbe","Tekst treba biti WT vježbe");
    });
    it('Dodavanje dvije aktivnosti u razlicite dane', function() {
        var okvir = document.createElement("div");
        Modul.iscrtajRaspored(okvir, ["Ponedjeljak", "Utorak", "Srijeda", "Četvrtak", "Petak"], 8, 21);
        var redovi = okvir.getElementsByTagName("table")[0].getElementsByTagName("tr");
        Modul.dodajAktivnost(okvir, "WT", "predavanje", 9, 12, "Ponedjeljak");
        Modul.dodajAktivnost(okvir, "OI", "predavanje", 12, 15, "Srijeda");
        assert.equal(redovi[1].cells[3].innerHTML, "WT" + "<br>" + "predavanje","Tekst treba biti WT predavanje");
        assert.equal(redovi[3].cells[9].innerHTML, "OI" + "<br>" + "predavanje","Tekst treba biti OI predavanje");
    });
    it('Alert ako raspored nije kreiran', function() {
        var okvir = document.createElement("div");
        var returned = Modul.dodajAktivnost(okvir, "WT", "predavanje", 9, 12, "Ponedjeljak");
        assert.equal(returned, true);
    });
    it('Alert ako je raspored null', function() {
        var okvir = null
        var returned = Modul.dodajAktivnost(okvir, "WT", "predavanje", 9, 12, "Ponedjeljak");
        assert.equal(returned, true);
    });
    it('Alert vremena nevalidna', function() {
        var okvir = null
        var returned = Modul.dodajAktivnost(okvir, "WT", "predavanje", -5, 50, "Ponedjeljak");
        assert.equal(returned, true);
    });
    it('Alert termin se poklapa u potpunosti', function() {
        var okvir = document.createElement("div");
        Modul.iscrtajRaspored(okvir, ["Ponedjeljak", "Utorak", "Srijeda", "Četvrtak", "Petak"], 8, 21);
        Modul.dodajAktivnost(okvir, "WT", "predavanje", 9, 12, "Ponedjeljak");
        var returned = Modul.dodajAktivnost(okvir, "OI", "predavanje", 9, 12, "Ponedjeljak");
        assert.equal(returned, true);
    });
    it('Alert termin se poklapa djelimicno', function() {
        var okvir = document.createElement("div");
        Modul.iscrtajRaspored(okvir, ["Ponedjeljak", "Utorak", "Srijeda", "Četvrtak", "Petak"], 8, 21);
        Modul.dodajAktivnost(okvir, "WT", "predavanje", 9, 12, "Ponedjeljak");
        var returned = Modul.dodajAktivnost(okvir, "OI", "predavanje", 10, 12, "Ponedjeljak");
        assert.equal(returned, true);
    });
    it('Alert termin unutar postojeceg termina', function() {
        var okvir = document.createElement("div");
        Modul.iscrtajRaspored(okvir, ["Ponedjeljak", "Utorak", "Srijeda", "Četvrtak", "Petak"], 8, 21);
        Modul.dodajAktivnost(okvir, "WT", "predavanje", 9, 12, "Ponedjeljak");
        var returned = Modul.dodajAktivnost(okvir, "OI", "predavanje", 10, 11, "Ponedjeljak");
        assert.equal(returned, true);
    });
 });
});
