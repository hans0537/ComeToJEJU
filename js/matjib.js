$(document).ready(function(){

    // 지도 표시 및 숨기기
    // 흑돼지
    $("#googleMap").hide();
    $("#show").click(function(){$("#googleMap").show();});
    $("#hide").click(function(){$("#googleMap").hide();});
    
    // 고기국수
    $("#googleMap1").hide();
    $("#show1").click(function(){$("#googleMap1").show();});
    $("#hide1").click(function(){$("#googleMap1").hide();});
   
    $("#googleMap2").hide();
    $("#show2").click(function(){$("#googleMap2").show();});
    $("#hide2").click(function(){$("#googleMap2").hide();});


    // 흑돼지 자동 슬라이드
    let idx = 0;
    slideshow1();
    function slideshow1(){
        imgs1 = $(".pork");
        for (let i = 0; i < imgs1.length; i++) {
            $(imgs1[i]).hide();
        }
        idx++;
        if (idx > imgs1.length) {idx = 1}    
        $(imgs1[idx-1]).show();
        setTimeout(slideshow1, 3000);    
    };

    // 고기국수 자동 슬라이드
    let idx1 = 0;
    slideshow2();
    function slideshow2(){
        imgs2 = $(".noodle");
        for (let i = 0; i < imgs2.length; i++) {
            $(imgs2[i]).hide();
        }
        idx1++;
        if (idx1 > imgs2.length) {idx1 = 1}    
        $(imgs2[idx1-1]).show();
        setTimeout(slideshow2, 3000);    
    };

    // 해산물 자동 슬라이드
    let idx2 = 0;
    slideshow3();
    function slideshow3(){
        imgs3 = $(".seafood");
        for (let i = 0; i < imgs3.length; i++) {
            $(imgs3[i]).hide();
        }
        idx2++;
        if (idx2 > imgs3.length) {idx2 = 1}    
        $(imgs3[idx2-1]).show();
        setTimeout(slideshow3, 3000);    
    };
});

// Used to toggle the menu on small screens when clicking on the menu button
function myFunction() {
    var x = document.getElementById("navDemo");
    if (x.className.indexOf("w3-show") == -1) {
      x.className += " w3-show";
    } else { 
      x.className = x.className.replace(" w3-show", "");
    }
}
  
// When the user clicks anywhere outside of the modal, close it
var modal = document.getElementById('ticketModal');
window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
}

