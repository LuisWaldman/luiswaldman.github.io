// JavaScript source code
let Datos =
{
    resumen: { 
        total_versos: 0
    },
    seleccion_carpetaid: 0,
    seleccion_poemaid: 0,
    poemario: [],
    titulo: "",
    poema: "",
    versos: [],
    rimas: [],
    rimas_asonantes: [],
    letras: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
    'A2', 'B2', 'C2', 'D2', 'E2', 'F2', 'G2', 'H2', 'I2', 'J2', 'K2', 'L2', 'M2', 'N2', 'O2', 'P2', 'Q2', 'R2', 'S2', 'T2', 'U2', 'V2', 'W2', 'X2', 'Y2', 'Z2'],
    rimaconsonante: false,
    colorInicial: '#f8f4fa',
    colorFinal: '#b488f2',
}

Datos.poemario = Poemario;

var miPoema = Datos.poemario[Datos.seleccion_carpetaid].poemas[Datos.seleccion_poemaid];
Datos.poema = miPoema.poema;
Datos.titulo = miPoema.titulo;
Datos.rimaconsonante = miPoema.rimaconsonante;

function letrarima(rima)
{
    for (let i = 0; i < Datos.rimas.length; i++)
        if (Datos.rimas[i] == rima)
            return i;
    var id = Datos.rimas.length;
    Datos.rimas[id] = rima;

    return id;
}

function obtenerrima_asonante(rima)
{
    var rima_asonante = '';
    if (rima.includes('a'))
        rima_asonante = 'a';
    if (rima.includes('e'))
        rima_asonante = 'e';
    if (rima.includes('i'))
        rima_asonante = 'i';
    if (rima.includes('o'))
        rima_asonante = 'o';
    if (rima.includes('u'))
        rima_asonante = 'u';
    if (rima.includes('\xe1'))   // A CON ACENTO
        rima_asonante = '\xe1';
    if (rima.includes('\xe9'))  // E CON ACENTO
        rima_asonante = '\xe9';
    if (rima.includes('\xed'))  // I CON ACENTO
        rima_asonante = '\xed';
    if (rima.includes('\xf3'))    // O CON ACENTO
        rima_asonante = '\xf3';
    if (rima.includes('\xfa'))   // U CON ACENTO
        rima_asonante = '\xfa';

    return rima_asonante;
}

function letrarima_asonante(rima)
{
    var rima_asonante = obtenerrima_asonante(rima);

    for (let i = 0; i < Datos.rimas_asonantes.length; i++)
        if (Datos.rimas_asonantes[i] == rima_asonante)
            return i;
    var id = Datos.rimas_asonantes.length;
    Datos.rimas_asonantes[id] = rima_asonante;
    return id;
}





