// 공공데이터 기상청 apikey
let apikey = "F%2BhtEOOzUbA%2BkbB2O7T36yIFjWFBHexGAtpyt43vMwwSgKXwLAvQtPui9mArfJCimdNZb8TXQKGbpyFJAP9saQ%3D%3D";
let cityCode1 = "11G00000";  // 육상 날씨 제주 코드
let cityCode2 = "11G00201"; // 기온 제주 코드
let d = new Date();
let month = d.getMonth() + 1;
let date = d.getDate();

$(document).ready(function(){

    $("#alert").click(function(){
        alert('We are currently preparing this service. Please try again later.');        
    });
    
    // 이미지 자동 슬라이드
    let idx = 0;
    slideshow();
    function slideshow(){
        imgs = $(".slide");
        for (let i = 0; i < imgs.length; i++) {
            $(imgs[i]).hide();
        }
        idx++;
        if (idx > imgs.length) {idx = 1}    
        $(imgs[idx-1]).show();
        setTimeout(slideshow, 3000);    
    };

    // 사용자 현재 시간 파라미터 포멧으로 바꾸기
    let startdate = d.getFullYear();
    if(d.getMonth() < 10){
        startdate += 0 + "" + (d.getMonth() + 1);
    }else{
        startdate += "" + (d.getMonth() + 1);
    }
    
    if(d.getDate() < 10){
        startdate += 0 + "" + d.getDate();
    }else{
        startdate += d.getDate();
    }
    
    if(d.getHours() >= 6 && d.getHours() < 18){
        startdate += "0600";
    }else{
        startdate += "1800";
    }
    
    if(d.getMinutes()<10){
        $(".weather-date").text(`${month}.${date}.${d.getFullYear()} ${d.getHours()} : 0${d.getMinutes()}`)
    }else{
        $(".weather-date").text(`${month}.${date}.${d.getFullYear()} ${d.getHours()} : ${d.getMinutes()}`)
    }

    $(".weakly-weather-item .mb-1").each(function(idx) {
        $(this).text(`${monthCal(month, date + idx + 1)} / ${dateCal(date + idx + 1)}`);
    });
    
    // 데이터 요청 
    // 중기 예보
    let url = `http://apis.data.go.kr/1360000/MidFcstInfoService/getMidLandFcst?serviceKey=${apikey}&numOfRows=10&pageNo=1&regId=${cityCode1}&tmFc=${startdate}`
    $.ajax({
        url: url,
        type: "GET",
        cache: false,
        success: function(data, status){
            if(status == "success") {
                parseXML1(data);
                console.log(url);
            }
        }
    });

    let url2 = `http://apis.data.go.kr/1360000/MidFcstInfoService/getMidTa?serviceKey=${apikey}&numOfRows=10&pageNo=1&regId=${cityCode2}&tmFc=${startdate}`
    $.ajax({
        url: url2,
        type: "GET",
        cache: false,
        success: function(data, status){
            if(status == "success") {
                parseXML2(data);
            }
        }
    });

    // 당일 날씨
    $.ajax({
        url: "https://api.openweathermap.org/data/2.5/weather?q=jeju&appid=4ec1131bb359969b57cb52fd61bacb26&&units=metric",
        type: "GET",
        cache: false,
        success: function(data, status) {
            if(status == "success") {
                parseJSON(data);
            }
        }
    });

    // contact 폼검증후 제출
    $("#btn").click(function(){
        // 이름 검사
        let $name = $("input[name='name']");
        if ($name.val() == "") {
            alert("Check Your Name");
            $name.focus();
            return;
        }

        // 이메일 검사
        let $email = $("input[name='email']");
        let emailPat = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+/;  
        if (!emailPat.test($email.val())) {
            alert("Check Your Email Pattern");
            $email.focus();
            return;
        }
        
        confirm("Are you sure to submit?") && $("form[name='frm']").submit();
    });    
});


// Used to toggle the menu on small screens when clicking on the menu button
function myFunction() {
    let x = document.getElementById("navDemo");
    if (x.className.indexOf("w3-show") == -1) {
      x.className += " w3-show";
    } else { 
      x.className = x.className.replace(" w3-show", "");
    }
}
  

// 일기예보에 대한 아이콘 오브젝트 생성
let weatherIcon = {
    '구름많음' : '<i class="wi wi-day-cloudy"></i>',
    '흐리고 비' : '<i class="wi wi-rain"></i>',
    '맑음' : '<i class="wi wi-day-sunny"></i>',
    '눈' : '<i class="wi wi-snow"></i>',
    '흐림' : '<i class="wi wi-cloudy"></i>',
    '비' : '<i class="wi wi-rain"></i>',
}

let weatherIcon1 = {
    '01' : '맑음',
    '02' : '구름많음',
    '03' : '흐림',
    '04' : '흐림',
    '09' : '흐리고 비',
    '10' : '흐리고 비',
    '11' : '비',
    '13' : '눈',
    '50' : '흐림'
};

// 당일날씨
function parseJSON(jsonObj){
    $(".display-3").text(parseInt(jsonObj.main.temp) + " °C");
    $("#cWeather").html(weatherIcon[weatherIcon1[(jsonObj.weather[0].icon).substr(0,2)]]);
}

// 중기 예보
function parseXML1(xmlDOM) {

    let item = $(xmlDOM).find("item");

    // 강수 확률
    $(".weakly-weather-item #rainPer").each(function(idx) {
        if(idx == 5 || idx == 6) {
            $(this).html(`<i class="wi wi-raindrops"></i> ${$(item).find("rnSt" + (idx + 3)).text()}%`);
        }else{
            $(this).html(`<i class="wi wi-raindrops"></i> ${$(item).find("rnSt" + (idx + 3) + "Am").text()}%`);
        }
    });

    // 날씨 예보
    $(".weakly-weather-item #weather-forecast").each(function(idx) {
        if(idx == 5 || idx == 6) {
            $(this).html(`${weatherIcon[$(item).find("wf" + (idx + 3)).text()]}`);
        }else{
            $(this).html(`${weatherIcon[$(item).find("wf" + (idx + 3) + "Am").text()]}`);
        }
    });

	
}

// 중기 기온 예보
function parseXML2(xmlDOM) {

    let item = $(xmlDOM).find("item");

    $(".weakly-weather-item .mb-0").each(function(idx) {
        $(this).text(`${$(item).find("taMin" + (idx + 3)).text()} / ${$(item).find("taMax" + (idx + 3)).text()}°C`);
    });
}


function monthCal(m, d){
    if(m == 1 || m == 3 || m == 5 || m == 7 || m == 8 || m == 10 || m == 12){
        if(d > 31) {
            if(m == 12){
                return 1;
            }else{
                return m + 1;
            }
        }
        return m;
    }else{
        if(d > 30) {
            return m + 1;
        }else {
            return m;
        }
    }
}

function dateCal(d){
    if(month == 1 || month == 3 || month == 5 || month == 7 || month == 8 || month == 10 || month == 12){
        if(d > 31) return d - 31;
        return d;
    }else{
        if(d > 30) {
            return d - 30;
        }else {
            return d;
        }
    }
}