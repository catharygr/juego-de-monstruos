import { data } from './data.js'
import { generarNumAleatorio } from './utiles.js'

const losMalos = ['popo', 'luis', 'clau']
class Personaje {
  constructor(data) {
    Object.assign(this, data)
    this.numeros = []
    this.aCargar = true
    this.dadosHtml = ''
    this.puntosAtaque = 0
    this.maxEnergia = this.energia
  }

  numerosAleatorios() {
    this.numeros = []
    for (let i = 0; i < this.numeroDados; i++) {
      if (this.aCargar) {
        this.numeros.push(0)
      } else {
        this.numeros.push(generarNumAleatorio())
      }
    }
    return this.numeros
  }

  generarDadosHtml() {
    const numerosArray = this.numerosAleatorios()
    this.puntosAtaque = reducirPuntos(numerosArray)
    return numerosArray.map( num => `<div class="numero flex">${num}</div>`).join('')
  }

  generarPersonajeHtml() {
    const { nombre, imagen, energia, numeroDados, puntuacionActual } = this
    return `
        <p class="nombre-persona">${nombre}</p>
        <img src="${imagen}" alt="">
        <p>Energia: <span class="energia">${energia}</span></p>
          ${this.generarBarraHtml()}
        <div class="los-numeros flex">
          ${this.dadosHtml}
        </div>
      `
  }

  generarNuevosNumeros() {
    this.dadosHtml = this.generarDadosHtml()
  }

  generarBarraHtml = function() {
    const porcetaje = 100 * this.energia / this.maxEnergia
    return `
    <div class="barra-energia" style="max-width: ${porcetaje}%"></div>    
    `
  }
}

// *************

function finalDeJuego() {
  if(boni.energia > 0) {
    document.querySelector('#batalla').innerHTML = 
    `
    <h2>"Ha ganado Boni"</h2>
    `
  } else {
    document.querySelector('#batalla').innerHTML = 
    `
    <h2>"Han ganado los Malos"</h2>
    `
  }
}

function compararAtaque() {
  elMalo.energia -= boni.puntosAtaque
  boni.energia -= elMalo.puntosAtaque

  if (boni.energia < 0) {
    boni.energia = 0 
    finalDeJuego()
  } else {
    if (elMalo.energia < 0) {
      elMalo.energia = 0
      if(losMalos.length > 0) {
        elMalo = new Personaje(data[losMalos.shift()])
        elMalo.generarNuevosNumeros()
      } else {
        finalDeJuego()
      }
    }
  }
}

function reducirPuntos(elArray) { 
  return elArray.reduce( (acc, num) =>  acc + num)
}

document.querySelector('#btn').addEventListener('click', atacar)
function atacar() {
  boni.aCargar = false
  elMalo.aCargar = false
  boni.generarNuevosNumeros()
  elMalo.generarNuevosNumeros()
  compararAtaque()
  document.querySelector('#el-bueno').innerHTML = boni.generarPersonajeHtml()
  document.querySelector('#el-malo').innerHTML = elMalo.generarPersonajeHtml()
  
}

const boni = new Personaje(data.boni)
let elMalo = new Personaje(data[losMalos.shift()])

boni.generarNuevosNumeros()
elMalo.generarNuevosNumeros()
document.querySelector('#el-bueno').innerHTML = boni.generarPersonajeHtml()
document.querySelector('#el-malo').innerHTML = elMalo.generarPersonajeHtml()




















