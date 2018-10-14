	// var fonts = ["Montez","Lobster","Josefin Sans","Shadows Into Light","Pacifico","Amatic SC", "Orbitron", "Rokkitt","Righteous","Dancing Script","Bangers","Chewy","Sigmar One","Architects Daughter","Abril Fatface","Covered By Your Grace","Kaushan Script","Gloria Hallelujah","Satisfy","Lobster Two","Comfortaa","Cinzel","Courgette", "arial", "sans-serif", "playfair Display", "roboto", "raleway", "ubuntu", "lobster", "aclonica", "aladin", "alex brush", "almendra display", "astloch", "space mono", "spirax", "bigshot one", "biorhyme", "bonbon", "cherry swash", "stalemate", "Cinzel Decorative", "Clicker Script", "Cookie", "Cormorant Upright", "ewert", "pattaya", "sacramento", "redressed", "diplomata", "elsie swash caps", "cutive", "damion", "dancing script", "amita", "antic didone"]; 

		var fonts = ["Pacifico","Josefin Sans", "Orbitron","Comfortaa","space mono", "spirax",  "Clicker Script", "Cormorant Upright","Dancing Script","Kaushan Script","Satisfy", "elsie swash caps","Courgette",
		"Montez","Lobster","Lobster Two","Righteous","Abril Fatface","Bangers","diplomata", "Rokkitt","cutive","arial", "sans-serif", "roboto", "ubuntu"]; 
	
	var fontSelect = document.getElementById("font-select");
	for(var a = 0; a < fonts.length ; a++){
		var opt = document.createElement('option');
		opt.value = opt.innerHTML = fonts[a];
		opt.style.fontFamily = fonts[a];
		fontSelect.add(opt);
	}
