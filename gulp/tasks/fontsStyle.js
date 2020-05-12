let fs = require('fs');

function fontsStyle(params) {
	let file_content = fs.readFileSync('src/assets/styles/mixins/fonts.scss');
	if (file_content == '') {
		fs.writeFile('src/assets/styles/utils/fontss.scss', '', cb);
		return fs.readdir("build/assets/fonts", function (err, items) {
			if (items) {
				let c_fontname;
				for (var i = 0; i < items.length; i++) {
					let fontname = items[i].split('.');
					fontname = fontname[0];
					if (c_fontname != fontname) {
						fs.appendFile('src/assets/styles/mixins/fonts.scss', '@include font("' + fontname + '", "' + fontname + '", "400", "normal");\r\n', cb);
					}
					c_fontname = fontname;
				}
			}
		})
	}
}

function cb() {

}

exports.fontsStyle = fontsStyle;
