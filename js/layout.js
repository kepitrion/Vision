// func
function ringo_do_xss_encode(data) {
    data = data.replace(/'/g, '&#x27;');
    data = data.replace(/"/g, '&quot;');
    data = data.replace(/</g, '&lt;');
    data = data.replace(/</g, '&gt;');

    return data;
}

function ringo_do_url_encode(data) {
    return encodeURIComponent(data);
}

// event
vision_user_info();
function vision_user_info() {
    let name = document.getElementById('sidebar-0-name1').innerHTML;
        
    fetch("/api/user_info/" + ringo_do_xss_encode(name)).then(function(res) {
        return res.json();
    }).then(function(text) {
        let data = "";
        for(let for_a = 0; for_a < text['data'].length; for_a++) {
            data += ringo_do_url_encode(text['data'][for_a]['level']) +
            ' (' + ringo_do_url_encode(text['data'][for_a]['exp']) + ' / ' + ringo_do_url_encode(text['data'][for_a]['max_exp']) + ')';
        }
        document.getElementById('sidebar-0-name3').innerHTML = data;
    }).catch(function() {
        document.getElementById('sidebar-0-name3').innerHTML = 'Error: Failed to load user information.';
    });
}

ringo_do_side_button_1();
function ringo_do_side_button_1() {
    fetch("/api/recent_change/14").then(function(res) {
        return res.json();
    }).then(function(text) {
        let data = '';
        for(let for_a = 0; for_a < text.length && for_a < 14; for_a++) {
            if(text[for_a][6] === '') {
                data += '<li><a class="recent-item" href="/w/'+ ringo_do_xss_encode(text[for_a][1]) + '">';
                data += '<span class="recent-time">' + ringo_do_xss_encode(text[for_a][2].slice(11, -3)) + '</span>';
                data += '<span class="recent-title">' + ringo_do_xss_encode(text[for_a][1]) + '</span></a></li>';
            } else {
                data += '<li>[Unavailable Content]</li>';
            }
        }
        document.getElementById('sidebar-1-list').innerHTML = data;
    }).catch(function() {
        document.getElementById('sidebar-1-item').innerHTML = 'Error: Failed to fetch API.';
    });
}

ringo_do_side_button_2();
function ringo_do_side_button_2() {
    fetch("/api/recent_discuss").then(function(res) {
        return res.json();
    }).then(function(text) {
        let data = '';
        for(let for_a = 0; for_a < text.length && for_a < 6; for_a++) {
            data += '<li><a class="recent-item" href="/thread/' + ringo_do_url_encode(text[for_a][3]) + '">';
            data += '<span class="recent-time">' + ringo_do_xss_encode(text[for_a][2].slice(11, -3)) + '</span>';
            data += '<span class="recent-title">' + ringo_do_xss_encode(text[for_a][1]) + '</span></a></li>';
        }
        document.getElementById('sidebar-2-list').innerHTML = data;
    }).catch(function() {
        document.getElementById('sidebar-2-item').innerHTML = 'Error: Failed to fetch API.';
    });
}

ringo_do_side_button_3();
function ringo_do_side_button_3() {
    fetch("/api/v2/bbs/main").then(function(res) {
        return res.json();
    }).then(function(text) {
        let data = '';
        for(let for_a = 0; for_a < text["data"].length && for_a < 6; for_a++) {
            data += '<li><a class="recent-item" href="/bbs/w/' + ringo_do_xss_encode(text["data"][for_a]["set_id"]) + '/' + ringo_do_xss_encode(text["data"][for_a]["set_code"]) + '">';
            data += '<span class="recent-time">' + ringo_do_xss_encode(text["data"][for_a]["date"].slice(11, -3)) + '</span>';
            data += '<span class="recent-title">' + ringo_do_xss_encode(text["data"][for_a]["title"]) + '</span></a></li>';
        }
        document.getElementById('sidebar-3-list').innerHTML = data;
    }).catch(function() {
        document.getElementById('sidebar-3-item').innerHTML = 'Error: Failed to fetch API.';
    });
}


// 연합 최근 편집이 필요한 경우 다음 줄의 주석을 해제하시기 바랍니다.
// ringo_do_side_button_4();
// function ringo_do_side_button_4() {
//     fetch("https://namgall.wikiing.in/api/open_recent_changes").then(function(res) {
//         return res.json();
//     }).then(function(text) {
//         let data = '';
//         for(let for_a = 0; for_a < text.length && for_a < 8; for_a++) {
//             data += '<li><a class="recent-item" href="'+ text[for_a][8] + ringo_do_xss_encode(text[for_a][1]) + '">';
//             data += '<span class="recent-time">' + ringo_do_xss_encode(text[for_a][2].slice(11, -3)) + '</span>';
//             data += '<span class="recent-title">' + "[" + ringo_do_xss_encode(text[for_a][7]) + "] " + ringo_do_xss_encode(text[for_a][1]) + '</span></a></li>';
//         }
//         document.getElementById('sidebar-4-list').innerHTML = data;
//     }).catch(function() {
//         document.getElementById('sidebar-4-item').innerHTML = '[오류] 연합 최근 변경을 불러오는데 실패했습니다.';
//     });
// }

if(window.location.pathname === '/License') {
    vision_license_1();
    function vision_license_1() {
        fetch("/api/version").then(function(res) {
            return res.json();
        }).then(function(text) {
            let data = '';
            for(let for_a = 0; for_a < text.length; for_a++) {
                data += "Version:" + text[for_a]["version"];
            }
            document.getElementById('openNAMU_ver').innerHTML = data;
        });
    }

    vision_license_2();
    function vision_license_2() {
        fetch("/api/skin_info").then(function(res) {
            return res.json();
        }).then(function(text) {
            let data = '';
            for(let for_a = 0; for_a < text.length; for_a++) {
                data += "Version:" + text[for_a]["skin_ver"];
            }
            document.getElementById('Vision_ver').innerHTML = data;
        });
    }
}

// Dropdown
$( function () {
	'use strict';
	$( '.dropdown' ).on( 'show.bs.dropdown', function () {
		$( this ).find( '.dropdown-menu' ).first().stop( true, true ).fadeToggle( 200 );
	} );

	$( '.dropdown' ).on( 'hide.bs.dropdown', function () {
		$( this ).find( '.dropdown-menu' ).first().stop( true, true ).fadeToggle( 200 );
	} );

	$( '.btn-group' ).on( 'show.bs.dropdown', function () {
		$( this ).find( '.dropdown-menu' ).first().stop( true, true ).fadeToggle( 200 );
	} );

	$( '.btn-group' ).on( 'hide.bs.dropdown', function () {
		$( this ).find( '.dropdown-menu' ).first().stop( true, true ).fadeToggle( 200 );
	} );
} );