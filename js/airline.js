// 항공정보 api
let apikey = "F%2BhtEOOzUbA%2BkbB2O7T36yIFjWFBHexGAtpyt43vMwwSgKXwLAvQtPui9mArfJCimdNZb8TXQKGbpyFJAP9saQ%3D%3D";
// let apikey = "F+htEOOzUbA+kbB2O7T36yIFjWFBHexGAtpyt43vMwwSgKXwLAvQtPui9mArfJCimdNZb8TXQKGbpyFJAP9saQ==";
let deptCity = "";
// 사용자 현재 시간 파라미터 포멧으로 바꾸기
let d = new Date();
let startDate = d.getFullYear();
if(d.getMonth() < 10){
    startDate += 0 + "" + (d.getMonth() + 1);
}else{
    startDate += "" + (d.getMonth() + 1);
}
if(d.getDate() < 10){
    startDate += 0 + "" + d.getDate();
}else{
    startDate += d.getDate();
}

let pgNum = 1;
let totalPg = 0;

let airIcon = {
    "AIR SEOUL" : "<img src='img/airseoul.png' alt='AIR SEOUL' class='airseoul'></img>",
    "T'WAY AIR CO.LTD" : "<img src='img/tway.png' alt='T'WAY AIR CO.LTD'></img>",
    "KOREAN AIR" : "<img src='img/korean.png' alt='KOREAN AIR' class='koreanair'></img>",
    "ASIANA AIRLINE" : "<img src='img/asiana.png' alt='ASIANA AIRLINE' class='asiana'></img>",
    "AIR BUSAN" : "<img src='img/airbusan.png' alt='AIR BUSAN'></img>",
    "JINAIR" : "<img src='img/jinair.png' alt='JINAIR'></img>",
    "HI AIR" : "<img src='img/hiair.png' alt='HI AIR' class='hiair'></img>",
    "JEJU AIR" : "<img src='img/jejuair.png' alt='JEJU AIR' class='jejuair'></img>",
};

$(document).ready(function(){

    $("#prev").hide();
    $("#next").hide();

    $("#btn").click(function(){
        pgNum = 1;
        totalPg = 0;

        deptCity = $("#depart option:selected").val();
        if($("#sDate").val() != ""){
            startDate = $("#sDate").val().replaceAll("-","");
        }
        
        let url1 = `http://openapi.airport.co.kr/service/rest/FlightScheduleList/getDflightScheduleList?schDate=${startDate}&ServiceKey=${apikey}&schDeptCityCode=${deptCity}&schArrvCityCode=CJU&pageNo=${pgNum}`;
        $.ajax({
            url: url1,
            type: "GET",
            cache: false,
            success: function(data, status) {
                if(status == "success") {
                    console.log(url1);
                    parseXML1(data);
                }
            }
        });        
    });
    
    // 이전 페이지
    $("#prev").click(function(){
        if(pgNum == 1) {
            alert("This is first page.");
            return;
        }else{
            pgNum -= 1;
            deptCity = $("#depart option:selected").val();
            
            let url1 = `http://openapi.airport.co.kr/service/rest/FlightScheduleList/getDflightScheduleList?schDate=${startDate}&ServiceKey=${apikey}&schDeptCityCode=${deptCity}&schArrvCityCode=CJU&pageNo=${pgNum}`;
            $.ajax({
                url: url1,
                type: "GET",
                cache: false,
                success: function(data, status) {
                    if(status == "success") {
                        console.log(url1);
                        parseXML1(data);
                    }
                }
            });
        }
    });

    // 다음 페이지
    $("#next").click(function(){
        if(pgNum == totalPg) {
            alert("This is last page.");
            return;
        }else{
            pgNum += 1;
            deptCity = $("#depart option:selected").val();
            
            let url1 = `http://openapi.airport.co.kr/service/rest/FlightScheduleList/getDflightScheduleList?schDate=${startDate}&ServiceKey=${apikey}&schDeptCityCode=${deptCity}&schArrvCityCode=CJU&pageNo=${pgNum}`;
            $.ajax({
                url: url1,
                type: "GET",
                cache: false,
                success: function(data, status) {
                    if(status == "success") {
                        console.log(url1);
                        parseXML1(data);
                    }
                }
            });
        }
    });
});

// 항공편 조회
function parseXML1(xmlDOM) {
    let totalCount = parseInt($(xmlDOM).find("totalCount").text());
    totalPg = parseInt(totalCount / 10) + 1;

    let table = [];
    table.push("<tr><th>AIRLINE</th><th>DEPART</th><th>ARRIVE</th><th>DEPART TIME</th><th>ARRIVAL TIME</th></tr>");
    
    if(totalCount == 0) {
        table.push('<tr style="text-align: center;"><td colspan="5">No Flights Data</td></tr>');
    }else if(totalCount > 0){
        
        $(xmlDOM).find("item").each(function(){
            table.push(`
            <tr>
                <td class="airlines">${$(this).find("airlineEnglish").text()}${airIcon[$(this).find("airlineEnglish").text()]}</td>
                <td>${$(this).find("startcityCode").text()}</td>
                <td>${$(this).find("arrivalcityCode").text()}</td>
                <td>${$(this).find("domesticStartTime").text().substr(0,2)} : ${$(this).find("domesticStartTime").text().substr(2,4)}</td>
                <td>${$(this).find("domesticArrivalTime").text().substr(0,2)} : ${$(this).find("domesticArrivalTime").text().substr(2,4)}</td>
            </tr>
            `);
        });
    }
	
	$("#flightData").html(table.join('\n'));
    $("#prev").show();
    $("#next").show();
}