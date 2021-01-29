const server = "http://localhost:3000";

let predmeti = [];
let aktivnosti = [];

$('#forma').on('submit', e => {
    e.preventDefault();
    dodavanje();
})

function ucitaj() {
    $.ajax({
        url: server + '/v2/aktivnost', success: function (response) {
            aktivnosti = response;
        }
    });
    $.ajax({
        url: server + '/v2/predmet', success: function (response) {
            predmeti = response;
        }
    });
}


function napraviAktivnost(a) {
    return $.post({
        url: server + '/ajax/aktivnost',
        data: a,
    }).done((response) => {
        if (response.message === "Uspješno dodana aktivnost!") {
            $('#poruka').html(response.message);
            aktivnosti.push(a);
        }
        else {
            $('#poruka').html(response.message);
        }
    })
}

function dodavanje() {
    const forma = $('#forma').serializeArray();
    const aktivnost = {};
 
    //ubacivanje vrijednosti iz forme u aktivnost
    for(var i = 0; i < forma.length; i++)
        aktivnost[forma[i].name] = forma[i].value;
    
    //pretraga da li predmet vec postoji
    var imaVec = false;
    for(var i = 0; i < predmeti.length; i++)
        if(predmeti[i].naziv == aktivnost.naziv) imaVec = true;
        
    //ako predmet ne postoji dodaje se i predmet i aktivnost
    if (imaVec == false) {
        $.post({
            url: server + '/v2/predmet',
            data: { naziv: aktivnost.naziv },
        }).done((response) => {
            if (response.message === "Uspješno dodan predmet!") {
                napraviAktivnost(aktivnost).done((response) => {
                    if (response.message === "Uspješno dodana aktivnost!"){
                        predmeti.push({ naziv: aktivnost.naziv });
                    }
                    else{
                        $.ajax({
                            url: `/v2/predmet/${aktivnost.naziv}`,
                            type: 'DELETE',
                            success: function () {
                                $('#poruka').html("Aktivnost nije validna!");
                            }
                        });
                        $('#poruka').html(response.message);
                    }
                })
            }
        })
    } else { //ako predmet postoji, dodaje se samo aktivnost
        napraviAktivnost(aktivnost);
    }
}