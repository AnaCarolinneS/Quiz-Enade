function obterFrase() {
    var r_text = new Array();
    
    r_text[0] = "Geleia de goiaba";
    r_text[1] = "Carvão mineral e outros combustíveis sólidos (energético, metalúrgico, vapor, pré-lavado)";
    r_text[2] = "Hulhas, mesmo em pó, finos de carvão, exceto aglomeradas, inclusive linhitas (hulhas castanhas), mesmo em pó, mas não aglomeradas";
    r_text[3] = "Serviço de beneficiamento de carvão mineral ou hulhas, associado ou em continuação à extração";

    var i = Math.floor(Math.random() * 220)

    document.getElementById("sorte").innerHTML = "<p>" + r_text[i] + "</p>";
}