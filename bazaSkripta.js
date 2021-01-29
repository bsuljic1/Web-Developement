const Sequelize = require("sequelize");
 
module.exports = function (sequelize) {
    const Predmet = sequelize.define('Predmet', {
    naziv: {
        type: Sequelize.STRING,
        field: 'naziv',
        unique: true,
        allowNull: false
    }
    })

    const Grupa = sequelize.define('Grupa', {
        naziv: {
            type: Sequelize.STRING,
            field: 'naziv',
            allowNull: false
        },
    }, {
        name: {
            singular: 'Grupa',
            plural: 'Grupe',
        }
    })

    const Aktivnost = sequelize.define('Aktivnost', {
        naziv: {
            type: Sequelize.STRING,
            field: 'naziv',
            allowNull: false
        },
        pocetak: {
            type: Sequelize.FLOAT,
            field: 'pocetak',
            allowNull: false
        },
        kraj: {
            type: Sequelize.FLOAT,
            field: 'kraj',
            allowNull: false
        }
    })

    const Dan = sequelize.define('Dan', {
        naziv: {
            type: Sequelize.STRING,
            field: 'naziv',
            unique: true,
            allowNull: false
        }
    })

    const Tip = sequelize.define('Tip', {
        naziv: {
            type: Sequelize.STRING,
            field: 'naziv',
            unique: true,
            allowNull: false
        }
    })

    const Student = sequelize.define('Student', {
        ime: {
            type: Sequelize.STRING,
            field: 'ime',
            allowNull: false
        },
        index: {
            type: Sequelize.STRING,
            field: 'index',
            unique: true,
            allowNull: false
        }
    })

    //Relacije

    //Predmet 1-N Grupa
    Predmet.hasMany(Grupa, {
        foreignKey: {
            allowNull: false
    }
    });
    Grupa.belongsTo(Predmet);

    //Aktivnost N-1 Predmet
    Aktivnost.belongsTo(Predmet, {
        foreignKey: {
            allowNull: false
        }
    });
    Predmet.hasMany(Aktivnost);

    //Aktivnost N-0 Grupa
    Aktivnost.belongsTo(Grupa);
    Grupa.hasMany(Aktivnost);

    //Aktivnost N-1 Dan
    Aktivnost.belongsTo(Dan, {
        foreignKey: {
            allowNull: false
        }
    });
    Dan.hasMany(Aktivnost);

    //Aktivnost N-1 Tip
    Aktivnost.belongsTo(Tip, {
        foreignKey: {
            allowNull: false
        }
    });
    Tip.hasMany(Aktivnost);

    //Student N-M Grupa
    Student.belongsToMany(Grupa, { 
        through: 'StudentGrupa' 
    });
    Grupa.belongsToMany(Student, { 
        through: 'StudentGrupa' 
    });

    return{
        Predmet,
        Grupa,
        Aktivnost,
        Dan,
        Tip,
        Student
    }

}

 
 