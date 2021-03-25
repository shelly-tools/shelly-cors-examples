function ToggleShelly(type, id, ip) {
    fetch('http://' + ip +'/'+ type +'/' + id + '?turn=toggle')
    .then()
    .catch(err => alert('Toggle failed'));
}

function loadData() {
    setInterval(
        function() {
            $("div[data-ip]").each(function(){
                var ip = $(this).data('ip');
                var name = $(this).data('name');
                var power = $(this).data('consumption');
                var shellytype = $(this).data('type');
                var relayindex = $(this).data('relayindex');
                
                var id = $(this).attr('id');
                let content = "";
                fetch('http://' + ip +'/status')
                .then(response => response.json())
                .then(function(data) {
                    content += "<div>" + name + "</div>";
                    if(data.relays[relayindex].ison == true)
                        content += '<div style="width: 100%; text-align: center;" onclick="ToggleShelly(\'' + shellytype + '\', '+ relayindex + ' ,\'' + ip + '\');"><i style="color: #ffa000;" class="relay relay-off mdi mdi-lightbulb-outline"></i></div>';
                    else
                        content += '<div style="width:100%; text-align: center;" onclick="ToggleShelly(\'' + shellytype + '\',' + relayindex + ',\'' + ip + '\');"><i class="relay relay-off mdi mdi-lightbulb-outline"></i></div>';
                    
                    if(typeof data.meters[relayindex].power !== 'undefined')
                        content += "<div style=\"text-align: center; border-top: 1px solid #ccc; padding-top: 4px; \">";
                        if (power == true)
                            content += data.meters[relayindex].power + " Watt";
                        else 
                            content += "<span style=\"color: #56676f;\">-</span>"
                        content += "</div>";
                    $('#' + id ).html(content);
                    
                })
            });
        }, 1000
    )
}  