function myMap() {
    // 흑돼지 정보
    let googleMap = document.getElementById('googleMap');
    let mapProp = {
        center: new google.maps.LatLng(33.376828,126.548655),
        zoom: 10,
    };
    let map = new google.maps.Map(googleMap, mapProp);

    let pork = [
        ['Sugseongdo', 33.2582177, 126.4076363, 'https://www.google.com/maps/place/Sugseongdo/data=!4m19!1m13!4m12!1m4!2m2!1d127.037064!2d37.5034312!4e1!1m6!1m2!1s0x350c5b4dbc40f4af:0x2d699c4abde76e3e!2z7IiZ7ISx64-E!2m2!1d126.4076363!2d33.2582177!3m4!1s0x350c5b4dbc40f4af:0x2d699c4abde76e3e!8m2!3d33.2582177!4d126.4076363'],
        ['Sugseongdo silver', 33.4984367, 126.5297266, 'https://www.google.com/maps/place/%EC%88%99%EC%84%B1%EB%8F%84%EC%8B%A4%EB%B2%84/data=!4m19!1m13!4m12!1m4!2m2!1d127.037064!2d37.5034312!4e1!1m6!1m2!1s0x350cfcaf680069f3:0xd6fc5913bebe9b43!2z7IiZ7ISx64-EIOyLpOuyhA!2m2!1d126.5297266!2d33.4984367!3m4!1s0x350cfcaf680069f3:0xd6fc5913bebe9b43!8m2!3d33.4984367!4d126.5297266'],
        ['Sugseongdo HamDeokBeach', 33.5423994, 126.6712053, 'https://www.google.com/maps/place/%EC%88%99%EC%84%B1%EB%8F%84+%ED%95%A8%EB%8D%95%EC%A0%90/data=!4m5!3m4!1s0x350d1fa89990ba7b:0x665bdc4dfbd5cba!8m2!3d33.5423994!4d126.6712053'],
        ['Donsadon', 33.4788707, 126.4640837 ,'https://www.google.com/maps/place/%EB%8F%88%EC%82%AC%EB%8F%88+%EC%A0%9C%EC%A3%BC%EB%B3%B8%EA%B4%80/data=!4m5!3m4!1s0x350cfa447d5d74c9:0xc0bc4713a5843318!8m2!3d33.4788707!4d126.4640837'],
        ['Pork BBQ', 33.242032, 126.4439877, 'https://www.google.com/maps/place/Kkotdwaeji+Grill/data=!4m5!3m4!1s0x350c500c50bbecd1:0x583650d5775fd1c2!8m2!3d33.242032!4d126.4439877'],
        ['Pork with Sunrise', 33.447757, 126.9143433, 'https://www.google.com/maps/place/%EC%9D%BC%EC%B6%9C%EC%A0%9C%EC%A3%BC%ED%9D%91%EB%8F%BC%EC%A7%80/data=!4m5!3m4!1s0x350d134c6700712f:0x2a8d1ef828f03f3!8m2!3d33.4477574!4d126.9143433'],
    ]
    
    var myIcon = new google.maps.MarkerImage("img/restaurantIcon.png");
    for(let i = 0; i < pork.length; i++){
        let title = pork[i][0];
        let pos = new google.maps.LatLng(pork[i][1], pork[i][2]);
        let link = pork[i][3];
        let marker = new google.maps.Marker({
            position: pos,
            title: title,
            map: map,
            icon: myIcon,

        });
        
        let infowindow = new google.maps.InfoWindow({
            content: "<div style='font-weight:bold; text-align: center;'>" + title + "<br><br><red style='color: red; text-decoration:underline;'>Click to see</red></div>",
        })

        marker.addListener('mouseover', function(){
            infowindow.open(map, marker);
        });
        marker.addListener('mouseout', function(){
            infowindow.close(map, marker);
        });

        marker.addListener('click', function(){
            open(link, '_blank');
        })
    }

    // 고기국수 정보
    let googleMap1 = document.getElementById('googleMap1');
    let map1 = new google.maps.Map(googleMap1, mapProp);

    let noodle = [
        ['Jeju Olle Noodle', 33.5008987, 126.506051, 'https://www.google.com/maps/place/%EC%A0%9C%EC%A3%BC%EC%98%AC%EB%9E%98%EA%B5%AD%EC%88%98/data=!4m5!3m4!1s0x350cfb414d7ed325:0x98515ccafa3d314b!8m2!3d33.5008987!4d126.506051'],
        ['Sammu Noodle', 33.490567, 126.491045, 'https://www.google.com/maps/place/%EC%82%BC%EB%AC%B4%EA%B5%AD%EC%88%98/data=!4m5!3m4!1s0x350cfb0ff249fa93:0x361a65852e825ec9!8m2!3d33.490567!4d126.491045'],
        ['Samdae Noodle', 33.4929584, 126.4986739, 'https://www.google.com/maps/place/%EC%82%BC%EB%8C%80%EC%A0%84%ED%86%B5%EA%B3%A0%EA%B8%B0%EA%B5%AD%EC%88%98/data=!4m5!3m4!1s0x350cfb13761aa637:0x66bcb0bd837a3937!8m2!3d33.4929584!4d126.4986739'],
        ['Dongmoon Noodle', 33.5127431, 126.5283168,'https://www.google.com/maps/place/%EB%8F%99%EB%AC%B8%EC%8B%9C%EC%9E%A5%EA%B3%A0%EA%B8%B0%EA%B5%AD%EC%88%98/data=!3m1!4b1!4m5!3m4!1s0x350ce338661f2b27:0x76406883b4118752!8m2!3d33.5127431!4d126.5283168'],
        ['Matjondi Noodle', 33.245086, 126.527182, 'https://www.google.com/maps/place/Delicious+meat+noodles+jondi/data=!4m5!3m4!1s0x350c5a9af260268f:0x77de40ebcfa6a64!8m2!3d33.245086!4d126.527182'],
    ];
    
    for(let i = 0; i < noodle.length; i++){
        let title = noodle[i][0];
        let pos = new google.maps.LatLng(noodle[i][1], noodle[i][2]);
        let link = noodle[i][3];
        let marker = new google.maps.Marker({
            position: pos,
            title: title,
            map: map1,
            icon: myIcon,

        });
        
        let infowindow = new google.maps.InfoWindow({
            content: "<div style='font-weight:bold; text-align: center;'>" + title + "<br><br><red style='color: red; text-decoration:underline;'>Click to see</red></div>",
        })

        marker.addListener('mouseover', function(){
            infowindow.open(map1, marker);
        });
        marker.addListener('mouseout', function(){
            infowindow.close(map1, marker);
        });

        marker.addListener('click', function(){
            open(link, '_blank');
        })
    }

    // 해산물 정보
    let googleMap2 = document.getElementById('googleMap2');
    let map2 = new google.maps.Map(googleMap2, mapProp);

    let fish = [
        ['Kimgane Seafood', 33.240106, 126.5623039, 'https://www.google.com/maps/place/%EA%B9%80%EA%B0%80%EB%84%A4%ED%95%B4%EB%AC%BC%EB%9A%9D%EB%B0%B0%EA%B8%B0(Kimgane+Seafood)/data=!3m1!4b1!4m5!3m4!1s0x350c53a13e2b43c3:0x9bfecd24fd8a34f7!8m2!3d33.240106!4d126.5623039?hl=en'],
        ['Namyang Susan', 33.45008, 126.9141868, 'https://www.google.com/maps/place/Namyang+Susan/data=!3m1!4b1!4m5!3m4!1s0x350d137ee2cd3777:0x9686fe5719dfe02f!8m2!3d33.45008!4d126.9141868?hl=en'],
        ['Jeju Haemulbap', 33.4947, 126.4340182, 'https://www.google.com/maps/place/Jeju+Haemulbap/data=!3m1!4b1!4m5!3m4!1s0x350cf0824dcf9ac5:0xc3d2b2ee1fdc8550!8m2!3d33.4947!4d126.4340182?hl=en'],
        ['MiYeong\'s', 33.2176255, 126.2498976,'https://www.google.com/maps/place/%EB%AF%B8%EC%98%81%EC%9D%B4%EB%84%A4/data=!4m5!3m4!1s0x350c69f72c653503:0x735a1423dfdddac2!8m2!3d33.2176255!4d126.2498976?hl=en'],
        ['Myeongjin Jeonbok Abalone', 33.5324891, 126.8502082, 'https://www.google.com/maps/place/Myeongjin+Jeonbok+Abalone/data=!4m5!3m4!1s0x350d166b233eb787:0xf3629a7a166ec442!8m2!3d33.5324891!4d126.8502082?hl=en'],
    ];
    
    for(let i = 0; i < fish.length; i++){
        let title = fish[i][0];
        let pos = new google.maps.LatLng(fish[i][1], fish[i][2]);
        let link = fish[i][3];
        let marker = new google.maps.Marker({
            position: pos,
            title: title,
            map: map2,
            icon: myIcon,

        });
        
        let infowindow = new google.maps.InfoWindow({
            content: "<div style='font-weight:bold; text-align: center;'>" + title + "<br><br><red style='color: red; text-decoration:underline;'>Click to see</red></div>",
        })

        marker.addListener('mouseover', function(){
            infowindow.open(map2, marker);
        });
        marker.addListener('mouseout', function(){
            infowindow.close(map2, marker);
        });

        marker.addListener('click', function(){
            open(link, '_blank');
        })
    }
}


