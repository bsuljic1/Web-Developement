const server = "http://localhost:3000";

let studenti = [];
let grupe = [];

$('#forma').on('submit', e => {
    e.preventDefault();
    dodavanje();
})

function ucitaj() {
    $.ajax({
        url: server + '/v2/grupa', success: function (response) {
            grupe = response;
            var selectGrupa = document.getElementById("selectGrupa");
            for(var i = 0; i < grupe.length; i++){   
                var option = new Option(grupe[i].naziv, grupe[i].id);
                selectGrupa.options.add(option);
            }
        }
    })
    
    $.ajax({
        url: server + '/v2/student', success: function (response) {
            studenti = response;
        }
    })
}


function napraviStudenta(student) {
    return $.post({
        url: server + '/v2/student',
        data: student,
    }).done((response) => {
        if (response.message === "Uspješno dodan student!") {
            studenti.push(student);
        }
    })
}

function updateStudenta(student) {
    return $.put({
        url: server + '/v2/student',
        data: student,
    })
}

function dodavanje() {
    let forma = $('#forma').serializeArray();
    const studentiIzListe = {};
    
    //iscitavanje studenata iz textArea
    let csvStudenti = forma.find(field => field.name === "csvStudenti").value;
    csvStudenti = csvStudenti.split(/\r?\n/);
    let poruke = "";

    let grupaId = forma.find(field => field.name === "grupa").value;

   for(var i = 0; i < csvStudenti.length; i++){
        let student = csvStudenti[i].split(",");
        let postojiIndex = false;
        let postojiIsti = false;
        for(var j = 0; j < studenti.length; j++){
            if(student[1] == studenti[j].index){
                if(student[0] == studenti[j].ime) postojiIsti = true;
                else{
                     postojiIndex = true;
                     poruke += ("Student " + student[0] + " nije kreiran jer postoji student " + studenti[j].ime + " sa indexom " + student[1] + '\n');
                }
                break;
            }
        }
        if(!postojiIndex && !postojiIsti){
            let objStudent = {};
            objStudent.ime = student[0];
            objStudent.index = student[1];
            objStudent.GrupaId = grupaId;
            napraviStudenta(objStudent);
        }   
        if(postojiIsti){
            let objStudent = {};
            objStudent.ime = student[0];
            objStudent.index = student[1];
            objStudent.GrupaId = grupaId;
            updateStudenta(objStudent);
        }
   }

   let tekst = document.getElementById("csvStudenti");
    tekst.value = poruke;
   
}




    
    
   
