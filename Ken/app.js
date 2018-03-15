//Data 
var games = [
    {
        name: 'Dragon Ball Fighter Z',
        price: 44.95,
        description: 'After the success of the Xenoverse series, it’s time to introduce a new classic 2D Dragon Ball fighting game for this generation’s consoles. Dragon Ball FighterZ is born from what makes the Dragon Ball series so loved and famous: endless spectacular fights with its all-powerful fighters.',
        trailer:'https://www.youtube.com/embed/4LRFxs1BEFk',
        canPurchase: true,
        soldOut: false,
        images: [{thumb: 'images/cover/dbz.jpg'}],
        reviews: [{ stars: 5,
                    comment: 'good game',
                    name: "Ken",
                    email: "ken@webshop.nl"},
                  { stars: 4,
                    comment: "nice fighter",
                    name: "Mark",
                    email: "mark@company.nl"}
                 ]
    },
    {
        name: 'Street Fighter V: Arcade Edition',
        price: 34.95,
        description: 'Street Fighter V: Arcade Edition is a 2.5D fighting game and the first major updated version of Street Fighter V.',
        trailer:false,
        canPurchase: false,
        soldOut: false,
        images: [{thumb: 'images/cover/sfv.jpg'}],
        reviews: []
    },
    {
        name: 'Danganronpa V3',
        price: 44.95,
        description: 'Welcome to a new world of Danganronpa, and prepare yourself for the biggest, most exhilarating episode yet. Meet cool new characters, investigate twisted murder scenes, and condemn your new friends to death.',
        trailer:false,
        canPurchase: true,
        soldOut: false,
        images: [{thumb: 'images/cover/dv3.jpg'}],
        reviews: []
    },
    {
        name: 'Mega Man Legacy Collection',
        price: 10.00,
        description: "Mega Man Legacy Collection is a celebration of the 8-bit history of Capcom's iconic Blue Bomber featuring faithful reproductions of the series' origins with the original six Mega Man games.",
        trailer:false,
        canPurchase: false,
        soldOut: false,
        images: [{thumb: 'images/cover/mmlc.jpg'}],
        reviews: []
    },   
    {
        name: 'Assassins Creed Origins',
        price: 53.99,
        description: "Journey into Ancient Egypt, the most mysterious place in History, during a crucial period that will shape the world. Discover the secrets behind the Great Pyramids, forgotten myths, the last pharaohs, and - engraved in long-lost hieroglyphics - the origin story of the Assassin's Brotherhood.",
        trailer:'https://www.youtube.com/embed/cUuKIpCM2o0',
        canPurchase: true,
        soldOut: false,
        images: [{thumb: 'images/cover/aco.jpg'}],
        reviews: []
    },
    {
        name: 'Persona 5',
        price: 38.49,
        description: "Persona 5 is a game about the internal and external conflicts of a group of troubled high school students - the protagonist and a collection of compatriots he meets in the game's story - who live dual lives as Phantom Thieves. They have the typically ordinary day-to-day of a Tokyo high schooler - attending class, after school activities and part-time jobs. But they also undertake fantastical adventures by using otherworldly powers to enter the hearts of people. Their power comes from the Persona, the Jungian concept of the self.",
        trailer:false,
        canPurchase: false,
        soldOut: false,
        images: [{thumb: 'images/cover/p5.jpg'}],
        reviews: []
    },     
];

window.onload = init;
function init(){
    let body = document.body;
    
    let header =  document.getElementById("header");
        header.innerHTML = "KG - Ken Gameshop";
        header.style.backgroundColor = "navy";
        header.style.color = "white";
        header.style.display = "block";
        header.style.height = "50px";
        header.style.width = "100%";
        header.style.fontSize = "20px";
    
    setTimeout(function(){
        header.style.top = "0px";
    }, 500);
}

(function(){
let app = angular.module('game', []);
app.controller('GameController', function(){
    this.product = games;
});

app.controller("TabController", function(){
    this.tab = 0;
    
    this.selectTab = function(setTab){
        this.tab = setTab;
    };

    this.isSelected = function(checkTab){
        return this.tab === checkTab;
    };
});
    
app.controller("ReviewController", function(){
    this.review = {};
    
    this.addReview = function(product){
        product.reviews.push(this.review);
        this.review = {};
    }
});

//needed for Embedded Youtube links. 
app.filter('trustAsResourceUrl', ['$sce', function(sce) {
    return function(val) {
        return sce.trustAsResourceUrl(val);
    };
}]);     
    
})();