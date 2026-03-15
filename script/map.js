// Inicializa o mapa em Xoinville
var map = L.map('map').setView([-26.3044, -48.8464], 13);

// Adiciona o mapa base do OpenStreetMap
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

// Pontos de descarte reais em JotaVille - Eles não tão puxando certo, por isso ainda é uma featura que terá de ser avalida se vai pro projeto ou não
var pontosDescarte = [
    {coords: [-26.2872, -48.8708], tipo: "Reset Descarte Tecnológico - Jardim Iririú"},
    {coords: [-26.2741, -48.8547], tipo: "CEU Aventureiro"},
    {coords: [-26.2826, -48.8670], tipo: "Unidade Regional de Obras Centro-Oeste"}
];

var pontosPapel = [
    {coords: [-26.2868, -48.8708], tipo: "Reset Descarte Tecnológico - Jardim Iririú"}
]
var pontosPlastico = [
    {coords: [-26.2741, -48.8547], tipo: "CEU Aventureiro"}
]
var pontosAluminio = [
    {coords: [-26.2826, -48.8670], tipo: "Unidade Regional de Obras Centro-Oeste"}
]

var pontosPapelao = [
    {coords: [-26.2926, -48.8070], tipo: "Unidade Regional de Obras Centro-Oeste"}
]

//Personalização do ícone.

    //Localização Atual.
    var myIcon = L.icon({
                iconUrl: 'icon\emoji_people_24dp_0000F5_FILL0_wght400_GRAD0_opsz24.svg',  // URL da imagem do ícone padrão
                iconSize: [32, 32],  // Tamanho do ícone
                iconAnchor: [16, 32],  // Posição do ponto de ancoragem (onde o marcador "aponta")
                popupAnchor: [0, -32],  // Posição do popup
                shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png', // Sombra do marcador
                shadowSize: [41, 41], // Tamanho da sombra
                shadowAnchor: [13, 41] // Posição da sombra
            });

    //descarte  de Papel. - Descrição em um só tá bão né (eu fiz cagada e tive que refazer coisas aqui hein)
    var papelIcon = L.icon({
                iconUrl: 'icon/azul.svg',  
                iconSize: [32, 32],  
                iconAnchor: [16, 32], 
                popupAnchor: [0, -32],  
                shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png', 
                shadowSize: [41, 41], 
                shadowAnchor: [13, 41] 
            });

    //descarte de Papelão.
    var papelaoIcon = L.icon({
                iconUrl: 'icon/marrom.svg', 
                iconSize: [32, 32],  
                iconAnchor: [16, 32],  
                popupAnchor: [0, -32],  
                shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png', 
                shadowSize: [41, 41], 
                shadowAnchor: [13, 41] 
            });

    // descarte Aluminio.
    var aluminioIcon = L.icon({
                iconUrl: 'icon/amarelo.svg',  
                iconSize: [32, 32],  
                iconAnchor: [16, 32],  
                popupAnchor: [0, -32],  
                shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png', 
                shadowSize: [41, 41],
                shadowAnchor: [13, 41] 
            });
    
        // descarte Plástico.
        var plasticoIcon = L.icon({
            iconUrl: 'icon/vermelho.svg',  
            iconSize: [32, 32], 
            iconAnchor: [16, 32],  
            popupAnchor: [0, -32],  
            shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png', 
            shadowSize: [41, 41],
            shadowAnchor: [13, 41] 
        });
// Filtra, no mapa, os pontos selecionados pelo usuário.

var ativado = true


// Adiciona os pontos de descarte reais ao mapa
const intervalo = setInterval(pontosDescartePapel(), 100)

pontosDescartePapelao()
pontosDescartePlastico()
pontosDescarteAluminio()






// Pesquisa e localização de cidade
function searchCity() {
    const city = document.getElementById('city-input').value;
    if (city) {
        L.Control.Geocoder.nominatim().geocode(city + ", Brazil", function(results) {
            if (results.length > 0) {
                const { center } = results[0];
                map.setView(center, 13);
            } else {
                alert("Cidade não encontrada.");
            }
        });
    }
}

//Localização atual
function obterLocalizacao() {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function(position) {
                    var lat = position.coords.latitude;
                    var lon = position.coords.longitude;
                    
                    // Atualizar o mapa com a localização do usuário
                    map.setView([lat, lon], 13);  // Centraliza o mapa na localização atual
                    L.marker([lat, lon], { icon: myIcon }).addTo(map)  // Adiciona um marcador na localização
                        .bindPopup("Você está aqui!")
                        .openPopup();
                }, function(error) {
                    alert("Erro ao obter a localização: " + error.message);
                });
            } else {
                alert("A geolocalização não é suportada pelo seu navegador.");
            }
        }

// Adicionar Ponto de Descarte
document.addEventListener("DOMContentLoaded", function () {
    const addPointButton = document.getElementById("addPointButton");
    
    if (addPointButton) {
        addPointButton.addEventListener("click", function () {
            const tipo = prompt("Tipo de Ponto de Descarte:");
            const latitude = prompt("Latitude:");
            const longitude = prompt("Longitude:");

            if (tipo && latitude && longitude) {
                L.marker([latitude, longitude], { icon: batteryIcon }).addTo(map)
                    .bindPopup(`Ponto de descarte: ${tipo}`);
            }
        });
    }
});


        // Chamar a função para obter a localização do usuário
        obterLocalizacao();

    // Funções que adicionam os pontos de descarte reais ao mapa
function pontosDescartePapel(){
    if(ativado){
        pontosPapel.forEach(ponto => {
            L.marker(ponto.coords, {icon: papelIcon})
                .addTo(map)
                .bindPopup(`Ponto de descarte: ${ponto.tipo}`);
        });
    }
}


function pontosDescartePapelao(){
    pontosPapelao.forEach(ponto => {
        L.marker(ponto.coords, {icon: papelaoIcon})
            .addTo(map)
            .bindPopup(`Ponto de descarte: ${ponto.tipo}`);
    });
}

function pontosDescartePlastico(){
    pontosPlastico.forEach(ponto => {
        L.marker(ponto.coords, {icon: plasticoIcon})
            .addTo(map)
            .bindPopup(`Ponto de descarte: ${ponto.tipo}`);
    });
}

function pontosDescarteAluminio(){
    pontosAluminio.forEach(ponto => {
        L.marker(ponto.coords, {icon: aluminioIcon})
            .addTo(map)
            .bindPopup(`Ponto de descarte: ${ponto.tipo}`);
    });
}