let controlador = {

    componentToHex(c) {
        var hex = c.toString(16);
        return hex.length == 1 ? "0" + hex : hex;
      },
      
      rgbToHex(r, g, b) {
        return "#" + this.componentToHex(r) + this.componentToHex(g) + this.componentToHex(b);
      },
      

    hexToRgb(hex) {
        var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16)
        } : null;
    },
    ValorMedio(De, A, PasoNro, TotalPasos)
    {
        var Dif = A - De;
        return De + parseInt(((parseFloat(Dif) / parseFloat(TotalPasos)) * parseFloat(PasoNro)));
    },

    ColorMedio(DeColor, AColor, PasoNro, TotalPasos) 
    {
        var desdeRGB = this.hexToRgb(DeColor);
        var aRGB = this.hexToRgb(AColor);
        var medioR = this.ValorMedio(desdeRGB.r, aRGB.r, PasoNro, TotalPasos);
        var medioG = this.ValorMedio(desdeRGB.g, aRGB.g, PasoNro, TotalPasos);
        var medioB = this.ValorMedio(desdeRGB.b, aRGB.b, PasoNro, TotalPasos);
        return this.rgbToHex(medioR, medioG, medioB);

    },

    CalcularPoema() {
        
        Datos.rimas = [];
        Datos.rimas_asonantes = [];
        var newresumen = {
            total_versos: 0
        }

        Datos.versos = [];
        let ultimo_espacio = ' ';
        var renglones = Datos.poema.split('\n');
        for (var i = 0; i < renglones.length; i++)
        {
            ultimo_espacio = ' ';
            nuevoVerso = {
                total_silabas: 0,
                acento: 0,
                palabras: [],
                espacios: [],
                rima: ''
            }

            while (renglones[i].includes('  '))
                renglones[i] = renglones[i].replace('  ', ' ');
            var palabras = renglones[i].split(' ');

            for (var pi = 0; pi < palabras.length; pi++)
            {
                var palAnalisis = QuitarCaracteresEspeciales(palabras[pi]);
                palabras[pi] = palAnalisis;

                if (palAnalisis != '')
                {
                    var indicePalabra = nuevoVerso.palabras.length;
                    nuePal = silabaJS.getSilabas(palAnalisis);
                    nuevoVerso.palabras[indicePalabra] = nuePal;
                    nuevoVerso.espacios[indicePalabra] = ' ';
                    if (indicePalabra > 0)
                    {

                        if (TerminaConVocal(palabras[indicePalabra - 1]) && EmpiezaConVocal(palabras[indicePalabra])) {
                            if (ultimo_espacio == ' ' || palabras[indicePalabra - 1].length > 1)
                            {
                                nuevoVerso.espacios[indicePalabra - 1] = '_';
                                nuevoVerso.total_silabas--
                                ultimo_espacio = '_'
                            }
                            else
                            {
                                ultimo_espacio = ' '
                            }
                        }
                        else
                        {
                            ultimo_espacio = ' ';
                        }

                    }

                    // Actualizo estadisticas
                    nuevoVerso.total_silabas += nuePal.numeroSilaba
                    nuevoVerso.acento = 0;
                    if (nuePal.acentuacion.startsWith("Agu"))
                        nuevoVerso.acento = +1;
                    if (nuePal.acentuacion.startsWith("E"))
                        nuevoVerso.acento = -1;

                }

            }

            ultimapalabra = nuevoVerso.palabras[nuevoVerso.palabras.length - 1];
            if (ultimapalabra)
            {
                newresumen.total_versos = newresumen.total_versos + 1; 
                ultimasilaba = ultimapalabra.silabas[ultimapalabra.silabas.length - 1];

                nuevoVerso.rima = letrarima(ultimasilaba.silaba);
                nuevoVerso.rima_asonante = letrarima_asonante(ultimasilaba.silaba);
            }
            Datos.versos[Datos.versos.length] = nuevoVerso;
        }

        Datos.resumen = newresumen;
    }
};
controlador.CalcularPoema();



let app = new Vue({
    el: '#miApp',
    data: Datos,
    methods: {
        calcularPoema: function () {
            controlador.CalcularPoema();
        },
        borrar_panel: function () {
            Datos.poema = '';
            controlador.CalcularPoema();
        },
        Modifico_Verso: function()
        {
            

        },
        cambio_poema: function() 
        {
            var miPoema = Datos.poemario[Datos.seleccion_carpetaid].poemas[Datos.seleccion_poemaid];
            Datos.poema = miPoema.poema;
            Datos.titulo = miPoema.titulo;
            Datos.rimaconsonante = miPoema.rimaconsonante;
            controlador.CalcularPoema();
            this.$forceUpdate();
        },
        cambio_carpeta: function() {
            Datos.seleccion_poemaid = 0;
            this.cambio_poema();

        },

        estiloVerso: function(verso) 
        
        {

            var rimaid = 0;
            var total_rimas = 0;
            if (Datos.rimaconsonante)
            {
                rimaid = verso.rima;
                total_rimas = Datos.rimas.length;
            }
            else
            {
                rimaid = verso.rima_asonante;
                total_rimas = Datos.rimas_asonantes.length;
            }
            


            var backgroungcolor = '';


            backgroungcolor = controlador.ColorMedio(Datos.colorInicial, Datos.colorFinal, rimaid, total_rimas);


            var retEstilo = {
                'background-color': backgroungcolor
            };
            return retEstilo;
        },
        estiloTotalSilabas: function(verso) {
            var color = '';
            var borde = '';

            var real_silabas = verso.total_silabas + verso.acento; 

            if (real_silabas == 8)
            {
                
                color = 'green';
                borde = 'solid 1px ' + color;

            }

            
            if (real_silabas == 11)
            {
                
                color = 'green';
                borde = 'solid 1px ' + color;

            }



            var retEstilo = {
                color: color,
                border: borde
            };
            return retEstilo;
        },
    }
})


function mostrarPeoma()
{
    console.log(JSON.stringify(Datos.poema));
    
}