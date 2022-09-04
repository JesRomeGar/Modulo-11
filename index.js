const reservas = [
    {
        tipoHabitacion: "standard",
        pax: 1,
        noches: 3,
        desayuno: false
    },
    {
        tipoHabitacion: "standard",
        pax: 1,
        noches: 4,
        desayuno: false
    },
    {
        tipoHabitacion: "suite",
        pax: 2,
        noches: 1,
        desayuno: true
    }
];

class Reserva {
    constructor() {
        this._reservas = [];
        this._subtotal = 0;
        this._total = 0;
    }

    getRoomType(type) {
        switch(type) {
            case "standard":
                return 100;
            case "suite": 
                return 150;
        }
    }

    extraPerson(person) {
        return person > 1 ? 40 * (person - 1) : 0;
    }

    breakfastIncluded(breakfast) {
        return breakfast ? 15 : 0;
    }

    getSubtotal() {
        this._subtotal = reservas.reduce(
            (sum, { tipoHabitacion, pax, noches, desayuno }) => sum + noches * (this.getRoomType(tipoHabitacion) + this.extraPerson(pax) + this.breakfastIncluded(desayuno) * pax), 0
        );
    }

    getTotal() {
        const IVA = 1.21;

        this._total = reservas.reduce(
            (sum, { tipoHabitacion, pax, noches, desayuno }) => sum + noches * (this.getRoomType(tipoHabitacion) + this.extraPerson(pax) + this.breakfastIncluded(desayuno) * pax) * IVA, 0
        );
    }

    get subtotal() {
        return this._subtotal;
    }

    get total() {
        return this._total;
    }

    set reservas(nuevaReserva) {
        this._reservas = nuevaReserva;
        this.getSubtotal();
        this.getTotal();
    }
}


/*
Caso 1
En el caso de un cliente particular:
Habitación / día (IVA No Incluido):
Standard: 100 €.
Suite: 150 €.
Cargos adicionales:
Por cada persona adicional sumarle 40 € al precio de cada noche.
IVA sumarle un 21% al total.
Añadimos un campo a cada reserva en el que indicamos si el desayuno está incluido o no: en caso de estar incluido supone un cargo adicional de 15 € por persona y noche.
Crear una clase que reciba la lista de reservas y calcule el subtotal y el total teniendo en cuenta los anteriores requisitos.
*/

class PrivateClient extends Reserva {
    constructor() {
        super();
    }
}

const privateClient = new PrivateClient();
privateClient.reservas = reservas;

console.log("Subtotal particular: ", privateClient.subtotal + "€");
console.log("Total particular con IVA: ", privateClient.total + "€");

/*Caso 2
Cubrimos el caso de un tour operador, al reservar grandes volúmenes, le damos las siguientes condiciones especiales:
Todas las habitaciones tienen el mismo precio (100 €).
Adicionalmente se le aplica un 15 % de descuento a los servicios contratados.
*/


class TourOperator extends Reserva {
    constructor() {
        super();
    }

    getRoomType(type) {
        return type = 100;
    }

    get total() {
        return (this._total * 0.85);
    }
}

const tourOperator = new TourOperator();
tourOperator.reservas = reservas;

console.log("Subtotal touroperador: ", tourOperator.subtotal + "€");
console.log("Total touroperador: ", tourOperator.total + "€");



