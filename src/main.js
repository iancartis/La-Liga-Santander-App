//-----VARIABLES

//STRING -> texto
const nom = "Jose";
var nombre = "Lluis";

nombre = "María";
// console.log(nombre);


//NUMBER
let age = 26;
let age2 = "26";

// console.log(typeof age);
// console.log(typeof age2);

let numero1 = 22;
let numero2 = 10;
let numero3 = "5";

function suma(nombre, edad) {
    console.log(`Hola mi nombre es ${nombre} y mi edad ${edad}`);
}

// suma(nombre, numero3);




//BOOLEAN

let bool1 = true;
let bool2 = false;



//ARRAY

let lista = ["Beto", 678, 56, true, [45, age], bool2, "Let's Coder"];


//OBJECT

let mentor = {
    nombre: "Lluis",
    edad: 26,
    poblacion: "Sallent",
    empresa: "Let's Coder",
    hobbies: ["futbol", "codigo", "pasear"],
    mascotas: [{
        nombre: "Tuca",
        tipo: "perro"
    }, {
        nombre: "Tam",
        tipo: "perro"
    }],
    cp: 345678
};



//-----FUNCTIONS

function saludo(nombre, tiempo) {
    console.log("Hola " + nombre + ", buenos " + tiempo + ".");
    console.log(`Hola ${nombre}, buenos ${tiempo}.`);
}
saludo("Nora", "tarde");



//-----LOGIC OPERATORS

//comparacion
// =, ==, ===, !=, !==, <, >, <=, >=

//AND &&
console.log(5 == 5 && !(6 == 7));;

//OR ||
console.log(5 == 5 || 6 == 7);




//-----CONDITIONALS

//IF
// let edad = 8;

// if (edad < 18) {
//     console.log("Soy menor de edad");
// }
// else if (edad >= 18 && edad < 80) {
//     console.log("mayor de edad");
// }
// else {
//     console.log("Soy un viejete");
// }






//LOOPS

//FOR

let test = [45, 87, 23, 45, 76, 98, 23, 45, 76, 3, 76];

for (let i = 0; i < mentor.mascotas.length; i++) {
    console.log("for ", mentor.mascotas[i].nombre);
}

console.log("fuera del for");;


//WHILE

let i = 0;

while (i < mentor.mascotas.length) {
    console.log("while ", mentor.mascotas[i].nombre);
    i++;
}