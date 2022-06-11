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
        <div class="barra-energia"></div>
        <div class="los-numeros flex">
          ${this.dadosHtml}
        </div>
      `
  }

  generarNuevosNumeros() {
    this.dadosHtml = this.generarDadosHtml()
  }
}

// *************

function compararAtaque() {
  elMalo.energia -= boni.puntosAtaque
  boni.energia -= elMalo.puntosAtaque
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
const elMalo = new Personaje(data[losMalos.shift()])

boni.generarNuevosNumeros()
elMalo.generarNuevosNumeros()
document.querySelector('#el-bueno').innerHTML = boni.generarPersonajeHtml()
document.querySelector('#el-malo').innerHTML = elMalo.generarPersonajeHtml()




















