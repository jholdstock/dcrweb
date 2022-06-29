// Global vars.
var API_ROOT = "https://api.decred.org";

// All pages - footer download stats.
$(document).ready(function () {

	var APIdc = API_ROOT + '/?c=dc';

	// get download_count from github
	$.getJSON(APIdc, function(data) {
		$('#footerDownloads').text(data[1]);
	});

	if (platform.os.family == "Windows" || platform.os.family == "Windows Server" || platform.os.family == "Windows 7" || platform.os.family == "Windows 7 / Server 2008 R2" || platform.os.family == "Windows Server 2008 R2 / 7 x64") {
		$(".windl").show();
		$(".alldl").hide();

		if($("#decreditonmac").length || $("#decreditonlinux").length) {
			$("#decreditonlinux").css({color:  "#a2a7b0"});
			$("#decreditonmac").css({color:  "#a2a7b0"});
		}
	}

	if (platform.os.family == "CentOS" || platform.os.family == "Debian" || platform.os.family == "Fedora" || platform.os.family == "Gentoo" || platform.os.family == "Kubuntu" || platform.os.family == "Linux Mint" || platform.os.family == "Red Hat" || platform.os.family == "SuSE" || platform.os.family == "Ubuntu" || platform.os.family == "Ubuntu Chromium" || platform.os.family == "Xubuntu" || platform.os.family == "Linux") {
		$(".linuxdl").show();
		$(".alldl").hide();

		if($("#decreditonmac").length || $("#decreditonwindows").length) {
			$("#decreditonmac").css({color:  "#a2a7b0"});
			$("#decreditonwindows").css({color:  "#a2a7b0"});
		}
	}

	if (platform.os.family == "OS X") {

		// If we detect OS X, we can't know if the user will want an amd or arm
		// build. Just show the amd64 link which will work on both platforms.

		$(".macdl").show();
		$(".alldl").hide();

		if($("#decreditonlinux").length || $("#decreditonwindows").length) {
			$("#decreditonlinux").css({color:  "#a2a7b0"});
			$("#decreditonwindows").css({color:  "#a2a7b0"});
		}
	}
});



var consolestyle = [
	'background: linear-gradient(to right, #2970ff, #2ED6A1);',
	'color: #091440',
	'font-family: monospace',
	].join(';');
  
console.log(`%c
Stakey needs you! for a bug squishin' mission https://docs.decred.org/contributing/overview/
┌ᴗᴗᴗᴗᴗᴗ┐╭  ╮┌ᴗᴗᴗᴗᴗᴗ┐╭  ╮┌ᴗᴗᴗᴗᴗᴗ┐    ┌ᴗᴗᴗᴗᴗᴗ┐╭    ┌ᴗᴗᴗᴗᴗᴗ┐╭  ╮┌ᴗᴗᴗᴗᴗᴗ┐╭  ╮┌ᴗᴗᴗᴗᴗᴗ┐    ┌ᴗᴗᴗᴗᴗᴗ┐╭ 
╭╣● ▄  ●╠╯  ╰╣●    ●╠╯  ╰╣●   ● ╠╮  ╭╣● ▄▄ ●╠╯   ╭╣● ▄▄ ●╠╯  ╰╣●    ●╠╯  ╰╣●   ● ╠╮  ╭╣●  ▄ ●╠╯ 
╯║      ║    ║   ▄  ║    ║  ▄▄  ║╰  ╯║      ║    ╯║      ║    ║  ▄▄  ║    ║  ▄   ║╰  ╯║      ║  
╚─┬──┬─╝    ╚─┬──┬─╝    ╚─┬──┬─╝    ╚─┬──┬─╝     ╚─┬──┬─╝    ╚─┬──┬─╝    ╚─┬──┬─╝    ╚─┬──┬─╝  
	┙  ┕        ┕  ┙        ┙  ┙        ┙  ┕         ┙  ┙        ┕  ┕        ┕  ┙        ┙  ┕    `
, consolestyle);
