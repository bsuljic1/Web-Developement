function iscrtajRaspored(div, dani, satPocetak, satKraj){
   
    //validacija
    if(!(satPocetak >= 0 && satPocetak <= 24) || !(satKraj >=0 && satKraj <= 24) || satPocetak >= satKraj){
        let greska = document.createTextNode("Greška");
        div.appendChild(greska);
        return;
    } 

    var tabela = document.createElement("TABLE");
    
    //colgroup kolona
    var colgroup = document.createElement("COLGROUP");
    for(var i = 0; i <= 2 * (satKraj - satPocetak); i++){
        let col = document.createElement("col");
        colgroup.appendChild(col);
    }
    tabela.appendChild(colgroup);

    //ispisivanje sati
    var redSati = document.createElement("tr");
    var nizSati = [0, 2, 4, 6, 8, 10, 12, 15, 17, 19, 21, 23];
    for(var i = satPocetak; i < satKraj; i += 0.5){
        let sat = document.createElement("th");
        if(i == satKraj - 1) { // zadnji se ne prikazuje
            break;
        }
        if(nizSati.includes(i)){
            if(i < 10) sat.innerHTML = "0" + i + ":00";
            else sat.innerHTML = i + ":00"
            sat.colSpan = 2;
            i+=0.5;
        }
        redSati.appendChild(sat);
    }
    tabela.appendChild(redSati);


    //dodavanje td elemenata
    for(var i = 0; i < dani.length; i++){
        let red = document.createElement("tr");
        for(var j = 0; j <= 2*(satKraj - satPocetak); j++){
            var celija = document.createElement("td");
            if(j == 0){
                celija.innerHTML = dani[i];
            }
            red.appendChild(celija);
        }
        tabela.appendChild(red);
    }
    
    div.appendChild(tabela);
}


function dodajAktivnost(raspored, naziv, tip, vrijemePocetak, vrijemeKraj, dan) {
    //validacija
    if(raspored == null || raspored.getElementsByTagName("table")[0] == null){
        alert("Greška - raspored nije kreiran");
        return true;
    }
    
    var redovi = raspored.getElementsByTagName("table")[0].rows; 
   
    var prviSat;  
    if(redovi[0].cells[0].innerHTML != "") { //ako je prikazan prvi sat
        prviSat = redovi[0].cells[0].innerHTML;
        prviSat = parseInt(prviSat.substring(0,2));
    }
    else{ //ako nije prikazan
        prviSat = redovi[0].cells[2].innerHTML;
        prviSat = parseInt(prviSat.substring(0,2)) - 1;
    } 
    if(!(vrijemePocetak >= 0 && vrijemePocetak <= 24) || !(vrijemeKraj >=0 && vrijemeKraj <= 24) || vrijemePocetak >= vrijemeKraj || vrijemePocetak < prviSat){
        alert("Greška - u rasporedu ne postoji dan ili vrijeme u kojem pokušavate dodati termin");
        return true;
    }
  
    //trazenje reda sa datim danom
    var red;
    for(var i = 1; i < redovi.length; i++)
        if(redovi[i].cells[0].innerHTML== dan) 
            red = redovi[i];
 
   //brojac zbog colspana
    var brojac = 2 * (vrijemePocetak - prviSat) + 1;
    for(var i = 0; i < 2 * (vrijemePocetak - prviSat) + 1 && i < red.cells.length; i++){
        if(red.cells[i].colSpan > 1){
            if(red.cells[i].colSpan + i > brojac){
                alert("Greška - već postoji termin u rasporedu u zadanom vremenu");
                return true;    
            }
            brojac = brojac - red.cells[i].colSpan + 1;
        }
        if(i >= brojac)break;
    }
        
    //ako vec postoji termin u toj celiji, alert
    for(var i = 0; i < 2*(vrijemeKraj - vrijemePocetak) + 1; i++)
        if(red.cells[brojac + i].innerHTML != ""){
            alert("Greška - već postoji termin u rasporedu u zadanom vremenu");
            return true;
        }

    var celija = red.cells[brojac]; //celija u koju treba dodati aktivnost
 
    //dodavanje teksta u celiju i postavljanje colspana
    if(celija != null) {
        celija.colSpan = 2*(vrijemeKraj - vrijemePocetak);
        celija.innerHTML = naziv + "<br>" + tip;
        if(naziv != "" && tip != "")celija.style.backgroundColor = "#dee7f0";
    }

    //brisanje celija koje su visak
    for(var i = 2*(vrijemeKraj - vrijemePocetak) - 1; i > 0; i--)  
        if(red.cells[brojac + 1].innerHTML == "") 
            red.deleteCell(brojac + 1);
}   
         

