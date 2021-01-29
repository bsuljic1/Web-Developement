function testirajte(){
    let okvir = document.getElementById("okvir");
    iscrtajRaspored(okvir, ["Ponedjeljak", "Utorak", "Srijeda", "Četvrtak", "Petak"], 8, 21);
    
    dodajAktivnost(okvir, "WT", "predavanje", 9, 12, "Ponedjeljak");
    dodajAktivnost(okvir, "WT", "vježbe", 12, 13.5, "Ponedjeljak");
    dodajAktivnost(okvir, "RMA", "predavanje", 14, 17, "Ponedjeljak");
    dodajAktivnost(okvir, "RMA", "vježbe", 12.5, 14, "Utorak");
    dodajAktivnost(okvir, "DM", "tutorijal", 14 , 16, "Utorak");
    dodajAktivnost(okvir, "DM", "predavanje", 16, 19, "Utorak");
    dodajAktivnost(okvir, "OI", "predavanje", 12, 15, "Srijeda");
    dodajAktivnost(okvir, "", "", 15, 18, "Srijeda");


    let okvir2 = document.getElementById("okvir2");
    iscrtajRaspored(okvir2, ["Ponedjeljak", "Utorak", "Srijeda", "Četvrtak", "Petak"], 9, 21);
    dodajAktivnost(okvir2, "RG", "vježbe", 11, 13, "Ponedjeljak");
    dodajAktivnost(okvir2, "PWS", "predavanje", 15, 17, "Ponedjeljak");
    dodajAktivnost(okvir2, "PWS", "vježbe", 17, 18, "Ponedjeljak");
    dodajAktivnost(okvir2, "WT", "vježbe", 19, 20.5, "Ponedjeljak");
    dodajAktivnost(okvir2, "VVS", "vježbe", 9, 10.5, "Utorak");
    dodajAktivnost(okvir2, "OOI", "predavanje", 12, 15, "Utorak");
    dodajAktivnost(okvir2, "OIS", "predavanje", 15, 17, "Utorak");
    dodajAktivnost(okvir2, "OIS", "vježbe", 17, 18, "Utorak");
    dodajAktivnost(okvir2, "WT", "predavanje", 9 , 12, "Srijeda");
    dodajAktivnost(okvir2, "OOI", "vježbe", 13, 14, "Srijeda");
    dodajAktivnost(okvir2, "RG", "predavanje", 9, 11, "Četvrtak");
    dodajAktivnost(okvir2, "RG", "tutorijal", 11, 12, "Četvrtak");
    dodajAktivnost(okvir2, "VVS", "predavanje", 12, 15, "Četvrtak");
    dodajAktivnost(okvir2, "OOI", "tutorijal", 15, 16.5, "Četvrtak");
    
    //greske
    dodajAktivnost(okvir2, "sklj", "tutorijal", 15, 16.5, "Četvrtak"); //preklapanje
    dodajAktivnost(okvir2, "OI", "tut", 15, 17, "Utorak"); // preklapanje 
    dodajAktivnost(okvir2, "OI", "tut", 7, 8, "Utorak"); //pocetak manji od prvog sata u rasporedu
    dodajAktivnost(okvir2, "sklj", "tutorijal", 15.5, 16, "Četvrtak"); //preklapanje
 
}