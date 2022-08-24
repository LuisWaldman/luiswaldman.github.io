// JavaScript source code
function TerminaConVocal(palabra)
{

    return '\xe1\xe9\xed\xf3\xfaaeiouy'.includes(palabra[palabra.length - 1])

}


function QuitarTildes(palabra) {
    let ret = palabra.replace('\xe1', 'a');
    ret = ret.replace('\xe9', 'e');
    ret = ret.replace('\xed', 'i');
    ret = ret.replace('\xf3', 'o');
    ret = ret.replace('\xfa', 'u');
    return ret;

}

function EmpiezaConVocal(palabra)
{
    let index = 0;
    if (palabra[0] == 'h')
        index = 1;

    if (palabra == 'y')
        return true;
    return '\xe1\xe9\xed\xf3\xfaaeiou'.includes(palabra[index])
}

function QuitarCaracteresEspeciales(palabra)
{
    var palAnalisis = palabra;
    palAnalisis = palAnalisis.replace(',', '');
    palAnalisis = palAnalisis.replace('\t', '');
    palAnalisis = palAnalisis.replace('.', '');
    palAnalisis = palAnalisis.replace(':', '');
    palAnalisis = palAnalisis.replace(';', '');
    palAnalisis = palAnalisis.replace(')', '');
    palAnalisis = palAnalisis.replace('(', '');
    palAnalisis = palAnalisis.replace(',', '');

    while (palAnalisis.includes(' '))
       palAnalisis = palAnalisis.replace(' ', '');
    palAnalisis = palAnalisis.toLowerCase();
    return palAnalisis;

}
