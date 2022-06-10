import { data } from "./data.js";
import {generarNumAleatorio} from "./utiles.js"



class Personajes {
  constructor(data) {
    Object.assign(this, data)
    this.numeros = [] 
  }

  numerosAleatorios() {
    for (let i = 0; i < this.numeroDados; i++ ){
        this.numeros.push(generarNumAleatorio())
      }
     return this.numeros
      
  }
  generarDadosHtml() {
    const numerosArray = this.numerosAleatorios()
    return numerosArray.map( num => `<div class="numero flex">${num}</div>`).join('')
  }


  generarPersonajeHtml() {
    const { nombre, imagen, energia, numeroDados, puntuacionActual } = this
    return `
        <p class="nombre-persona">${nombre}</p>
        <img src="${imagen}" alt="">
        <p>Energia: <span class="energia">${energia}</span></p>
        <div class="barra-energia"></div>
        <div class="los-numeros flex">
          ${this.generarDadosHtml()}
        </div>
      `
  }
}
const boni = new Personajes(data.boni)

document.querySelector('#el-bueno').innerHTML = boni.generarPersonajeHtml()

boni.numerosAleatorios()








// Generar html de losa primero dos personajes al cargar la pagina